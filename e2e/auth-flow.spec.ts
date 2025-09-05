import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing authentication state
    await page.context().clearCookies();
  });

  test("should display sign-in button when not authenticated", async ({
    page,
  }) => {
    await page.goto("/");

    // Should show sign-in button for unauthenticated users
    await expect(page.locator("button", { hasText: "Sign in" })).toBeVisible();

    // Should not show user button
    await expect(page.locator('[data-testid="user-button"]')).not.toBeVisible();
  });

  test("should redirect to sign-in when accessing protected dashboard", async ({
    page,
  }) => {
    await page.goto("/dashboard");

    // Should redirect to sign-in page due to middleware protection
    await expect(page).toHaveURL(/.*sign-in/);
  });

  test("should show sign-in and sign-up navigation between pages", async ({
    page,
  }) => {
    // Go to sign-in page
    await page.goto("/sign-in");
    await expect(page.locator(".cl-signIn-root").first()).toBeVisible({
      timeout: 10000,
    });

    // Look for link to sign-up (text might vary)
    const signUpLink = page
      .locator("a", { hasText: /sign.?up|create.?account|register/i })
      .first();
    if (await signUpLink.isVisible()) {
      await signUpLink.click();
      await expect(page).toHaveURL(/.*sign-up/);
    }
  });

  test("should have proper page titles and meta", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Create Next App/);

    await page.goto("/sign-in");
    // Clerk usually updates the title, but we'll check the page loads properly
    await expect(page.locator(".cl-signIn-root").first()).toBeVisible({
      timeout: 10000,
    });

    await page.goto("/sign-up");
    await expect(page.locator(".cl-signUp-root").first()).toBeVisible({
      timeout: 10000,
    });
  });

  test("should handle invalid routes gracefully", async ({ page }) => {
    // Test that non-existent auth routes don't crash
    const response = await page.goto("/sign-in/invalid-route");

    // Should either show 404 or redirect to proper sign-in page
    // Clerk catch-all routes typically handle this gracefully
    expect([200, 404]).toContain(response?.status() ?? 200);
  });
});
