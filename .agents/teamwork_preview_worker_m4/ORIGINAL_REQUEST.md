## 2026-07-31T02:29:14Z
<USER_REQUEST>
You are a Specialist Redator Worker for Milestone 4 (Batch 3: Regulatory, Data Audit & FinOps Pages) of the AWS Data Mastery project.
Your Working Directory: `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_worker_m4`

Source Material & Reference:
- Source monolithic page: `/Users/mauriciohelfstein/dev/aws-data-mastery/pages/pratica/financas-dados.html`
- Explorer Handoff: `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_explorer_m1/handoff.md`
- HTML Skeleton Template: `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_explorer_m1/template_skeleton.html`

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Tasks to Execute:
Create and deeply expand the following 3 independent HTML files inside `/Users/mauriciohelfstein/dev/aws-data-mastery/pages/financas/`:

1. `pages/financas/normas-regulatorio.html`:
   - Topic: CMN 4.557, CMN 4.966 / IFRS 9 e reporte de risco.
   - Deep dive sections:
     - Resolução CMN 2.682/1999: Modelo de Perda Incorrida e régua de provisão de A (0,5%) a H (100%).
     - Resolução CMN 4.557/2017: Gerenciamento Integrado de Riscos (GIR), Risk Appetite Statement (RAS) e Testes de Estresse.
     - Resolução CMN 4.966/2021: Harmonização IFRS 9, Modelo de Perda Esperada (ECL), aumento significativo de risco de crédito (SICR), definição de Default (90+ dias).
     - Resolução CMN 4.893/2021: Segurança Cibernética e Governança de Nuvem AWS.
     - Modelo de Dados BACEN DOC 3040 / SCR.
   - Includes: Regulatory timeline table, CMN 2.682 vs CMN 4.966 comparative provision table, KaTeX math (WITHOUT `$` or `$$` dollar delimiters), native interactive/responsive SVG diagram of regulatory evolution timeline & ECL provision curve.

2. `pages/financas/auditoria-dados.html`:
   - Topic: Qualidade de dados com Glue DQ, linhagem, e reporte Bacen DOC 3040.
   - Deep dive sections:
     - Reconciliação BACEN DOC 3040 vs Balancetes COSIF.
     - AWS Lake Formation Security: Cell-level/row-level security e mascaramento LGPD de PII.
     - Linhagem Física de Dados: Trilha de auditoria end-to-end Aurora DB ➔ S3 Bronze/Silver ➔ EMR/Iceberg ➔ XML BACEN 3040.
     - Validação de Qualidade de Dados via AWS Glue Data Quality (DQDL - Data Quality Definition Language) com Circuit Breaker automatizado.
     - Arquitetura de Dados de Custódia e Investimentos: Renda Fixa (MtM vs MtC), Renda Variável, Fundos NAV, Posição Consolidada no Iceberg.
   - Includes: Glue DQDL code snippet, investment custody architecture table, KaTeX math (NO dollar delimiters), native SVG diagram of end-to-end data lineage and Glue DQ Circuit Breaker.

3. `pages/financas/finops-financas.html`:
   - Topic: Custos analíticos de dados e FinOps aplicado a finanças.
   - Deep dive sections:
     - Matriz de Custos Estimados (Cenário 10M eventos/mês: MSK Serverless $120, EMR Spark SPOT $45, Flink KPU auto-scaling $80, S3 Iceberg Lifecycle Glacier Deep Archive $15, Glue Catalog $5).
     - Otimização de Formato Colunar: Apache Parquet, Iceberg compaction (`bin-pack` / `sort`), vacuum, e data retention policies.
     - Tagging & Governança FinOps: Unit Economics por transação/contrato de crédito (`Cost per Contract`).
     - Compêndio de Referências & Curadoria: FEBRABAN, Alexandre Assaf Neto, Regulações BACEN/CMN, AWS FS Whitepapers.
   - Includes: FinOps cost matrix table, PySpark Iceberg compaction code block, KaTeX math (NO dollar delimiters), native SVG diagram of FinOps data cost optimization architecture.

File & Asset Linkage Requirements:
- Relative asset paths MUST use `../../style.css`, `../../assets/favicon.ico`, `../../js/sidebar-loader.js`, `../../js/a11y.js`, `../../js/progress.js`.
- Head must include KaTeX CDN (delimiters `\(` / `\)` and `\[` / `\]`, NO `$` delimiters), Mermaid JS, Diagrams.net script, Google Fonts.
- Clean DOM structure with `<header class="header">`, hamburger menu, `<main class="main-content">`, sidebar loader tag.

Test & Verify:
- Ensure all 3 files are created and complete, KaTeX math formulas have zero raw `$` or `$$` delimiters, SVG text tags are aligned.
- Write detailed execution report to `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_worker_m4/handoff.md`.
- Notify me (parent orchestrator) via `send_message` when completed.

</USER_REQUEST>
