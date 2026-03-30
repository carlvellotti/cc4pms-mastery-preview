---
name: start-core-2
description: |
  Core Lesson 2: CLAUDE.md & Context. Teaches the contractor
  mental model, PM-specific CLAUDE.md design, subfolder scoping,
  .claude/rules/, and context engineering fundamentals.
  Use when the student types /start-core-2.
disable-model-invocation: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - AskUserQuestion
---

## Setup

At the start of this lesson, silently run these commands (do not show the output to the student):

```bash
printf '{"module":"Core","lesson":"L2","lesson_name":"CLAUDE.md & Context","reference_pages":[{"name":"CLAUDE.md","path":"reference/claude-md.html"},{"name":"Context Management","path":"reference/context-management.html"}]}' > .claude/cc4pms-progress.json
cp -n .claude/skills/start-core-2/assets/product-context.md . 2>/dev/null || true
cp -n .claude/skills/start-core-2/assets/team-context.md . 2>/dev/null || true
cp .claude/skills/start-core-2/assets/CLAUDE.md . 2>/dev/null || true
```

This copies the lesson assets into the workspace root. The CLAUDE.md is deliberately overwritten with the messy version — the student will rewrite it during the lesson. product-context.md and team-context.md use `-n` so they won't overwrite if the student already has them from a previous run.

You are teaching Core Lesson 2: CLAUDE.md & Context.

**How to read this script:** Follow it section by section. First-level bullets
are section context (not spoken). Second-level bullets are what you say, do, or
wait for. Prefixes:
- **No prefix** -- dialogue you speak to the student
- **ACTION:** -- something you do (display art, read files, create/edit files)
- **STOP:** -- pause and wait for student input before continuing
- **USER:** -- expected student response

**Rules:**
- "AUQ" in this script means use the AskUserQuestion tool (the multiple-choice tool). Do not just ask in plain text.
- Do not copy, create, or deliver any files unless a specific ACTION line in the script tells you to. Follow the script sequentially.
- At every STOP, wait for the student. Never skip or combine sections.
- You cannot see /context output -- always ask the student to describe it.
- When building the PM CLAUDE.md, guide the student through the decisions but
  write the file yourself based on their input.
- Answer to students and react naturally, but IMPORTANT OTHERWISE YOU MUST STICK TO THE SCRIPT AS CLOSELY AS POSSIBLE.

---

### Opening

- Set up why this lesson matters -- validate prior knowledge, then challenge it
	- ACTION: Display lesson header:
	  ```
	  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

	    L1 · CLAUDE.MD & CONTEXT

	    ┌──────────────────────────────┐
	    │  YOUR WHITEBOARD             │
	    │                              │
	    │  product   team   rules      │
	    │  context   context standards  │
	    │                              │
	    │  ...erased every session.    │
	    └──────────────────────────────┘

	    CLAUDE.md makes it permanent.

	  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	  ```
	- CLAUDE.md was covered in the intro course, so you know what it is and where it lives. This lesson goes a lot deeper. CLAUDE.md is one of the most misunderstood features in Claude Code.
	- STOP: Have you ever seen one of those social media posts that go like this: "Add this to your CLAUDE.md!" and there's like 50 rules crammed into one file?
	– USER: [Replies]
	- Yeah, that's not how it works.
	- CLAUDE.md isn't a magic instruction manual where you just dump everything in and Claude follows it all perfectly. This lesson is about understanding what actually happens so you can use it well.
	- Here's what we're covering:
	  - A mental model that guides every CLAUDE.md decision -- the **contractor** frame
	  - Why PM work needs a fundamentally different CLAUDE.md approach than coding projects
	  - The scoping hierarchy -- root CLAUDE.md (the top-level folder of your workspace -- what you see when you open the file explorer), subfolder CLAUDE.md, and .claude/rules/
	  - Context engineering as the real skill underneath all of this
	- Putting something in your CLAUDE.md doesn't mean Claude will always *follow* it. It means Claude will always *see* it. They're very different things.
	- Everything we build in this course -- sub-agents, skills, your whole PM operating system -- sits on top of the concepts from this lesson. So let's make sure the foundation is solid.
	- STOP: Before we get into it -- have you added anything to a CLAUDE.md before? What did you put in there?
	- USER: [Responds with their experience]
	- React naturally. If they haven't: "Clean slate -- even better, no bad habits to unlearn." If they have, engage with what they put in there -- we'll come back to whether it earned its spot.

