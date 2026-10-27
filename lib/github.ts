import { ProjectItem } from "@/components/sections/ProjectsSection";
import { projects as defaultProjects, projectOverrides } from "@/data/projects";

export interface GitHubRawPinnedRepo {
  author: string;
  name: string;
  description?: string | null;
  language?: string | null;
  languageColor?: string | null;
  stars?: number;
  forks?: number;
}

export interface SyncResult {
  projects: ProjectItem[];
  lastSynced: Date;
  isLive: boolean;
  error?: string;
}

const CACHE_KEY = "dk_github_pinned_projects_v2";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function formatRepoTitle(repoName: string): string {
  return repoName
    .replace(/[-_]+/g, " ")
    .trim()
    .toUpperCase();
}

function sanitizeUrl(url?: string | null): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed === "" || trimmed === "#") return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function getCachedPinnedProjects(username: string): SyncResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${CACHE_KEY}_${username}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.projects) || parsed.projects.length === 0) {
      return null;
    }
    return {
      projects: parsed.projects,
      lastSynced: new Date(parsed.timestamp || Date.now()),
      isLive: true,
    };
  } catch {
    return null;
  }
}

export function saveCachedPinnedProjects(
  username: string,
  projects: ProjectItem[]
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      `${CACHE_KEY}_${username}`,
      JSON.stringify({
        timestamp: Date.now(),
        projects,
        username,
      })
    );
  } catch {
    // Ignore storage quota or disabled storage errors
  }
}

/**
 * Fetch GitHub repository metadata (topics, homepage, exact description)
 * from public GitHub REST API. Fails gracefully if rate-limited.
 */
async function fetchRepoDetails(username: string, repoName: string) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Fetch pinned repositories for a GitHub user.
 * 1. Queries pinned.berrysauce.dev (live parser for GitHub pinned repos)
 * 2. Enriches with GitHub REST API details (homepage/live demo link, topics)
 * 3. Merges with any curated local enhancements (custom live demo links, categories)
 * 4. Caches in localStorage for instant future loads
 */
export async function fetchPinnedProjects(
  username = "Krinz-hub",
  curatedFallback: readonly ProjectItem[] = defaultProjects
): Promise<SyncResult> {
  const normalizedUsername = username.trim() || "Krinz-hub";

  try {
    // 1. Fetch pinned repos from primary CORS-enabled pinned repos microservice
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const response = await fetch(
      `https://pinned.berrysauce.dev/get/${encodeURIComponent(normalizedUsername)}`,
      {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      }
    );
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Pinned repos API responded with status ${response.status}`);
    }

    const pinnedList: GitHubRawPinnedRepo[] = await response.json();

    if (!Array.isArray(pinnedList) || pinnedList.length === 0) {
      throw new Error("No pinned repositories returned from GitHub profile");
    }

    // 2. Enrich with additional repo details (homepage live link, topics) in parallel
    const enrichedList = await Promise.allSettled(
      pinnedList.map(async (repo, index) => {
        const details = await fetchRepoDetails(normalizedUsername, repo.name);
        return {
          repo,
          index,
          details,
        };
      })
    );

    // 3. Map into ProjectItem objects
    const syncedProjects: ProjectItem[] = enrichedList.map((itemResult, idx) => {
      const rawRepo =
        itemResult.status === "fulfilled"
          ? itemResult.value.repo
          : pinnedList[idx];
      const details =
        itemResult.status === "fulfilled" ? itemResult.value.details : null;

      const repoName = rawRepo.name;
      const normalizedKey = repoName.toLowerCase().replace(/[-_]+/g, "");

      // Find any curated metadata override for this repo
      const override =
        projectOverrides[repoName] ||
        projectOverrides[normalizedKey] ||
        curatedFallback.find(
          (p) =>
            p.repoName?.toLowerCase() === repoName.toLowerCase() ||
            p.title.replace(/\s+/g, "").toLowerCase() === normalizedKey
        );

      const liveUrl =
        sanitizeUrl(details?.homepage) ||
        sanitizeUrl(override?.live) ||
        "";

      const sourceUrl =
        details?.html_url ||
        `https://github.com/${normalizedUsername}/${repoName}`;

      const stars =
        typeof details?.stargazers_count === "number"
          ? details.stargazers_count
          : typeof rawRepo.stars === "number"
          ? rawRepo.stars
          : 0;

      const forks =
        typeof details?.forks_count === "number"
          ? details.forks_count
          : typeof rawRepo.forks === "number"
          ? rawRepo.forks
          : 0;

      const language = details?.language || rawRepo.language || "TypeScript";
      const languageColor = rawRepo.languageColor || "#3178c6";

      // Build categories list
      let categories: string[] = [];
      if (override?.category && override.category.length > 0) {
        categories = [...override.category];
      } else if (Array.isArray(details?.topics) && details.topics.length > 0) {
        categories = details.topics
          .slice(0, 3)
          .map((t: string) => t.toUpperCase());
      } else {
        categories = [language.toUpperCase(), "OPEN SOURCE"];
      }

      // Build technologies list
      let technologies: string[] = [];
      if (override?.technologies && override.technologies.length > 0) {
        technologies = [...override.technologies];
      } else {
        const stackSet = new Set<string>();
        if (language) stackSet.add(language);
        if (Array.isArray(details?.topics)) {
          details.topics.forEach((t: string) => {
            stackSet.add(t.charAt(0).toUpperCase() + t.slice(1));
          });
        }
        technologies = Array.from(stackSet);
        if (technologies.length === 1) {
          technologies.push("GitHub API", "Git");
        }
      }

      // Description logic
      const description =
        override?.description ||
        details?.description ||
        rawRepo.description ||
        `A showcase project maintained by @${normalizedUsername} on GitHub.`;

      // Status logic
      const isLive = Boolean(liveUrl && liveUrl !== "#");
      const isArchived = Boolean(details?.archived);
      const status = isArchived
        ? "ARCHIVE"
        : isLive
        ? "LIVE"
        : override?.status || "ACTIVE";

      const id = String(idx + 1).padStart(2, "0");

      return {
        id,
        title: override?.title || formatRepoTitle(repoName),
        category: categories,
        status,
        description,
        technologies,
        live: liveUrl || "#",
        source: sourceUrl,
        visual: override?.visual || "code",
        repoName,
        stars,
        forks,
        language,
        languageColor,
        isPinned: true,
      };
    });

    saveCachedPinnedProjects(normalizedUsername, syncedProjects);

    return {
      projects: syncedProjects,
      lastSynced: new Date(),
      isLive: true,
    };
  } catch (error) {
    // If network or parsing failed, check if we have cached projects from a previous sync
    const cached = getCachedPinnedProjects(normalizedUsername);
    if (cached) {
      return {
        ...cached,
        error: (error as Error).message,
      };
    }

    // Otherwise return the curated fallback data
    return {
      projects: [...curatedFallback],
      lastSynced: new Date(),
      isLive: false,
      error: (error as Error).message,
    };
  }
}
