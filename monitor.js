const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://online.unimelb.edu.au/ppc/master-education');

    // Fill first page of lead form
    await page.selectOption('select[name="study"]', 'Master of Education');
    await page.selectOption('select[name="qualifiedTeacher"]', 'Yes');
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');

    // Click Continue
    await page.click('button#continue'); // Update selector if needed

    // Check if second step appears
    const secondStepVisible = await page.isVisible('form#step2'); // Update selector
    if (!secondStepVisible) {
      throw new Error('Second step of the lead form did not load!');
    }

    console.log('Second step loaded successfully.');

  } catch (err) {
    console.error(err);
    throw err; // This will make GitHub Actions mark the workflow as failed
  } finally {
    await browser.close();
  }
})();