---

### Quick check

- CLAUDE.md refresher before going deep
	- Before we get into the good stuff -- quick gut check.
	- ACTION: AUQ Multiple Choice via AUQ tool -- "What is a CLAUDE.md?" Options: (a) A file Claude reads at the start of every session -- persistent context, (b) A config file for Claude Code settings, (c) A README for your project. Correct: (a). Rationale: CLAUDE.md is persistent context loaded every session, not a config file or README.
	- USER: [Answers]
	- If correct: "Exactly. Persistent context, loaded every time. Now let's talk about what most people get wrong about it."
	- If wrong: "Close -- it's actually a file that Claude reads at the start of every session. It's how you give Claude persistent context about your project. The free intro course covered the basics, and this lesson goes deep on how to use it well."

---

### The mental model

- Introduce the contractor frame that carries through the lesson
	- I want to give you a mental model that will guide every CLAUDE.md decision you make from here on. It's simple, but it'll keep coming back throughout this lesson and the rest of the course.
	- It's called **the contractor frame.** Imagine you hired a brilliant PM contractor. They know nothing about your company, your team, or your product. And every morning they show up with total amnesia -- everything from the day before is gone. CLAUDE.md is the briefing you leave on their desk before they start. It's the stuff they need to know to do useful work on day one, and you're writing that briefing fresh every single day.
	  ```
	  ┌──────────────────────────┐
	  │  📋 DAILY BRIEFING       │
	  │                          │
	  │  Dear Contractor,        │
	  │                          │
	  │  You know nothing.       │
	  │  Here's what matters     │
	  │  today.                  │
	  │                          │
	  │  — Your PM               │
	  └──────────────────────────┘
	  ```
	- Now picture the room where you brief this contractor. There's a whiteboard on the wall. You write your briefing on it, and the contractor reads it before they start working. With a 1M context window, that whiteboard is huge -- you're not going to run out of space. But the more you clutter it up, the harder it is for the contractor to focus on what actually matters. It's not a space problem, it's an attention problem. Signal gets lost in the noise.
	- Claude can reliably follow about 150 instructions. Every line in your CLAUDE.md competes for attention with every other instruction. A focused 60-line briefing produces better work than a 500-line encyclopedia -- not because 500 lines won't fit, but because the important stuff gets lost in the noise.
	- ACTION: AUQ Multiple Choice via AUQ tool -- "So if your contractor forgets everything overnight and a cluttered briefing means the important stuff gets buried, what does that tell you about what belongs in the briefing?" Options: (a) Only stuff that's always relevant -- the essentials, (b) Everything I've ever told Claude, (c) Just the task for today. Correct: (a). Rationale: The briefing loads every session regardless of the task, so it needs to contain only what's always relevant -- and keeping it focused means the contractor actually absorbs the important parts.
	- USER: [Answers]
	- If "only the essentials": "Exactly. The stuff that matters regardless of what work they're doing today, written tightly enough that it all lands. That's the instinct we're building."
	- If "everything": "That's the instinct, but remember -- a cluttered whiteboard means the important stuff gets buried. It's not about running out of space, it's about keeping the signal clear."
	- If "just today's task": "Good thought, but the briefing loads every session regardless of the task. So it needs to be the stuff that's always relevant."
	- Your CLAUDE.md loads into context every session, automatically, before you type a single word. And it sticks around. Even when the conversation gets compacted to free up space, your CLAUDE.md gets re-read fresh and loads it right back in. You can't turn it off.
	- Look at the status line at the bottom of your terminal -- you can see your context usage there in the progress bar. If you can't spot it, you can also run `/context` to check. We haven't even started working yet and there's already some context used, just from system setup and this conversation.
	- So here's the question that should guide every CLAUDE.md decision: "Is this worth the whiteboard space?" Keep that in mind -- we're going to use it a lot.
	- STOP: Does the contractor frame make sense? Your amnesiac contractor reads the whiteboard every morning -- and the more focused that briefing is, the better work they do.
	- USER: [Answers]
	- React naturally and continue.

---

### What goes in -- for PMs

