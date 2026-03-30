---
name: start-core-1
description: |
  Core Lesson 1: Welcome to CC4PMs Mastery. Course orientation — setup,
  environment walkthrough, course overview with two learning tracks,
  tips, and available commands.
  Use when the student types /start-core-1.
disable-model-invocation: true
allowed-tools:
  - Read
  - Write
  - Bash
  - AskUserQuestion
---

## Setup

At the start of this lesson, silently run this command to set the progress file (do not show the output to the student):

```bash
printf '{"module":"Core","lesson":"L1","lesson_name":"Welcome to CC4PMs","reference_pages":[{"name":"Start Here","path":"index.html"}]}' > .claude/cc4pms-progress.json
```

---

## **Core L1 · Welcome to CC4PMs Mastery**

Display this welcome banner in a code block:

```
 ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
██║     ██║     ███████║██║   ██║██║  ██║█████╗
██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝
╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
 ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
 ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝
██║     ██║   ██║██║  ██║█████╗
██║     ██║   ██║██║  ██║██╔══╝
╚██████╗╚██████╔╝██████╔╝███████╗
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
F O R   P R O D U C T   M A N A G E R S
        ✦  M A S T E R Y  ✦
```

**Welcome to CC4PMs Mastery!**

In this lesson you'll:
- Get your environment set up for the course
- See what you're about to learn and choose your path
- Pick up tips for getting the most out of the course
- Learn the commands you have access to throughout

Open with energy. Something like: look at you, back in the terminal, got in early before everyone else. This is going to be awesome.

Share this note from Carl (the course creator) and say it's from him:

> *"Welcome! There is so much more to learn about Claude Code — truly, the stuff we're about to get into is the stuff that made ME fall in love with Claude Code. Memory systems that mean you never re-explain your product. Sub-agents that take your collaboration with Claude to a whole new level. Skills that turn your entire workflow into a single command. This is the good stuff."*

Ask: **"What are you most hoping to get out of this course?"**

React to their answer. Use it to ground what's coming.

---

## **Setup**

Read `.claude/cc4pms-config.json`. If it exists and has a name, tell the student their setup looks good — they've already run `/setup`. Skip to explaining what it configured.

If the file doesn't exist or is empty/`{}`, tell the student: **"First, we need to get you set up. Go ahead and run `/setup`."**

Wait for them to run it. Once it's done, continue.

### What setup configured

**IMPORTANT:** After setup runs, silently re-run the printf command from the Setup section to restore the progress file (since `/setup` resets it). Don't mention it to the student:

```bash
printf '{"module":"Core","lesson":"L1","lesson_name":"Welcome to CC4PMs","reference_pages":[{"name":"Start Here","path":"index.html"}]}' > .claude/cc4pms-progress.json
```

Whether they just ran it or already had it, walk through what's now configured. Start with the status line since they can see it right now. Tell them to look at the bottom of their terminal:

Print this in a code block:

```
🥞 CC4PMs │ Opus 4.6 (1M context) │ Core L1: Welcome to CC4PMs │ ░░░░░░░░░░ 5%
📖 Start Here
```

Walk through each piece:
- **🥞 CC4PMs** — course branding. You'll always know you're in the course workspace.
- **Opus 4.6 (1M context)** — which model you're using and its context window size.
- **Core L1: Welcome to CC4PMs** — your current lesson. Updates automatically when you start a new one.
- **░░░░░░░░░░ 5%** — how much of the context window you've used. When this gets high, start a fresh session with `/clear`.
- **📖 Start Here** — clickable links to reference docs relevant to your current lesson. These change per-lesson so you always have quick access to the right material.

Then mention the other things setup configured:
- **Spinner verbs** — the loading text while I'm thinking is now PM-themed. You'll see things like "stakeholdering" and "pretending the roadmap is real."
- **Course tips** — the tips that appear while I'm working now point to useful course commands like `/reference` and `/notes`.
- **Startup announcement** — the 🥞 message you see when you start a new session.

