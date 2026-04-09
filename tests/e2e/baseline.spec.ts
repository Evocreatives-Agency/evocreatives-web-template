import { test, expect } from '@playwright/test';

// ─────────────────────────────────────────
// BASELINE TESTS — run on every project
// Replace CLIENT_NAME and expected text
// ─────────────────────────────────────────

const CLIENT_NAME = process.env.CLIENT_NAME || 'My Client';

test.describe('Core pages load', () => {
  test('homepage loads with 200 status', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('homepage has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(new RegExp(CLIENT_NAME, 'i'));
  });

  test('no console errors on homepage', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });
});

test.describe('Navigation', () => {
  test('nav links are visible and clickable', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    const links = nav.locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('no broken internal links on homepage', async ({ page }) => {
    await page.goto('/');
    const links = await page.locator('a[href^="/"]').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (!href || href === '#') continue;
      const res = await page.request.get(href);
      expect(res.status(), `Broken link: ${href}`).toBeLessThan(400);
    }
  });
});

test.describe('Mobile responsiveness', () => {
  test('page is usable at 375px (iPhone SE)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    // No horizontal scroll
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(375 + 5); // 5px tolerance
  });

  test('images have alt text (accessibility)', async ({ page }) => {
    await page.goto('/');
    const imgs = await page.locator('img').all();
    for (const img of imgs) {
      const alt = await img.getAttribute('alt');
      expect(alt, 'Image missing alt attribute').not.toBeNull();
    }
  });
});

test.describe('Performance basics', () => {
  test('page loads within 5 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(5000);
  });
});

test.describe('Contact / Forms', () => {
  test('contact form exists and accepts input', async ({ page }) => {
    // Try /contact first, fall back to homepage form
    let formPage = '/contact';
    const res = await page.request.get('/contact');
    if (res.status() === 404) formPage = '/';

    await page.goto(formPage);
    const form = page.locator('form').first();
    const formExists = await form.isVisible().catch(() => false);
    if (!formExists) {
      test.skip(); // No form on this project
      return;
    }

    // Fill any name/email fields found
    const nameField = form.locator('input[name*="name"], input[placeholder*="name" i]').first();
    const emailField = form.locator('input[type="email"]').first();

    if (await nameField.isVisible()) await nameField.fill('Test User');
    if (await emailField.isVisible()) await emailField.fill('test@example.com');
  });
});