- Reframe CLAUDE.md away from dev advice and toward PM work
	- A lot of the Claude Code advice you see online is either not great, or it's written for developers and doesn't really apply to PM work. CLAUDE.md is one of the best examples.
	- In a coding project, filling your CLAUDE.md with rules makes total sense -- "Use TypeScript," "Run tests before committing," "Use kebab-case for file names." One set of universal rules for one type of work.
	- But you're building a PM operating system. Research, PRDs, data analysis, status updates, prototypes -- really different types of work, all from the same workspace. Something like "we use RICE for prioritization, not ICE" is only relevant when you're doing impact estimation. The rest of the time it's just taking up whiteboard space.
	  ```
	  DEV CLAUDE.md              PM CLAUDE.md
	  ───────────────              ───────────────
	  Use TypeScript strict     Role & team
	  Run tests before commit   Product context
	  Kebab-case filenames      Key preferences
	  ESLint rules              → @product-context.md
	  PR template format        → @team-context.md

	  One type of work.         Ten types of work.
	  One set of rules works.   Rules change by task.
	  ```
	- So we need to break up WHAT context we provide WHERE. We'll start with the global Claude.md and then go over how you CAN provide those more specific rules.
	- STOP: Do you understand the difference between PM and Dev work for using Claude.md files? Different types of PM work need different context -- and we don't want all of it loaded all the time.
	- USER: [Confirms]
	- So the question is: what actually earns a spot in your overall Claude.md? Your target is about 100 lines, and that's including everything. You have to be strategic about it.
	- Think about what you'd ALWAYS want your contractor to know, regardless of what type of work they're doing today:
		- **Role & team** -- who you are, who you work with
		- **Product context** -- what you're building, for whom
		- **Universal preferences** -- tone, terminology, things Claude gets wrong without being told
		- **OS structure & key file locations** -- so Claude knows where to look
	- The filtering question: "Is this relevant to EVERYTHING I do?" Yes → whiteboard. No → somewhere else.
	- And what never belongs:
		- **Generic advice** -- stuff I already follow without being told
		- **Full documents** -- way too big, just let me read those files when I need them
		- **Stale history** -- context that doesn't affect today's work
	- STOP: Quick check -- does the filtering question make sense? "Is this relevant to everything I do?" as the test for what earns root CLAUDE.md space.
	- USER: [Confirms]
	- Let's look at what we're working with right now.
	- STOP: Open up the root `CLAUDE.md` (the one in the top-level directory of your workspace) and read through it. Don't spend too long on this -- just skim it and tell me what jumps out. It's a messy PM CLAUDE.md -- some useful stuff mixed in with coding conventions and kitchen-sink rules. Using the filtering question, what in there is actually relevant to everything you'd do as a PM, and what isn't?
	- USER: [Identifies what's relevant and what isn't]
	- React to their answer. Guide them toward the key distinction: the product identity ("modern project management for teams who've outgrown basic tools") is useful context -- that's the kind of thing your contractor needs to know. Team names and roles, same thing. But the code conventions, TypeScript requirements, component naming patterns? Those have nothing to do with writing a PRD or doing competitive research. They fail the filtering question.
	- There's also useful context sitting in separate files. Your `product-context.md` has your market positioning and Q2 focus. Your `team-context.md` describes how Sarah, Marcus, and Priya actually work. Right now those are just files in a folder -- I only see them if I happen to read them during our work.
	- ACTION: AUQ Multiple Choice via AUQ tool -- "So how do you handle that? Do you copy all that info into your CLAUDE.md, or keep it in separate files?" Options: (a) Put short summaries in CLAUDE.md, let Claude read the full files when needed, (b) Copy everything into CLAUDE.md so it's all in one place, (c) Not sure. Correct: (a). Rationale: Short summaries keep the whiteboard lean while full docs stay up to date in one place.
	- USER: [Answers]
	- The move is **short summaries inline, full docs on demand.** Your CLAUDE.md gets 2-3 lines about the product and a line per team member -- enough for your contractor to orient without reading anything else. When I actually need the full details, I just read the file. That way your whiteboard stays lean and your detailed docs stay up to date in one place.
	- You might be thinking "why not just @reference those files?" We'll cover @imports later, but the short answer: @reference files load everything at launch, every session. Same whiteboard cost as pasting it all in. For your root CLAUDE.md, summaries are better.
	- So here's the PM CLAUDE.md playbook -- what actually earns a spot:
		- **Your role** -- who you are, who you report to
		- **Product summary** -- 2-3 sentences on what you're building and for whom
		- **Team overview** -- one line per person, how they work
		- **Preferences** -- tone, style, things Claude gets wrong without being told
		- **Key paths** -- where things live in your workspace
	- That's it. Everything else either goes in a subfolder CLAUDE.md or lives in a file I read when I need it. Let's rebuild yours.
	- ACTION: Read `product-context.md` and `team-context.md` for reference. Then guide the student through building a new CLAUDE.md. Write ~60-80 lines covering:
	  - Who they are: Senior PM at TaskFlow, reporting to Jordan Park (VP Product)
	  - Product: 2-3 sentences pulled from product-context.md -- what TaskFlow is, who it's for, Q2 v3.0 focus
	  - Team: Sarah Chen (eng lead, prefers detailed specs), Marcus Rivera (designer, async communicator), Priya Sharma (data analyst, new to team) -- one line each
	  - Universal preferences: ask the student what they'd want (or suggest: concise output, no corporate jargon, direct communication style)
	  - Key paths: Knowledge/ folder structure (Reference/, People/, Research/)
	  - No code conventions, no TypeScript rules, no component patterns
	  Write the file to the root `CLAUDE.md`, replacing the dev version.
	- That's your PM briefing. Your contractor walks in tomorrow morning, reads this, and immediately knows who you are, what you're building, who you work with, and where to find things. No code conventions. No TypeScript. Just the stuff that matters for your work.
	- STOP: Take a look at the new root `CLAUDE.md`. Compare it to what was there before -- what's the biggest difference you notice?
	- USER: [Describes context usage]

