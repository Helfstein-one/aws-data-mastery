const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../../pages/financas');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

console.log(`Checking ${files.length} HTML files...`);

let allPassed = true;

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const hasSidebar = content.includes('id="sidebar"');
    const hasHamburger = content.includes('id="hamburger"');
    const hasSidebarScript = content.includes('sidebar-loader.js');
    
    if (!hasSidebar || !hasHamburger || !hasSidebarScript) {
        console.error(`FAIL: ${file} - sidebar:${hasSidebar}, hamburger:${hasHamburger}, script:${hasSidebarScript}`);
        allPassed = false;
    } else {
        console.log(`PASS: ${file}`);
    }
});

if (allPassed) {
    console.log("ASSERTION PASSED: All 9 pages contain #sidebar, #hamburger, and sidebar-loader.js!");
} else {
    console.error("ASSERTION FAILED!");
    process.exit(1);
}
