# EmoDiary

AI-powered personal journal to analyze moods, track trends, and get tailored improvement tips.

EmoDiary (a.k.a. Journal with mood detection) is a Next.js + TypeScript app that analyzes user journal
entries using an AI-backed server API, stores entries with Prisma, and visualizes mood trends. The app
includes authentication, a history viewer, a mood-improvement toolkit, and reusable UI components.

Badges and deployment

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/adityar2005business-3345s-projects/v0-journal-with-mood-detection)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/wfTJNbgds67)

Overview

This repository may be kept in sync with deployments from v0.app. Some users deploy from v0.app and have
their project automatically pushed here; if that's your workflow, deployment and sync instructions from
v0.app remain valid.

Deployment

Your project (if deployed) may be live at:

https://vercel.com/adityar2005business-3345s-projects/v0-journal-with-mood-detection

How it works

1. Create and modify the project (for example via v0.app)
2. Deploy your app
3. Changes can be pushed to this repository and redeployed via Vercel

Where to look in the codebase

- `app/` — Next.js app routes, pages, and API endpoints (see `app/api/analyze-emotion/route.ts`)
- `components/` — UI components like `emotion-trends.tsx`, `journal-history.tsx`, and `emotion-display.tsx`
- `lib/` — helpers for auth, storage, and Prisma setup
- `prisma/schema.prisma` — database schema for entries and users

If you prefer the original imported README content (from v0.app) or want a different structure, tell me and
I can revert or adapt the README accordingly.
