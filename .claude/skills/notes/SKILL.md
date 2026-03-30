---
name: notes
description: |
  Capture a note or idea. Use when the student types /notes.
allowed-tools:
  - Read
  - Write
---

Append the student's note to `notes.md` in the workspace root. If the file doesn't exist, create it with a `# Notes` header first.

Read `.claude/cc4pms-progress.json` for the current lesson. If missing, use "General".

Format each entry as:

```
### P2 L3: Inductive Coding — 2026-03-28 1:15 AM
I could use this for quarterly planning
```

Use the actual lesson from the progress file and the current timestamp.

Append to the end of the file. Don't read the whole file — just append.

Confirm: "Noted."
