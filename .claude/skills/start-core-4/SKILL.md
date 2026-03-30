---
name: start-core-4
description: |
  Core Lesson 4: Skills. Teaches what skills are (YAML frontmatter + markdown
  body), the difference between commands and skills, and a progression from
  text-only skills to multi-step workflows to code-powered skills. Student
  tours /humanizer, builds /pitch-feature from scratch, and runs /meeting-cost.
  Use when the student types /start-core-4.
disable-model-invocation: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Bash
  - Agent
  - AskUserQuestion
---

## Setup

At the start of this lesson, silently run this command to set the progress file (do not show the output to the student):

```bash
printf '{"module":"Core","lesson":"L4","lesson_name":"Skills","reference_pages":[{"name":"Skills Overview","path":"reference/skills/index.html"},{"name":"Building Skills","path":"reference/skills/building.html"}]}' > .claude/cc4pms-progress.json
cp -rn .claude/skills/start-core-4/assets/* . 2>/dev/null || true
cp -rn .claude/skills/start-core-4/assets/.claude/skills/humanizer .claude/skills/ 2>/dev/null || true
cp -rn .claude/skills/start-core-4/assets/.claude/skills/meeting-cost .claude/skills/ 2>/dev/null || true
```

The setup copies lesson assets (stakeholder draft, meeting schedule, raw feature notes) and installs the humanizer and meeting-cost skills.

You are teaching Core Lesson 4: Skills.


**How to read this script:** Follow it section by section. First-level bullets are section context (not spoken). Second-level bullets are what you say, do, or wait for. Prefixes:
- **No prefix** — dialogue you speak to the student
- **ACTION:** — something you do (display art, read files, spawn agent)
- **STOP:** — pause and wait for student input before continuing
- **USER:** — expected student response

**Rules:**
- "AUQ" in this script means use the AskUserQuestion tool (the multiple-choice tool). Do not just ask in plain text.
- Do not copy, create, or deliver any files unless a specific ACTION line in the script tells you to. Follow the script sequentially.
- At every STOP, wait for the student. Never skip or combine sections.
- When building the pitch-feature skill, use AskUserQuestion to co-create it with the student — don't just write it silently.

---

### The frame

- Opening — the repetition problem
	- ACTION: Display lesson header:
	  ```
	  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

	    L4 · SKILLS

	      Text         Multi-step       Code
	      ─────        ──────────       ────
	      /humanizer   /pitch-feature   /meeting-cost

	      Instructions → Workflows → Programs
	      One feature. Three levels of power.

	  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	  ```
	- It's finally time for us to cover Claude Code's most powerful feature: SKILLS.
	- Skills unlock two huge capabiities:
		- Codified workflows — you design it once, and it runs the same way every time. Not just a saved prompt. A full system: multi-step sequences, reference files, sub-agents, validation, even code.
		- Tools – you can extend my capabilities dramatically by giving me skills that let me do things I can't do on my own.
	- STOP: Have you ever used a Claude Code skill? Or made one yourself?
	- USER: [Responds]
	- React naturally.
	- Here's what we're covering:
		- What skills are and how they're structured
		- The difference between commands and skills
		- Three types of skills — from simple text to multi-step workflows to code-powered tools
		- Where to find and install skills other people built
		- We'll tour two pre-installed skills, build one from scratch, and by the end you'll have a reusable /pitch-feature command in your toolkit.
	- STOP: Which of those sounds most useful to you — codified workflows or extending what I can do with tools?
	- USER: [Responds]

### What skills are

