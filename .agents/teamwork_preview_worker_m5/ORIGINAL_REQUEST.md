## 2026-07-31T04:20:30Z

<USER_REQUEST>
You are a Specialist Worker for Milestone 5 (Global Sidebar Restructuring & Migration) of the AWS Data Mastery project.
Your Working Directory: `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_worker_m5`

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Tasks to Execute:
1. Update `/Users/mauriciohelfstein/dev/aws-data-mastery/components/sidebar.html`:
   - Create a new main collapsible section `🏦 Conhecimentos Financeiros` at the same level as other main categories (e.g., `🏗️ Arquiteturas de Referência`, `⚙️ Engenharia de Dados`).
   - Add sub-links for all 9 new pages under `pages/financas/`:
     1. `pages/financas/onboarding.html` (Processo de Crédito & KYC)
     2. `pages/financas/matematica-financeira.html` (Matemática Financeira & Amortização)
     3. `pages/financas/ciclo-vida-credito.html` (Ciclo de Vida de Crédito)
     4. `pages/financas/pos-venda-reconciliacao.html` (Pós-Venda & Reconciliação)
     5. `pages/financas/contabilidade-razonetes.html` (Contabilidade Bancária & COSIF)
     6. `pages/financas/risco-montecarlo.html` (Risco de Crédito & Monte Carlo)
     7. `pages/financas/normas-regulatorio.html` (Normas & Marco Regulatório)
     8. `pages/financas/auditoria-dados.html` (Auditoria & Linhagem de Dados)
     9. `pages/financas/finops-financas.html` (FinOps & Custos em Finanças)
   - Remove the old reference to `financas-dados.html` and its sub-links under `visao-geral-cat` (or `🗺️ Visão Geral & Introdução`).

2. Deactivate / Remove `/Users/mauriciohelfstein/dev/aws-data-mastery/pages/pratica/financas-dados.html`:
   - Update `/Users/mauriciohelfstein/dev/aws-data-mastery/pages/pratica/financas-dados.html` to either redirect to `../financas/onboarding.html` or contain a clear deprecation/migration notice, or safely remove it if all references are updated.

3. Codebase Reference Migration:
   - Search across the workspace for any references to `financas-dados.html` (e.g. in `js/progress.js` or other HTML pages) and update them to point to `pages/financas/*.html` or `pages/financas/onboarding.html`.

4. Test & Verify:
   - Ensure `components/sidebar.html` is valid HTML structure.
   - Verify `sidebar-loader.js` dynamic link replacement works properly for pages in `pages/financas/` and root level pages.
   - Write a detailed execution report to `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_worker_m5/handoff.md`.
5. Notify me (parent orchestrator) via `send_message` when complete.

</USER_REQUEST>
