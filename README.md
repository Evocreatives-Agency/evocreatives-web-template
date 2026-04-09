# Evocreatives Agency — Web Project Template

> One-command project setup. Automated tests. Auto-deploy on push. Built for speed and repeatability.

## Quick Start (new client project)

```bash
# 1. Click "Use this template" on GitHub → create new repo
# 2. Clone it
git clone git@github.com:Evocreatives-Agency/client-name.git
cd client-name

# 3. Run setup (handles everything: deps, Vercel link, .env, initial commit)
npm run setup

# 4. Add the 3 GitHub Secrets (script will tell you what they are)
# VERCEL_TOKEN | VERCEL_ORG_ID | VERCEL_PROJECT_ID

# 5. Push to GitHub — the pipeline fires automatically
git push origin main
```

That's it. Your site is live on Vercel with tests, monitoring, and CI/CD active.

---

## What's included

| File | Purpose |
|------|----------|
| `.github/workflows/ci-deploy.yml` | Full CI/CD: build → E2E tests → Lighthouse → deploy |
| `playwright.config.ts` | Multi-browser E2E test config (Chrome, Firefox, mobile) |
| `tests/e2e/baseline.spec.ts` | Baseline tests that run on every project |
| `tests/stress/load.js` | k6 load/stress test script |
| `lighthouserc.json` | Performance + accessibility thresholds |
| `scripts/setup-project.js` | Interactive setup wizard |
| `PROMPTS.md` | Claude prompt library for dev, testing, reviews |
| `SOP-DASHBOARD.html` | Full interactive SOP — open in browser |
| `.env.example` | All environment variables documented |

---

## Pipeline overview

```
git push
    │
    ├─► Build (npm ci + next build)
    │
    ├─► E2E Tests (Playwright — Chrome + Firefox + iPhone)
    │       └─ Fail → blocks deploy
    │
    ├─► Lighthouse CI (Performance ≥ 85 | Accessibility ≥ 90)
    │       └─ Fail → blocks deploy
    │
    └─► Deploy
            ├─ PR → Vercel preview URL (posted as PR comment)
            └─ main → Vercel production
```

---

## Npm scripts

```bash
npm run setup          # First-time project setup wizard
npm run dev            # Local dev server
npm run build          # Production build
npm test               # Run Playwright tests
npm run test:ui        # Playwright with visual debugger
npm run lhci           # Run Lighthouse CI locally
npm run stress         # k6 smoke test (1 user)
npm run stress:load    # k6 load test (50 users)
npm run deploy:preview # Manual preview deploy
npm run deploy:production # Manual production deploy
```

---

## Required GitHub Secrets

| Secret | Where to get it |
|--------|----------------|
| `VERCEL_TOKEN` | vercel.com/account/tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after `vercel link` |

---

## Stack

- **Framework**: Next.js 14 (App Router)
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions
- **E2E Testing**: Playwright
- **Performance**: Lighthouse CI
- **Load Testing**: k6
- **Error Tracking**: Sentry
- **Uptime**: BetterStack
- **Analytics**: Vercel Analytics + Speed Insights

---

## SOP Reference

Open `SOP-DASHBOARD.html` in a browser for the full interactive SOP with checklists, commands, and the Claude prompt library.

---

*Evocreatives Agency · evocreatives.ca*