- Anatomy, directory, and invocation
	- Let's start with what skills are.
	- A skill is a markdown file in your `.claude/skills/` directory. That's it. YAML frontmatter at the top says what it's called, what it does, and what tools it can use. The markdown body is the actual workflow — the instructions Claude follows when the skill runs.
	- Here's what it looks like:
	  ```
	  ┌──────────────────────────────────────────────────────────┐
	  │  SKILL.md ANATOMY                                        │
	  │  ┌────────────────────────────────────────────────────┐  │
	  │  │  --- (YAML frontmatter)                            │  │
	  │  │  name: pitch-feature                               │  │
	  │  │  description: Turn raw feature notes into a presentable pitch │  │
	  │  │  allowed-tools: [Agent, Read, Write]               │  │
	  │  │  ---                                               │  │
	  │  ├────────────────────────────────────────────────────┤  │
	  │  │  (Markdown body)                                   │  │
	  │  │                                                    │  │
	  │  │  Instructions for Claude:                          │  │
	  │  │  • What to build                                   │  │
	  │  │  • What reference files to read                    │  │
	  │  │  • What sub-agents to spin up                      │  │
	  │  │  • What format to output                           │  │
	  │  │  • What validation to run                          │  │
	  │  └────────────────────────────────────────────────────┘  │
	  └──────────────────────────────────────────────────────────┘
	  ```
	- STOP: Looking at that anatomy diagram — what do you think the `allowed-tools` field controls? Why would a skill need to declare that?
	- USER: [Responds]
	- They live in your .claude/skills/ folder like this:
	  ```
	  .claude/skills/
	  ├── pitch-feature/
	  │   └── SKILL.md          ← the workflow
	  ├── humanizer/
	  │   └── SKILL.md          ← text-only skill
	  └── meeting-cost/
	      ├── SKILL.md          ← the workflow
	      └── calculate.py      ← code the skill runs
	  ```
	- Each skill gets its own folder. The folder can hold just the SKILL.md, or it can include reference files, code, templates — whatever the skill needs. Like most things in Claude Code, it's "just files."
	- And you've actually been using skills this whole course. The `/start-core-4` that launched this lesson is actually a skill. Every lesson in this course is a SKILL.md that I read and follow.
	- STOP: Go look at `.claude/skills/` right now — you'll see the course skills and a couple we pre-installed for this lesson. Can you see them?
	- USER: [Confirms]
	- That's what skills are under the hood — markdown files with YAML frontmatter, living in directories. Now let's talk about how they relate to something similar you might have seen: commands.

### Commands vs skills

- Two ways to extend Claude Code
	- Claude Code actually has two ways to add custom slash commands. Commands and skills. They're similar — both get invoked with `/name` — but they're built differently.
	- **Commands** live in `.claude/commands/`. They're plain markdown files — just instructions. No YAML, no tool declarations. You type `/my-command` and Claude reads the file and follows it. Think of them as saved prompts.
	- **Skills** live in `.claude/skills/`. They have YAML frontmatter that declares a name, description, and what tools the skill is allowed to use. The markdown body can be much more complex — multi-step workflows, sub-agent orchestration, code execution. And the skill lives in a directory, so it can include reference files and scripts alongside it.
	  ```
	  ┌─────────────────────────────────────────────────────────────┐
	  │              COMMANDS vs SKILLS                              │
	  ├────────────────────────────┬────────────────────────────────┤
	  │  COMMANDS                  │  SKILLS                        │
	  │  .claude/commands/         │  .claude/skills/               │
	  │                            │                                │
	  │  Plain markdown            │  YAML frontmatter + markdown   │
	  │  Just instructions         │  Declares tools, name, desc    │
	  │  Single file               │  Directory (can hold code,     │
	  │                            │  references, templates)        │
	  │                            │                                │
	  │  "Saved prompt"            │  "Codified workflow"           │
	  │                            │                                │
	  │  /track-bug                │  /pitch-feature                │
	  │  /meeting-notes            │  /meeting-cost                 │
	  └────────────────────────────┴────────────────────────────────┘
	  ```
	- ACTION: AUQ Multiple Choice via AUQ tool -- "A teammate shares a single markdown file with simple instructions. Is that a command or a skill?" Options: (a) Command, (b) Skill, (c) Could be either. Correct: (a). Rationale: A single markdown file with instructions and no YAML frontmatter is a command, not a skill.
	- USER: [Answers]
	- One thing worth knowing: skills have a `description` field in their YAML. In theory, I should auto-trigger the skill when I notice a matching request — without you typing the `/` command. In practice, this works about 20% of the time. Psych! I don't know why I'm this way. 
	- So treat skills like commands — type `/name` and it runs. That's the reliable path.
	- STOP: If you wanted to share a skill with your team, what would you need to give them — just the SKILL.md, or the whole folder that the SKILL.md is in?
	- USER: [Responds]

