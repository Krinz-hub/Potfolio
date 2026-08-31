# MASTER PROMPT — DEV KANSAKAR PORTFOLIO

You are an expert frontend engineer, creative developer, UI/UX designer, motion designer, and digital art director.

Build a **production-quality personal portfolio website for Dev Kansakar** using **Next.js + TypeScript**.

The website should feel like a **playable digital portfolio / interactive personal game world**, combining:

- Retro arcade games
- Pixel art
- Bold typography
- Modern editorial design
- AI / automation / API culture
- Developer tooling
- Playful interactions
- Strong visual hierarchy
- Professional UX

The result must NOT look like a generic developer portfolio, SaaS landing page, or AI-generated template.

The design should feel **original, intentional, memorable, and highly polished**.

---

# 1. CORE CONCEPT

Create the feeling that the visitor is exploring **Dev's personal digital world**.

Think:

> "A portfolio that feels like a small game, but is still a serious professional website."

The visitor should naturally move through sections like levels.

Possible conceptual structure:

```text
START
 ↓
PLAYER / DEV
 ↓
STATS
 ↓
PROJECTS
 ↓
TECH + CREATIVE
 ↓
CURRENT BUILDS
 ↓
EXPERIMENTS
 ↓
CONTACT
```

Do NOT literally make the entire website a complicated game.

The game concept should be a **visual and interaction layer**, not an obstacle to navigation.

The website must remain:

- Fast
- Accessible
- Responsive
- Easy to navigate
- Professional
- SEO-friendly
- Keyboard accessible

---

# 2. TECH STACK

Use:

- Next.js
- TypeScript
- App Router
- Tailwind CSS
- Motion / Framer Motion for animations
- Lucide icons where appropriate
- CSS animations where possible
- MDX or structured local data for projects/content
- Modern responsive CSS
- Semantic HTML

Avoid unnecessary dependencies.

Do NOT add a backend unless it is genuinely required.

The portfolio should initially be primarily static/client-rendered where appropriate.

---

# 3. DESIGN DIRECTION

## Visual personality

Combine:

### Retro

- Pixel-inspired UI
- Arcade HUD elements
- Game-style status indicators
- CRT-inspired details used sparingly
- Pixel borders
- Chunky UI components
- 8-bit/16-bit inspired motifs
- Score counters
- XP/progress indicators
- Level labels
- Tiny system messages

WITH:

### Modern

- Large whitespace
- Strong typography
- Editorial layouts
- Clean grids
- Sophisticated spacing
- Smooth motion
- Modern responsive behavior
- Strong accessibility
- Minimal clutter

The website should feel like:

**Nintendo-era visual language × modern creative developer portfolio × digital laboratory.**

Do NOT copy any specific game, brand, or existing portfolio.

Create an original visual identity.

---

# 4. COLOR SYSTEM

Use a limited but bold palette.

Base:

- Deep near-black / dark navy background
- Warm off-white text

Accent colors can include:

- Electric blue
- Arcade green
- Bright yellow
- Pixel orange
- Magenta

Do not use every color everywhere.

Use color strategically for:

- Interactive states
- Tags
- Project categories
- Buttons
- Status indicators
- Important headings
- Game HUD elements

Maintain strong contrast.

Create the feeling of an arcade machine without sacrificing readability.

---

# 5. TYPOGRAPHY

Typography is extremely important.

Use a combination of:

### Display

A bold pixel-inspired or retro display font.

### Editorial

A highly readable modern sans-serif.

### Optional accent

A serif or distinctive display font for occasional emphasis.

The typography should create contrast.

Example:

```text
SYSTEM ONLINE

DEV KANSAKAR

AI × AUTOMATION × APIs
```

Large display typography should dominate the hero.

Do not use pixel fonts for everything.

Pixel typography should be used selectively so the site remains professional.

---

# 6. NAVIGATION

Create a compact sticky navigation.

Desktop:

```text
[DK]   ABOUT   PROJECTS   LAB   STACK   CONTACT
```

Include a small status indicator:

```text
● ONLINE
```

or

```text
SYSTEM STATUS: ONLINE
```

Mobile navigation should be extremely simple.

Use a hamburger/menu interaction.

Navigation should scroll smoothly to sections.

Add active-section detection.

Do NOT create complicated navigation.

---

# 7. HERO / START SCREEN

The hero should immediately communicate who Dev is.

Concept:

```text
┌─────────────────────────────────────────────┐

        PLAYER 01

        DEV KANSAKAR

        I BUILD THINGS
        THAT AUTOMATE
        THE BORING STUFF.

        AI / AUTOMATION / APIs

        [ ENTER PORTFOLIO ]

└─────────────────────────────────────────────┘
```

