import { ProjectItem } from "@/components/sections/ProjectsSection";

/**
 * Curated metadata dictionary for Dev's projects.
 * When GitHub sync runs, it pulls the exact real-time pinned projects,
 * stars, forks, and language from GitHub, while using this dictionary
 * to enhance projects with custom live demo URLs, tech stack lists, and descriptions.
 */
export const projectOverrides: Record<string, Partial<ProjectItem>> = {
  Package_GUI: {
    title: "PACKAGE GUI",
    category: ["SYSTEM", "DEV TOOLS", "DESKTOP"],
    status: "ACTIVE",
    description:
      "A cross-platform local system management dashboard that detects installed packages, runtimes, processes, services, and ports. Manage development environments with install/uninstall, live logs, and diagnostics.",
    technologies: ["TypeScript", "Node.js", "System APIs", "Desktop UI"],
    live: "#",
    source: "https://github.com/Krinz-hub/Package_GUI",
    visual: "system",
  },
  "new-pashupati-suppliers-website": {
    title: "NEW PASHUPATI SUPPLIERS",
    category: ["WEB", "COMMERCE", "FULLSTACK"],
    status: "LIVE",
    description:
      "A modern commerce website with custom product and content management, Cloudinary media handling, and MongoDB-backed data.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "Cloudinary", "Cloudflare"],
    live: "https://newpashupatisuppliers.com.np",
    source: "https://github.com/Krinz-hub/new-pashupati-suppliers-website",
    visual: "suppliers",
  },
  "user-dashboard": {
    title: "USER DASHBOARD",
    category: ["UI / UX", "DASHBOARD", "ANALYTICS"],
    status: "ACTIVE",
    description:
      "A streamlined user management and analytics dashboard interface built with TypeScript, modular components, and responsive layout.",
    technologies: ["TypeScript", "React", "Docker", "REST API"],
    live: "#",
    source: "https://github.com/Krinz-hub/user-dashboard",
    visual: "dashboard",
  },
  "EXRONIX-website": {
    title: "EXRONIX WEBSITE",
    category: ["WEB", "SHOWCASE", "SERVICES"],
    status: "LIVE",
    description:
      "Official website for EXRONIX — modern tech solutions and digital services platform with high-performance responsive styling.",
    technologies: ["TypeScript", "Next.js", "React", "Vercel"],
    live: "https://exronix-website-ruby.vercel.app",
    source: "https://github.com/Krinz-hub/EXRONIX-website",
    visual: "exronix",
  },
};

/**
 * Initial static fallback projects list.
 * Matches Dev's GitHub pinned repositories so the site displays
 * correctly even before client-side hydration or if offline.
 */
export const projects: ProjectItem[] = [
  {
    id: "01",
    title: "PACKAGE GUI",
    category: ["SYSTEM", "DEV TOOLS", "DESKTOP"],
    status: "ACTIVE",
    description:
      "A cross-platform local system management dashboard that detects installed packages, runtimes, processes, services, and ports. Manage development environments with install/uninstall, live logs, and diagnostics.",
    technologies: ["TypeScript", "Node.js", "System APIs", "Desktop UI"],
    live: "#",
    source: "https://github.com/Krinz-hub/Package_GUI",
    visual: "system",
    repoName: "Package_GUI",
    stars: 1,
    forks: 0,
    language: "TypeScript",
    languageColor: "#3178c6",
    isPinned: true,
  },
  {
    id: "02",
    title: "NEW PASHUPATI SUPPLIERS",
    category: ["WEB", "COMMERCE", "FULLSTACK"],
    status: "LIVE",
    description:
      "A modern commerce website with custom product and content management, Cloudinary media handling, and MongoDB-backed data.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "Cloudinary", "Cloudflare"],
    live: "https://newpashupatisuppliers.com.np",
    source: "https://github.com/Krinz-hub/new-pashupati-suppliers-website",
    visual: "suppliers",
    repoName: "new-pashupati-suppliers-website",
    stars: 0,
    forks: 0,
    language: "TypeScript",
    languageColor: "#3178c6",
    isPinned: true,
  },
  {
    id: "03",
    title: "USER DASHBOARD",
    category: ["UI / UX", "DASHBOARD", "ANALYTICS"],
    status: "ACTIVE",
    description:
      "A streamlined user management and analytics dashboard interface built with TypeScript, modular components, and responsive layout.",
    technologies: ["TypeScript", "React", "Docker", "REST API"],
    live: "#",
    source: "https://github.com/Krinz-hub/user-dashboard",
    visual: "dashboard",
    repoName: "user-dashboard",
    stars: 0,
    forks: 0,
    language: "TypeScript",
    languageColor: "#3178c6",
    isPinned: true,
  },
  {
    id: "04",
    title: "EXRONIX WEBSITE",
    category: ["WEB", "SHOWCASE", "SERVICES"],
    status: "LIVE",
    description:
      "Official website for EXRONIX — modern tech solutions and digital services platform with high-performance responsive styling.",
    technologies: ["TypeScript", "Next.js", "React", "Vercel"],
    live: "https://exronix-website-ruby.vercel.app",
    source: "https://github.com/Krinz-hub/EXRONIX-website",
    visual: "exronix",
    repoName: "EXRONIX-website",
    stars: 1,
    forks: 0,
    language: "TypeScript",
    languageColor: "#3178c6",
    isPinned: true,
  },
];
