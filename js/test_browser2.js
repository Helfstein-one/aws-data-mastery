const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('pages/engenharia/ingestion.html', 'utf8');

const dom = new JSDOM(html, { 
    runScripts: "dangerously", 
    resources: "usable" 
});

dom.window.addEventListener("load", () => {
    console.log("Window loaded");
    const elements = dom.window.document.querySelectorAll('.mxgraph');
    console.log("GraphViewer present?", typeof dom.window.GraphViewer !== 'undefined');
    elements.forEach((el, i) => {
        console.log(`Element ${i} has ${el.children.length} children`);
    });
});
