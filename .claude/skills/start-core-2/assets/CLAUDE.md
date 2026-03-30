# TaskFlow Development & Product Workspace

## Project Overview
TaskFlow is a modern project management tool for teams who've outgrown basic tools but find Jira too heavy and Asana too shallow. We target mid-market companies (50-500 employees). Currently ~120 paying teams, 85% retention rate.

## Tech Stack
- Frontend: React 18 with TypeScript strict mode
- Backend: Node.js with Express, PostgreSQL
- Hosting: AWS (ECS + RDS + CloudFront)
- CI/CD: GitHub Actions
- Monitoring: Datadog + Sentry

## Code Conventions
- Use TypeScript strict mode everywhere
- Components use PascalCase, utilities use camelCase
- All API endpoints follow RESTful conventions
- Use kebab-case for file names (feature-brief.md not Feature_Brief.md)
- Run `npm run lint && npm run test` before committing
- PR descriptions must include "Testing" and "Screenshots" sections
- Never use `any` type — use `unknown` with type guards
- Prefer named exports over default exports
- CSS modules over styled-components
- Always add JSDoc comments to public functions

## Product Context
Sweet spot: powerful enough for engineering-led orgs, clean enough that non-technical teammates actually use it.

Current focus is v3.0 for Q2:
- Enterprise SSO (SAML/OIDC)
- Advanced reporting dashboard
- Custom workflow builder
- Bulk Operations API v2

## Team
- Sarah Chen — Engineering lead. Wants detailed specs and explicit acceptance criteria. Prefers written communication. Reviews PRs within 24 hours.
- Marcus Rivera — Designer. Async-first: Slack and Loom over meetings. Strong opinions about component consistency.
- Priya Sharma — Data analyst. New to the team, still ramping on the product. Be patient with her questions.
- Jordan Park — VP Product. My boss. Wants weekly status updates by Friday EOD.
- DevOps: Jake handles deployments, on-call rotation is in #ops-oncall
- QA: Maria runs regression suite before releases

## Git Workflow
- Feature branches off `main`
- Squash merge only
- Branch naming: `feat/`, `fix/`, `chore/`
- Always rebase before merging
- Tag releases with semver

## Database Rules
- All migrations must be reversible
- No raw SQL in application code — use the ORM
- Index any column used in WHERE clauses
- Soft delete only — never hard delete user data

## API Design
- Version all endpoints: /api/v2/...
- Use pagination for list endpoints (default 50, max 200)
- Rate limiting: 100 req/min for free tier, 1000 for paid
- Always return consistent error format: { error: { code, message, details } }

## Testing
- Unit tests required for all business logic
- Integration tests for API endpoints
- E2E tests for critical user flows (login, project creation, task management)
- Coverage target: 80% for new code

## Competitive Landscape
Main competitors: Jira (enterprise, heavy), Asana (consumer-ish, shallow), Monday.com (marketing-focused), Linear (dev-focused, fast). Our positioning: the "Goldilocks" tool.

## Preferences
- Be funny. Dry wit preferred over dad jokes.
- Be concise and direct. No corporate jargon.
- Use "TaskFlow" — not "Taskflow" or "Task Flow".
- Always run prettier before showing code
- Use American English spelling
- Dates in YYYY-MM-DD format

## Meeting Cadence
- Monday: Sprint planning (10am, 45min)
- Tuesday: Design review with Marcus (2pm, 30min)
- Wednesday: 1:1 with Jordan (11am, 30min)
- Thursday: Engineering sync (10am, 30min)
- Friday: Stakeholder update due by EOD

## Key Links
- Figma: figma.com/team/taskflow
- Jira: taskflow.atlassian.net
- Docs: docs.taskflow.io
- Analytics: analytics.taskflow.io
- Staging: staging.taskflow.io