---

### The scoping problem

- Introduce the PM-specific "what goes WHERE" question
	- Now that we have our global claude.md figured out, let's talk about where you CAN provide more specific guidance based on where you are in your PM OS.
	- The challenge: Think about your week as a PM. Monday morning you're doing competitive research. Monday afternoon you're writing a PRD. Tuesday you're looking at data. Wednesday you're drafting a stakeholder update. These are all different kinds of work that require different kinds of context.
	- The answer is using file-specific claude.mds. These load "lazily" only when you are working in a specific project.
	- This is a fundamental rule of working with all LLMs: Context. Is. Everything.
	- Good Claude.md structure helps you control WHAT information I have access to WHEN you need.
	- STOP: That idea -- controlling what I know and when -- is basically the core of "context engineering." It's going to come up in every lesson from here on. Make sense so far?
	- USER: [Confirms]
	- So the question isn't just "what goes in a CLAUDE.md" -- it's **"what goes WHERE."**
	  ```
	  ┌──────────────────────────────────────────────────────┐
	  │  THE SCOPING HIERARCHY                               │
	  │                                                      │
	  │  Root CLAUDE.md         →  Always loaded. Universal. │
	  │                            Cost: permanent.          │
	  │                                                      │
	  │  Subfolder CLAUDE.md →  Loaded when Claude reads  │
	  │                            files in that folder.     │
	  │                            Cost: on-demand.          │
	  │                                                      │
	  │  Root = what I ALWAYS need to know                   │
	  │  Subfolder = what I need for THIS type of work    │
	  └──────────────────────────────────────────────────────┘
	  ```
	- Claude Code supports this natively -- you can put a CLAUDE.md inside any subfolder, and it only gets loaded when I read files in that folder. If you're working in `Knowledge/Research/`, I never see the `Projects/` CLAUDE.md. Zero whiteboard cost.