### Tour: a text skill

- Seeing /humanizer — expertise in a file
	- Now let's take a look at some real skills.
	- Let's start simple. There's a very popular skill pre-installed in your project called `/humanizer`. It detects AI-sounding writing and rewrites it to sound more natural — based on 24 patterns from Wikipedia's AI writing guide. Things like significance inflation, synonym cycling, excessive hedging. All the stuff that makes AI writing feel... off.
	- STOP: Open `.claude/skills/humanizer/SKILL.md` and take a look. What do you notice about it?
	- USER: [Describes what they see]
	- It's just text. Instructions for how to detect AI patterns and do a two-pass rewrite. No code, no tools, no sub-agents. Just expertise — written down in a file that Claude follows every time.
	- That's the simplest kind of skill. And it's genuinely useful — because without it, you'd have to explain those 24 patterns every single time you wanted Claude to clean up a draft. The skill does it consistently, every time, without you thinking about it.
	- Now let's use it. There's a file in `_temp/stakeholder-update-draft.md` — it's a draft stakeholder update about TaskFlow's enterprise push. Read it first. It sounds... very AI.
	- STOP: Say: **"/humanizer @_temp/stakeholder-update-draft.md"**
	- USER: [Runs the command]
	- ACTION: Run the humanizer skill against the file. Save the cleaned version to `_temp/stakeholder-update-clean.md`. Do NOT print the full rewritten document in chat — just give a brief summary of the key AI patterns it caught and what changed. Point the student to the saved file if they want to read the full version.
	- Nice trick, eh? The skill caught the AI patterns — the inflated language, the formulaic transitions, the hedging — and stripped them out. EZ PZ.
	- That's a text-only skill. No code or no tools. Just instructions that make Claude behave differently. Now let's build something with more moving parts.
	- STOP: Ready to build a multi-step skill from scratch?
	- USER: [Confirms]

### Build: a multi-step skill

- Creating /pitch-feature together
	- You've got a file sitting in `_temp/raw-feature-notes.md` — raw notes about a feature idea. The kind of messy bullet points you'd jot down after a meeting or a customer call. Take a look at it.
	- STOP: Open `_temp/raw-feature-notes.md` and tell me what you see.
	- USER: [Describes the messy notes about recurring tasks]
	- That's what real feature ideas look like before they're presentable. Scattered notes, half-formed thoughts, references to conversations. You can't hand that to your VP and say "here's what I'm thinking." You need to turn it into something structured — a pitch.
	- That's a workflow. And any workflow you repeat is a skill waiting to happen. Let's build one that takes raw notes like this and turns them into something you could actually present.
	- One tool I want to introduce before we build. Throughout this course, you've been answering those multiple-choice questions that pop up. That's a tool called **AskUserQuestion**. It's a structured way for me to ask you questions and gather inputs before doing work. We're going to include it in this skill.
	- STOP: Let's design it together. Say: **"Create a skill called /pitch-feature that takes raw feature notes and turns them into a structured pitch. Use your AskUserQuestions tool to clarify what it should do."**
	- USER: [Runs the prompt]
	- ACTION: Use AskUserQuestion to co-create the skill with the student. Ask about: (1) What should the output include? (options: "Problem statement + proposed solution + why now", "Full one-pager with scope and metrics", "Quick elevator pitch — 3-4 paragraphs"), (2) Should it check against product principles? (options: "Always — make sure the pitch aligns", "Optional — ask each time", "No — just format the notes"), (3) Should it read the competitive analysis for positioning context? (options: "Always", "Only if relevant competitors are mentioned", "No")
	- ACTION: Build the skill based on the student's answers. Save to `.claude/skills/pitch-feature/SKILL.md`. The skill should: read the raw notes file the user points to, use AskUserQuestion to ask who the audience is (VP, eng team, board), optionally read product principles and competitive analysis for grounding, then produce a structured pitch and save it to a file.
	- Take a look at what I built — open `.claude/skills/pitch-feature/SKILL.md`.
	- STOP: Here's what the skill does when you run it. Walk the student through the workflow steps: (1) reads the raw notes, (2) asks who the audience is, (3) optionally pulls in product principles and competitive context, (4) structures the pitch, (5) saves to a file. Ask: **"Does that workflow make sense? Anything you'd change?"**
	- USER: [Responds]
	- React naturally. If they suggest changes, make them.
	- Now let's test it on those raw notes.
	- STOP: Say: **"/pitch-feature _temp/raw-feature-notes.md"**
	- USER: [Runs the skill]
	- ACTION: The skill should fire, ask who the audience is via AUQ, read the notes and any reference files, produce a structured pitch, and save it to a file (e.g., `_temp/recurring-tasks-pitch.md`). Do NOT dump the full pitch in chat — save to file and show a brief summary of what was produced: the key sections, the main argument, and where the file was saved.
	- STOP: That's a multi-step skill. Raw notes went in, a structured pitch came out — saved to a file you can actually share. The same skill works for any feature idea. Next time you have messy notes from a customer call or a brainstorm, you run `/pitch-feature` and get something presentable.
	- USER: [Responds]

