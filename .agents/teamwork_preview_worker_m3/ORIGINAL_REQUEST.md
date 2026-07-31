## 2026-07-30T23:26:54Z
You are a Specialist Redator Worker for Milestone 3 (Batch 2: Operations, Accounting & Risk Pages) of the AWS Data Mastery project.
Your Working Directory: `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_worker_m3`

Source Material & Reference:
- Source monolithic page: `/Users/mauriciohelfstein/dev/aws-data-mastery/pages/pratica/financas-dados.html`
- Explorer Handoff: `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_explorer_m1/handoff.md`
- HTML Skeleton Template: `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_explorer_m1/template_skeleton.html`

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Tasks to Execute:
Create and deeply expand the following 3 independent HTML files inside `/Users/mauriciohelfstein/dev/aws-data-mastery/pages/financas/`:

1. `pages/financas/pos-venda-reconciliacao.html`:
   - Topic: Reconciliação, Flink Join, Gateway PIX, DLQ e tolerâncias.
   - Deep dive sections:
     - Quitação antecipada via VPL (`AntecipacaoEfetuada`).
     - Penalidades em atraso: Multa CDC (2%) + Juros de Mora (1% a.m.).
     - Case "Falso Inadimplente do Fim de Semana": Billing D0 vs CIP/SLC D+1/D+2 settlement window.
     - Motor de Reconciliação Flink/Spark: Full Match, Mismatch com tolerância de R$ 0,01, Orphan Events.
     - Late Arriving Events & Watermarking: Tumbling/Sliding Window, Allowed Lateness, RocksDB state, Side Outputs, Backposting Contábil, DLQ Contábil.
   - Includes: Reconciliation rule matrix table, KaTeX math formulas (WITHOUT `$` or `$$` dollar delimiters), native interactive/responsive SVG diagram for Flink streaming reconciliation & DLQ architecture.

2. `pages/financas/contabilidade-razonetes.html`:
   - Topic: Partidas dobradas, eventos contábeis, contas de carteira contábil, COSIF e movimentos financeiros.
   - Deep dive sections:
     - Saldo Contábil (Curva / Valor Presente) vs Saldo Devedor Total.
     - Apropriação Diária (Spot Accrual).
     - Plano de Contas COSIF: Tabela estruturada da matriz de 15 dígitos BACEN (ex: `1.6.1.10.00-1`, `1.1.1.10.00-4`, `1.6.1.90.00-3`, `7.1.1.10.00-9`, `8.1.1.20.00-2`, `1.6.9.10.00-5`, `7.1.9.10.00-7`), títulos, classificações, razonetes D/C.
     - Stop Accrual & Write-off under CMN 4.966 Estágio 3.
     - Razonete Distribuído em Data Mesh: Accounting Engine Translator ➔ Ledger Analítico Iceberg com Data Contracts & Idempotência (`MERGE INTO` Iceberg).
   - Includes: Structured COSIF chart of accounts table, T-account razonete cards, KaTeX formulas (NO dollar delimiters), native SVG diagram of Accounting Translator Data Mesh architecture.

3. `pages/financas/risco-montecarlo.html`:
   - Topic: Basileia, IRB, Vasicek, Simulação de Monte Carlo e VaR.
   - Deep dive sections:
     - Modelagem IRB: fórmula \(ECL = PD \times LGD \times EAD \times DF\).
     - Matriz de Transição de Rating de Crédito (12 meses: AA a Default).
     - Distribuição de Perdas: Perda Esperada (EL), Perda Não Esperada (UL), Value at Risk (VaR 99,9%).
     - Simulação de Monte Carlo via Cópula Box-Muller / Cholesky em Apache EMR/Spark (incluindo algoritmo Python/PySpark de Monte Carlo).
     - Risco de Liquidez / ALM: LCR \(\ge 100\%\), NSFR \(\ge 100\%\), Cash Flow Gap.
     - Exemplo Numérico PDD por Estágio CMN 4.966.
     - Basileia III & RWA: Abordagem Padronizada (SA), F-IRB, A-IRB.
     - Modelo de Correlação de Vasicek: Fator R, Capital K, fórmula \[RWA = 12.5 \times K \times EAD\].
     - RORAC (Return on Risk-Adjusted Capital).
   - Includes: Basileia III framework table, KaTeX math formulas (NO dollar delimiters), PySpark Monte Carlo code block, native SVG diagrams of loss distribution (EL vs UL vs VaR) and Vasicek correlation curve.

File & Asset Linkage Requirements:
- Relative asset paths MUST use `../../style.css`, `../../assets/favicon.ico`, `../../js/sidebar-loader.js`, `../../js/a11y.js`, `../../js/progress.js`.
- Head must include KaTeX CDN (delimiters `\(` / `\)` and `\[` / `\]`, NO `$` delimiters), Mermaid JS, Diagrams.net script, Google Fonts.
- Clean DOM structure with `<header class="header">`, hamburger menu, `<main class="main-content">`, sidebar loader tag.

Test & Verify:
- Ensure all 3 files are created and complete, KaTeX math formulas have zero raw `$` or `$$` delimiters, SVG text tags are aligned.
- Write detailed execution report to `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_worker_m3/handoff.md`.
- Notify me (parent orchestrator) via `send_message` when completed.
