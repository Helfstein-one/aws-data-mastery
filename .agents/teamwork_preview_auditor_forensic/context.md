# Context for Forensic Auditor Agent

## Target
All 9 financial HTML pages in `/pages/financas/` and `js/sidebar-loader.js` on branch `feat/financas-dados-cleanup`.

## Responsibilities
1. Perform forensic integrity verification across all 9 pages:
   - Check for genuine implementations (no hardcoded test results, facade logic, or dummy placeholders).
   - Check HTML structural validity (no syntax errors, unclosed tags, broken DOM structures).
   - Check KaTeX syntax integrity (verify `\(` and `\[` usage, confirm zero KaTeX in SVG `<text>` elements).
   - Check JS sidebar integrity (verify `toggleCategory`, `toggleNav`, `scrollToTop`, `#sidebar`, `#hamburger`).
   - Check technical & financial requirements (Draft-07 JSON Schema in `onboarding.html`, textbook citations in `matematica-financeira.html`, 6 credit phases in `ciclo-vida-credito.html`, post-sales AWS 2026 arch in `pos-venda-reconciliacao.html`, COSIF & BRGAAP 4.966 TIR in `contabilidade-razonetes.html`, Vasicek & PySpark Monte Carlo in `risco-montecarlo.html`, CMN norms & DOC 3040 in `normas-regulatorio.html`, physical lineage & PySpark code in `auditoria-dados.html`, FinOps before/after cost tables & Iceberg procedures in `finops-financas.html`).
2. Provide a definitive audit verdict (`CLEAN` or `INTEGRITY VIOLATION`) with detailed forensic evidence in `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_auditor_forensic/handoff.md`.
