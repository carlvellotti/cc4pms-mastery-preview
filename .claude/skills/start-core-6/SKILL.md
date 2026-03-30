---
name: start-core-6
description: |
  Core Lesson 6: Your Personal OS. Capstone lesson — reveals that the student
  has been building an OS throughout Core, introduces the three-layer framework
  (context/work/automation) and five-level progression, helps the student choose
  their next track, and celebrates completing Module One.
  Use when the student types /start-core-6.
disable-model-invocation: true
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - AskUserQuestion
---

## Setup

At the start of this lesson, silently run this command to set the progress file (do not show the output to the student):

```bash
printf '{"module":"Core","lesson":"L6","lesson_name":"Your Personal OS","reference_pages":[{"name":"Your PM OS","path":"playbooks/your-pm-os.html"}]}' > .claude/cc4pms-progress.json
```

You are teaching Core Lesson 6: Your Personal OS.


**How to read this script:** Follow it section by section. First-level bullets are section context (not spoken). Second-level bullets are what you say, do, or wait for. Prefixes:
- **No prefix** — dialogue you speak to the student
- **ACTION:** — something you do (display art, read files, spawn agent)
- **STOP:** — pause and wait for student input before continuing
- **USER:** — expected student response

**Rules:**
- "AUQ" in this script means use the AskUserQuestion tool (the multiple-choice tool). Do not just ask in plain text.
- Do not copy, create, or deliver any files unless a specific ACTION line in the script tells you to. Follow the script sequentially.
- At every STOP, wait for the student. Never skip or combine sections.
- When globbing the workspace, show what's actually there. Don't fake or assume files exist.

---

### The frame

- Opening — the personal OS question
	- ACTION: Display lesson header:
	  ```
	  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

	    L6 · YOUR PERSONAL OS

	    ┌───────────┐   ┌───────────┐   ┌───────────┐
	    │  CONTEXT  │ → │   WORK    │ → │ AUTOMATE  │
	    └───────────┘   └───────────┘   └───────────┘
	     CLAUDE.md        Briefs          Skills
	     Rules            Research        MCPs
	     Docs             Analysis        Hooks

	    You've been building one this whole time.

	  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	  ```
	- The last big question people have once they start getting the hang of Claude Code is: how do I actually build my personal OS? You see it everywhere — people posting their setups on Twitter, debating folder structures, wondering how to organize everything into a system that compounds instead of just a pile of conversations.
	- STOP: Have you tried building a personal OS yet, or is that something you've been wondering about?
	- USER: [Responds]

### You already started one

- The reveal — show what they built across Core
	- React naturally to their answer. Then:
	- Think about it like this — you don't actually need a lot of structure to start an OS. And you've already been building one. Let me show you.
	- ACTION: Use Glob to scan the workspace for files the student created or modified during Core. Look for: CLAUDE.md, .claude/rules/ files, competitive analysis outputs, feature briefs, skills (like pitch-feature), .mcp.json, claude-preview.html, and any other artifacts from the lessons. Show them a quick summary of what's actually there — real files, not a theoretical list.
	- Connect what they built back to where it came from:
		- **L2**: CLAUDE.md, scoping rules, project context — so I know your product without you re-explaining it every session
		- **L3**: Competitive research with sub-agents, a VP review through builder-validator — real analysis output
		- **L4**: Built `/pitch-feature` from scratch, toured `/humanizer` and `/meeting-cost` — workflows that run in one command
		- **L5**: Connected to APIs, MCPs, and CLIs — I can reach the outside world now
	- All of that? That's an OS. Not a finished one, but it's already working. Context I can read, work you've produced, automation that makes things repeatable.
	- STOP: Looking at everything you made — do you see a pattern in how each lesson worked?
	- USER: [Responds]

### The simple framework

- Name the framework — context, work, automation
	- React to their answer. Then:
	- Every lesson followed the same three-beat rhythm, even though the topics were completely different.
	- ACTION: Display this diagram:
	  ```
	  ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
	  │    CONTEXT    │ ──→ │     WORK      │ ──→ │   AUTOMATE    │
	  │               │     │               │     │               │
	  │ Set up what   │     │ Do the real   │     │ Make it       │
	  │ Claude needs  │     │ thing         │     │ repeatable    │
	  │ to know       │     │               │     │               │
	  └───────────────┘     └───────────────┘     └───────────────┘
	  ```
	- **Context** is what I need to know — CLAUDE.md, reference files, project docs. **Work** is the actual output — briefs, research, analysis. **Automation** is what makes it repeatable — skills, rules, MCPs, hooks.
	- Building an OS is just going through that process at different levels of maturity and keeping things organized. That's it. It's a pretty simple framework.
	- ACTION: Display the progression:
	  ```
	  Level 1: Manual        "Summarize this meeting"
	  Level 2: Documented    CLAUDE.md knows your format
	  Level 3: Skilled       /meeting-prep runs it
	  Level 4: Connected     Pulls from calendar MCP
	  Level 5: Automated     Runs before every meeting

	  ↑ Move things up when the pain justifies it.
	    Most things live at 1-2 forever. That's fine.
	  ```
	- You don't need to get everything to level 5. Most things sit at level 1 or 2 and that's completely fine. You start by doing real work, notice what you keep repeating, and formalize the parts worth keeping. The system grows from use, not from planning.
	- Look at what you built in Core. Your CLAUDE.md is level 2 context. Your `/pitch-feature` skill is level 3 automation. The Reddit MCP is a level 4 connection. Different parts, different maturity levels. That's how every OS works — even the ones from people who've been at this for months.
	- The key thing to remember is that your own OS emerges **through the work**. Just make sure you have a structure for where context can live, where the work happens, and automate things with skills when they are painful.
	- Really, just don't overthink it!
	- That said, if you DO want to go deeper on this, the entire Personal OS module is on this topic and has some working examples.
	- STOP: Does that framework does that make sense? Context, work, automation — you build your OS as you go?
	- USER: [Responds]

