# Context for Worker M1 - Sidebar Infrastructure Bug Fix

## Target Files
- `/pages/financas/onboarding.html`
- `/pages/financas/matematica-financeira.html`
- `/pages/financas/ciclo-vida-credito.html`
- `/pages/financas/pos-venda-reconciliacao.html`
- `/pages/financas/contabilidade-razonetes.html`
- `/pages/financas/risco-montecarlo.html`
- `/pages/financas/normas-regulatorio.html`
- `/pages/financas/auditoria-dados.html`
- `/pages/financas/finops-financas.html`
- `/js/sidebar-loader.js`

## Task
1. Fix sidebar JS/HTML across all 9 pages:
   - Ensure `toggleCategory(catId, element)`, `toggleNav()`, and `scrollToTop()` are globally defined (both in `js/sidebar-loader.js` and inline across all 9 pages).
   - Ensure `<nav id="sidebar"></nav>` and `<button id="hamburger" onclick="toggleNav()">☰</button>` exist on all 9 pages.
   - Verify that clicking collapsible category headers expands `.nav-cat-content` without JS console errors (`ReferenceError: toggleCategory is not defined`).
2. Run build/verification check (python script to verify presence of `toggleCategory`, `toggleNav`, `scrollToTop`, `#sidebar`, `#hamburger` on all 9 pages).
3. Record findings and verification results in `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_worker_m1/handoff.md`.
