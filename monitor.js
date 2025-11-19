const { chromium } = require('playwright');
const nodemailer = require('nodemailer');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://online.unimelb.edu.au/ppc/master-education');

    // Fill in form fields (update selectors & dummy data)
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '0412345678');

    // Select dropdown or radio if needed
    // await page.selectOption('select[name="program"]', 'Master of Education');

    // Click Continue
    await page.click('button#continue'); // update selector if needed

    // Wait for second step to appear
    const secondStepVisible = await page.isVisible('form#step2'); // update selector
    if (!secondStepVisible) {
      console.log('ALERT: Second step did not load!');

      // Send email alert (optional)
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
