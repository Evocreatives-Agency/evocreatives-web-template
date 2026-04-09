# Claude Prompt Library — Piaazo Agency
> Copy-paste these prompts. Replace [BRACKETED] values.

---

## 1. PROJECT KICK-OFF

### Scaffold a new page
```
You are a senior Next.js 14 developer using the App Router.
Create a [PAGE_TYPE] page for [CLIENT_NAME], a [BUSINESS_TYPE].

Requirements:
- File: src/app/[route]/page.tsx
- Use TypeScript with proper types
- Mobile-first, accessible (WCAG 2.1 AA)
- No inline styles — use Tailwind utility classes
- Export a metadata object with title and description
- Include a loading.tsx skeleton component
- Performance: no layout shift, lazy-load images

The page should include: [LIST SECTIONS]
Brand colors: [PRIMARY] [SECONDARY]
Tone: [PROFESSIONAL/PLAYFUL/LUXURY/etc]
```

### Scaffold a component
```
Create a reusable React component: [COMPONENT_NAME]
- TypeScript, named export
- Props interface fully typed
- Tailwind classes only, no inline styles
- Accessible: proper aria labels, keyboard navigable
- Handles loading, error, and empty states
- Include a brief JSDoc comment

Props needed: [LIST PROPS]
```

---

## 2. TEST GENERATION

### Write Playwright tests for a page
```
Write Playwright tests for the [PAGE_NAME] page at route /[ROUTE].

The page contains:
- [DESCRIBE KEY ELEMENTS: nav, form, buttons, etc]

Write tests for:
1. Page loads with 200 status
2. Key headings/text visible
3. Any forms: fill and submit (intercept network, don't actually submit)
4. Mobile viewport (375px) has no horizontal scroll
5. No console errors on load
6. CTA buttons are clickable and have correct href

Use @playwright/test. TypeScript. Import from '../setup' if fixtures exist.
Group tests with test.describe. Use test.beforeEach for page navigation.
```

### Generate tests from code
```
Read this component code and write comprehensive Playwright E2E tests for it.
Focus on: user interactions, error states, accessibility, and edge cases.
Do NOT test implementation details — test behavior.

[PASTE COMPONENT CODE]
```

---

## 3. CODE REVIEW

### PR review
```
Review this pull request diff as a senior engineer.
Check for:
1. Security issues (XSS, injection, exposed secrets, insecure API calls)
2. Performance issues (unnecessary re-renders, missing memoization, large bundle)
3. Accessibility violations (missing aria, poor contrast, keyboard traps)
4. TypeScript issues (any types, missing error handling, improper types)
5. Next.js best practices (SSR vs CSR choice, image optimization, metadata)
6. SEO problems

For each issue: state severity (CRITICAL/HIGH/MEDIUM/LOW), location, and fix.

[PASTE DIFF OR CODE]
```

### Accessibility audit
```
Audit this page/component for WCAG 2.1 AA accessibility issues.
Check: color contrast, alt text, ARIA labels, keyboard navigation,
focus management, semantic HTML, screen reader compatibility.
Output as a prioritized list with code fixes.

[PASTE CODE]
```

---

## 4. DEBUGGING

### Fix a build/runtime error
```
I'm getting this error in my Next.js 14 App Router project:

ERROR:
[PASTE ERROR]

CONTEXT:
- File: [FILENAME]
- What I was doing: [DESCRIBE ACTION]
- Recent changes: [WHAT CHANGED]

[PASTE RELEVANT CODE]

Diagnose the root cause and provide the exact fix.
```

### Performance optimization
```
This Next.js page has a Lighthouse performance score of [SCORE].
The main issues are: [PASTE LIGHTHOUSE ISSUES]

Analyze and provide specific fixes for:
1. Core Web Vitals (LCP, FID, CLS)
2. Image optimization
3. Font loading strategy
4. JavaScript bundle size

[PASTE PAGE CODE]
```

---

## 5. DEPLOYMENT & OPS

### Write GitHub Actions workflow
```
Write a complete GitHub Actions CI/CD workflow for a Next.js 14 project.
Include:
- Build + type check on every push
- Playwright E2E tests (chromium + mobile)
- Lighthouse CI audit (fail if performance < 85)
- Deploy preview to Vercel on PR
- Deploy to production on merge to main
- Post preview URL as PR comment
- Cache npm dependencies

Secrets used: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
```

### Generate a client handoff report
```
Generate a professional website handoff report for client: [CLIENT_NAME]

Include sections:
1. Executive summary (what was built)
2. Live URLs (production + staging)
3. Performance scores (use these Lighthouse results: [PASTE])
4. How to make content updates
5. Hosting & billing (Vercel, domain registrar)
6. Support process (how to contact us)
7. What's NOT included in this scope

Tone: professional, clear, no jargon. Format as markdown.
```

---

## 6. SEO & CONTENT

### Generate metadata for a page
```
Write Next.js 14 metadata for this page:
- Page: [PAGE NAME]
- Client: [CLIENT NAME], [BUSINESS TYPE] in [CITY]
- Primary keyword: [KEYWORD]
- Secondary keywords: [LIST]
- Page content summary: [BRIEF SUMMARY]

Output: TypeScript metadata export with title, description, openGraph, twitter cards.
Title should be under 60 chars. Description under 155 chars.
```

### Structured data / schema
```
Generate JSON-LD structured data for:
- Entity type: [LocalBusiness/Article/Product/FAQ/etc]
- Business: [CLIENT NAME]
- Details: [KEY INFO]

Format as a Next.js Script component insertion in layout.tsx.
```

---

## 7. AGENCY SCALE

### Create client onboarding checklist
```
Create a technical onboarding checklist for a new web client: [CLIENT_NAME]
Business type: [TYPE]
Stack: Next.js 14 + Vercel + GitHub

Include checklist items for:
- Domain setup (DNS, SSL)
- Vercel project configuration
- Environment variables needed
- GitHub repo setup + branch protection
- Analytics setup (GA4)
- Error monitoring (Sentry)
- Uptime monitoring
- SEO baseline audit
- Accessibility audit
- Performance baseline (Lighthouse)
- Client CMS access (if applicable)
- Handoff documentation

Format as a markdown checklist with checkboxes.
```
