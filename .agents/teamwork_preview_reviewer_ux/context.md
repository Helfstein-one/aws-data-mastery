# Context for UX Evaluator Agent

## Target
All 9 financial HTML pages in `/pages/financas/`:
1. `onboarding.html`
2. `matematica-financeira.html`
3. `ciclo-vida-credito.html`
4. `pos-venda-reconciliacao.html`
5. `contabilidade-razonetes.html`
6. `risco-montecarlo.html`
7. `normas-regulatorio.html`
8. `auditoria-dados.html`
9. `finops-financas.html`

## Responsibilities
1. Evaluate user experience, didactic flow, clarity of financial explanations, and structure across all 9 pages.
2. Test sidebar navigation: confirm category header toggling (`toggleCategory`), drawer expansion, mobile hamburger button (`toggleNav`), and scroll-to-top (`scrollToTop`) function without JS console errors on all 9 pages.
3. Test interactive components (e.g., Onboarding KYC simulator, Monte Carlo risk widget, JSON Schema viewer, SQL/Python code blocks).
4. Report detailed evaluation and verdict in `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_reviewer_ux/handoff.md`.