### Tour: a code skill

- Seeing /meeting-cost — skills that run programs
	- There's one more pre-installed skill in your project — `/meeting-cost`. This one's different. Instead of just giving me instructions, it includes a Python script that does the actual calculation.
	- STOP: Open the `.claude/skills/meeting-cost/` directory. You'll see two files — SKILL.md and calculate.py. Look at both. What's different about this skill compared to /humanizer?
	- USER: [Describes the difference — code alongside the SKILL.md]
	- This is a silly one.
	- The SKILL.md reads your meeting schedule, estimates salaries by role, and hands the data to the Python script for the math — hourly rates, total cost per meeting, daily total.
	- Then it walks you through descoping suggestions. The script does something Claude could approximate, but code does it the same way every time.
	- There's a sample schedule in `Meetings/daily-schedule.md` — in real life, this would come from your actual calendar. Let's run it.
	- STOP: Say: **"/meeting-cost @Meetings/daily-schedule.md"**
	- USER: [Runs the skill]
	- ACTION: Run the meeting-cost skill against the daily schedule. Present the cost breakdown, then walk through descoping suggestions via AskUserQuestion (async meetings, optional attendees, shorter meetings). Show before/after savings. **Note:** Jordan Park appears in exactly 4 meetings (Sprint Planning, Enterprise Tier Sync, Lunch & Learn, Stakeholder Update Prep) — verify the count when building the JSON. Don't accidentally include him in meetings he's not listed in.
	- So that's a code skill. 
	- This is the pattern for any skill where you need need to run code. If you wanted to hit an API, process data in some particular way, run any program — putting the code in the skill can give me all kinds of new powers.
	- STOP: Any questions about skills with code in them?
	- USER: [Replies]
	- That's the skill progression — text, multi-step, code. Each one adds a layer of capability.

	  ```
	  ┌─────────────────────────────────────────────────────────────┐
	  │              THREE FLAVORS OF SKILLS                         │
	  ├───────────────────┬───────────────────┬─────────────────────┤
	  │  TEXT             │  MULTI-STEP       │  CODE               │
	  │                   │                   │                     │
	  │  /humanizer       │  /pitch-feature   │  /meeting-cost      │
	  │                   │                   │                     │
	  │  Instructions     │  Input gathering  │  Everything in      │
	  │  only — Claude    │  + reference files│  multi-step, plus   │
	  │  follows the      │  + sub-agents     │  executable code    │
	  │  rules            │  + file output    │  for computation    │
	  │                   │                   │                     │
	  │  "Expertise       │  "Codified        │  "Codified workflow │
	  │   in a file"      │   workflow"       │   + reliable code"  │
	  └───────────────────┴───────────────────┴─────────────────────┘
	  ```
	- There's one more layer we haven't covered: skills that connect to external services — APIs, databases, live data. That's what L5 is all about.
	- STOP: Next we'll talk about where you can get skills and how to install them. Ready?
	- USER: [Confirms]

### The ecosystem

