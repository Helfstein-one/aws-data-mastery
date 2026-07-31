# Context for Layout Reviewer Agent

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
1. Audit CSS consistency, dark mode theme harmonization (`style.css`), high contrast badges, typography.
2. Audit KaTeX math formatting: confirm all math blocks use `\(` and `\[` (no unescaped dollar sign delimiters or raw unrendered LaTeX).
3. Audit SVG diagrams: verify all diagrams are responsive (`viewBox`), clean, high-contrast, dark mode compatible, with ZERO text overlaps and ZERO KaTeX delimiters inside SVG `<text>` elements.
4. Report detailed findings and verdict in `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_reviewer_layout/handoff.md`.
