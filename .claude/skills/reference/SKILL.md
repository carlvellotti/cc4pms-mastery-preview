---
name: reference
description: |
  Open the CC4PMs reference documentation. Use when the student types /reference,
  optionally with a topic like /reference skills or /reference funnel analysis.
allowed-tools:
  - Bash
  - Read
  - Grep
  - Glob
---

## How This Works

The reference site is a built MkDocs site at `.claude/skills/reference/site/`. Open pages in the browser with `open <path>`.

## Behavior

### 1. No arguments, during a lesson

If the student is in an active lesson (you know this from conversation context), open the primary reference page for that lesson. You already know what lesson is active because the lesson skill is loaded. Use your knowledge of the lesson topic to pick the most relevant page.

### 2. No arguments, no active lesson

Open the home page:

```bash
open .claude/skills/reference/site/index.html
```

Tell the student: "Reference docs are open. Browse by section or try `/reference [topic]` to jump to a specific page."

### 3. With arguments (e.g., `/reference skills` or `/reference funnel analysis`)

Search for matching pages:

1. First, search filenames in the site directory:
```bash
find .claude/skills/reference/site -name "*.html" | grep -i "<search_term>"
```

2. If no filename match, grep inside HTML files for the search term in title tags:
```bash
grep -ril "<search_term>" .claude/skills/reference/site --include="*.html" -l
```

3. **One clear match**: Open it and tell the student what page you opened.

4. **Multiple matches**: List the top 3-5 matches with their page names and ask which one they want. Example:
   - "I found a few pages that might be what you're looking for:"
   - "1. Building Skills (reference/skills/building.html)"
   - "2. Skill Types (reference/skills/skill-types.html)"
   - "Which one?"

5. **No matches**: Tell the student you didn't find a match and suggest they browse the home page. Open the home page.

## Opening a page

Always use:
```bash
open .claude/skills/reference/site/<path>
```

After opening, briefly tell the student what page you opened (one sentence, not a summary of the page).
