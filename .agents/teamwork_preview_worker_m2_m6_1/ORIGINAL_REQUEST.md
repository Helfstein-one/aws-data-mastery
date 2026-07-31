## 2026-07-29T23:17:09Z
<USER_REQUEST>
You are Worker 1 (teamwork_preview_worker). Your working directory is /Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_worker_m2_m6_1/. Create your directory if it doesn't exist.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Task:
You are responsible for executing Milestones M2, M3, M4, M5, and M6 on `pages/pratica/financas-dados.html`.

Read these reference handoff files carefully before starting:
- /Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_explorer_m1_1/handoff.md
- /Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_explorer_m1_2/handoff.md
- /Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_explorer_m1_3/handoff.md
- /Users/mauriciohelfstein/dev/aws-data-mastery/.agents/orchestrator/PROJECT.md
- /Users/mauriciohelfstein/dev/aws-data-mastery/ORIGINAL_REQUEST.md

Detailed Requirements to Implement in pages/pratica/financas-dados.html:

1. R1: Restructure <main class="main-content"> into exactly 13 direct child <section> tags in exact sequence:
   01. jornada (id="jornada", sec-num badge "01")
   02. matematica (id="matematica", sec-num badge "02")
   03. razo-timeline (id="razo-timeline", sec-num badge "03")
   04. pos-venda (id="pos-venda", sec-num badge "04")
   05. contabilidade (id="contabilidade", sec-num badge "05")
   06. deep-dive-riscos (id="deep-dive-riscos", sec-num badge "06")
   07. basileia-irb (id="basileia-irb", sec-num badge "07") [NEW STANDALONE SECTION]
   08. marco-regulatorio (id="marco-regulatorio", sec-num badge "08")
   09. auditoria-linhagem (id="auditoria-linhagem", sec-num badge "09")
   10. enterprise-arch (id="enterprise-arch", sec-num badge "10")
   11. investimentos-mercado (id="investimentos-mercado", sec-num badge "11") [NEW STANDALONE SECTION]
   12. finops-financas (id="finops-financas", sec-num badge "12")
   13. referencias (id="referencias", sec-num badge "13") [MUST BE LAST ABSOLUTE CHILD OF MAIN]
   Ensure visual sec-num badges are updated to 01..13 matching their section order.

2. R2: Add a complete Draw.io mxgraph XML diagram (div.mxgraph) to section #matematica comparing SAC vs PRICE amortization trajectories & IPCA inflation impact on outstanding balance. Include a companion callout legend.

3. R3: Deepen section #basileia-irb with Basileia III rules, RWA calculation (Standardized SA, F-IRB, A-IRB structured comparison table), and Vasicek correlation model formulas (Asset correlation R, capital K, b(PD), total RWA).

4. R4: Deepen section #contabilidade with a structured HTML table for the COSIF chart of accounts (Plano de Contas COSIF) detailing account title, classification, 15-digit synthetic/analytical code, D/C balance nature for:
   - Concessão de Crédito
   - Apropriação Diária (Accrual)
   - Provisão PDD (ECL / CMN 4.966)
   - Baixa a Prejuízo (Write-Off)
   - Recuperação de Crédito Baixado

5. R5: Deepen section #investimentos-mercado detailing investment types (Renda Fixa, Renda Variável, Fundos), Apache Iceberg DDL schema for custody position data (fato_posicao_custodia), and a Draw.io mxGraph XML diagram depicting the Lakehouse Custody Architecture.

6. Verification:
   - Verify all 13 section IDs are direct children of <main class="main-content"> in exact sequence.
   - Verify sec-num badges 01 through 13.
   - Verify total count of div.mxgraph elements is >= 16 (should be 17).
   - Document verification results in your handoff.

Write your report to /Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_worker_m2_m6_1/handoff.md and send a message to parent (Recipient: d092d16e-8a30-4741-baeb-114c16b62202).
</USER_REQUEST>
