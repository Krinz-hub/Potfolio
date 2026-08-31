"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CustomCursor } from "@/components/interaction/custom-cursor";
import { MagneticField } from "@/components/interaction/magnetic-field";
import { experiments } from "@/data/experiments";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

const navItems = ["ABOUT", "PROJECTS", "LAB", "STACK", "CONTACT"] as const;
const navTargets: Record<(typeof navItems)[number], string> = { ABOUT: "about", PROJECTS: "projects", LAB: "lab", STACK: "stack", CONTACT: "contact" };

function Arrow() { return <span aria-hidden="true">↗</span>; }

export function Portfolio() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeSkill, setActiveSkill] = useState(0);
  const [sound, setSound] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [achievement, setAchievement] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("ABOUT");
  const [projectTransition, setProjectTransition] = useState(false);
  const [terminalLines, setTerminalLines] = useState(0);
  const [activeTech, setActiveTech] = useState("AI");
  const [activeLab, setActiveLab] = useState<(typeof experiments)[number] | null>(null);
  const [complete, setComplete] = useState(false);
  const [idleMessage, setIdleMessage] = useState("SYSTEM ACTIVE");
  const [secretMode, setSecretMode] = useState(false);
  const unlocked = useRef(new Set<string>());
  const projectTimer = useRef<number | undefined>(undefined);
  const logoClicks = useRef(0);
  const project = projects[activeProject];

  const unlock = useCallback((title: string) => {
    if (unlocked.current.has(title)) return;
    unlocked.current.add(title); setAchievement(title);
    window.setTimeout(() => setAchievement(null), 3200);
  }, []);

  useEffect(() => {
    const soundPreference = localStorage.getItem("dk-sound") === "on";
    const syncSound = window.requestAnimationFrame(() => setSound(soundPreference));
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
      if (window.scrollY > 380) unlock("FIRST VISIT");
    };
    const sections = [...document.querySelectorAll<HTMLElement>("main section[id], footer")];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (!entry.isIntersecting) return; entry.target.classList.add("revealed"); const label = (entry.target as HTMLElement).dataset.nav; if (label) setActiveSection(label); if (entry.target.tagName === "FOOTER") { setComplete(true); unlock("SYSTEM COMPLETE"); } if (entry.target.id === "lab") unlock("LAB RAT"); if (entry.target.classList.contains("build-log")) { [0, 1, 2, 3, 4].forEach((line, index) => window.setTimeout(() => setTerminalLines(line + 1), 150 + index * 230)); } }), { threshold: .25 });
    sections.forEach((section) => observer.observe(section));
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.cancelAnimationFrame(syncSound); window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, [unlock]);

  useEffect(() => {
    let idleTimer = 0;
    let readyTimer = 0;
    const resetIdle = () => { window.clearTimeout(idleTimer); window.clearTimeout(readyTimer); setIdleMessage("SYSTEM ACTIVE"); idleTimer = window.setTimeout(() => { setIdleMessage("SYSTEM WAITING..."); readyTimer = window.setTimeout(() => setIdleMessage("READY."), 1700); }, 14000); };
    ["pointerdown", "keydown", "scroll"].forEach((event) => window.addEventListener(event, resetIdle, { passive: true })); resetIdle();
    return () => { window.clearTimeout(idleTimer); window.clearTimeout(readyTimer); ["pointerdown", "keydown", "scroll"].forEach((event) => window.removeEventListener(event, resetIdle)); };
  }, []);

  useEffect(() => () => window.clearTimeout(projectTimer.current), []);

  const playFeedback = (frequency = 420, force = false) => {
    if (!sound && !force) return;
    const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "square";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.025, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.06);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(); oscillator.stop(context.currentTime + 0.065);
  };
  const toggleSound = () => { const next = !sound; setSound(next); localStorage.setItem("dk-sound", next ? "on" : "off"); if (next) playFeedback(660, true); };
  const scrollTo = (id: string) => { playFeedback(330); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const selectProject = (index: number) => { if (index === activeProject || projectTransition) return; setProjectTransition(true); playFeedback(530); window.clearTimeout(projectTimer.current); projectTimer.current = window.setTimeout(() => { setActiveProject(index); setProjectTransition(false); if (unlocked.current.size >= 2) unlock("PROJECT EXPLORER"); }, 260); };
  const selectSkill = (index: number) => { const next = (index + skills.length) % skills.length; setActiveSkill(next); playFeedback(470); };
  const handleLogo = () => { logoClicks.current += 1; if (logoClicks.current === 5) { setSecretMode(true); unlock("SECRET MODE"); window.setTimeout(() => setSecretMode(false), 1500); logoClicks.current = 0; } scrollTo("top"); };
  const techDescription: Record<string, string> = { AI: "Practical intelligence for useful tools.", AUTOMATION: "Repeatable work, made calmer and more reliable.", APIs: "Clear connections between systems and ideas.", WEB: "Fast, useful experiences for the open web.", "UI / UX": "Interfaces that explain themselves through use.", "CREATIVE CODING": "Technical systems with a human signature.", EXPERIMENTATION: "Small tests that create larger possibilities.", SYSTEMS: "Thinking beyond screens to the whole flow." };

  return <main onPointerDown={() => unlock("FIRST VISIT")}>
    <CustomCursor /><MagneticField />
    <a className="skip-link" href="#content">Skip to content</a>
    <div className="scanlines" aria-hidden="true" />
    <div className="progress-track" aria-hidden="true"><span style={{ height: `${progress}%` }} /></div>
    {achievement && <div className="achievement" role="status"><b>ACHIEVEMENT UNLOCKED</b><span>{achievement}</span></div>}

    {secretMode && <div className="secret-mode" role="status">SECRET MODE // SIGNAL FOUND</div>}
    <header className="site-header">
      <button className="mark" data-cursor="button" onClick={handleLogo} aria-label="Back to start">{profile.initials}</button>
      <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
        {navItems.map((item) => <button key={item} data-cursor="nav" className={activeSection === item ? "active" : ""} onClick={() => scrollTo(navTargets[item])}>{item}</button>)}
      </nav>
      <div className="header-controls"><span className="online"><i />ONLINE</span><button className="sound" onClick={toggleSound} aria-pressed={sound}>♪ {sound ? "SOUND ON" : "SOUND OFF"}</button><button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">{menuOpen ? "×" : "☰"}</button></div>
    </header>

    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow"><span className="blink">▮</span> PLAYER 01 / SYSTEM ONLINE</p>
        <h1><span>DEV</span><span>KANSAKAR</span></h1>
        <p className="hero-line">I BUILD THINGS<br />THAT AUTOMATE<br /><em>THE BORING STUFF.</em></p>
        <p className="role">{profile.role}</p>
        <button className="arcade-button" data-cursor="button" data-magnetic onClick={() => scrollTo("projects")}>ENTER PORTFOLIO <Arrow /></button>
      </div>
      <aside className="hero-hud" aria-label="Profile status">
        <div className="pixel-orbit" data-cursor="profile" role="img" aria-label="Portrait of Dev Kansakar" style={{ backgroundImage: "url('/images/dev-kansakar.png')", backgroundSize: "cover", backgroundPosition: "center 29%" }}><span>+</span><span>×</span><span>•</span></div>
        <dl><div><dt>LVL</dt><dd>6/10</dd></div><div><dt>XP</dt><dd className="meter">███████░░░</dd></div><div><dt>STATUS</dt><dd>ONLINE</dd></div><div><dt>LOCATION</dt><dd>{profile.location}</dd></div></dl>
        <p className="hud-note">{idleMessage === "SYSTEM ACTIVE" ? "SCROLL TO EXPLORE" : idleMessage} <span>↓</span></p>
      </aside>
    </section>

    <div id="content">
      <section className="section profile" id="about" data-nav="ABOUT">
        <div className="section-label">01 / PLAYER PROFILE</div>
        <div className="profile-layout"><h2 className="profile-title"><span tabIndex={0} data-note="MAKES THINGS REAL">BUILDER.</span><br /><i><span tabIndex={0} data-note="TESTS IDEAS">EXPERIMENTER.</span></i><br /><span tabIndex={0} data-note="SEES THE WHOLE SYSTEM">SYSTEM THINKER.</span></h2><div className="profile-copy"><p>{profile.statement}</p><p>I’m interested in the point where a well-made interface, a practical automation, and a clear idea meet.</p><div className="profile-facts">{profile.facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></div></div>
      </section>

      <section className="section skill-section" id="stack" data-nav="STACK">
        <div className="section-label">02 / SKILL TREE</div>
        <div className="skill-layout"><div className="skill-list" role="tablist" aria-label="Skills">{skills.map((skill, index) => <button key={skill.name} role="tab" aria-selected={activeSkill === index} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); selectSkill(index + 1); } if (event.key === "ArrowUp") { event.preventDefault(); selectSkill(index - 1); } }} onClick={() => selectSkill(index)}><span>{String(index + 1).padStart(2, "0")}</span>{skill.name}<b>{skill.level}</b></button>)}</div><div className="skill-detail" role="tabpanel"><span className="detail-number">NODE_{String(activeSkill + 1).padStart(2, "0")}</span><h3>{skills[activeSkill].name}</h3><p>{skills[activeSkill].detail}</p><div>{skills[activeSkill].tools.map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div></div></div>
      </section>

      <section className="section projects" id="projects" data-nav="PROJECTS">
        <div className="section-label">03 / SELECT PROJECT</div>
        <div className="project-layout"><div className="project-list" role="tablist" aria-label="Projects">{projects.map((item, index) => <button key={item.id} data-cursor="project" role="tab" aria-selected={activeProject === index} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); selectProject((index + 1) % projects.length); } if (event.key === "ArrowUp") { event.preventDefault(); selectProject((index - 1 + projects.length) % projects.length); } }} onClick={() => selectProject(index)}><span>{item.id}</span><b>{item.title}</b><i>→</i></button>)}</div><article className={`project-preview ${project.visual} ${projectTransition ? "transitioning" : ""}`} role="tabpanel"><div className="project-art" data-cursor="image" aria-hidden="true"><span className="art-code">{project.id}</span><span className="art-window" /><span className="art-pixel p1" /><span className="art-pixel p2" /><span className="art-pixel p3" /></div><div className="project-content"><div className="project-meta"><span>PROJECT_{project.id}</span><b><i /> {project.status}</b></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.technologies.map((technology, index) => <span key={`${technology}-${index}`}>{technology}</span>)}</div><div className="project-links"><a data-cursor="link" data-magnetic href={project.live} aria-label={`View ${project.title}`}>VIEW PROJECT <Arrow /></a><a data-cursor="link" href={project.source} aria-label={`View ${project.title} source`}>SOURCE <Arrow /></a></div></div></article></div>
      </section>

      <section className="section build-log">
        <div className="section-label">04 / CURRENTLY BUILDING</div>
        <div className="terminal"><div className="terminal-bar"><span /><span /><span /> BUILD_LOG</div><div className="terminal-body"><p>&gt; CURRENT_BUILD</p><div className="terminal-row"><span>PROJECT</span><b>EDIT_THIS_IN_DATA</b></div><div className="terminal-row"><span>STATUS</span><b className="yellow">IN PROGRESS</b></div><div className="build-meter"><i /></div><div className="terminal-lines" aria-live="polite">{["> initializing...", "> loading modules...", "> connecting API...", "> optimizing workflow...", "SYSTEM READY"].slice(0, terminalLines).map((line) => <p key={line}>{line}</p>)}{terminalLines < 5 && <span className="terminal-cursor">█</span>}</div><p className="muted">RECENT WORK</p><ul><li>Replace this with a current project update</li><li>Add a meaningful progress note</li><li>Keep this log fresh and specific</li></ul></div></div>
      </section>

      <section className="section tech-field">
        <div className="section-label">05 / TECH × CREATIVE</div><div className="tech-heading"><h2>THE USEFUL<br /><i>EDGE</i> OF TECH.</h2><p>Tools matter most when they make people’s work, decisions, or ideas easier to move forward.</p></div><div className="field-map" aria-label="Areas of interest">{Object.keys(techDescription).map((item) => <button key={item} data-cursor="button" className={activeTech === item ? "active" : ""} onClick={() => { setActiveTech(item); playFeedback(440); }}>{item}</button>)}</div><p className="tech-copy" aria-live="polite">{techDescription[activeTech]}</p>
      </section>

      <section className="section lab" id="lab" data-nav="LAB"><div className="section-label">06 / EXPERIMENT LAB</div><div className="lab-intro"><h2>SMALL<br /><i>WEIRD</i><br />IDEAS.</h2><p>A space for playful tests, useful prototypes, and things that don’t fit neatly into a project brief.</p></div><div className="experiment-grid">{experiments.map((experiment) => { const [number, title, description] = experiment; return <article key={number} data-cursor="lab" className={activeLab?.[0] === number ? "active" : ""}><span>EXPERIMENT_{number}</span><div className="experiment-glyph" aria-hidden="true"><i /><i /><i /></div><h3>{title}</h3><p>{description}</p><button data-cursor="lab" onClick={() => { setActiveLab(experiment); unlock("LAB RAT"); playFeedback(510); }} aria-label={`Open ${title}`}>OPEN LOG <Arrow /></button></article>; })}</div></section>

      <section className="contact" id="contact" data-nav="CONTACT"><div className="contact-pixels" aria-hidden="true" /><p className="eyebrow">07 / INSERT COIN</p><h2>LET&apos;S BUILD<br /><i>SOMETHING</i> USEFUL.</h2><p>Have an idea? Need an automation? Building something interesting? Let&apos;s talk.</p><a className="email-link" data-cursor="link" data-magnetic href={`mailto:${profile.email}`}>{profile.email} <Arrow /></a><div className="social-links"><a data-cursor="link" href={profile.social.github}>GITHUB <Arrow /></a><a data-cursor="link" href={profile.social.linkedin}>LINKEDIN <Arrow /></a><a data-cursor="link" href={profile.social.Youtube}>YOUTUBE <Arrow /></a></div><p className="system-state">{complete ? "SYSTEM COMPLETE / READY WHEN YOU ARE." : "CONNECTION AVAILABLE"}</p></section>
    </div>
    <footer><span>{profile.name.toUpperCase()}</span><span><i /> SYSTEM STATUS: {complete ? "COMPLETE" : "ONLINE"}</span><span>© {new Date().getFullYear()} {profile.name.toUpperCase()}</span><span>BUILT WITH NEXT.JS</span></footer>
    {activeLab && <div className="lab-dialog" role="dialog" aria-modal="true" aria-labelledby="lab-dialog-title" onClick={() => setActiveLab(null)}><div onClick={(event) => event.stopPropagation()}><span>EXPERIMENT_{activeLab[0]}</span><h3 id="lab-dialog-title">{activeLab[1]}</h3><p>{activeLab[2]}</p><p>This is an editable experiment placeholder. Add its real details when it is ready to share.</p><button data-cursor="button" onClick={() => setActiveLab(null)}>CLOSE LOG</button></div></div>}
  </main>;
}
