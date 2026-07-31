function toggleCategory(catId, element) {
    const categoryContent = document.getElementById(catId);
    if (categoryContent) {
        categoryContent.classList.toggle('expanded');
        categoryContent.classList.toggle('open');
        if (element) {
            element.classList.toggle('expanded');
            element.classList.toggle('active');
            const arrow = element.querySelector('.arrow');
            if (arrow) {
                const isOpen = categoryContent.classList.contains('expanded') || categoryContent.classList.contains('open');
                arrow.innerHTML = isOpen ? '▼' : '▶';
            }
        }
    }
}
window.toggleCategory = toggleCategory;

function toggleNav() {
    var sb = document.getElementById('sidebar');
    var hb = document.getElementById('hamburger');
    var main = document.getElementById('main');
    if (!sb) return;
    
    var isMobile = window.innerWidth <= 960;
    if (isMobile) {
        var isOpen = sb.classList.contains('open');
        if (!isOpen) {
            sb.classList.add('open');
            if (hb) hb.innerHTML = '✕';
        } else {
            sb.classList.remove('open');
            if (hb) hb.innerHTML = '☰';
        }
    } else {
        var isClosed = sb.classList.contains('closed');
        if (!isClosed) {
            sb.classList.add('closed');
            if (main) main.classList.add('sidebar-closed');
            if (hb) hb.innerHTML = '☰';
        } else {
            sb.classList.remove('closed');
            if (main) main.classList.remove('sidebar-closed');
            if (hb) hb.innerHTML = '✕';
        }
    }
}
window.toggleNav = toggleNav;

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.scrollToTop = scrollToTop;

if (typeof document !== 'undefined' && document.addEventListener) {
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
                }
                // Emit custom event so other scripts (like progress.js) know the sidebar is ready
                document.dispatchEvent(new Event('sidebarLoaded'));
            })
            .catch(err => console.error("Error loading sidebar:", err));
    });
}
