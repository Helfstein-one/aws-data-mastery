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
    // Capture references NOW (before any inline script can overwrite window.toggleNav)
    var _mobileToggleNav = toggleNav;
    var _mobileToggleCategory = toggleCategory;

    document.addEventListener("DOMContentLoaded", () => {
        // Reassign after all inline scripts have run — the captured refs still point to the
        // mobile-aware implementations defined above, not the overwritten globals.
        window.toggleNav = _mobileToggleNav;
        window.toggleCategory = _mobileToggleCategory;

        // Resolve the absolute URL of THIS script using its resolved src attribute.
        // document.currentScript only works during initial parse, so we use querySelector.
        const scriptTag = document.querySelector('script[src*="sidebar-loader.js"]');
        if (!scriptTag) return;

        // Build the absolute URL of the script by resolving it against the document base.
        // This works correctly on GitHub Pages regardless of folder depth.
        const scriptAbsUrl = new URL(scriptTag.getAttribute('src'), window.location.href).href;
        // rootAbsUrl = everything up to and including the repo root (where index.html lives)
        // e.g. "https://user.github.io/repo/" or "http://localhost:5500/"
        const rootAbsUrl = scriptAbsUrl.replace(/js\/sidebar-loader\.js(\?.*)?$/, '');

        fetch(`${rootAbsUrl}components/sidebar.html?t=${Date.now()}`)
            .then(response => {
                if (!response.ok) throw new Error('Failed to load sidebar: ' + response.status);
                return response.text();
            })
            .then(html => {
                // Re-map all relative hrefs in the sidebar to absolute URLs rooted at rootAbsUrl.
                // This ensures links work from any page depth.
                let modifiedHtml = html;

                // 1. Fix standard page links: href="pages/..."  →  href="<root>pages/..."
                modifiedHtml = modifiedHtml.replace(/href="(pages\/[^"]*)"/g, `href="${rootAbsUrl}$1"`);
                // 2. Fix index link: href="index.html"  →  href="<root>index.html"
                modifiedHtml = modifiedHtml.replace(/href="(index\.html[^"]*)"/g, `href="${rootAbsUrl}$1"`);
                // 3. Fix any leftover relative links like href="../../pages/..."
                modifiedHtml = modifiedHtml.replace(/href="\.\.\/\.\.\/(pages\/[^"]*)"/g, `href="${rootAbsUrl}$1"`);
                modifiedHtml = modifiedHtml.replace(/href="\.\.\/\.\.\/(index\.html[^"]*)"/g, `href="${rootAbsUrl}$1"`);

                const sidebarEl = document.getElementById('sidebar');
                if (sidebarEl) {
                    sidebarEl.innerHTML = modifiedHtml;

                    // Automatically determine active page and expand its category accordion
                    try {
                        const currentPath = window.location.pathname;
                        const pageFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
                        const links = sidebarEl.querySelectorAll('.nav-a');
                        links.forEach(link => {
                            const dataPage = link.getAttribute('data-page') || '';
                            const href = link.getAttribute('href') || '';
                            const pageBase = pageFile.replace('.html', '');
                            const isMatch = (dataPage && (dataPage === pageBase || (pageBase === 'index' && dataPage === 'index' && !currentPath.includes('/pages/')) || (currentPath.includes('/negocios/') && dataPage === 'negocios-index' && pageBase === 'index'))) ||
                                            href.endsWith('/' + pageFile) ||
                                            href.endsWith(pageFile) ||
                                            (pageFile === 'index.html' && !currentPath.includes('/pages/') && (href.endsWith('index.html') || href === rootAbsUrl));
                            if (isMatch) {
                                link.classList.add('active');
                                const cat = link.closest('.nav-cat-content');
                                if (cat) {
                                    cat.classList.add('open', 'expanded');
                                    const lbl = cat.previousElementSibling;
                                    if (lbl && lbl.classList.contains('collapsible')) {
                                        lbl.classList.add('active', 'expanded');
                                        const arrow = lbl.querySelector('.arrow');
                                        if (arrow) arrow.innerHTML = '▼';
                                    }
                                }
                            }
                        });
                    } catch (e) {
                        console.warn('Auto active link resolution notice:', e);
                    }
                }
                // Emit custom event so other scripts (like progress.js) know the sidebar is ready
                document.dispatchEvent(new Event('sidebarLoaded'));
            })
            .catch(err => console.error("Error loading sidebar:", err));
    });
}
