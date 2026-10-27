"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectItem } from "@/components/sections/ProjectsSection";
import {
  fetchPinnedProjects,
  getCachedPinnedProjects,
} from "@/lib/github";

interface UsePinnedProjectsOptions {
  username?: string;
  initialProjects: readonly ProjectItem[];
}

export function usePinnedProjects({
  username = "Krinz-hub",
  initialProjects,
}: UsePinnedProjectsOptions) {
  const [projects, setProjects] = useState<readonly ProjectItem[]>(() => {
    // Check if we can hydrate immediately from cached sync data
    if (typeof window !== "undefined") {
      const cached = getCachedPinnedProjects(username);
      if (cached && cached.projects.length > 0) {
        return cached.projects;
      }
    }
    return initialProjects;
  });

  const [activeProject, setActiveProject] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedText, setLastSyncedText] = useState<string>("AUTO-SYNCED");
  const [syncError, setSyncError] = useState<string | null>(null);

  const isMounted = useRef(false);

  const sync = useCallback(
    async () => {
      setIsSyncing(true);
      setSyncError(null);

      try {
        const result = await fetchPinnedProjects(username, initialProjects);
        if (result.projects && result.projects.length > 0) {
          setProjects(result.projects);
          setLastSyncedText("JUST NOW");
          setActiveProject((prev) =>
            prev >= result.projects.length ? 0 : prev
          );
        }
        if (result.error && !result.isLive) {
          setSyncError(result.error);
        }
      } catch (err) {
        setSyncError((err as Error).message);
      } finally {
        setIsSyncing(false);
      }
    },
    [username, initialProjects]
  );

  useEffect(() => {
    // Only run on client after mount
    if (!isMounted.current) {
      isMounted.current = true;
      // Automatically sync latest pinned projects from GitHub
      sync();
    }
  }, [sync]);

  return {
    projects,
    activeProject,
    setActiveProject,
    isSyncing,
    lastSyncedText,
    syncError,
    refresh: () => sync(),
  };
}