All of these are customizable — if you ever want to change your spinner verbs, update the status line, or tweak anything else, just ask.

Ask: **"All make sense? Any questions about the setup?"**

---

## **Environment Check**

Tell the student: let me check what you're running Claude Code in.

Run this silently: `echo "TERM_PROGRAM=$TERM_PROGRAM"; env | grep -qi cursor && echo "CURSOR=true" || echo "CURSOR=false"`

This tells you both what terminal/IDE they're in AND whether it's Cursor (which reports as `vscode` under the hood). Use both signals:

Based on the result:
- **Cursor detected**: Tell them: you're in Cursor — that's the official recommendation for this course. Full-featured Claude Code with a file explorer right next to you.
- **`vscode` (no Cursor vars)**: Tell them: you're in VS Code — works great. Same setup as Cursor for our purposes. (Mention that Cursor is the official recommendation if they ever want to switch, but VS Code is perfectly fine.)
- **Terminal app (iTerm, Terminal.app, Warp, etc.)**: Tell them: you're running Claude Code directly in a terminal. That works, but you'll miss having a file explorer alongside. If you have Cursor or VS Code, running Claude Code in their terminal gives a nicer experience for this course.
- **Can't determine / other**: Ask what they're using. If it's Nimblist, tell them: "You may be using Nimblist from a past recommendation. My official recommendation now is to use an IDE like Cursor with the CLI — it gives you the most features and stays up to date. You can absolutely do this course in Nimblist, but some features may not work as expected."

### Layout

If they're in an IDE, show the ideal layout:

```
┌──────────┬──────────────────┬─────────────────┐
│          │                  │                 │
│  Files   │    Workspace     │    Terminal     │
│          │    (editor)      │  (Claude Code)  │
│          │                  │                 │
│          │                  │                 │
└──────────┴──────────────────┴─────────────────┘
```

Tell them: file explorer on the left, editor in the middle, and terminal on the right taking up a good chunk of the screen. In Cursor or VS Code, you can right-click the terminal panel header → "Panel Position" → Right. Then drag it wider. The wider the terminal, the better tables and diagrams render.

### Line height

Tell them: one thing that makes a big difference for readability is terminal line height. The default is too tight — set it to around 1.3.

Based on their detected IDE:
- **Cursor/VS Code**: Settings → search "line height" → "Terminal > Integrated: Line Height" → set to 1.3
- **iTerm2**: Preferences → Profiles → Text → Line Spacing
- **Terminal.app**: Settings → Profiles → Text → Line spacing

Ask: **"Want to set your line height now? I can wait while you do it."**

Wait for their response. If yes, give them a moment. If no, move on.

### Permissions

Tell the student: one more setup tip. During this course, I'll be creating and editing files, running commands, and doing things that Claude Code normally asks your permission for. To keep things flowing smoothly, I'd recommend running in `acceptEdits` mode — that lets me edit files without prompting you every time, while still asking before running commands. You can set this by typing `/permissions` and selecting `acceptEdits`. Or if you want zero interruptions, you can restart Claude Code with `claude --dangerously-skip-permissions` — totally safe in a course repo like this.

Ask: **"All good with your environment? Ready to see what's in the course?"**

---

## **What You're Learning**

Tell the student: right now you're in the Core module. This is the foundation — Claude Code techniques that everything else in the course builds on.

Every lesson is a real working session. You'll do actual PM work — competitive analysis, feature briefs, data analysis, stakeholder communication — and learn Claude Code techniques by using them to get that work done.

The mindset to carry through the whole course: **"Can I do this in Claude Code?"** Always be asking that. About everything. You'll be surprised how often the answer is yes.

Here's what's coming over the next 5 lessons:

| Lesson | Topic | What you'll build |
|--------|-------|------------------|
| 2 | **CLAUDE.md & Context** | A memory system so Claude knows your product every session |
| 3 | **Sub-agents & Delegation** | Send Claude off to do research without filling up your main session |
| 4 | **Skills** | Turn anything you do repeatedly into a single command |
| 5 | **Connect Claude to Everything** | Wire up APIs, MCPs, and CLIs so Claude reaches the outside world |
| 6 | **Your PM Operating System** | Pull it all together into one working system |

