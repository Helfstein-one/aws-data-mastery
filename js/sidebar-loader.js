function getOrCreateBackdrop() {
    let backdrop = document.getElementById('sidebar-backdrop');
    if (!backdrop && typeof document !== 'undefined') {
        backdrop = document.createElement('div');
        backdrop.id = 'sidebar-backdrop';
        backdrop.addEventListener('click', function() {
            if (window.innerWidth <= 960) {
                toggleNav();
            }
        });
        document.body.appendChild(backdrop);
    }
    return backdrop;
}

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
    
    var backdrop = getOrCreateBackdrop();
    var isMobile = window.innerWidth <= 960;
    
    if (isMobile) {
        var isOpen = sb.classList.contains('open');
        if (!isOpen) {
            sb.classList.add('open');
            document.body.classList.add('sidebar-open');
            if (backdrop) backdrop.classList.add('active');
            if (hb) {
                hb.innerHTML = '✕';
                hb.setAttribute('aria-expanded', 'true');
            }
        } else {
            sb.classList.remove('open');
            document.body.classList.remove('sidebar-open');
            if (backdrop) backdrop.classList.remove('active');
            if (hb) {
                hb.innerHTML = '☰';
                hb.setAttribute('aria-expanded', 'false');
            }
        }
    } else {
        var isClosed = sb.classList.contains('closed');
        if (!isClosed) {
            sb.classList.add('closed');
            if (main) main.classList.add('sidebar-closed');
            if (hb) {
                hb.innerHTML = '☰';
                hb.setAttribute('aria-expanded', 'false');
            }
        } else {
            sb.classList.remove('closed');
            if (main) main.classList.remove('sidebar-closed');
            if (hb) {
                hb.innerHTML = '✕';
                hb.setAttribute('aria-expanded', 'true');
            }
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
        getOrCreateBackdrop();

        const scriptTag = document.querySelector('script[src*="sidebar-loader.js"]');
        if (!scriptTag) return;

        const scriptAbsUrl = new URL(scriptTag.getAttribute('src'), window.location.href).href;
        const rootAbsUrl = scriptAbsUrl.replace(/js\/sidebar-loader\.js(\?.*)?$/, '');

        fetch(`${rootAbsUrl}components/sidebar.html?t=${Date.now()}`)
            .then(response => {
                if (!response.ok) throw new Error('Failed to load sidebar: ' + response.status);
                return response.text();
            })
            .then(html => {
                let modifiedHtml = html;

                modifiedHtml = modifiedHtml.replace(/href="(pages\/[^"]*)"/g, `href="${rootAbsUrl}$1"`);
                modifiedHtml = modifiedHtml.replace(/href="(index\.html[^"]*)"/g, `href="${rootAbsUrl}$1"`);
                modifiedHtml = modifiedHtml.replace(/href="\.\.\/\.\.\/(pages\/[^"]*)"/g, `href="${rootAbsUrl}$1"`);
                modifiedHtml = modifiedHtml.replace(/href="\.\.\/\.\.\/(index\.html[^"]*)"/g, `href="${rootAbsUrl}$1"`);

                const sidebarEl = document.getElementById('sidebar');
                if (sidebarEl) {
                    sidebarEl.innerHTML = modifiedHtml;
                    sidebarEl.setAttribute('aria-label', 'Menu principal');

                    // Auto-close sidebar on link click on mobile
                    sidebarEl.querySelectorAll('a').forEach(link => {
                        link.addEventListener('click', () => {
                            if (window.innerWidth <= 960 && sidebarEl.classList.contains('open')) {
                                toggleNav();
                            }
                        });
                    });
                }
                document.dispatchEvent(new Event('sidebarLoaded'));
            })
            .catch(err => console.error("Error loading sidebar:", err));
    });
}

