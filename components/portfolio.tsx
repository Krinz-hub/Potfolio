"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "./sections/Header";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { BuildLogSection } from "./sections/BuildLogSection";
import { TechCreativeSection } from "./sections/TechCreativeSection";
import { LabSection, type ExperimentItem } from "./sections/LabSection";
import { ContactSection } from "./sections/ContactSection";
import { Footer } from "./sections/Footer";
import { experiments } from "@/data/experiments";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { usePinnedProjects } from "@/hooks/usePinnedProjects";

const techDescription: Record<string, string> = {
  AI: "Practical intelligence for useful tools that simplify complex workflows.",
  AUTOMATION: "Repeatable work, made calmer, transparent, and completely reliable.",
  APIs: "Clear and dependable connections between systems, databases, and users.",
  WEB: "Fast, accessible, and delightful experiences designed for the open web.",
  "UI / UX": "Interfaces that explain themselves through intuitive tactile use.",
  "CREATIVE CODING": "Technical systems infused with an authentic human signature.",
  EXPERIMENTATION: "Small, curious tests that unlock larger strategic possibilities.",
  SYSTEMS: "Thinking well beyond isolated screens to the entire end-to-end flow.",
};

export function Portfolio() {
  const {
    projects: syncedProjects,
    activeProject,
    setActiveProject,
    isSyncing: isProjectsSyncing,
    lastSyncedText: projectsLastSyncedText,
    refresh: refreshProjects,
  } = usePinnedProjects({
    username: profile.social.githubUsername || "Krinz-hub",
    initialProjects: projects,
  });
  const [activeSkill, setActiveSkill] = useState(0);
  const [activeTech, setActiveTech] = useState("AI");
  const [activeLab, setActiveLab] = useState<ExperimentItem | null>(null);
  const [sound, setSound] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    try {
      const saved = localStorage.getItem("dk-theme") as "light" | "dark" | null;
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [achievement, setAchievement] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("about");
  const [projectTransition, setProjectTransition] = useState(false);
  const [terminalLines, setTerminalLines] = useState(0);
  const [secretMode, setSecretMode] = useState(false);

  const unlocked = useRef(new Set<string>());
  const projectTimer = useRef<number | undefined>(undefined);
  const logoClicks = useRef(0);

  // Playful audio feedback synthesis
  const playFeedback = useCallback(
    (frequency = 420, force = false) => {
      if (!sound && !force) return;
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as Window & { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (!AudioContextClass) return;
        const context = new AudioContextClass();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.04, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.085);
      } catch {
        // AudioContext might be blocked until user gesture
      }
    },
    [sound],
  );

  const unlock = useCallback(
    (title: string) => {
      if (unlocked.current.has(title)) return;
      unlocked.current.add(title);
      setAchievement(title);
      playFeedback(580);
      window.setTimeout(() => setAchievement(null), 3600);
    },
    [playFeedback],
  );

  useEffect(() => {
    const soundPreference = localStorage.getItem("dk-sound") === "on";
    const syncSound = window.requestAnimationFrame(() =>
      setSound(soundPreference),
    );

    const savedTheme = localStorage.getItem("dk-theme") as "light" | "dark" | null;
    const initialTheme =
      savedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    document.documentElement.setAttribute("data-theme", initialTheme);
    document.documentElement.style.colorScheme = initialTheme;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0,
      );
      if (window.scrollY > 300) unlock("SKETCHBOOK OPENED");
    };

    const sections = [
      ...document.querySelectorAll<HTMLElement>("section[id], footer"),
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const navLabel = (entry.target as HTMLElement).dataset.nav;
          if (navLabel) setActiveSection(navLabel.toLowerCase());
          if (entry.target.tagName === "FOOTER") {
            unlock("NOTEBOOK COMPLETE");
          }
          if (entry.target.id === "lab") {
            unlock("LAB RAT");
          }
          if (entry.target.id === "log") {
            [0, 1, 2, 3, 4].forEach((line, index) =>
              window.setTimeout(
                () => setTerminalLines(line + 1),
                180 + index * 200,
              ),
            );
          }
        });
      },
      { threshold: 0.2 },
    );

    sections.forEach((section) => observer.observe(section));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(syncSound);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [unlock]);

  useEffect(() => () => window.clearTimeout(projectTimer.current), []);

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    localStorage.setItem("dk-sound", next ? "on" : "off");
    if (next) playFeedback(660, true);
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("dk-theme", next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    playFeedback(next === "dark" ? 360 : 720);
    unlock(next === "dark" ? "CHALKBOARD MODE" : "WARM PAPER MODE");
  };

  const scrollTo = (id: string) => {
    playFeedback(330);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const selectProject = (index: number) => {
    if (index === activeProject || projectTransition) return;
    setProjectTransition(true);
    playFeedback(520);
    window.clearTimeout(projectTimer.current);
    projectTimer.current = window.setTimeout(() => {
      setActiveProject(index);
      setProjectTransition(false);
      if (unlocked.current.size >= 2) unlock("PROJECT EXPLORER");
    }, 180);
  };

  const selectSkill = (index: number) => {
    setActiveSkill(index);
    playFeedback(460);
  };

  const selectTech = (tech: string) => {
    setActiveTech(tech);
    playFeedback(440);
  };

  const handleLogoClick = () => {
    logoClicks.current += 1;
    if (logoClicks.current === 5) {
      setSecretMode(true);
      unlock("SECRET DOODLE FOUND");
      window.setTimeout(() => setSecretMode(false), 2400);
      logoClicks.current = 0;
    }
    scrollTo("top");
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Skip to Main Content */}
      <a className="hand-skip-link" href="#content">
        Skip to content ✎
      </a>

      {/* Notebook Scroll Margin Indicator */}
      <div className="hand-scroll-indicator" aria-hidden="true">
        <div className="hand-scroll-bar" style={{ height: `${progress}%` }} />
      </div>

      {/* Floating Sticky Note Achievement Notification */}
      {achievement && (
        <div className="hand-achievement" role="status">
          <b>✎ STAMP UNLOCKED!</b>
          <span>{achievement}</span>
        </div>
      )}

      {/* Secret Easter Egg Mode */}
      {secretMode && (
        <div className="hand-secret-mode" role="status">
          ✎ SECRET SKETCH UNLOCKED! // HELLO EXPLORER!
        </div>
      )}

      {/* Header */}
      <Header
        initials={profile.initials}
        activeSection={activeSection}
        sound={sound}
        theme={theme}
        menuOpen={menuOpen}
        onLogoClick={handleLogoClick}
        onNavClick={scrollTo}
        onToggleSound={toggleSound}
        onToggleTheme={toggleTheme}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
      />

      <main id="content">
        {/* Hero Section */}
        <HeroSection
          name={profile.name}
          role={profile.role}
          location={profile.location}
          onExploreClick={() => scrollTo("projects")}
        />

        {/* 01 / About Section */}
        <AboutSection statement={profile.statement} facts={profile.facts} />

        {/* 02 / Skills Section */}
        <SkillsSection
          skills={skills}
          activeSkill={activeSkill}
          onSelectSkill={selectSkill}
        />

        {/* 03 / Projects Section */}
        <ProjectsSection
          projects={syncedProjects}
          activeProject={activeProject}
          isTransitioning={projectTransition}
          onSelectProject={selectProject}
          isSyncing={isProjectsSyncing}
          lastSyncedText={projectsLastSyncedText}
          onRefresh={() => {
            playFeedback(600);
            refreshProjects();
          }}
          githubUsername={profile.social.githubUsername || "Krinz-hub"}
        />

        {/* 04 / Build Log Section */}
        <BuildLogSection terminalLines={terminalLines} />

        {/* 05 / Tech × Creative Section */}
        <TechCreativeSection
          techDescription={techDescription}
          activeTech={activeTech}
          onSelectTech={selectTech}
        />

        {/* 06 / Experiment Lab Section */}
        <LabSection
          experiments={experiments}
          activeLab={activeLab}
          onOpenLab={(item) => {
            setActiveLab(item);
            unlock("LAB RAT");
            playFeedback(510);
          }}
          onCloseLab={() => setActiveLab(null)}
        />

        {/* 07 / Contact Section */}
        <ContactSection email={profile.email} social={profile.social} />
      </main>

      {/* Footer */}
      <Footer name={profile.name} onScrollToTop={() => scrollTo("top")} />
    </div>
  );
}