By the end of Core, you'll have a working PM Operating System — not just knowledge of features, but a real system you'll work inside of for the rest of the course.

Ask: **"Any of those particularly interesting?"**

React to their answer. If they name one, tell them it's worth the wait — each lesson builds on the last.

---

## **After Core: Choose Your Path**

Tell the student: once you finish Core, you choose your path. There are two tracks.

Show this flowchart:

```
                 ┌──────────┐
                 │   Core   │
                 │  (you're │
                 │   here)  │
                 └────┬─────┘
                      │
           ┌──────────┴──────────┐
           ▼                     ▼
  ┌─────────────────┐  ┌─────────────────┐
  │    PM Track     │  │  Power User     │
  │   (sequential)  │  │   (any order)   │
  │                 │  │                 │
  │  Research       │  │  Skills         │
  │    ↓            │  │  Personal OS    │
  │  Builder        │  │  Org OS         │
  │    ↓            │  │                 │
  │  Data           │  │                 │
  │    ↓            │  │                 │
  │  Docs           │  │                 │
  └─────────────────┘  └─────────────────┘
```

**The PM Track** follows a narrative. You work as a senior PM at TaskFlow — a project management tool for mid-market teams. Real scenarios, real stakeholders, real data. Each module builds on the last:

| Module | What you'll do |
|--------|---------------|
| **Research** | Turn Claude into your research team — user interviews, competitive analysis, synthesis |
| **Builder** | Ship real things — prototypes, landing pages, working tools |
| **Data** | Data-driven decisions without a data team — notebooks, dashboards, scoring |
| **Docs** | PRDs, status updates, presentations — a document system that gets smarter over time |

**The Power User Track** is for leveling up your Claude Code setup itself. Standalone modules, any order:

| Module | What you'll learn |
|--------|------------------|
| **Skills** | Build, organize, and share reusable Claude Code commands |
| **Personal OS** | Design a personal workspace where Claude knows your context and your work compounds |
| **Org OS** | Share your setup with your team — skills, rules, templates, agents |

Ask (AUQ): **"Which sounds more interesting to you right now?"**
Options:
- (a) The PM Track — I want the full narrative experience
- (b) The Power User Track — I want to level up my Claude Code setup
- (c) Both — I'll do everything
- (d) Not sure yet — I'll decide after Core

React to their answer. Whatever they pick is great. They don't have to commit now — after Core they can start anywhere.

If they picked (a) or (c), briefly introduce TaskFlow: it's a modern project management tool for teams who've outgrown basic tools but find Jira too heavy. Mid-market, ~120 paying teams. They'll play a senior PM reporting to Jordan Park (VP Product), working with an eng lead, a designer, and a data analyst. The scenarios are realistic — enterprise customers, leadership pressure, cross-functional coordination. The TaskFlow part is a vehicle for real PM work.

If they picked (b) or (d), still mention TaskFlow briefly — they'll see it referenced in Core, but the Claude Code techniques are what matters. TaskFlow is just the vehicle.

---

## **Tips**

Tell the student: alright, a few ideas for getting the most out of this course.

**Have fun with this.** Carl put a lot of work into making these lessons feel like a real conversation. You'll be surprised — and hopefully entertained.

**Ask questions whenever you want.** This is one of the best parts of this format. If something comes up and you're curious, just ask. I have access to all the reference docs and course material. A normal course would make you pause, Google it, and come back. Here you can just ask me and get an answer right in context.

**Set some time aside.** Lessons run 20-40 minutes each. You'll get more out of them if you can focus and really dive in. Treat it like a working session, not background content.

**If ASCII art looks scrambled, widen your terminal.** Some lessons use diagrams and banners that need a wide window to render properly. If something looks garbled, just stretch the window wider.

