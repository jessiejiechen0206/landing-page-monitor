const { chromium } = require('playwright');
const nodemailer = require('nodemailer');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://online.unimelb.edu.au/ppc/master-education');

    // Fill in first page of lead form
    await page.selectOption('select[name="study"]', 'Master of Education'); // "What would you like to study"
    await page.selectOption('select[name="qualifiedTeacher"]', 'Yes');      // "Are you a qualified teacher"
    await page.fill('input[name="firstName"]', 'Test');                      // First name
    await page.fill('input[name="lastName"]', 'User');                       // Last name

    // Click Continue
    await page.click('button#continue'); // Update selector if needed

    // Wait/check for second step
    const secondStepVisible = await page.isVisible('form#step2'); // Update selector to second step
    if (!secondStepVisible) {
      console.log('ALERT: Second step did not load!');

      // Optional: email alert
      /*
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: 'your-email@example.com',
        subject: 'Lead Form Monitoring Alert',
        text: 'The second step of the form did not load!'
      });
      */
    } else {
      console.log('Second step loaded successfully.');
    }

  } catch (err) {
    console.error('Error during monitoring:', err);
  } finally {
    await browser.close();
  }
})();
