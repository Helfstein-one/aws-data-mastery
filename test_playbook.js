const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`BROWSER ERROR: ${msg.text()}`);
    } else {
      console.log(`BROWSER LOG: ${msg.text()}`);
    }
  });

  page.on('pageerror', exception => {
    console.log(`UNCAUGHT EXCEPTION: ${exception}`);
  });

  const url = 'file://' + path.resolve(__dirname, 'pages/fundamentos/architecture.html');
  console.log('Navigating to', url);
  await page.goto(url, { waitUntil: 'networkidle' });

  // wait a bit for drawio to finish
  await page.waitForTimeout(3000);

  // check if any svg was rendered in the first diagram
  const svgCount = await page.evaluate(() => {
    return document.querySelectorAll('.mxgraph svg').length;
  });
  console.log(`Found ${svgCount} SVGs in .mxgraph elements`);

  await browser.close();
})();
