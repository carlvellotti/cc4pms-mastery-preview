---
name: meeting-cost
description: |
  Analyze the cost of meetings by reading a schedule file, estimating attendee
  salaries by role, and calculating total cost using a Python script. Then
  suggest ways to reduce meeting overhead. Use when someone says /meeting-cost
  or asks about meeting costs, meeting load, or calendar optimization.
allowed-tools:
  - Read
  - Bash
  - AskUserQuestion
---

# Meeting Cost Analyzer

Analyze a day's meetings to calculate what they actually cost in salary-hours, then suggest ways to reduce meeting overhead.

## Usage

```
/meeting-cost <path-to-schedule-file>
```

## Process

### 1. Read the schedule

Read the meeting schedule file the user provides. Parse out each meeting's name, duration, and attendees with their roles.

### 2. Calculate costs

Build a JSON object with this structure and pipe it to `calculate.py` (located in this skill's directory):

```json
{
  "meetings": [
    {
      "name": "Sprint Planning",
      "duration_minutes": 60,
      "attendees": [
        {"name": "Jordan Park", "role": "VP Product"},
        {"name": "Sarah Chen", "role": "Eng Lead"}
      ]
    }
  ]
}
```

Run: `echo '<json>' | python3 .claude/skills/meeting-cost/calculate.py`

### 3. Present the cost breakdown

Display the results as a clear table showing:
- Each meeting with duration, attendee count, and total cost
- The most expensive attendee in each meeting (by hourly rate)
- Daily grand total
- Total hours spent in meetings

### 4. Suggest descoping

Use AskUserQuestion to walk through optimization suggestions one at a time:

- **Meetings that could be async:** Identify status updates or info-sharing meetings that could be a Slack post or doc instead. Ask if the user wants to cut them.
- **Optional attendees:** Flag people who are in 3+ meetings or whose role suggests they're there "just in case." Ask if any could be removed.
- **Meetings that could be shorter:** Flag meetings over 30 minutes that might work in half the time. Ask about each.

After each decision, recalculate and show the savings.

### 5. Show the savings

Present a before/after comparison: original daily cost vs. optimized daily cost, with the total saved.
