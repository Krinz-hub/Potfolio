"use client";

import { useEffect, useState } from "react";
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
  const [achievement, setAchievement] = useState(false);
  const project = projects[activeProject];

  useEffect(() => {
    const soundPreference = localStorage.getItem("dk-sound") === "on";
    const syncSound = window.requestAnimationFrame(() => setSound(soundPreference));
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
      if (window.scrollY > 380 && !sessionStorage.getItem("dk-explorer")) {
        sessionStorage.setItem("dk-explorer", "1"); setAchievement(true);
        window.setTimeout(() => setAchievement(false), 3600);
      }
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.cancelAnimationFrame(syncSound); window.removeEventListener("scroll", onScroll); };
  }, []);

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

  return <main>
    <a className="skip-link" href="#content">Skip to content</a>
    <div className="scanlines" aria-hidden="true" />
    <div className="progress-track" aria-hidden="true"><span style={{ height: `${progress}%` }} /></div>
    {achievement && <div className="achievement" role="status"><b>ACHIEVEMENT UNLOCKED</b><span>FIRST EXPLORATION</span></div>}

    <header className="site-header">
      <button className="mark" onClick={() => scrollTo("top")} aria-label="Back to start">{profile.initials}</button>
      <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
        {navItems.map((item) => <button key={item} onClick={() => scrollTo(navTargets[item])}>{item}</button>)}
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
        <button className="arcade-button" onClick={() => scrollTo("projects")}>ENTER PORTFOLIO <Arrow /></button>
      </div>
      <aside className="hero-hud" aria-label="Profile status">
        <div className="pixel-orbit" role="img" aria-label="Portrait of Dev Kansakar" style={{ backgroundImage: "url('/images/dev-kansakar.png')", backgroundSize: "cover", backgroundPosition: "center 29%" }}><span>+</span><span>×</span><span>•</span></div>
        <dl><div><dt>LVL</dt><dd>6/10</dd></div><div><dt>XP</dt><dd className="meter">███████░░░</dd></div><div><dt>STATUS</dt><dd>ONLINE</dd></div><div><dt>LOCATION</dt><dd>{profile.location}</dd></div></dl>
        <p className="hud-note">SCROLL TO EXPLORE <span>↓</span></p>
      </aside>
    </section>

    <div id="content">
      <section className="section profile" id="about">
        <div className="section-label">01 / PLAYER PROFILE</div>
        <div className="profile-layout"><h2>BUILDER.<br /><i>EXPERIMENTER.</i><br />SYSTEM THINKER.</h2><div className="profile-copy"><p>{profile.statement}</p><p>I’m interested in the point where a well-made interface, a practical automation, and a clear idea meet.</p><div className="profile-facts">{profile.facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></div></div>
      </section>

      <section className="section skill-section" id="stack">
        <div className="section-label">02 / SKILL TREE</div>
        <div className="skill-layout"><div className="skill-list" role="tablist" aria-label="Skills">{skills.map((skill, index) => <button key={skill.name} role="tab" aria-selected={activeSkill === index} onClick={() => { setActiveSkill(index); playFeedback(470); }}><span>{String(index + 1).padStart(2, "0")}</span>{skill.name}<b>{skill.level}</b></button>)}</div><div className="skill-detail" role="tabpanel"><span className="detail-number">NODE_{String(activeSkill + 1).padStart(2, "0")}</span><h3>{skills[activeSkill].name}</h3><p>{skills[activeSkill].detail}</p><div>{skills[activeSkill].tools.map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div></div></div>
      </section>

      <section className="section projects" id="projects">
        <div className="section-label">03 / SELECT PROJECT</div>
        <div className="project-layout"><div className="project-list" role="tablist" aria-label="Projects">{projects.map((item, index) => <button key={item.id} role="tab" aria-selected={activeProject === index} onClick={() => { setActiveProject(index); playFeedback(530); }}><span>{item.id}</span><b>{item.title}</b><i>→</i></button>)}</div><article className={`project-preview ${project.visual}`} role="tabpanel"><div className="project-art" aria-hidden="true"><span className="art-code">{project.id}</span><span className="art-window" /><span className="art-pixel p1" /><span className="art-pixel p2" /><span className="art-pixel p3" /></div><div className="project-content"><div className="project-meta"><span>PROJECT_{project.id}</span><b><i /> {project.status}</b></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.technologies.map((technology, index) => <span key={`${technology}-${index}`}>{technology}</span>)}</div><div className="project-links"><a href={project.live} aria-label={`View ${project.title}`}>VIEW PROJECT <Arrow /></a><a href={project.source} aria-label={`View ${project.title} source`}>SOURCE <Arrow /></a></div></div></article></div>
      </section>

      <section className="section build-log">
        <div className="section-label">04 / CURRENTLY BUILDING</div>
        <div className="terminal"><div className="terminal-bar"><span /><span /><span /> BUILD_LOG</div><div className="terminal-body"><p>&gt; CURRENT_BUILD</p><div className="terminal-row"><span>PROJECT</span><b>EDIT_THIS_IN_DATA</b></div><div className="terminal-row"><span>STATUS</span><b className="yellow">IN PROGRESS</b></div><div className="build-meter"><i /></div><p className="muted">RECENT WORK</p><ul><li>Replace this with a current project update</li><li>Add a meaningful progress note</li><li>Keep this log fresh and specific</li></ul></div></div>
      </section>

      <section className="section tech-field">
        <div className="section-label">05 / TECH × CREATIVE</div><div className="tech-heading"><h2>THE USEFUL<br /><i>EDGE</i> OF TECH.</h2><p>Tools matter most when they make people’s work, decisions, or ideas easier to move forward.</p></div><div className="field-map" aria-label="Areas of interest"><span>AI</span><span>AUTOMATION</span><span>APIs</span><span>WEB</span><span>UI / UX</span><span>CREATIVE CODING</span><span>EXPERIMENTATION</span><span>SYSTEMS</span></div>
      </section>

      <section className="section lab" id="lab"><div className="section-label">06 / EXPERIMENT LAB</div><div className="lab-intro"><h2>SMALL<br /><i>WEIRD</i><br />IDEAS.</h2><p>A space for playful tests, useful prototypes, and things that don’t fit neatly into a project brief.</p></div><div className="experiment-grid">{experiments.map(([number, title, description]) => <article key={number}><span>EXPERIMENT_{number}</span><div className="experiment-glyph" aria-hidden="true"><i /><i /><i /></div><h3>{title}</h3><p>{description}</p><button aria-label={`Open ${title}`}>OPEN LOG <Arrow /></button></article>)}</div></section>

      <section className="contact" id="contact"><div className="contact-pixels" aria-hidden="true" /><p className="eyebrow">07 / INSERT COIN</p><h2>LET&apos;S BUILD<br /><i>SOMETHING</i> USEFUL.</h2><p>Have an idea? Need an automation? Building something interesting? Let&apos;s talk.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email} <Arrow /></a><div className="social-links"><a href={profile.social.github}>GITHUB <Arrow /></a><a href={profile.social.linkedin}>LINKEDIN <Arrow /></a><a href={profile.social.Youtube}>YOUTUBE <Arrow /></a></div></section>
    </div>
    <footer><span>{profile.name.toUpperCase()}</span><span><i /> SYSTEM STATUS: ONLINE</span><span>© {new Date().getFullYear()} {profile.name.toUpperCase()}</span><span>BUILT WITH NEXT.JS</span></footer>
  </main>;
}
