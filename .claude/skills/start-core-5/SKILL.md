---
name: start-core-5
description: |
  Core Lesson 5: Connect Claude to Everything. Teaches the three connection
  methods — APIs, MCPs, and CLIs — through hands-on demos. Student makes a
  live API call, explores a pre-configured Reddit MCP, and installs/uses a
  CLI tool. Builds the decision framework: CLI first, MCP if it exists,
  API for custom. Use when the student types /start-core-5.
disable-model-invocation: true
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - AskUserQuestion
  - ToolSearch
---

## Setup

At the start of this lesson, silently run this command to set the progress file (do not show the output to the student):

```bash
printf '{"module":"Core","lesson":"L5","lesson_name":"Connect Claude to Everything","reference_pages":[{"name":"Connections","path":"reference/connections/index.html"},{"name":"APIs","path":"reference/connections/apis.html"},{"name":"MCPs","path":"reference/connections/mcps.html"}]}' > .claude/cc4pms-progress.json
```


You are teaching Core Lesson 5: Connect Claude to Everything.


**How to read this script:** Follow it section by section. First-level bullets are section context (not spoken). Second-level bullets are what you say, do, or wait for. Prefixes:
- **No prefix** — dialogue you speak to the student
- **ACTION:** — something you do (display art, read files, spawn agent)
- **STOP:** — pause and wait for student input before continuing
- **USER:** — expected student response

**Rules:**
- "AUQ" in this script means use the AskUserQuestion tool (the multiple-choice tool). Do not just ask in plain text.
- Do not copy, create, or deliver any files unless a specific ACTION line in the script tells you to. Follow the script sequentially.
- At every STOP, wait for the student. Never skip or combine sections.
- The Pandoc install uses the student's system package manager. Adapt the command to their OS (brew for macOS, apt for Linux, choco/winget for Windows).
- API calls and MCP tool calls depend on external services. If any fail, acknowledge it and keep moving — the pattern matters more than the specific result.

---

### The frame

- Opening — set the tension, introduce what's coming
	- ACTION: Display lesson header:
	  ```
	  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

	    L5 · CONNECT CLAUDE TO EVERYTHING

	    ┌─────────┐
	    │ CLAUDE  │──── curl api.example.com ──── DATA
	    │         │──── mcp: reddit, slack ────── DATA
	    │         │──── pandoc, gh, jira ──────── DATA
	    └─────────┘
	         ↑
	    

	  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	  ```
	- The two biggest questions PMs have at this point: how do I connect Claude to all my other tools? And how should I actually structure my system? This lesson answers the first one. L6 covers the second — then we're done with the foundation and into the deep stuff.
	- If you want to see my FULL power, you need to connect me to your world. I can read your files, write your code, spin up sub-agents to do it — but I can't check your engineering tickets, pull data from an analytics platform, or read what people are saying online about your product.
	- There are three ways to power me up. Three connection methods — each with a different job. Here's what we're covering:
		- APIs — the bedrock that everything else is built on
		- MCPs — pre-packaged integrations where someone already did the API work
		- CLIs — the most reliable option with zero context cost
		- The decision framework for knowing which to reach for
	- We're going to try all three, hands-on.
	- STOP: Claude Code is powerful but isolated. Before we fix that — what's the one tool you wish I could already talk to?
	- USER: [Confirms]

### The three methods

- Overview of connection types
	- Respond naturally.
	- Three methods, each with a different strength. Here's how they stack up:
	  ```
	  ┌─────────────────────────────────────────────────────────────┐
	  │              THREE WAYS TO CONNECT CLAUDE                   │
	  ├───────────────┬───────────────────┬────────────────────────┤
	  │  APIs          │  MCPs             │  CLIs                  │
	  │                │                   │                        │
	  │  The bedrock.  │  Pre-packaged     │  The most reliable.    │
	  │  Everything    │  integrations.    │  Zero context cost.    │
	  │  else is built │  Someone did the  │  Claude figures them   │
	  │  on these.     │  API work for     │  out on its own.       │
	  │                │  you.             │                        │
	  └───────────────┴───────────────────┴────────────────────────┘
	  ```
	- Think of them as tools in a toolbox. You wouldn't use a wrench for every job. Same idea — each connection method has situations where it's the right pick. By the end of this lesson, you'll know which to reach for and why.
	- We'll go through all three, try each one, and then I'll give you a cheat sheet. Let's start at the foundation.
	- STOP: That's the overview — three methods, each with a sweet spot. APIs are the foundation, so we'll start there. Based on that table, which method do you think you'd use most day-to-day?
	- USER: [Responds]