Include subtle game HUD elements:

```text
LVL 24
XP ███████░░░
STATUS ONLINE
LOCATION NEPAL
```

Do not invent personal information.

Only display facts that are actually known.

Hero animation:

- Text reveals character-by-character or line-by-line
- Subtle pixel cursor
- Small system boot sequence
- UI elements slide/fade into place
- Background contains subtle animated pixels/grid/noise

Keep animation fast and polished.

Do NOT make the user wait through an intro animation.

Provide a skip/reduce-motion path.

---

# 8. INTERACTIVE HERO ELEMENT

Add one memorable interactive element.

Example:

A small pixel avatar / cursor / companion that reacts to:

- Mouse movement
- Cursor position
- Scroll
- Clicking interactive elements

Keep it subtle.

Do not make it distracting.

On mobile, simplify or disable expensive interactions.

---

# 9. ABOUT / "PLAYER PROFILE"

Create a section that feels like a character profile screen.

Heading:

```text
PLAYER PROFILE
```

Content should introduce Dev in a natural professional voice.

Possible structure:

```text
DEV KANSAKAR

Creative developer focused on:

AI
Automation
APIs
Web experiences
Useful digital systems
```

Include a short personal statement.

Do not exaggerate skills.

The copy should feel human rather than corporate.

Add stats/cards such as:

```text
FOCUS
AI + AUTOMATION

BUILD STYLE
EXPERIMENTAL

INTEREST
USEFUL SYSTEMS

CURRENT MODE
BUILDING
```

These should be editable data rather than hardcoded throughout the UI.

---

# 10. SKILLS / STATS

Create a game-style stats panel.

Example:

```text
SKILL TREE

AI                 █████████░
AUTOMATION         █████████░
APIs               █████████░
WEB DEVELOPMENT    ████████░
SYSTEM DESIGN      ███████░░░
CREATIVE TECH      ████████░
```

IMPORTANT:

Do not present arbitrary skill percentages as objective facts.

Instead, use labels such as:

```text
CORE
STRONG
ACTIVE
EXPLORING
```

or create a visual skill taxonomy.

Make each category interactive.

Clicking a skill could reveal:

- Technologies
- Projects where it was used
- Short description

---

# 11. PROJECTS — MAIN FEATURE

Projects should be the strongest section of the site.

Heading:

```text
SELECT PROJECT
```

Instead of a boring grid of cards, create an interactive project selection system.

Desktop:

Left:

```text
01  NEW PASHUPATI SUPPLIERS
02  AI AUTOMATION SYSTEM
03  API EXPERIMENT
04  ...
```

Right:

Large dynamic project preview.

When selecting a project:

- Preview changes
- Image/video changes
- Description changes
- Technology tags change
- Project status changes
- Links appear
- Small animation plays

Example:

```text
PROJECT 01

NEW PASHUPATI SUPPLIERS

A modern commerce website with
custom product/content management,
Cloudinary media handling and
MongoDB-backed data.

STATUS
● LIVE

STACK
Next.js
MongoDB
Cloudinary
Cloudflare

[ VIEW PROJECT ]
[ SOURCE ]
```

Use real project information when available.

Do not fabricate projects.

---

# 12. PROJECT VISUALIZATION

Project cards should feel like game cartridges / game selection screens.

Possible visual treatment:

```text
┌───────────────────────────┐
│ PROJECT_01                │
│                           │
│       [PREVIEW]           │
│                           │
│ AI / WEB / AUTOMATION     │
│                           │
│ ███████████████░░         │
└───────────────────────────┘
```

Use hover interactions:

- Pixel border activates
- Project image subtly zooms
- Status indicator animates
- Metadata appears
- Cursor changes

Do not overdo effects.

---

# 13. CURRENT WORK / BUILD LOG

Create a section called:

```text
CURRENTLY BUILDING
```

This should communicate what Dev is actively working on.

Use a terminal/build-log aesthetic.

Example:

```text
> CURRENT_BUILD

PROJECT: XXXXX
STATUS: IN PROGRESS

██████████████░░░░

RECENT WORK

→ API integration
→ UI refinement
→ Automation pipeline
→ Performance optimization
```

Make it easy to update.

Store this information in structured data.

---

# 14. TECH + CREATIVE FIELD

Create a section that shows the intersection of technology and creativity.

Heading:

```text
TECH × CREATIVE
```

Categories:

