# TaskFlow Product Principles

## Our North Star

Make project management feel like a tool teams *want* to use, not one they're forced into. Every feature decision filters through: "Does this make the whole team more effective, or just the admin?"

## Design Principles

1. **Simple by default, powerful when needed.** Core workflows should require zero configuration. Advanced features are opt-in, never mandatory.

2. **The whole team uses it.** If non-technical teammates avoid the tool, the tool has failed. Every feature needs to work for engineering, design, and business stakeholders.

3. **Speed is a feature.** Page loads, search, task creation — everything should feel instant. We won't ship a feature that makes the product slower.

4. **Opinionated but not rigid.** We ship sensible defaults (sprint length, workflow states, notification rules) but let teams customize when they outgrow them.

5. **Data should flow, not sit.** Every piece of data in TaskFlow should be accessible via API, exportable, and connectable to the tools teams already use.

## What We Won't Do

- **Won't become Jira.** Configuration depth is not a goal. If a feature requires a dedicated admin to set up, we've gone too far.
- **Won't chase every vertical.** We're built for engineering-led product teams. Marketing project management, creative workflows, and HR onboarding are not our fight.
- **Won't sacrifice UX for enterprise checkboxes.** Enterprise features (SSO, audit logs, compliance) get built, but they don't get to make the product worse for everyone else.
