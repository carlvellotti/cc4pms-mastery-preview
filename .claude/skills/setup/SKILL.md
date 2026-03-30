---
name: setup
description: |
  Set up the CC4PMs course environment. Configures status line, spinner verbs,
  spinner tips, startup announcement, and student config. Run once after cloning the repo.
  Use when the student types /setup.
allowed-tools:
  - Read
  - Write
  - Bash
  - AskUserQuestion
---

## CC4PMs Course Setup

Welcome the student and tell them this will take about a minute. It configures their Claude Code environment for the course.

## Steps

### 1. Ask their name

Ask: **"What's your name?"**

### 2. Generate student ID and write config

Generate a random student ID like `student-` followed by 5 random alphanumeric characters.

Write to `.claude/cc4pms-config.json` with EXACTLY these key names:

```json
{
  "student_id": "student-XXXXX",
  "name": "Their Name"
}
```

The keys MUST be `student_id` and `name` — not `student_name` or any other variation.

### 3. Reset progress file

Read `.claude/cc4pms-progress.json` first, then write `{}` to it. This ensures a clean slate.

### 4. Copy the status line hook

Copy the status line script to the user's global hooks directory:

```bash
mkdir -p ~/.claude/hooks
cp .claude/hooks/cc4pms-statusline.js ~/.claude/hooks/cc4pms-statusline.js
```

### 5. Update user settings

Read `~/.claude/settings.json` first. Then check for existing customizations before merging:

**Check these keys and ask before overwriting:**
- If `spinnerVerbs` already exists with custom verbs, show them and ask: "You've got custom spinner verbs set up. Want to keep yours or switch to the course ones?"
- If `statusLine` already exists, ask: "You have a status line configured. Want to keep yours or use the course one for the duration of the course?"

**For keys the student agrees to update (or that don't exist yet), merge in:**

```json
{
  "statusLine": {
    "type": "command",
    "command": "node ~/.claude/hooks/cc4pms-statusline.js"
  },
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": [
      "productmanagerizing",
      "stakeholdering",
      "deprioritizing",
      "roadmappin'",
      "dogfooding",
      "backloggin'",
      "PRDing",
      "RICE scoring",
      "edge casin'",
      "scope creepin'",
      "standuping",
      "putting a pin in it",
      "boiling the ocean",
      "sandbagging estimates",
      "padding the timeline",
      "herding cats",
      "blockers unblocking",
      "saying no to sales",
      "pretending to check jira",
      "aligning the alignment",
      "strategizing the strategy",
      "reprioritizing the priorities",
      "estimating the estimate",
      "stakeholder whispering",
      "aligning on what alignment means",
      "prealigning the prealignment",
      "calendar tetris",
      "creating another source of truth",
      "digging through ancient slack",
      "explaining why it is not just a button",
      "explaining why v1 still needs backend",
      "explaining why the estimate changed",
      "story point astrology",
      "pretending this was always the plan",
      "pretending the roadmap is real",
      "doing napkin math",
      "slapping ai on it",
      "ignoring tech debt",
      "begging eng for an estimate",
      "saying it depends",
      "low hanging fruit harvesting",
      "synergizing the synergies",
      "circling back on the circling back"
    ]
  },
  "spinnerTipsOverride": {
    "excludeDefault": true,
    "tips": [
      "Use /give-feedback to share what's working (or not)",
      "Use /notes to capture ideas for your real work",
      "Use /recap to review what you've covered so far",
      "Use /progress to see where you are in the course",
      "Use /reference to open the docs site"
    ]
  },
  "companyAnnouncements": [
    "🥞 CC4PMs Mastery │ /reference for syllabus"
  ]
}
```

**IMPORTANT:** Do NOT overwrite existing settings. Read the file first, merge these keys in, and write the result back. If a key like `hooks` or `enabledPlugins` already exists, keep it.

### 6. Confirm

Tell the student:

```
🥞 You're all set!

  ✓ Created your student profile
  ✓ Installed the course status line
  ✓ Configured custom spinner text
  ✓ Set up course navigation tips
```