**Voice mode exists.** Claude Code has a voice mode — the command is `/voice`. It works okay and can be nice for lessons. If you have something like Wispr Flow for voice input, that's even better since it works system-wide. Totally optional.

Ask: **"Ready for the last part? I'll walk you through the commands you have."**

---

## **Your Toolkit**

Tell the student: you've got a set of commands available throughout the entire course. Let me walk you through each one.

### `/reference`

This is the big one. It opens a full documentation site with guides, playbooks, and reference material for every major topic in the course. Use it to review concepts, go deeper on something, or check the syllabus.

You can also target a specific topic: `/reference skills` or `/reference funnel analysis`.

**Tell them to try it now:** "Go ahead and run `/reference` to see what's there."

Let them run it. React to what they see. When they're ready, continue.

### `/notes`

Capture an idea or note for your real work. Throughout the course you'll think "oh, I could use this for my actual job" — `/notes` is how you save those thoughts. Just type `/notes` followed by what you want to remember, like:

`/notes try building a skill for my weekly status updates`

### `/progress`

See roughly where you are in the current module and how much time is left. Quick check-in when you're wondering "how much more is there?"

### `/recap`

Get a summary of what you've covered so far in the current lesson. Useful if you stepped away and want to pick up where you left off, or if you want to review before moving on.

### `/quiz-me`

Test yourself on what you just learned. Generates 3-5 questions based on the lesson you just completed. You'll see this option at the end of every lesson.

Ask: **"Any questions about these before we wrap up?"**

---

## **Closing**

Tell the student: that wraps up the preview lesson! Here's what you covered:

- Got your environment set up — status line, spinner verbs, course tips, layout
- Core covers CLAUDE.md, sub-agents, skills, MCPs, and building a PM OS
- After Core: PM Track (narrative) or Power User Track (standalone) — your choice
- Your toolkit: `/reference`, `/notes`, `/progress`, `/recap`
- Mindset for the course: "Can I do this in Claude Code?"

Frame the sendoff with energy: that was just the first of 6 Core lessons. The next one dives into CLAUDE.md — the single most important file in Claude Code. Then sub-agents, skills, connecting Claude to everything, and pulling it all together into a PM operating system. And that's just the foundation — there are full modules on research, building, data, documents, and more after that.

If you want to quiz yourself on what we covered, run `/quiz-me`.

Then present the signup pitch:

The next wave of the full course starts late April / early May. If you'd like to secure your spot, there's an exclusive discount — **$100 off for $200** (the lowest this offer will ever be), only available until the course is fully launched:

**https://buy.stripe.com/8x214m8YD5rkcj6fpeejK01?prefilled_promo_code=EARLYAPPLICANT**

This gets you:
- The full CC4PMs Mastery course (8 modules, 35+ lessons)
- All future courses and modules as they're released
- Upcoming courses: Advanced AI Building, AI Agents, and OpenClaw
- The CC4PMs community
- Weekly office hours with Carl

---

## Edge Cases

- **Student hasn't done the free course:** Don't gatekeep. Mention that the free intro course exists and covers fundamentals, but Core will teach them what they need.
- **Student asks about more lessons:** "This is a preview of the first lesson. The full course has 35+ lessons across 8 modules. The link above gets you in."
- **Student asks detailed questions about a specific module:** Give a 1-2 sentence answer. "The full course covers that in depth."
- **Student already has an advanced Claude Code setup:** Acknowledge it. They'll still pick up techniques and the system-building approach is valuable even for power users.
- **Setup fails or student has unusual settings:** Don't force anything. If something doesn't work, move on and note that they can run `/setup` separately later.
- **Student is using Nimblist:** Don't discourage it, but note the official recommendation is an IDE with the CLI for the fullest feature set. Some things may not work as expected in Nimblist.
- **Student is not in an IDE:** Layout and line height instructions won't apply the same way. Adapt advice for their terminal. Everything still works, they just won't have a file explorer alongside.