- Where to find and create skills
	- You've built one skill and toured two. But there's a whole world of skills other people have already made. Skills are the fastest way to upgrade your Claude Code experience.
	- The first place to look is the built-in plugin system. Type `/plugins` — you'll see a marketplace where you can browse and install skills and plugins that other people published.
	- Let's install a helpful, and very on-topic one right now: The /skill-creator skill!
	- Here's how:
		- /plugin
		- arrow key over to "Marketplaces"
		- arrow key down to "claude-plugins-official", hit enter
		- arrow key down to "Browse plugins", hit enter
		- arrow key down to "skill-creator", hit enter
	- STOP: Try that! Let me know when it's installed.
	- USER: Confirms
	- Nice! If you don't see it when you start typing /skill-creator, sometimes skills aren't picked up when installed in a session, so you'll see it in your next one.
	- That skill has best skill-making practices and the format baked in.
	- And how do you know if a skill is actually any good? One quick filter before you rely on any skill you didn't build:
	- **Read the SKILL.md** — is it well-structured, or just a prompt someone saved?
	- **Check allowed-tools** — does it need access to things you're comfortable with?
	- **Try it on something low-stakes first.** Never run a new skill on real work until you've seen what it produces.
	- STOP: That's the ecosystem — marketplace for browsing, skill creator for building from your own workflows, and always read the SKILL.md before trusting it. Any questions about skills before we wrap up?
	- USER: [Responds]

### Sendoff

- Bridge to L6
	- Respond naturally based on what they said, then continue.
	- You started this lesson writing the same prompts over and over. Now you have a system:
	- `/humanizer` — text-only, expertise in a file
	- `/pitch-feature` — multi-step, the one you built
	- `/meeting-cost` — code-powered, reliable computation
	- And the pattern for making more: do the workflow conversationally, then codify it.
	- Also! There's an entire module in the Power User Track dedicated to skills. Five lessons that go way deeper:
		- More skill types beyond what we covered today
		- Advanced techniques — self-improving skills, composition (chaining skills together), progressive disclosure
		- The philosophy of when to build a skill and when not to
		- Finding, evaluating, and sharing skills with your team
	- Whenever you want to do that one, it's `/start-skills-1`.
	- Next lesson, we're connecting Claude to the outside world — APIs, MCPs, CLIs. That's the last piece that unlocks skills that pull live data, check your project management tool, and interact with services you use every day.
	- The reference docs for this lesson cover skills in depth — point them to the Skills Overview and Building Skills pages from the progress JSON's reference_pages
	- If you want to quiz yourself on what we covered, run `/quiz-me`
	- Otherwise, use `/clear` first, then:
	- `/start-core-5`
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

- **Student already knows what skills/commands are from earlier lessons:** Don't over-explain. "You've seen the basics already. Now we're going deeper — commands vs skills, code skills, building from scratch." Move quickly.
- **Student asks about model-invocable in more detail:** "The description field in YAML lets Claude match your request to a skill automatically. But it's inconsistent — maybe 1 in 5 times it fires on its own. Some people try to optimize the description to trigger more often, but honestly, just type the /command. It's reliable."
- **/humanizer produces unexpected results:** "Skills are instructions, not guarantees. If the output isn't right, you edit the SKILL.md — that's the whole point of codifying workflows. You can tune it."
- **Student's /pitch-feature skill doesn't work on first run:** "That happens. Skills are code — they need debugging. Read the SKILL.md, see what went wrong, fix it. That's the normal workflow."
- **Student asks about sharing skills with a team:** "Skills are just files — you can commit them to git and share them like any other file. Anyone who clones the repo gets the same skills. That's why the directory structure matters."
- **Student wants to build a different skill instead of /pitch-feature:** Let them. The pattern is what matters. "Same process — what inputs does it need, what steps does it run, what's the output? Let's build it."
- **calculate.py doesn't run (Python not installed):** "You need Python installed for code skills. Most Macs have it. Try `python3 --version`. If it's not there, we can install it, or just look at the script to understand the pattern."
- **Student asks about JavaScript/other languages for code skills:** "Any language works — Python, JavaScript, Bash, whatever. The SKILL.md just tells Claude what to run. Use whatever you're comfortable with, or whatever Claude suggests for the task."
- **Student is overwhelmed by the number of concepts:** "Three types: text (just instructions), multi-step (workflow with sub-agents), code (adds computation). That's the whole progression. Start with text skills — they're the easiest win."
