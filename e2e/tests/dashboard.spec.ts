import { test, expect } from "@playwright/test";

test.describe("Dashboard E2E", () => {
  test("loads dashboard and counter works", async ({ page }) => {
    // Visit sign in page and authenticate (Devise)
    await page.goto("/users/sign_in");
    await page.fill('input[name="user[email]"]', "example@domain.com");
    await page.fill('input[name="user[password]"]', "Password123!");
    // Submit the sign in form
    await page.click(
      'input[type=submit], button[type=submit], button:has-text("Log in"), button:has-text("Sign in")'
    );

    // Wait for a flash or confirmation message then navigate to root explicitly
    await page
      .waitForSelector("text=Signed in successfully.", { timeout: 10_000 })
      .catch(() => {});
    await page.goto("/");

    // Now we should be on the authenticated dashboard
    const header = page.locator("h1", { hasText: "Welcome to Your Dashboard" });
    await expect(header).toBeVisible({ timeout: 20_000 });

    // Find the counter and buttons
    const count = page.locator("text=0").first();
    const plus = page.getByRole("button", { name: "+" });
    const minus = page.getByRole("button", { name: "-" });
    const reset = page.getByRole("button", { name: /Reset/i });

    await expect(count).toBeVisible();
    await plus.click();
    await expect(page.locator('//span[text()="1"]').first()).toBeVisible();
    await minus.click();
    await expect(page.locator('//span[text()="0"]').first()).toBeVisible();
    await reset.click();
    await expect(page.locator('//span[text()="0"]').first()).toBeVisible();
  });
});