### APIs: the bedrock

- Understanding APIs through doing
	- An API is just a website that returns raw data instead of a visual page. That's the simplest way to think about it. When you go to reddit.com in your browser, you see a page with images, buttons, formatting.
	- But when you ask for data from Reddit's API, you get back structured information — just the content, no visuals. I can request data from these URLs, read what comes back, and work with it.
	  ```
	  ┌─────────┐      ┌─────────────┐      ┌──────────────────┐
	  │   You   │─────▶│   Claude    │─────▶│  External API    │
	  │         │      │             │      │                  │
	  │         │      │  Requests   │ Data │  Any URL that    │
	  │         │      │  data       │◀─────│  returns data    │
	  └─────────┘      └─────────────┘      └──────────────────┘
	       Context cost: ZERO          Can embed in skills ✓
	  ```
	- Let me show you instead of explaining.
	- STOP: Tell me: "Get me a random dad joke from icanhazdadjoke.com"
	- USER: [Runs the prompt]
	- ACTION: Run `curl -s -H "Accept: application/json" https://icanhazdadjoke.com/` and show the result and the actual json.
	- That's an API request. I asked a URL for data, it sent some back, done. Every API in the world works on this same principle — a URL, a request, a response. Some need passwords or special keys, some are more complex, but the foundation is always this simple.
	- STOP: How was the joke?
	- USER: Replies
	- Respond in a fun way
	- STOP: More importantly — what that simpler than you expected?
	- USER: [Responds]

- The reality of APIs
	- That one was open — anyone can hit it, no login required. But most useful tools — Jira, Slack, your analytics platform — require you to log in when you use them in a browser. An API key is the equivalent of that login. It proves you have an account and permission to access the data.
	- And even once you have a key, you still need code that can send the request and do something useful with what comes back. That's the real overhead with APIs — not the concept, but the code you wrap around them. Which is exactly why you'd embed API calls in skills or scripts rather than doing them one-off.
	- For now, the concept is what matters: a URL that returns data, and code that handles the request and response.
	- But what if someone already wrote all that code for you? That's MCPs.
	- STOP: So far we've done a raw API request — what felt easy or hard about that compared to how you'd normally get data from a tool?
	- USER: [Responds]

### MCPs: pre-packaged connections

- What MCPs are and why they exist
	- MCPs are pre-packaged integrations. Someone already wrote the API requests, handled the authentication, figured out the edge cases — and packaged it all up so you can just install it and go. I get new capabilities without you needing to write any code.
	- The way it works: I connect to these tools through an MCP server running your machine automatically.
	- The server registers tools that I can discover and use.
	- If you have a lot of tools available, I use Tool Search to find the right tool on demand so they aren't all sitting in memory eating your context.
	  ```
	  ┌─────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
	  │   You   │───▶│   Claude    │───▶│  MCP Server │───▶│  External   │
	  │         │    │             │    │             │    │  Service    │
	  │         │    │ Tool Search │    │ Pre-built   │    │  (Reddit,   │
	  │         │    │ finds tools │◀───│ integration │◀───│   Slack,    │
	  │         │    │ on demand   │    │             │    │   etc.)     │
	  └─────────┘    └─────────────┘    └─────────────┘    └─────────────┘
	       Someone already did the API work — you just install and go
	                        Config lives in .mcp.json
	  ```
	- STOP: That's the architecture. Looking at that diagram, where do you think the reliability risk is — the MCP server, the external service, or somewhere else?
	- USER: [Responds]

