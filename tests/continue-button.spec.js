import { test, expect } from '@playwright/test';

test('Check Continue button on UniMelb PPC page', async ({ page }) => {
  const landingUrl = 'https://online.unimelb.edu.au/ppc/master-education';

  // Continue button
  const continueButton = page.getByRole('button', { name: /continue/i });

  // Temporary next step selector (update later)
  const nextStepIndicator = page.locator('input[name="email"], input[name="phone"]');

  await page.goto(landingUrl, { waitUntil: 'networkidle' });

  await expect(continueButton).toBeVisible({ timeout: 8000 });

  await continueButton.click();

  await expect(nextStepIndicator).toBeVisible({ timeout: 10000 });
});
