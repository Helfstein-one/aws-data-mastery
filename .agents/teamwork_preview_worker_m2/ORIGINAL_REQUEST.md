## 2026-07-30T23:12:36Z
You are a Specialist Redator Worker for Milestone 2 (Batch 1: Core Credit & Math Pages) of the AWS Data Mastery project.
Your Working Directory: `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_worker_m2`

Source Material & Reference:
- Source monolithic page: `/Users/mauriciohelfstein/dev/aws-data-mastery/pages/pratica/financas-dados.html`
- Explorer Handoff: `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_explorer_m1/handoff.md`
- HTML Skeleton Template: `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_explorer_m1/template_skeleton.html`

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Tasks to Execute:
1. Ensure folder `/Users/mauriciohelfstein/dev/aws-data-mastery/pages/financas/` exists.
2. Create and deeply expand the following 3 independent HTML files inside `pages/financas/`:

   a) `pages/financas/onboarding.html`:
      - Topic: Processo de Crédito, KYC, SCR, Prevenção a Fraude.
      - Deep dive sections: Intermediação financeira, Spread bancário, Onboarding digital, Liveness Detection (Face Match Confidence Score), Background check (OFAC, PEP, AML), SCR (Sistema de Informações de Crédito - BACEN), Motor de Crédito & Open Finance (Probabilidade de Default - PD, Risk-Based Pricing), Kafka event streaming & Feature Store architecture.
      - Includes: Tables, KaTeX math formulas (WITHOUT `$` or `$$` dollar delimiters), native interactive/responsive SVG diagrams with clean non-overlapping text.

   b) `pages/financas/matematica-financeira.html`:
      - Topic: SAC, Price, IOF, VPL, Deságio.
      - Deep dive sections: Juros Simples vs Compostos, IOF Fixo (0.38%) + IOF Diário (0.0082%/dia), Custo Efetivo Total (CET), Tabela Price (prestação constante, amortização crescente) vs Tabela SAC (amortização constante, prestação decrescente), Amortização IPCA, PySpark `pandas_udf` Arrow vectorization para ALM, SCD Tipo 2 no Lakehouse, VPL & Deságio em antecipações de recebíveis.
      - Includes: Comparative amortization tables, KaTeX math formulas (NO dollar delimiters), native clean SVG diagrams comparing SAC vs Price curves and inflation impacts.

   c) `pages/financas/ciclo-vida-credito.html`:
      - Topic: Fases 1 a 6 e fluxo de eventos/estado do contrato.
      - Deep dive sections: Os 6 Estágios de Vida do Contrato (1. Origination/CREDIT_GRANTED, 2. Spot Accrual/ACCRUAL_CALC, 3. Installment/INSTALL_PAID, 4. Delinquency/ECL_PROVISION, 5. Refinancing/REFINANCING, 6. Write-off/WRITEOFF). Lançamentos contábeis (D/C) por estágio, barramento Kafka/MSK, Flink stateful processing & Spark batch architecture.
      - Includes: State machine lifecycle table, KaTeX math formulas, native SVG diagram for contract state transitions and data streaming pipeline.

3. File & Asset Linkage Requirements:
   - Relative asset paths MUST use `../../style.css`, `../../assets/favicon.ico`, `../../js/sidebar-loader.js`, `../../js/a11y.js`, `../../js/progress.js`.
   - Head must include KaTeX CDN (with auto-render script using `\(` / `\)` and `\[` / `\]` delimiters, NO `$` delimiters), Mermaid JS, Diagrams.net script, and Google Fonts.
   - Clean DOM structure with `<header class="header">`, hamburger menu, `<main class="main-content">`, sidebar loader tag.

4. Test & Verify:
   - Verify each file opens clean HTML, script tags match paths, KaTeX formulas have no raw `$` or `$$` delimiters, SVG text tags are aligned.
   - Write a detailed execution report to `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_worker_m2/handoff.md`.
5. Notify me (parent orchestrator) via `send_message` when complete.
