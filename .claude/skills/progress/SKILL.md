---
name: progress
description: |
  Show course progress — current lesson and overall position. Use when the student types /progress.
allowed-tools:
  - Read
---

Read `.claude/cc4pms-progress.json` for the current lesson.

Show a quick snapshot:

```
🥞 CC4PMs Progress
━━━━━━━━━━━━━━━━━

Current: Research L3 — Inductive Coding (~20 min remaining)

Modules:
  Core       Advanced Claude Code        ✓
  Research   Research & Discovery        ← you are here (lesson 3 of 6)
  Builder    The Builder
  Data       Data & Decisions
  Docs       Documents & Communication
  🧠  Skills Module
  🏠  Personal OS
  🏢  Org OS
```

Use the actual lesson from the progress file. Mark completed modules with ✓ if that info is in the progress file. Otherwise just show the current lesson with an arrow.

For time remaining, estimate based on the lesson — most lessons are 30-60 minutes. Give a rough estimate based on how far through the conversation they appear to be.

End with: "Any questions before we get back to it?"