- Seeing the problem MCPs solve
	- Let me show you why MCPs exist. Let me try to fetch some Reddit posts about product management directly.
	- ACTION: Run `curl -s https://www.reddit.com/r/productmanagement/top.json?limit=5` — this will likely return limited/blocked results. Point out: "See? Reddit blocks or limits direct access. This is exactly the problem MCPs solve."
	- So we need something that handles the authentication, rate limiting, and all of Reddit's quirks for us. That's what an MCP does.
	- Here's what an MCP config looks like:
	- ACTION: Display this JSON block:
	  ```json
	  {
	    "mcpServers": {
	      "reddit": {
	        "type": "stdio",
	        "command": "uvx",
	        "args": [
	          "mcp-server-reddit"
	        ]
	      }
	    }
	  }
	  ```
	- That's the whole thing. A command to run the server and its arguments. Let me install it now.
	- ACTION: Write the above JSON to `.mcp.json` in the project root.
	- Important: if you install an MCP mid-session, I won't pick it up automatically.
	- STOP: Run `/reload-plugins` to make it active.
	- USER: [Runs /reload-plugins]
	- If you want to see which MCPs you have available, type /mcp and hit enter. Tell me what you see.
	- STOP: You should see the Reddit MCP we just installed. Do you see it?
	- USER: [Confirms]
	- Great. This one lets me search and read Reddit posts directly — unlike that blocked curl request we just tried.
	- STOP: Tell me: "Search r/productmanagement for posts about recurring task management in enterprise project management tools. What are PMs saying about this?" — I'll use the Reddit MCP to search real posts.
	- USER: [Runs the prompt]
	- ACTION: Use ToolSearch to find and call the Reddit MCP tools. Summarize what PMs are saying. **If the MCP search fails, returns errors, or shows blocked/empty results:** tell the student: "Reddit blocks web crawlers. This is exactly why MCPs exist — someone already handled the authentication and rate-limiting. If the MCP isn't working either, that's the nature of external dependencies. The concept is what matters: MCPs give you pre-packaged access to services you'd otherwise have to wrangle yourself." Then skip past the MCP output discussion and move directly to the two levels of MCP config.
	- That's live data from Reddit, pulled through the MCP, with zero effort on your part. You didn't write any API requests or handle authentication. You told me what you wanted and I used the right tool.
	- And notice what happened under the hood — the MCP registered its capabilities, and I discovered them on demand. That's how all MCPs work.
	- STOP: What's one service you use regularly where you'd want this kind of zero-effort access?
	- USER: [Responds]
	- Two levels of MCP config worth knowing: 
		1. **Project-level** (`.mcp.json` in your project root — what we just saw) travels with the project. Anyone who clones it gets the same tools. 
		2. **User-level** (`~/.claude/.mcp.json`) applies to all your projects — good for tools you always want available, like Slack or calendar integrations.
	- STOP: That's MCPs — pre-packaged integrations where someone already handled the API work. Install, configure, go. There examples of more MCPs and how to connect them in the reference materials. Shall we compare these to APIs?
	- USER: [Confirms]

### APIs vs MCPs

- Comparing the first two methods
	- You've now tried both. Here's how they stack up:
	  ```
	  ┌───────────────────────────────────────────────────────────────┐
	  │                    APIs vs MCPs                               │
	  ├────────────────────────────┬──────────────────────────────────┤
	  │  APIs                      │  MCPs                            │
	  │                            │                                  │
	  │  You (or Claude) write     │  Someone already did the work    │
	  │  the requests directly     │  and packaged it up              │
	  │                            │                                  │
	  │  Full control over         │  Easier to set up — install      │
	  │  exactly what happens      │  and go                          │
	  │                            │                                  │
	  │  Need to know the API      │  Just describe what you want     │
	  │  docs and parameters       │  in plain language               │
	  │                            │                                  │
	  │  Great for custom          │  Great for common tools          │
	  │  integrations and          │  (Slack, Reddit, GitHub,         │
	  │  embedding in skills       │  Google Drive, etc.)             │
	  └────────────────────────────┴──────────────────────────────────┘
	  ```
	- Think of it this way: MCPs are like installing an app. APIs are like letting you run just parts of another app and getting the data. Both have their place — MCPs for common tools where someone's done the work, APIs for custom integrations where you only need specific pieces of data.
	- ACTION: AUQ Multiple Choice via AUQ tool -- "Quick scenario -- your analytics platform has an MCP available, you will use it for lots of things. Would you use the MCP, or write API requests directly?" Options: (a) Use the MCP -- someone already did the work, (b) Write API requests -- I will hit it for data. Correct: (a). Rationale: MCP means someone already did the API work -- use it when you want full access to a tool.
	- USER: [Answers]
	- Respond naturally based on what they said. Key takeaway: check for an MCP if it's a tool you want full access to. If it works, use it. You'd use the API for custom integrations and embedding in skills.
	- STOP: That's APIs and MCPs — raw power vs batteries included. One more method to go, and it might be your favorite. Ready?
	- USER: [Confirms]

