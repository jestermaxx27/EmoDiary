# EmoDiary

AI-powered personal journaling app that analyzes mood from text, tracks emotional trends, and provides
actionable improvement tips.


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
make the project open source.

Where to look

- `app/` — Next.js app routes, pages, and API endpoints (see `app/api/analyze-emotion/route.ts`)
- `components/` — UI components like `emotion-trends.tsx`, `journal-history.tsx`, and `emotion-display.tsx`
- `lib/` — helpers for auth, journal storage, and prisma utilities
- `prisma/schema.prisma` — database schema

Contact / support

If you'd like, I can help:

- Add badges for CI and code coverage
- Create a `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`
- Add GitHub Actions for linting and tests

---

If you'd like any section expanded, or prefer a shorter landing README for GitHub, tell me which tone
you prefer (concise, developer-focused, or marketing-focused) and I'll update it.
