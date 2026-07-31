const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const pagesDir = path.join(__dirname, 'pages', 'financas');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

console.log('=== AUDITING SCRIPT TAGS IN ALL 9 FINANCE PAGES ===\n');

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    const html = fs.readFileSync(filePath, 'utf-8');
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const scripts = doc.querySelectorAll('script');
    
    console.log(`PAGE: ${file} (Total scripts: ${scripts.length})`);
    
    scripts.forEach((s, idx) => {
        const src = s.getAttribute('src');
        const type = s.getAttribute('type');
        const content = s.textContent;

        if (src) {
            console.log(`  Script #${idx+1}: external src="${src}" ${type ? 'type="' + type + '"' : ''}`);
        } else {
            console.log(`  Script #${idx+1}: inline ${type ? 'type="' + type + '"' : '(no type attribute)'}`);
            if (content.includes('import ') && (!type || !type.includes('module'))) {
                console.log(`    ⚠️ CRITICAL ISSUE: Contains 'import' statement without type="module"!`);
            }
            try {
                // Test parsing as standard JS if not module
                if (!type || type === 'text/javascript') {
                    new Function(content);
                    console.log(`    Syntax check: PASS`);
                }
            } catch(e) {
                console.log(`    ❌ SYNTAX ERROR: ${e.message}`);
            }
        }
    });
    console.log();
});