### CLIs: ol' reliable

- Why CLIs might be your best friend
	- CLIs are command-line tools — programs you install that I can just run in the terminal. No MCP server, no config file, no context cost. I run a command, get the output, done. Battle-tested tools that have been around for years.
	- The best part: I discover CLI capabilities on my own. Install a tool, and I can run `--help` or read the documentation to figure out what it does and how to use it. Like with MCPs, you don't need to teach me the tool — I teach myself.
	  ```
	  ┌─────────┐      ┌─────────────┐      ┌─────────────┐
	  │   You   │─────▶│   Claude    │─────▶│  CLI Tool   │
	  │         │      │             │      │             │
	  │         │      │  Runs the   │      │  pandoc     │
	  │         │      │  command    │◀─────│  gh, jira   │
	  │         │      │  in bash    │      │  slack, etc.│
	  └─────────┘      └─────────────┘      └─────────────┘
	       Context cost: ZERO              Most reliable ★★★★★
	  ```
	- Let's try it. We're going to install Pandoc — a tool to convert any kind of document to another type.
	- STOP: Tell me: "Install pandoc"
	- USER: [Runs the prompt]
	- ACTION: Run `brew install pandoc` (or appropriate package manager for their OS). Confirm installation.

- Converting a document with Pandoc
	- Now let's use it.
	- STOP: Tell me: "Use pandoc to convert the CLAUDE.md file to an HTML file called claude-preview.html" — watch how I handle a tool I may have never used before.
	- USER: [Runs the prompt]
	- ACTION: Run `pandoc CLAUDE.md -o claude-preview.html` (or appropriate command based on file location). Then open the file in the browser so the student can see the result.
	- Done. One command — no config, no MCP, no API keys, no context cost. Take a look at that in your browser. Your CLAUDE.md, converted to a styled HTML page, with a single CLI command. And if you asked me to do something fancier with Pandoc — add a table of contents, change the styling, convert to PDF — I'd figure that out on my own by checking `pandoc --help`. You never need to teach me a CLI tool. That's a huge advantage.
	- This example was more of a tool than an external connection, but it's the same concept.
	- Some CLIs you might want to explore later (more in the reference docs): 
		- GitHub CLI
		- Linear CLI
		- Slack CLI
	- If a tool you use has a CLI, that's usually your fastest path to connecting me to it. And since AI is good at using them, they are coming back in a HUGE way.
	- STOP: That's CLIs — zero config, zero context cost, Claude figures them out on its own. Three methods down. Let's put them side by side.
	- USER: [Confirms]

### Choosing your connection

- The full comparison
	- You've now used all three. Here's how they compare:
	  ```
	  ┌────────────┬───────────────┬─────────────┬──────────────────────┐
	  │ Method     │ Context Cost  │ Reliability │ Best For             │
	  ├────────────┼───────────────┼─────────────┼──────────────────────┤
	  │ CLI        │ Zero          │ ★★★★★       │ Default choice.      │
	  │            │               │             │ Any tool with a CLI. │
	  │            │               │             │ Claude self-discovers│
	  ├────────────┼───────────────┼─────────────┼──────────────────────┤
	  │ API        │ Zero          │ ★★★★☆       │ Custom integrations. │
	  │            │               │             │ Embedded in skills.  │
	  │            │               │             │ Foundation layer.    │
	  ├────────────┼───────────────┼─────────────┼──────────────────────┤
	  │ MCP        │ Low (deferred)│ ★★★★☆       │ Daily-use tools.     │
	  │            │               │             │ Proactive discovery. │
	  │            │               │             │ Batteries included.  │
	  └────────────┴───────────────┴─────────────┴──────────────────────┘

	  Decision order: CLI first → MCP if it exists → API for custom
	  ```
	- The decision order matters. CLI first — always check if the tool has a CLI. If not, check for an MCP. If neither exists, you're integrating it yourself with an API.
	- ACTION: AUQ Multiple Choice via AUQ tool -- "Scenario -- you want me to pull data from your Jira board. Jira has a CLI, an MCP, and an API. Which do you reach for first, and why?" Options: (a) CLI -- zero overhead, most reliable, (b) MCP -- batteries included, proactive discovery, (c) API -- most control. Correct: (a). Rationale: CLI first, always. Zero config, zero context cost, and Claude self-discovers capabilities.
	- USER: [Answers]
	- Respond naturally based on what they said. Key takeaway: CLI first, always. If the CLI doesn't cover your use case, then MCP, then API.
	- STOP: That's the decision framework — CLI first, MCP if it exists, API for custom. Let's recap and get you set up for real work.
	- USER: [Confirms]