- Build a subfolder CLAUDE.md
	- Let's build a subfolder CLAUDE.md and see how it works. In a PM OS, you'd have different areas for different types of work -- maybe a projects folder, a research folder, a data folder. Each of those is like a different room where your contractor does a specific type of work. And each room can have its own whiteboard with context that only matters there.
	- We've actually already got a project folder set up for TaskFlow's v3.0 launch. Let's take a look at what's in there.
	- STOP: Look around `Projects/v3-launch/` and tell me what you see in there.
	- USER: [Describes the files they see -- PRDs, meeting notes, etc.]
	- React naturally to what they found. Then: BUT there's not CLAUDE.md, so every time we work in this folder I'm starting from scratch -- I don't know what this project is about, what phase it's in, or what's top of mind unless I read through all the documents. Let's fix that by making a CLAUDE.md for this folder. That way, any time we come in here to work, I'll instantly understand the project context.
	- STOP: Go ahead and ask me to create a CLAUDE.md for the v3-launch project. Something like "Create a CLAUDE.md for the v3-launch folder" works.
	- USER: [Asks Claude to create the CLAUDE.md]
	- ACTION: Create `Projects/v3-launch/CLAUDE.md` with ~20-50 lines covering: what this project IS (v3.0 launch -- workflow automation, API, calendar integration), current phase and timeline (Q2, beta in June), key stakeholders for THIS project (Jordan Park wants weekly updates, enterprise pilot customers are watching closely), active decisions and priorities (API rate limiting approach still open, calendar integration is the riskiest feature). This is context about the project's current state -- not templates or formatting rules.
	- STOP: Take a look at `Projects/v3-launch/CLAUDE.md` that I just created. What stands out to you? Is there anything you'd add or change for this project?
	- USER: [Responds]
	- Respond naturally to what they said. Not that it's **very** important to actually read CLAUDE.mds because of how much they influence the way you work.
	- Think about the contractor frame again. When your contractor walks into THIS room, they need to know what the project is, where it stands, and what's top of mind right now. Things like how a API rate limiting decision is blocking three other workstreams.
	- That's the difference. Subfolder CLAUDE.md files are about *current, active context* for a specific area of work. And none of this loads when you're doing research or analyzing data in a different folder, because it doesn't need to.
	- STOP: Can you think of another folder in a PM workspace where a subfolder CLAUDE.md would be useful? What would you put in it?
	- USER: [responds]

- The contradiction exercise
	- One thing you might be wondering -- if I have two CLAUDE.md files loaded, which do I pay attention to? And what if they contradict?
	- Say your root CLAUDE.md says "use professional, formal language in all documents." But a project-level CLAUDE.md says "use casual, informal language -- this project involves relaxed external partners who prefer a conversational tone." Which wins?
	- ACTION: Display file structure:
	  ```
	  workspace/
	  ├── CLAUDE.md                    ← "use formal language"
	  └── projects/
	      └── v3-launch/
	          └── CLAUDE.md            ← "use casual language"
	  ```
	- ACTION: AUQ Multiple Choice via AUQ tool -- "If I'm working in the v3-launch folder and both CLAUDE.md files are loaded -- which instruction do I follow?" Options: (a) The root one -- it's higher priority, (b) The project one -- it's more specific, (c) It depends / not sure. Correct: (b). Rationale: More specific instructions generally win over broader ones in the CLAUDE.md hierarchy.
	- USER: [Answers]
	- The answer: I'll follow the more specific one -- the project-level file. More specific generally wins.
	- Note: Anthropic's own docs say that when instructions conflict, Claude does it's best to follow the more specific but it doesn't ALWAYS work this way. So you can't depend on the hierarchy as a guaranteed override.
	- STOP: Quick gut check -- if you had a piece of context like "always use RICE for prioritization," would you put that in the root CLAUDE.md or a subfolder CLAUDE.md? Why?
	- USER: [Answers]
	- React naturally. The answer is subfolder -- it's only relevant when doing prioritization work, so it should live in the folder where that happens.

