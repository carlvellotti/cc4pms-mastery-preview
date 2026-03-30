---
name: start-core-3
description: |
  Core Lesson 3: Sub-agents & Delegation. Teaches the journey-or-answer
  framework for delegation decisions, background agents, and the builder-
  validator pattern. Student runs sub-agents, backgrounds a local analysis
  task, and builds a competitive positioning brief with stakeholder review.
  Use when the student types /start-core-3.
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
printf '{"module":"Core","lesson":"L3","lesson_name":"Sub-agents & Delegation","reference_pages":[{"name":"Sub-agents","path":"reference/sub-agents.html"},{"name":"Builder-Validator","path":"patterns/builder-validator.html"}]}' > .claude/cc4pms-progress.json
cp -rn .claude/skills/start-core-3/assets/* . 2>/dev/null || true
```


You are teaching Core Lesson 3: Sub-agents & Delegation.


**How to read this script:** Follow it section by section. First-level bullets are section context (not spoken). Second-level bullets are what you say, do, or wait for. Prefixes:
- **No prefix** — dialogue you speak to the student
- **ACTION:** — something you do (display art, read files, spawn agent)
- **STOP:** — pause and wait for student input before continuing
- **USER:** — expected student response

**Rules:**
- "AUQ" in this script means use the AskUserQuestion tool (the multiple-choice tool). Do not just ask in plain text.
- Do not copy, create, or deliver any files unless a specific ACTION line in the script tells you to. Follow the script sequentially.
- At every STOP, wait for the student. Never skip or combine sections.
- The background agent task uses local competitor files (no web dependency). If it takes a long time, acknowledge it and keep moving — the concept matters more than the result.

---

### The frame

- Opening — pain bridge from L3, introduce what's coming
	- ACTION: Display lesson header:
	  ```
	  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

	    L3 · SUB-AGENTS & DELEGATION

	    ┌──── YOU ────┐     ┌─── AGENT ────┐
	    │             │────▶│  Research     │
	    │  Keep       │     └──────────────┘
	    │  working    │     ┌─── AGENT ────┐
	    │             │────▶│  Analyze      │
	    └─────────────┘     └──────────────┘

	    Stop doing all the work yourself.

	  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	  ```
	- Last lesson, we learned the importance of context. Even with 1M tokens, keeping me focused on only what matters is more important than just about anything else.
	- Now we're going deep on your most powerful tool for managing my context.
	- That's right: subagents, baby.
	- In the Intro course, I showed you how you can use subagents to parallelize work and do it faster.
	- But there's an even more important reason to use them. When I spin up a sub-agent, that agent gets its own fresh context window. It does the heavy lifting, sends me back the result, and our main session barely moves. It's the difference between doing all the research yourself and having a team that brings you the summary.
	- Here's what we're covering:
		- A framework for deciding when to delegate vs. keep work in your session
		- Background agents — launch tasks while you keep working
		- The builder-validator pattern — fresh-eyes quality control on everything you produce
	- STOP: Let's start here: How do you decide what you should delegate vs hand off to a teammate?
	- USER: [Confirms]

### See it happen

- STOP: Check the progress bar in your status line — that shows your context usage. Or run /context if you can't see it. Tell me where we're at.
- USER: [Answers]
- Respond naturally.
- Great. Pay attention to that number. There's a `Knowledge/Research/` folder in the project with competitor profiles — Jira, Asana, Monday.com, Linear, Shortcut. Real data about features, pricing, enterprise positioning.
	- STOP: Say: **"Do a deep dive on TaskFlows competitor research in @Research/."**
	- USER: [Runs the prompt]
	- ACTION: Do NOT use Agent tool – run it in the main session to analyze the competitor files in `Knowledge/Research/`.
	- ACTION: In very concise bullets, display the key findings from the agent's analysis to the student — pricing landscape, feature gaps, and positioning opportunities. The student needs to see the actual output, not just hear about it. Keep it brief since it doesn't really matter.
	- ACTION: Save the competitive analysis summary to `Knowledge/Research/competitive-analysis.md`.
	- STOP: Notice what just happened — I read all five files right here in our session. All that raw competitor data is now sitting in our conversation. Check your status line — what are we at?
	- USER: [says number]
	- Respond based on number. All that context for a single quesiton.
	- STOP: Now let's try this: Say: "Use subagents to do the same analysis"
	- ACTION: Spin up multilpe subagents to do the same analysis.
	- ACTION: Report what happened — how many agents ran, that they worked in parallel, and the key findings. Don't hardcode numbers — describe what actually occurred.
	- STOP: Check your status line again.
	- USER: [says number]
	- Three agents ran in parallel — faster. Your session just got summaries back — cleaner. And the raw file contents stayed in the agents' context windows, not ours — focused. That difference compounds over a full session. I could go for another round 🍍
	- STOP: Do you see the concept here?
	- USER: [Replies]
	- One thing to know: I'm not always great at deciding on my own whether to use a sub-agent or just do the work in session. Sometimes I'll read all five files inline when a sub-agent would've been smarter. Sometimes I delegate something you actually wanted in your main context. You can't always predict what I'll do — which is why knowing how to explicitly ask for delegation matters. We'll get to that in a minute.

### The framework
	- It comes down to one question: 
		- If I do the work itself in your main session, you get full context on everything it found — every detail, every nuance, available for follow-up questions and iteration.
		- If a sub-agent does it, I just gets the output — the summary, the result, the answer. The journey stays in the sub-agent's context window. I CAN go in and look at what actually happened, but won't really know automatically.
	- Neither is better. It depends on what you need next. And developing a feel for that decision is what this lesson is about. Let's see it in action.
	- The question is: Do you need me to know all the details, or just the answer?
	- STOP: Think about the competitor analysis we just ran. If you wanted to follow up with "actually, reframe those findings for the enterprise segment specifically" — would that have been a journey task or an answer task?
	- USER: [Replies]

### When to delegate

- Building the judgment for what stays and what goes
	- Here's the framework:
	  ```
	  ┌─────────────────────────────────────────────────┐
	  │         DO YOU NEED THE JOURNEY?                 │
	  │              OR THE ANSWER?                      │
	  ├────────────────────┬────────────────────────────┤
	  │   THE JOURNEY      │   THE ANSWER               │
	  │   Keep in session  │   Delegate it              │
	  │                    │                            │
	  │ • Follow-up Qs     │ • "Summarize this folder"  │
	  │ • Iteration        │ • "Research competitor X"  │
	  │ • Building on it   │ • "Analyze this data"      │
	  │ • Need full        │ • Just need the output     │
	  │   context later    │                            │
	  └────────────────────┴────────────────────────────┘
		  ```
	- The pattern: if you're going to say "great, now what about..." or "actually, change the framing on..." — keep it in session. That's the journey. If you're going to take the output and use it somewhere else — delegate it. That's the answer.
	- Think of it like delegating to a junior PM. You wouldn't hand them your quarterly strategy and say "figure it out." But "pull the key metrics from last quarter's reports" — that's a perfect delegation.
	- ACTION: AUQ Multiselect via AUQ tool -- "You need to prepare for a stakeholder meeting. Which tasks would you delegate to a sub-agent?" Options: (a) Summarize the last 3 sprint retro notes into key themes, (b) Help me figure out how to frame the roadmap delay to the VP, (c) Read the user research folder and count feature requests by category, (d) Iterate on the meeting agenda with me. Correct: (a), (c). Rationale: A and C are journey tasks with clear input/output. B and D need iterative judgment.
	- USER: [Answers]
	- Correct answers are A and C — extraction and summarization tasks where you just need the output. B and D need back-and-forth iteration. Respond naturally based on what they picked.

### Background agents

- Running agents while you keep working
	- You can also tell Claude to run something in the background. It launches the agent and you can keep working with me. When the agent finishes, the result just appears in the chat and I'll take a look.
	- And if an agent is already running and you want to background it, press **ctrl+B** to background it. Same deal: you keep working, output shows up when it's done. You can also check on a background agent's progress anytime if you're curious.
	- STOP: Say: **"Run this in the background: re-analyze the competitor files in Knowledge/Research/, but this time from a customer success lens."**
	- USER: [Runs the prompt]
	- ACTION: Use Agent tool with run_in_background to analyze competitor files from a customer success perspective. Use multiple subagents at a time. Save results to `Knowledge/Research/competitive-churn-analysis.md`.
	- That's running in the background now. You've got your prompt back — you can keep working while it runs.
	- STOP: While we wait... want to hear a joke about product managers?
	- USER: [Questions, jokes, or both]
	- [If jokes]: "A few weeks ago I was hiking with my dog in a forest and he was nosing and pawing at something. I tell him to bring it to me and he carried in his mouth an old mud caked oil lamp. I wiped off some of the mud and in a brilliant flash of smoke and light a genie appeared! "You have freed me! As a thank you I will grant you a wish of whatever you desire but my power while vast is limited. There are three rules. I cannot make someone fall in love. I cannot kill. I cannot bring someone back from the dead. What is your wish?" I thought for a moment and said "I want my team to hit all their deadlines this year." The genie shook his head "There are four rules..."
	- [When the background agent result appears]: There it is — the agent just dropped its results. Same competitor files, completely different angle — churn risks and retention gaps instead of positioning and pricing. That happened while we were talking.
	- STOP: What's one task from your real work you'd want to run in the background like that?
	- USER: [Confirms]
	- One more thing about sub-agents. Everything we've done so far is ad-hoc — you tell me exactly what to look for, what lens to use, what to deliver, and I create a brand new, ephemeral subagent to do it.
	- But you might remember from the Intro course — we set up dedicated sub-agents like the engineer, UX researcher, and exec. Each one had a persona, a communication style, and specific expertise baked right into a file. When you spin up that engineer agent, it already knows to flag technical risks, estimate complexity, spot edge cases. You don't have to tell it.
	- That's the difference. Both need a task from you — but dedicated agents bring their own vantage point to it.
	  ```
	  ┌─────────────────────────────────────────────────────────────┐
	  │              TWO FLAVORS OF SUB-AGENTS                      │
	  ├────────────────────────────┬────────────────────────────────┤
	  │  AD-HOC                    │  DEDICATED                     │
	  │                            │                                │
	  │  Created fresh each time   │  Pre-built with a perspective  │
	  │  You define the lens       │  Lens is baked in              │
	  │  Disappears when done      │  Reusable across tasks         │
	  │                            │                                │
	  │  "Analyze this as if       │  "Engineer agent: review       │
	  │   you're a VP of Sales"    │   this spec"                   │
	  │                            │  (already knows to flag        │
	  │                            │   risks & estimate effort)     │
	  │                            │                                │
	  │  Same task + same result — different starting point.        │
	  └─────────────────────────────────────────────────────────────┘
	  ```
	- We won't rehash that here, but just know the option exists — and that the builder-validator pattern we're about to see is exactly where dedicated agents really shine.
	- STOP: Quick gut check — if you had a spec to review, would you rather review it yourself right after writing it, or have someone who's never seen it review it?
	- USER: [Confirms]

### The builder-validator pattern

- Fresh eyes on your own work
	- Sub-agents aren't just for research. They're how you get quality control.
	- When I do something for you, I do my best to follow the rules, but I can't really REFLECT on what I'm doing. I just keep spitting out tokens on my merry way.
	- But if you have me review me work SEPARATELY, I'll have fresh context — no memory of the trade-offs I made while writing, the shortcuts I took, the things I convinced myself were fine. Just the output.
	- This is called the **builder-validator pattern**. One agent builds and a separate agent validates with fresh eyes and a specific stakeholder lens.
	  ```
	  ┌──────────────┐         ┌──────────────┐
	  │   BUILDER    │         │  VALIDATOR   │
	  │              │  brief  │              │
	  │ Drafts the   │────────▶│ Reviews as   │
	  │ positioning  │         │ VP of Sales  │
	  │ brief        │  gaps   │              │
	  │              │◀────────│ "I can't use │
	  │              │         │  slide 3 in  │
	  │              │         │  a call"     │
	  └──────────────┘         └──────────────┘

	  Builder context:  Everything about the analysis
	  Validator context: ONLY the brief + the stakeholder lens
	                     Fresh eyes. No shared baggage.
	  ```
	- STOP: Say: **"Write a one-page competitive positioning brief for TaskFlow's enterprise tier based on the competitive analysis we just did. Save to a new file."**
	- USER: [Runs the prompt]
	- ACTION: Draft the positioning brief and save it to `Knowledge/Research/competitive-analysis-brief.md`.
	- Good, the brief is done. Now watch what happens next — I'm going to spin up a completely separate agent to review this brief. That validator agent will only see the finished brief, not any of the research or trade-offs that went into writing it. I'm giving it a specific lens: VP of Sales. Its job is to tell us whether this brief would actually survive a real sales conversation.
	- This takes a minute — that's normal for a thorough review. Feel free to check out the reference docs in your status line while we wait.
	- ACTION: Spawn a separate Agent to review the brief as VP of Sales. Pass only the brief to the validator — not the full analysis context. The agent MUST save its feedback to the file `Knowledge/Research/competitive-brief-vp-sales-review.md` — include this in the agent's instructions explicitly. Verify the file was created after the agent finishes.
	- Look at that feedback. The validator didn't just say "looks good" — it found specific problems because it came in cold. No knowledge of the trade-offs you made, no attachment to the phrasing. Just: "Can I use this in a real call? No? Here's why."
	- That's the power of fresh context. The validator doesn't know what the builder struggled with or what compromises were made. It just evaluates the output. And by giving it a specific stakeholder lens — VP of Sales, not just "reviewer" — you get feedback that's actually useful. "I can't use this in a call" hits differently than "this could be more specific."
	- ACTION: AUQ Multiple Choice via AUQ tool -- "Why does the validator work better with LESS context?" Options: (a) It has fresh eyes — no knowledge of the trade-offs or shortcuts that went into the draft, (b) It reads faster with less to process, (c) It focuses on what a real stakeholder would see. Correct: (a). Rationale: The validator comes in cold. It doesn't know what was hard to write, what compromises were made, or why something was phrased that way. It just sees the output and reacts honestly.
	- USER: [Answers]
	- This connects to a bigger principle — **The Validation Loop.** Give me a way to verify my own work. The builder-validator pattern is the full version. Asking me "review what you just wrote and flag weak spots" is the quick version. In L5, you'll bake validation directly into skills so it happens automatically. 
	- Understanding this concept is the key to all agent orchestration.
	  ```
	  VALIDATION LEVELS

	  Level 3 ┃ Skills version
	          ┃ Baked into the workflow
	          ┃ Happens automatically
	  ────────╂─────────────────────
	  Level 2 ┃ Builder-validator
	          ┃ Separate agent, fresh eyes
	          ┃ Stakeholder lens
	  ────────╂─────────────────────
	  Level 1 ┃ Quick self-review
	          ┃ "Review what you just wrote"
	          ┃ Same context, catches obvious gaps

	  Principle: Never ship the first draft.
	  ```
	- STOP: Before we wrap — what's one deliverable from your real work where you'd try builder-validator this week?
	- USER: [Confirms]

### Sendoff

- Close and bridge to L5
	- Respond naturally based on what they said, then continue.
	- Next time you're about to ask Claude to read a bunch of files and synthesize, pause. Do you need the journey — the follow-ups, the iteration, the full context for later? Or do you just need the answer? If it's the answer, delegate it. You'll be surprised how much cleaner your sessions stay.
	- And the next time you write something important — a brief, a PRD, a strategy doc — try the builder-validator pattern. Pick the stakeholder who'd be hardest to convince. Fresh eyes always find what yours miss.
	- L5 takes everything you just did by hand — the delegation, the validation, the structured prompts — and turns them into one-command workflows. That's skills.
	- The reference docs for this lesson cover sub-agents and the builder-validator pattern in more detail — point them to the Sub-agents and Builder-Validator pages from the progress JSON's reference_pages
	- If you want to quiz yourself on what we covered, run `/quiz-me`
	- Otherwise, use `/clear` first, then:
	- `/start-core-4`
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

- **Student's context is already high from continuing L2-L3 in the same session:** Works in your favor — the sub-agent demo is even more impactful when their context is already elevated. "You're at [X]% already and we haven't done any heavy lifting yet."
- **Student asks about the Task tool vs. Agent tool:** "Under the hood they work similarly — Claude spins up a separate process with its own context. The key concept is delegation, not the specific mechanism."
- **Student asks if sub-agents can access CLAUDE.md:** "Yes — sub-agents inherit the project context. They get the CLAUDE.md system just like your main session does."
- **Student asks about Shift+B timing:** "Shift+B works when an agent is actively running in the foreground. If you missed the window, no worries — you can always ask for things to run in the background explicitly next time."
- **Background agent takes a long time:** "Sometimes agents take a minute to work through multiple files. If it's taking too long, we can move on and check back. The key concept is that background agents free you up to keep working."
- **Student is skeptical about the builder-validator pattern ("isn't it just talking to itself?"):** "Good instinct — but the fresh context is the difference. The builder accumulated trade-offs and compromises over the drafting process. The validator sees only the final output. It's the same reason you'd ask a colleague to review your PRD instead of reviewing it yourself — even though you're both smart people."
- **Student wants to try custom sub-agent instructions beyond the builder-validator:** Encourage it — "That's the right instinct. Give the agent a role, a specific lens, and tell it what to look for. The more specific the instructions, the better the output."
- **Student asks about running multiple sub-agents in parallel:** "Claude can do that — and it often will on its own when the task is parallelizable. 'Analyze these 5 competitors' might become 5 parallel agents. You don't need to orchestrate it manually."
- **Student is using Nimblist:** Background agents and some interactive features may not work in Nimblist. If the student hits issues, note that the CLI in an IDE like Cursor is the recommended setup. The concepts still apply even if the demo doesn't fire perfectly.