### Recap

- What you learned
	- This isn't a one-and-done topic. Every module from here on uses these connections — APIs embedded in research skills, MCPs when CLIs aren't available, and CLIs doing heavy lifting.
	- Connecting me to the outside world is one of THE most important things that makes me powerful. It's how you beef up research, automate workflows, and turn me from a smart assistant into a real operating system. You'll see these patterns reinforced constantly throughout the rest of the course.
	- And for the ultimate power move, you can include which tools to use in skills, embedding these tools directly into your workflows.
	- STOP: Anything unclear about the three methods or when to use each one?
	- USER: [Responds or confirms]
	- Respond naturally based on what they said, then continue to the sendoff.

### Sendoff

- Bridge to L6
	- Respond naturally based on what they said, then continue.
	- That's APIs, MCPs, and CLIs — three doors to the outside world, now open.
	- L6 is where it all comes together. Everything you've built — CLAUDE.md, context management, sub-agents, skills, connections — becomes one system. Your PM operating system.
	- The reference docs for this lesson go deeper on all three connection methods — point them to the Connections, APIs, and MCPs pages from the progress JSON's reference_pages
	- If you want to quiz yourself on what we covered, run `/quiz-me`
	- Otherwise, use `/clear` first, then:
	- `/start-core-6`
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

- **Student is using Nimblist:** `/mcp` and `/plugin` commands may not work in Nimblist. Note that the CLI in Cursor is the recommended setup. The concepts still apply even if the commands don't work.
- **Student already knows what APIs are:** Don't over-explain. "You probably know what an API is. Let's see it in action instead of talking about it." Move quickly to the demo.
- **Dad Jokes API is down or slow:** Rare, but if it happens: "APIs depend on external services — and sometimes they're down. That's reality. Let's move to MCPs." Skip to the next section.
- **brew isn't installed (Linux/Windows user):** Adapt the install command — `apt install pandoc` or `choco install pandoc` or `winget install pandoc`. The tool doesn't matter, the pattern does.
- **Student asks about API keys / authentication:** "Great question. When APIs need keys, store them in a `.env` file — never in your CLAUDE.md or hardcoded in a skill. We'll set that up in a later module when we connect to real services."
- **Reddit MCP returns no results or errors:** "MCPs depend on external services. If this one's being flaky, that's actually a good lesson — MCPs are powerful but not always reliable. Let me show you what the output would look like." Describe the expected output and move on.
- **Student asks "which should I use?":** Point them to the comparison table. "CLI first, always. If there's no CLI, check for an MCP. If neither exists, you're building it yourself with an API."
- **Student asks about other MCP servers:** "There are MCPs for Slack, GitHub, Google Drive, databases, and dozens more. The pattern is always the same — add an entry to `.mcp.json`, restart Claude, and the tools appear."
- **Student has already installed Pandoc:** "Great — skip the install. Let's use it." Jump straight to the conversion demo.
- **Student asks about security/permissions:** "Claude asks for permission before running any external command or tool. You'll see the approval prompt for every MCP tool call and CLI command. Nothing runs without your say-so."
- **Student wants to install a different MCP:** Let them, if it doesn't require auth. The lesson works with any MCP — the pattern is what matters, not the specific tool.
- **Student asks about installing new MCPs:** "We'll set up MCPs as we need them throughout the course. There's also a reference guide for configuring common ones — we'll point you to that."
