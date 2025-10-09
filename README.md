# EmoDiary
AI-powered personal journaling web app that analyzes free-text journal entries, surfaces mood trends,
and provides evidence-based improvement suggestions.

Project snapshot
----------------

- Role: Full-stack developer (design, implementation, and deployment)
- Stack: Next.js (App Router) · TypeScript · React · Prisma · Node.js · Git
- Repository: https://github.com/aditya-r-0027/EmoDiary

One-line description
--------------------

EmoDiary uses server-side AI analysis to extract emotion metadata from journal entries, stores structured
results with Prisma, and visualizes emotional trends in a responsive, accessible UI.

Key responsibilities / accomplishments
------------------------------------

- Designed and implemented the Next.js application architecture, App Router routes, and server API for
	emotion analysis.
- Built reusable React components for journal entry input, emotion display, and trends visualization.
- Integrated Prisma with a relational schema and migrations for reliable storage of entries and users.
- Implemented authentication and secure server-side handlers to keep user data private.
- Managed full Git workflow, prepared the project for deployment, and maintained a clean, documented
	repository suitable for demos and interviews.

Selected technical highlights
-----------------------------

- Server API: `app/api/analyze-emotion/route.ts` — performs AI-backed analysis and returns structured
	emotion tags and confidence scores.
- Components: `components/emotion-display.tsx`, `components/emotion-trends.tsx`, `components/journal-history.tsx`.
- Persistence: `prisma/schema.prisma` (entries, users) + Prisma Client usage in server routes.
- Tooling: TypeScript types, linting scripts, and package management via pnpm/npm.

How to reference this project on a resume
----------------------------------------

EmoDiary — AI-powered journaling web app (Next.js, TypeScript, Prisma). Implemented end-to-end emotion
analysis, secure data storage, and trends visualization; prepared and deployed repository for demo and
interview use.

Contact / Demo
--------------

View the code: https://github.com/aditya-r-0027/EmoDiary

If you want, I can add a short demo GIF or a single-line usage example for the repo landing page.

Overview

EmoDiary is a Next.js + TypeScript application that helps users capture journal entries and get
AI-powered emotion analysis. Entries are stored with Prisma and surfaced through an opinionated UI
that includes a history viewer, emotion display components, and a toolkit for mood improvement.

Key features

- Write and save private journal entries
- AI emotion analysis endpoint (server-side) to extract mood and sentiment
- Visualize trends over time with reusable components
- Simple authentication and local storage helpers

Tech stack

- Next.js (App Router) + TypeScript
- React components in `components/`
- Prisma for database schema and migrations
- Server API routes in `app/api/`

Quick start (development)

Prerequisites

- Node.js 18+ (or the version specified in `package.json`)
- pnpm or npm (pnpm recommended)
- A GitHub repo is optional — this project is already configured to deploy to Vercel

Install

Open PowerShell in the project root and run:

```powershell
# install dependencies (choose one)
pnpm install
# or
npm install
```

Run the development server

```powershell
pnpm dev
# or
npm run dev
```

Environment variables

Create a `.env` file in the project root and add any provider keys you need. Common variables used:

- DATABASE_URL — Prisma database connection string
- NEXT_PUBLIC_VERCEL_URL — (optional) public URL for deployments
- OPENAI_API_KEY or other AI provider keys (if the project uses an external AI service)

Prisma (database)

If you configure `DATABASE_URL`, run Prisma migrations and generate the client:

```powershell
npx prisma migrate dev --name init
npx prisma generate
```

Testing & linting

If tests or linters are present you can run them with npm scripts (see `package.json`).

Deployment

The app is ready to deploy to Vercel. Link the repo in the Vercel dashboard and use the default build
settings (`pnpm build` / `npm run build`) and `pnpm start` / `npm run start` for production preview.

Contributing

Contributions are welcome. A good workflow is:

1. Fork the repo
2. Create a topic branch (feature/fix)
3. Open a Pull Request describing your changes

If you want, I can add a CONTRIBUTING.md with a PR checklist and code style guidelines.

Security

- Do not commit secrets or API keys. Use environment variables and secret management in your
	deployment platform (Vercel/GitHub Actions).

License

This repository does not include a license file. Add a `LICENSE` file (for example MIT) if you want to
