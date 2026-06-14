const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('pages/engenharia/ingestion.html', 'utf8');

const dom = new JSDOM(html, { 
    runScripts: "dangerously", 
    resources: "usable" 
});

dom.window.console.log = function() {
    console.log("LOG:", ...arguments);
};
dom.window.console.error = function() {
    console.error("ERROR:", ...arguments);
};

setTimeout(() => {
    console.log("Checking if mxgraph elements have svg children...");
    const elements = dom.window.document.querySelectorAll('.mxgraph');
    elements.forEach((el, i) => {
        console.log(`Element ${i} has ${el.children.length} children`);
    });
}, 2000);
