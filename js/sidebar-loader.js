document.addEventListener("DOMContentLoaded", () => {
    // Determine the root prefix based on the script's src
    // This allows the sidebar to load correctly regardless of folder depth
    const scriptTag = document.querySelector('script[src*="sidebar-loader.js"]');
    if (!scriptTag) return;
    
    const src = scriptTag.getAttribute('src');
    const rootPrefix = src.replace('js/sidebar-loader.js', '');
    
    fetch(`${rootPrefix}components/sidebar.html`)
        .then(response => {
            if (!response.ok) throw new Error('Failed to load sidebar');
            return response.text();
        })
        .then(html => {
            // Re-map the relative paths in the sidebar HTML so they resolve correctly
            // from the current page's directory level.
            let modifiedHtml = html;
            
            // 1. Fix standard page links (e.g., href="pages/...")
            modifiedHtml = modifiedHtml.replace(/href="(pages\/[^"]*)"/g, `href="${rootPrefix}$1"`);
            // 2. Fix index link (href="index.html")
            modifiedHtml = modifiedHtml.replace(/href="(index\.html[^"]*)"/g, `href="${rootPrefix}$1"`);
            // 3. Fix absolute-looking links that were generated in subpages previously (e.g., href="../../pages/...")
            modifiedHtml = modifiedHtml.replace(/href="\.\.\/\.\.\/(pages\/[^"]*)"/g, `href="${rootPrefix}$1"`);
            modifiedHtml = modifiedHtml.replace(/href="\.\.\/\.\.\/(index\.html[^"]*)"/g, `href="${rootPrefix}$1"`);

            const sidebarEl = document.getElementById('sidebar');
            if (sidebarEl) {
                sidebarEl.innerHTML = modifiedHtml;
                
                // Re-bind the toggle logic if the script expects it here, 
                // but if toggleCategory is defined globally, it should still work since it uses inline onclick="toggleCategory(...)"
            }
        })
        .catch(err => console.error("Error loading sidebar:", err));
});
