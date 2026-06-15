const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const content = fs.readFileSync('pages/fundamentos/architecture.html', 'utf8');
  
  // Find DATA APIS ARCHITECTURE xml
  const match = content.match(/DATA APIS ARCHITECTURE.*?data-mxgraph="([^"]+)"/s);
  if (!match) {
    console.log("Could not find diagram JSON");
    process.exit(1);
  }
  
  const jsonStr = match[1].replace(/&quot;/g, '"');
  const data = JSON.parse(jsonStr);
  const xmlEncoded = data.xml;
  
  const result = await page.evaluate((xmlEnc) => {
    try {
      const xmlDecoded = decodeURIComponent(xmlEnc);
      const doc = new DOMParser().parseFromString(xmlDecoded, "text/xml");
      if (doc.documentElement.nodeName === 'parsererror') {
        return { error: true, message: doc.documentElement.textContent };
      }
      return { error: false, nodeName: doc.documentElement.nodeName };
    } catch(e) {
      return { error: true, message: e.toString() };
    }
  }, xmlEncoded);
  
  console.log("DOMParser result:", result);
  await browser.close();
})();
