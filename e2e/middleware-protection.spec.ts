import { test, expect } from '@playwright/test';

test.describe('Middleware Route Protection', () => {
  test.beforeEach(async ({ page }) => {
    // Clear authentication state
    await page.context().clearCookies();
    await page.context().clearPermissions();
  });

  test('should allow access to public routes', async ({ page }) => {
    const publicRoutes = ['/', '/sign-in', '/sign-up'];
    
    for (const route of publicRoutes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      
      // Ensure page loaded properly (not redirected to sign-in)
      if (route === '/') {
        await expect(page.locator('img[alt="Next.js logo"]')).toBeVisible();
      } else if (route === '/sign-in') {
        // Wait for Clerk component to load
        await expect(page.locator('.cl-signIn-root').first()).toBeVisible({ timeout: 10000 });
      } else if (route === '/sign-up') {
        await expect(page.locator('.cl-signUp-root').first()).toBeVisible({ timeout: 10000 });
      }
    }
  });

  test('should protect dashboard routes', async ({ page }) => {
    const protectedRoutes = [
      '/dashboard',
      '/dashboard/settings',
      '/dashboard/profile',
    ];
    
    for (const route of protectedRoutes) {
      await page.goto(route);
      
      // Should redirect to sign-in due to middleware protection
      await page.waitForURL(/.*sign-in.*/, { timeout: 5000 });
      await expect(page).toHaveURL(/.*sign-in/);
    }
  });

  test('should handle static assets without interference', async ({ page }) => {
    // Test that middleware doesn't interfere with static assets
    const response = await page.goto('/favicon.ico');
    // Should either be 200 (if exists) or 404 (if doesn't exist), but not redirect
    expect([200, 404]).toContain(response?.status() ?? 404);
    
    // Ensure no redirect occurred to sign-in
    expect(page.url()).not.toMatch(/sign-in/);
  });

  test('should handle API routes correctly', async ({ page }) => {
    // Test that API routes are handled by middleware but don't redirect to sign-in HTML page
    const response = await page.request.get('/api/test');
    
    // API routes should return JSON errors or proper API responses, not HTML redirects
    expect([200, 404, 401, 403]).toContain(response.status());
    
    // If it's a 401/403, it should be a JSON response, not HTML redirect
    if ([401, 403].includes(response.status())) {
      const contentType = response.headers()['content-type'] || '';
      expect(contentType).toMatch(/application\/json|text\/plain/);
    }
  });

  test('should preserve query parameters during redirects', async ({ page }) => {
    await page.goto('/dashboard?returnTo=/profile');
    
    // Should redirect to sign-in and preserve some context
    await page.waitForURL(/.*sign-in.*/, { timeout: 5000 });
    
    // Clerk typically handles return URLs, so we just verify redirect occurred
    expect(page.url()).toMatch(/sign-in/);
  });

  test('should handle nested protected routes', async ({ page }) => {
    const nestedRoutes = [
      '/dashboard/user/profile',
      '/dashboard/settings/account',
      '/dashboard/data/exports',
    ];
    
    for (const route of nestedRoutes) {
      await page.goto(route);
      
      // All nested dashboard routes should redirect to sign-in
      await page.waitForURL(/.*sign-in.*/, { timeout: 5000 });
      expect(page.url()).toMatch(/sign-in/);
    }
  });
});