### Recap

- What Core covered
	- React to their answer, then:
	- Let's look at what you covered across all of Core:
		- **L1**: What Claude Code actually is and how it thinks
		- **L2**: CLAUDE.md, context scoping, rules — how I remember who you are
		- **L3**: Sub-agents and delegation — how to get work done without burning your context
		- **L4**: Skills — turning workflows into one-command tools
		- **L5**: APIs, MCPs, and CLIs — connecting me to the outside world
		- **L6**: The framework that ties it all together — context, work, automation
	- That's the foundation. Everything from here builds on it.

### Module one complete

- The celebration — earned, not premature
	- ACTION: Display the celebration banner:
	  ```
	  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

	                  *       .    *    .       *
	            .         *          .      *        .
	        *       .  *      .         *       .
	           .         *       .          *
	                *         .       *

	       ███╗   ███╗ ██████╗ ██████╗ ██╗   ██╗██╗     ███████╗
	       ████╗ ████║██╔═══██╗██╔══██╗██║   ██║██║     ██╔════╝
	       ██╔████╔██║██║   ██║██║  ██║██║   ██║██║     █████╗
	       ██║╚██╔╝██║██║   ██║██║  ██║██║   ██║██║     ██╔══╝
	       ██║ ╚═╝ ██║╚██████╔╝██████╔╝╚██████╔╝███████╗███████╗
	       ╚═╝     ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
	                     ██████╗ ███╗   ██╗███████╗
	                    ██╔═══██╗████╗  ██║██╔════╝
	                    ██║   ██║██╔██╗ ██║█████╗
	                    ██║   ██║██║╚██╗██║██╔══╝
	                    ╚██████╔╝██║ ╚████║███████╗
	                     ╚═════╝ ╚═╝  ╚═══╝╚══════╝
	                          COMPLETE.

	           .       *         .       *    .
	        *      .       *  .      .       *
	           .      *         .  *      .
	                *       .         *

	  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	  ```
	- You just finished the hardest module — the one that builds the foundation for everything else. Whatever you do next is going to feel faster because the fundamentals are solid.

## **What's Next**

	- The reference docs for this lesson cover the PM OS framework — point them to the Your PM OS page from the progress JSON's reference_pages
	- If you want to quiz yourself on what we covered, run `/quiz-me`
	- ---
	- That's the end of the Core module! The full course continues with two tracks:
	- **The PM Track** — Research, Builder, Data, Docs. Sequential, narrative-driven, real PM work.
	- **The Power User Track** — Skills, Personal OS, Workplace OS. Level up your Claude Code setup.
	- The next wave starts late April / early May. Secure your spot — **$100 off for $200** (the lowest this offer will ever be), only available until the course is fully launched:
	- **https://buy.stripe.com/8x214m8YD5rkcj6fpeejK01?prefilled_promo_code=EARLYAPPLICANT**
	- This gets you:
		- The full CC4PMs Mastery course (8 modules, 35+ lessons)
		- All future courses and modules as they're released
		- Upcoming courses: Advanced AI Building, AI Agents, and OpenClaw
		- The CC4PMs community
		- Weekly office hours with Carl

---

## Edge Cases

- **Student's workspace is missing files from earlier lessons:** Don't panic. Show what IS there and note anything missing. The framework discussion works regardless of which specific files exist.
- **Student wants to do both tracks:** Encourage it. Recommend PM Track first if they want structure, Power User first if they want immediate setup payoff. Either order works since both build on Core.
- **Student asks about the Personal OS module in detail:** Brief answer: "Four lessons. You'll see how people organize their entire business in Claude Code, learn the architecture, build your own from scratch, and learn how to maintain it. It goes much deeper on the framework we just covered."
- **Student is overwhelmed:** "Ignore the tracks for now. Just pick one module and start. You can always switch."
- **Student wants to skip ahead in the PM Track:** Let them, but note that Research → Builder → Data → Docs is the designed sequence and each builds on the last.
- **Student already has a personal OS:** Acknowledge it. Ask what it looks like. Connect it to the three layers — their OS probably maps to the framework even if they didn't design it that way. The Personal OS module would help them refine it.
- **Student asks how this compares to the Personal OS module:** "This lesson gives you the 30-second framework. The Personal OS module gives you the full architecture — real examples from people who live in Claude Code all day, the design decisions behind their setups, and a guided build of your own."
