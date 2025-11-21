const { test, expect } = require('@playwright/test');

test('Lead form Continue buttons work on all steps', async ({ page }) => {
  await page.goto('https://online.unimelb.edu.au/ppc/master-education', { timeout: 15000 });

  await page.selectOption('select[name="study"]', { index: 1 });
  await page.selectOption('select[name="qualifiedTeacher"]', { index: 1 });
  await page.fill('input[name="firstName"]', 'Test');
  await page.fill('input[name="lastName"]', 'Tester');
  await page.fill('input[name="email"]', 'test@example.com');

  await page.click('#edit-actions-02-wizard-next');

  await expect(page.locator('#edit-startdate--368wTsdtnD8')).toBeVisible({ timeout: 8000 });

  await page.selectOption('#edit-startdate--368wTsdtnD8', 'within 3 months');

  const dropdowns = await page.locator('select.form-select').all();
  for (let i = 1; i < dropdowns.length; i++) {
      await dropdowns[i].selectOption({ index: 1 }).catch(() => {});
  }

  await page.click('#edit-actions-02-wizard-next');
  await expect(page.locator('text=3 of 3')).toBeVisible({ timeout: 8000 });
});
