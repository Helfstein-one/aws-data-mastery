const fs = require('fs');
const html = fs.readFileSync('pages/engenharia/ingestion.html', 'utf8');
const match = html.match(/data-mxgraph='(.*?)'/);
if (match) {
    try {
        const jsonStr = match[1];
        const data = JSON.parse(jsonStr);
        console.log("Parsed JSON correctly.");
        console.log("XML length:", data.xml.length);
    } catch (e) {
        console.error("JSON parse error:", e);
    }
}
