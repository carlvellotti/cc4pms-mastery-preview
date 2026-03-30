---
name: quiz-me
description: |
  Quiz the student on what they just learned. Generates 3-5 questions based on
  the current lesson conversation. Use when the student types /quiz-me.
allowed-tools:
  - AskUserQuestion
  - Read
---

Read `.claude/cc4pms-progress.json` to know which lesson the student just completed.

Generate 3-5 quiz questions based on what was covered in the current conversation. Don't pull from the SKILL.md — use what the student actually experienced.

Mix three types of questions:
- **Conceptual:** Tests understanding of a key idea ("When should you use X vs Y?")
- **Applied:** Tests ability to use the concept in a scenario ("You have situation Z — what do you do?")
- **Classification:** Tests ability to categorize or sort ("Which of these belongs in A vs B?")

Deliver questions one at a time using AskUserQuestion. After each answer:
- If correct: brief confirmation, maybe add a nuance they might not have considered
- If wrong: explain why the right answer is right — don't just say "incorrect"

After all questions, give a quick summary: "You got X out of Y. [React naturally based on how they did.]"

Keep it light. This is a check-in, not an exam.