```text
AI
AUTOMATION
APIs
WEB
UI / UX
CREATIVE CODING
EXPERIMENTATION
SYSTEMS
```

Instead of simple logo walls, make these interactive.

Example:

Click:

```text
AUTOMATION
```

and display:

```text
I like turning repetitive workflows
into systems that run themselves.
```

Then show relevant projects/tools.

---

# 15. EXPERIMENT LAB

Create a "LAB" section.

This is where experimental things live.

Examples:

```text
EXPERIMENT 001
AI TOOL

EXPERIMENT 002
API VISUALIZER

EXPERIMENT 003
AUTOMATION

EXPERIMENT 004
INTERACTIVE UI
```

These can be small interactive demos.

The LAB should communicate:

> "I don't only build client/project work. I experiment."

---

# 16. GAMIFICATION

Use gamification carefully.

Possible elements:

### XP

Scrolling through sections can increment a subtle progress indicator.

### Achievement badges

Examples:

```text
ACHIEVEMENT UNLOCKED

FIRST VISIT
PROJECT EXPLORER
LAB RAT
SYSTEM COMPLETE
```

Do not make achievements annoying.

### Progress

A small vertical or horizontal progress indicator can show:

```text
01 / 06
```

or:

```text
PORTFOLIO XP
██████████░░
```

These should enhance exploration rather than become the purpose of the website.

---

# 17. AUDIO

Add optional audio feedback.

IMPORTANT:

Never autoplay sound.

Provide a visible audio toggle:

```text
♪ SOUND ON
```

Default:

```text
SOUND OFF
```

When enabled, subtle sounds may play for:

- Button hover
- Button click
- Section transition
- Achievement unlocked
- Project selection

Sounds should be extremely subtle.

Provide:

```text
SOUND: ON / OFF
```

Persist the preference locally.

Respect browser autoplay restrictions.

Respect `prefers-reduced-motion`.

---

# 18. MICROINTERACTIONS

Use polished microinteractions:

Buttons:

- Hover
- Press
- Slight pixel displacement

Cards:

- Hover glow
- Border animation
- Small movement

Navigation:

- Active section indicator

Project selector:

- Selection animation

Links:

- Pixel arrow animation

Cursor:

- Optional custom cursor on desktop

Do NOT use excessive parallax.

Do NOT make every element move.

---

# 19. CONTACT

Create a strong final section.

Heading:

```text
INSERT COIN
```

or

```text
LET'S BUILD SOMETHING
```

Then:

```text
Have an idea?
Need an automation?
Building something interesting?

Let's talk.
```

Include:

- Email
- GitHub
- LinkedIn
- Other relevant social/profile links

Do not invent URLs.

Use placeholders where information is missing.

Example:

```text
[ EMAIL ]
[ GITHUB ]
[ LINKEDIN ]
```

---

# 20. FOOTER

Create a minimal retro footer.

Example:

```text
DEV KANSAKAR

SYSTEM STATUS: ONLINE

© 2026 DEV KANSAKAR

BUILT WITH NEXT.JS
```

Add a tiny pixel animation.

Keep it simple.

---

# 21. RESPONSIVE DESIGN

Desktop:

- Large editorial layouts
- Project split-screen interactions
- HUD elements
- More animations

Tablet:

- Simplify layouts
- Reduce decorative elements

Mobile:

- Prioritize readability
- Single-column layouts
- Touch-friendly buttons
- Simplified HUD
- Disable heavy cursor effects
- Simplify project interactions

The mobile website must feel intentionally designed, NOT like a desktop site squeezed onto a phone.

---

# 22. ACCESSIBILITY

Must include:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper contrast
- ARIA labels where required
- Reduced-motion support
- Audio toggle
- No flashing effects
- Buttons must actually be buttons
- Links must actually be links

Never sacrifice accessibility for aesthetics.

---

# 23. PERFORMANCE

Optimize heavily.

Requirements:

- Fast initial load
- Optimized images
- Lazy loading
- Avoid unnecessary JavaScript
- Avoid huge animation libraries where CSS is enough
- Avoid layout shifts
- Use Next.js image optimization
- Proper font loading
- Code splitting where useful

Target excellent Lighthouse scores.

---

# 24. SEO

Implement:

- Metadata
- Open Graph
- Twitter/X metadata
- Semantic headings
- Descriptive page title
- Description
- Favicon
- Sitemap
- robots.txt
- Structured data where appropriate

Suggested title:

```text
Dev Kansakar — AI, Automation & Creative Technology
```

Create a strong description.

---

# 25. CODE ARCHITECTURE

