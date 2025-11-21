const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Load the PPC page
    await page.goto("https://online.unimelb.edu.au/ppc/master-education", {
      waitUntil: "networkidle"
    });

    // Select "Master of Education" from the first question
    await page.selectOption('select[name="courseid"]', '25');

    // Click Continue button
    await page.click('#edit-actions-02-wizard-next');

    // Wait for Step 2 (the email/name form)
    await page.waitForSelector('form#step-2', { timeout: 5000 });

    console.log("SUCCESS: Continue button is working.");
  } catch (err) {
    console.error("ERROR: Something broke:", err);
    process.exit(1); // Marks the job as failed → GitHub emails you
  } finally {
    await browser.close();
  }
})();