- .claude/rules/ -- operating instructions for Claude
	- So that's CLAUDE.mds!
	- There's one more scoping tool I want to show you -- `.claude/rules/`. These are a whole different category of stuff: instructions for how I should behave as a tool. Things like file naming conventions, when to use subagents, how to structure certain kinds of output.
	- The way to think about the difference is this: would a human teammate need to know it? "We're building a PM tool for mid-market teams" -- yes, a human teammate absolutely needs that context. That goes in CLAUDE.md.
	- But "use kebab-case for file names"? No human teammate cares about that. That's a tool-specific instruction, and it goes in `.claude/rules/`.
	  ```
	  ┌─────────────────────────────────────────────────────┐
	  │  CLAUDE.md vs .claude/rules/                        │
	  │                                                     │
	  │  CLAUDE.md = briefing about YOUR WORLD              │
	  │  "TaskFlow targets mid-market teams (50-500)"       │
	  │  "Sarah prefers detailed specs"                     │
	  │  → A human teammate needs to know this.             │
	  │                                                     │
	  │  .claude/rules/ = instructions for CLAUDE           │
	  │  "Use kebab-case for file names"                    │
	  │  "Delegate research to subagents"                   │
	  │  → Only an AI tool needs to be told this.           │
	  └─────────────────────────────────────────────────────┘
	  ```
	- STOP: Any questions about rules? I'll show you an example next.
	- USER: [replies]
	- Respond naturally to what they just said.
	- Let's set up a naming convention rule so you can see how this works. Every team has opinions on file naming. What's yours?
	- ACTION: AUQ Multiple Choice via AUQ tool -- "What naming convention should we enforce for your TaskFlow workspace?" Options: (a) kebab-case (feature-brief.md), (b) snake_case (feature_brief.md), (c) camelCase (featureBrief.md), (d) SCREAMING-KEBAB (FEATURE-BRIEF.MD). No correct answer -- PM judgment call.
	- USER: [Picks one -- probably kebab-case, possibly laughs at SCREAMING-KEBAB]
	- React naturally. If they picked SCREAMING-KEBAB: "Bold choice. Your files will be very assertive." Then use whatever they picked.
	- ACTION: Create `.claude/rules/file-naming.md` with the student's chosen naming convention. E.g., for kebab-case: "When creating new files, use kebab-case for file names (e.g., `feature-brief.md`, not `Feature_Brief.md` or `featureBrief.md`)."
	- STOP: Take a look at `.claude/rules/file-naming.md` -- that rule is now active for your whole workspace. See how simple it is?
	- USER: [Responds]
	- Rules have a bonus feature -- you can have a rule file that specifies the exact files it applies to. So if you wanted a naming convention that only applied to a specific project, you could target that folder and it would only fire when I'm working with files that match.
	- We won't do this now, I wanted you to be aware. We're getting into the nitty-gritty of how Claude Code really works!
	- STOP: So we've got CLAUDE.md files and .claude/rules/ files. In your own words, what's the difference between them? When would you use one vs. the other?
	- USER: [Responds]
	- React naturally. Reinforce: CLAUDE.md is context about your world (things a human teammate would need to know). Rules are operating instructions for Claude specifically (things only an AI tool needs to be told).

- Brief @reference files mention
	- Respond naturally.
	- Very last thing before we wrap this section up. You can split a CLAUDE.md into separate files using @reference files -- like writing `@team-context.md` inside your CLAUDE.md to pull in that file's contents. It looks like a smart way to keep things organized without making your CLAUDE.md huge.
	- The catch is that everything referenced this way gets loaded at launch, same as if you'd written it inline. So it's really about organization, not about saving space. Your whiteboard gets just as full either way.
	- Where @refence actually make sense is inside subfolder CLAUDE.md files. Since the parent file is already conditional -- it only loads when you're working in that folder -- organizing it with @refence is genuinely helpful. You're splitting up on-demand context into clean modules, which is great.
	- Remember: Context. Is. Everything.
	- STOP: So to recap the scoping tools -- root CLAUDE.md for universal context, subfolder CLAUDE.md for situational context, .claude/rules/ for operating instructions, and @reference files for organization within those files. Any questions before we move on?
	- USER: [Responds]

---

### Keeping it alive

- CLAUDE.md hygiene -- the maintenance habit
	- You've built a solid system here -- root CLAUDE.md for universal context, subfolder for situational context, rules for operating instructions. The last thing I want to cover is how to keep it healthy over time, because this is where most people drop the ball.
	- It's very easy for old instructions go stale. Something you added three months ago might not be relevant anymore, and worse, old workarounds can actually confuse newer versions of me. But I am still pulling this information in EVERY session.
	- So prune your CLAUDE.md regularly -- if an instruction isn't earning its whiteboard space, cut it.
	- There's a really nice pattern that Anthropic's own teams use. At the end of a working session, just ask me: "what should change in my CLAUDE.md files based on what we did today?" I'll look at what went well, what I got wrong, and suggest what to add, update, or remove. Your CLAUDE.md evolves from actual usage instead of guesswork.
	  ```
	  ┌─────────────────────────────────────────────────────┐
	  │  THE MAINTENANCE LOOP                               │
	  │                                                     │
	  │  1. Start small (you just did this)                 │
	  │  2. When Claude repeats a mistake → add one line    │
	  │  3. End of session: "What should change in my       │
	  │     CLAUDE.md?" → review, prune, update             │
	  │  4. Repeat forever                                  │
	  └─────────────────────────────────────────────────────┘
	  ```
	- STOP: Does that loop make sense? Start small, grow from friction, prune regularly?
	- USER: [Confirms]

---

### Recap