Keep the project clean.

Suggested structure:

```text
app/
├── layout.tsx
├── page.tsx
├── globals.css
└── ...

components/
├── navigation/
├── hero/
├── about/
├── stats/
├── projects/
├── lab/
├── tech/
├── contact/
├── footer/
└── ui/

data/
├── projects.ts
├── skills.ts
├── experiments.ts
└── profile.ts

lib/
├── utils.ts
└── ...

public/
├── images/
├── sounds/
└── ...
```

Create reusable components.

Do not put the entire website into one giant component.

---

# 26. CONTENT ARCHITECTURE

Make project/content data easy to update.

Example:

```ts
{
  id: "01",
  title: "Project Name",
  description: "...",
  category: ["AI", "WEB"],
  technologies: ["Next.js", "TypeScript"],
  status: "LIVE",
  image: "...",
  links: {
    live: "...",
    source: "..."
  }
}
```

This should allow adding a project without modifying the project UI component.

---

# 27. IMPORTANT DESIGN RULE

Do NOT make this website look like:

- Generic Vercel portfolio
- Generic black-and-white developer site
- Generic glassmorphism
- Generic cyberpunk website
- Generic AI portfolio
- Generic Tailwind template
- Dribbble clone
- Excessive neon
- Excessive gradients
- Excessive rounded cards

The visual identity should be recognizable as:

**Dev Kansakar's digital world.**

---

# 28. ORIGINALITY

Before implementing, establish a small design system.

Define:

- Color tokens
- Typography scale
- Spacing
- Border styles
- Pixel treatment
- Animation timing
- Button styles
- Card styles
- HUD elements
- Icon treatment

Create 3–5 signature visual motifs that repeat throughout the site.

For example:

```text
PIXEL CORNERS
HUD LABELS
STATUS DOTS
ARCADE BORDERS
MONOSPACE SYSTEM TEXT
```

Do not add random decorative elements.

Everything should belong to the same visual language.

---

# 29. UX PRINCIPLE

The website should feel:

```text
80% professional portfolio
20% game
```

NOT:

```text
20% portfolio
80% game
```

Visitors should immediately understand:

1. Who Dev is
2. What Dev does
3. What Dev has built
4. What Dev is currently building
5. How to contact Dev

The experimental/game elements should make that experience memorable, not confusing.

---

# 30. IMPLEMENTATION PROCESS

Before coding:

### STEP 1
Inspect the existing repository.

Determine:

- Existing framework
- Existing dependencies
- Existing styling
- Existing assets
- Existing routes
- Existing configuration

Do not destroy existing useful work.

### STEP 2
Create the design system.

### STEP 3
Create the page architecture.

### STEP 4
Build the hero.

### STEP 5
Build navigation.

### STEP 6
Build profile/about.

### STEP 7
Build skills/stats.

### STEP 8
Build interactive projects.

### STEP 9
Build current work.

### STEP 10
Build Tech × Creative.

### STEP 11
Build Lab.

### STEP 12
Build Contact.

### STEP 13
Build Footer.

### STEP 14
Add motion and sound.

### STEP 15
Optimize mobile.

### STEP 16
Audit accessibility.

### STEP 17
Audit SEO.

### STEP 18
Audit performance.

---

# 31. QUALITY CONTROL

After implementation, inspect the website as a senior designer and engineer.

Check:

### Visual

- Does it look unique?
- Is the hierarchy clear?
- Are colors controlled?
- Is typography strong?
- Are sections visually connected?
- Are animations tasteful?

### UX

- Can someone understand Dev within 5 seconds?
- Can someone reach projects immediately?
- Is navigation obvious?
- Is contact easy to find?
- Does mobile feel intentional?

### Technical

- TypeScript errors
- Console errors
- Broken links
- Broken images
- Hydration issues
- Accessibility issues
- Performance issues
- Responsive issues

Fix all issues you find.

---

# 32. FINAL EXPERIENCE

The visitor should leave thinking:

> "That was actually fun to explore."

but also:

> "This person clearly knows how to build things."

The website should communicate:

**Developer + Builder + Experimenter + Creative Technologist**

rather than simply:

**"Frontend Developer."**

---

# START NOW

First inspect the existing project.

Then propose the final information architecture and design system.

After that, implement the website section-by-section.

Do not stop at a wireframe.

Build the actual production-ready Next.js website.

Use realistic placeholder content only where actual information is missing, and clearly structure those values so they can easily be replaced later.

Prioritize:

**Originality → UX → Visual quality → Performance → Accessibility → Maintainability.**
