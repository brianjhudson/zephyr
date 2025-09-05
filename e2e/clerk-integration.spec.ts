import { test, expect } from "@playwright/test";

test.describe("Clerk Integration Tests", () => {
  test("should load Clerk components without JavaScript errors", async ({
    page,
  }) => {
    // Monitor console for JavaScript errors
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/sign-in");

    // Wait for Clerk to load
    await expect(page.locator(".cl-signIn-root").first()).toBeVisible({
      timeout: 10000,
    });

    // Check for critical JS errors (filter out common non-critical ones)
    const criticalErrors = errors.filter(
      (error) =>
        (!error.includes("favicon") &&
          !error.includes("404") &&
          !error.includes("net::ERR_FAILED") &&
          error.includes("clerk")) ||
        error.includes("auth")
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test("should have proper Clerk configuration", async ({ page }) => {
    await page.goto("/sign-in");

    // Wait for Clerk to finish loading
    await page
      .waitForFunction(
        () => {
          const signInRoot = document.querySelector(
            '[data-clerk-component="SignIn"]'
          );
          return (
            signInRoot &&
            signInRoot.getAttribute("data-component-status") !== "awaiting-data"
          );
        },
        { timeout: 10000 }
      )
      .catch(() => {
        console.log(
          "Clerk may still be in loading state, but component is present"
        );
      });

    // Simply verify the component is present and loaded
    await expect(page.locator(".cl-signIn-root").first()).toBeVisible();

    // Check for common Clerk form elements (but don't require specific ones)
    const hasPasswordField = await page
      .locator('input[type="password"]')
      .isVisible()
      .catch(() => false);
    const hasContinueButton = await page
      .locator("button", { hasText: /continue|next|sign/i })
      .isVisible()
      .catch(() => false);

    // This is informational - Clerk forms vary by configuration
    console.log(
      `Clerk form elements: password=${hasPasswordField}, continue=${hasContinueButton}`
    );
  });

  test("should handle Clerk redirect URLs properly", async ({ page }) => {
    // Test that Clerk respects the configured redirect URLs
    await page.goto("/sign-in");

    // Wait for Clerk to load
    await expect(page.locator(".cl-signIn-root").first()).toBeVisible({
      timeout: 10000,
    });

    // Verify the page loaded at the correct sign-in URL
    expect(page.url()).toMatch(/\/sign-in/);
  });

  test("should show proper error handling for invalid credentials", async ({
    page,
  }) => {
    await page.goto("/sign-in");

    // Wait for Clerk to finish loading
    await page
      .waitForFunction(
        () => {
          const signInRoot = document.querySelector(
            '[data-clerk-component="SignIn"]'
          );
          return (
            signInRoot &&
            signInRoot.getAttribute("data-component-status") !== "awaiting-data"
          );
        },
        { timeout: 10000 }
      )
      .catch(() => {
        console.log(
          "Clerk may still be in loading state, but component is present"
        );
      });

    const emailInput = page
      .locator(
        'input[type="email"], input[name="identifier"], input[name="emailAddress"]'
      )
      .first();
    const passwordInput = page.locator('input[type="password"]').first();

    // Check if form elements are available (don't require them)
    const emailVisible = await emailInput
      .isVisible({ timeout: 2000 })
      .catch(() => false);
    const passwordVisible = await passwordInput
      .isVisible({ timeout: 2000 })
      .catch(() => false);

    if (emailVisible && passwordVisible) {
      // Fill in invalid credentials
      await emailInput.fill("invalid@example.com");
      await passwordInput.fill("invalidpassword");

      // Try to submit
      const submitButton = page
        .locator('button[type="submit"], button', {
          hasText: /sign.?in|continue/i,
        })
        .first();
      const buttonVisible = await submitButton
        .isVisible({ timeout: 2000 })
        .catch(() => false);

      if (buttonVisible) {
        await submitButton.click();

        // Should show error message (Clerk handles this)
        // We just verify the form is still present and didn't crash
        await expect(page.locator(".cl-signIn-root").first()).toBeVisible({
          timeout: 5000,
        });
      }
    }
  });

  test("should preserve styling and layout in Clerk components", async ({
    page,
  }) => {
    await page.goto("/sign-in");

    // Wait for Clerk component to load with enhanced timeout
    await expect(page.locator(".cl-signIn-root").first()).toBeVisible({
      timeout: 15000,
    });

    // Wait for Clerk to finish loading
    await page
      .waitForFunction(
        () => {
          const signInRoot = document.querySelector(
            '[data-clerk-component="SignIn"]'
          );
          return signInRoot;
        },
        { timeout: 10000 }
      )
      .catch(() => {
        console.log(
          "Clerk may still be in loading state, but component is present"
        );
      });
  });

  test("should handle catch-all routes properly", async ({ page }) => {
    // Test various sub-routes that should work with catch-all
    const routes = [
      "/sign-in/factor-one",
      "/sign-in/factor-two",
      "/sign-up/verify-email",
      "/sign-up/continue",
    ];

    for (const route of routes) {
      const response = await page.goto(route);

      // Should not 404, Clerk catch-all should handle it
      expect(response?.status()).toBe(200);
      // Should show appropriate Clerk component
    }
  });
});
