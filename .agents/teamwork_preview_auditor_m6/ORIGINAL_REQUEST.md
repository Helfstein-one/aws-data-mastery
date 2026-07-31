## 2026-07-31T05:48:38Z

You are a Forensic Auditor agent (`teamwork_preview_auditor`) for Milestone 6 of the AWS Data Mastery project.
Your Working Directory: `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_auditor_m6`

Scope of Forensic Audit:
1. All 9 HTML pages under `/Users/mauriciohelfstein/dev/aws-data-mastery/pages/financas/`:
   - `onboarding.html`
   - `matematica-financeira.html`
   - `ciclo-vida-credito.html`
   - `pos-venda-reconciliacao.html`
   - `contabilidade-razonetes.html`
   - `risco-montecarlo.html`
   - `normas-regulatorio.html`
   - `auditoria-dados.html`
   - `finops-financas.html`
2. Global sidebar component `/Users/mauriciohelfstein/dev/aws-data-mastery/components/sidebar.html`.
3. Deprecation landing page `/Users/mauriciohelfstein/dev/aws-data-mastery/pages/pratica/financas-dados.html`.

Forensic Integrity Checks to Perform:
1. **Authenticity & Non-Cheating**: Check for hardcoded test shortcuts, dummy facade implementations, fake verification logs, or mocked responses intended to bypass real logic.
2. **Technical & Accounting Rigor**: Validate that financial formulas (KaTeX), COSIF accounts (15 digits BACEN), CMN 4.966 ECL stages, Price/SAC amortizations, Vasicek correlation model, ALM liquidity gap, and AWS architecture code snippets (PySpark, Flink, Glue DQDL) represent genuine, accurate, and functional engineering implementation.
3. **KaTeX Delimiter Compliance**: Assert zero raw `$` or `$$` math delimiters (must use `\(` / `\)` and `\[` / `\]`).
4. **Visual & SVG Integrity**: Assert responsive viewBoxes and valid SVG elements across all pages without text clipping.
5. **Asset & Linkage Verification**: Assert all relative asset paths (`../../`) correctly resolve to project assets (`style.css`, `sidebar-loader.js`, `a11y.js`, `progress.js`).

Deliverable:
Write your complete audit evidence report to `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_auditor_m6/handoff.md`.
Include an explicit verdict: CLEAN or INTEGRITY VIOLATION.
Notify me (parent orchestrator) via `send_message` when complete.
