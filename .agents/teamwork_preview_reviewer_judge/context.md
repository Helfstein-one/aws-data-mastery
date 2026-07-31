# Context for Judge Agent

## Target
All 9 financial HTML pages in `/pages/financas/` and `js/sidebar-loader.js` on branch `feat/financas-dados-cleanup`.

## Responsibilities
1. Consolidate technical, visual, UX, and forensic audit reports (Layout Reviewer, UX Evaluator, Forensic Auditor).
2. Evaluate acceptance criteria from ORIGINAL_REQUEST.md across all 9 pages:
   - Sidebar JS & HTML functionality (zero console errors, links open, drawer expands).
   - Financial content completeness (JSON Schema Draft-07, citations, 6 credit phases, post-sales Flink/MSK/S3, COSIF & BRGAAP 4.966 TIR, Vasicek & PySpark Monte Carlo, CMN norms & DOC 3040, BACEN/CVM physical lineage, FinOps before/after cost tables).
   - KaTeX math delimiters (`\(` and `\[`) and zero KaTeX in SVG `<text>` elements.
   - Dark mode premium theme visual consistency.
3. Formulate final approval and homologation verdict for merge on `feat/financas-dados-cleanup`, reporting complete findings in `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_reviewer_judge/handoff.md`.
