const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Define viewport to capture a good desktop preview
  await page.setViewportSize({ width: 1440, height: 1080 });

  // Use file:// protocol with absolute path to load the local index.html
  const filePath = path.join(__dirname, 'index.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle' });

  // Optional: wait a moment for any animations or fonts to settle
  await page.waitForTimeout(1000);

  // Take screenshot and save
  const screenshotPath = path.join(__dirname, 'assets/images/aws-data-mastery-preview.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log('Screenshot updated at', screenshotPath);
  await browser.close();
})();