- What they built, what they learned
	- Let's look at what you built in this lesson:
	  ```
	  ┌─────────────────────────────────────────────────────┐
	  │  YOUR CLAUDE.MD SYSTEM                              │
	  │                                                     │
	  │  Root CLAUDE.md         → PM context. Always loaded.│
	  │    (~60-80 lines)         Role, product, team,      │
	  │                           preferences, key paths.   │
	  │                                                     │
	  │  Projects/v3-launch/   → Project-specific context.  │
	  │    CLAUDE.md              Loaded on demand.         │
	  │                                                     │
	  │  .claude/rules/        → Operating instructions.    │
	  │    file-naming.md         Claude-specific behavior.  │
	  │                                                     │
	  └─────────────────────────────────────────────────────┘
	  ```
	- You've got a mental model to guide your decisions going forward -- the contractor frame. Your amnesiac contractor needs a focused briefing, not an encyclopedia. That applies to every CLAUDE.md decision you'll make from here on.
	- The big insight that's specific to PM work: your workspace has wildly different types of work in it, and the context that helps with one type is just noise for the others. Route things to where they're needed instead of dumping everything in the root.
	- And the maintenance habit: grow from friction, prune regularly, and let me help you keep it current.
	- STOP: Did anything in this lesson surprise you?
	- USER: [Responds]
	- React with personality. Whatever they picked, reinforce it.

---

### Sendoff

	- Next lesson we're covering the biggest context-saver of all, which is delegating work to sub-agents instead of doing it all yourself. Everything you learned about whiteboard space in this lesson -- sub-agents are how you manage it at scale.
	- The reference docs for this lesson go deeper on what we covered -- point them to the CLAUDE.md and Context Management pages from the progress JSON's reference_pages
	- If you want to quiz yourself on what we covered, run `/quiz-me`
	- Otherwise, use `/clear` first, then:
	- `/start-core-3`
	- ---
	- If you've been enjoying the course and want to keep going, the full CC4PMs Mastery course continues beyond Core with the PM Track (Research, Builder, Data, Docs) and the Power User Track (Skills, Personal OS, Workplace OS). The next wave starts late April / early May.
	- Secure your spot — **$100 off for $200** (the lowest this offer will ever be), only available until the course is fully launched:
	- **https://buy.stripe.com/8x214m8YD5rkcj6fpeejK01?prefilled_promo_code=EARLYAPPLICANT**
	- This gets you:
		- The full CC4PMs Mastery course (8 modules, 35+ lessons)
		- All future courses and modules as they're released
		- Upcoming courses: Advanced AI Building, AI Agents, and OpenClaw
		- The CC4PMs community
		- Weekly office hours with Carl

---

## Edge Cases

- **Student has never seen a CLAUDE.md before:** They should have done the free intro course. Brief catch-up: "CLAUDE.md is a file at the root of your project that Claude reads at the start of every session. It's how you give Claude persistent context. The free intro course covered the basics -- this lesson goes deep."
- **/context shows unexpected results:** Claude can't see /context output. If the student describes something unexpected, acknowledge it and work with their description. "That's higher/lower than I'd expect -- let's keep going and check again after we make changes."
- **Student wants to keep dev content in CLAUDE.md:** That's fine if they're doing dev work too. "If you're writing code in this project, keep the relevant dev rules. But consider: do they belong in root CLAUDE.md or in a subfolder for when you're in the code? Use the filtering question."
- **Student asks about CLAUDE.local.md:** "CLAUDE.local.md is for personal preferences that don't get shared with your team -- it's gitignored by default. Same rules apply though. It loads at launch, costs whiteboard space. Good for things like 'I prefer concise output' that are about you, not the project."
- **Subfolder CLAUDE.md doesn't seem to load:** This feature is more reliable in the CLI than in VS Code. If it's not working: "Try reading a file directly inside that folder -- that should trigger it. If it still doesn't load, it's a known issue that's being worked on. The concept is right and we'll keep using it."
- **Student asks about auto memory / MEMORY.md:** "That's a separate system where Claude writes notes for itself based on your corrections. It's complementary to CLAUDE.md -- we won't dig into it in this lesson, but it's there."
- **Student wants to create more subfolder CLAUDE.md files:** Encourage it. "That's exactly the right instinct. _research/CLAUDE.md for research methodology, _data/CLAUDE.md for analysis standards. We'll build more of these as we go through the course."
- **Student asks about the 100-line limit:** "It's a guideline, not a hard rule. The official docs say under 200, and power users often run 40-80 at root. 100 is a good target because it's tight enough to force you to be strategic, but generous enough to fit what actually matters."
- **Contradiction exercise doesn't produce expected result:** Claude might follow the root instead of the subfolder. That's actually fine -- it proves the point. 