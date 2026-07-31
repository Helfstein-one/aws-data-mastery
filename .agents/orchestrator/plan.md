# Execution Plan — Finance Module Decomposition

## Objective
Decompose monolithic `pages/pratica/financas-dados.html` into 9 individual HTML pages under `pages/financas/`, refine and expand each page with Writer-Reviewer subagent teams, update the global sidebar `/components/sidebar.html` with collapsible category `🏦 Conhecimentos Financeiros`, ensure full visual/script consistency, and perform end-to-end audit.

## Milestones & Action Items

### Milestone 1: Baseline Assessment & Directory Setup
- [ ] Dispatch Explorer to analyze `pages/pratica/financas-dados.html`, current sidebar `/components/sidebar.html`, asset dependencies, and produce HTML template structure for `pages/financas/`.
- [ ] Worker creates directory `/pages/financas/`.

### Milestone 2: Batch 1 - Core Credit & Math Pages
- [ ] Dispatch Redator Worker for:
  1. `onboarding.html` (Processo de Crédito, KYC, SCR, Prevenção a Fraude)
  2. `matematica-financeira.html` (SAC, Price, IOF, VPL, Deságio)
  3. `ciclo-vida-credito.html` (Fases 1 a 6 e fluxo de eventos/estado do contrato)
- [ ] Dispatch Peer Reviewer to verify math, diagrams, business rules, accessibility, and visual consistency for Batch 1.

### Milestone 3: Batch 2 - Operations, Accounting & Risk Pages
- [ ] Dispatch Redator Worker for:
  4. `pos-venda-reconciliacao.html` (Reconciliação, Flink Join, Gateway PIX, DLQ e tolerâncias)
  5. `contabilidade-razonetes.html` (Partidas dobradas, eventos contábeis, COSIF, carteira contábil)
  6. `risco-montecarlo.html` (Basileia, IRB, Vasicek, Simulação Monte Carlo, VaR)
- [ ] Dispatch Peer Reviewer to verify Batch 2.

### Milestone 4: Batch 3 - Regulatory, Data Quality & FinOps Pages
- [ ] Dispatch Redator Worker for:
  7. `normas-regulatorio.html` (CMN 4.557, CMN 4.966 / IFRS 9, reporte de risco)
  8. `auditoria-dados.html` (Qualidade de dados com Glue DQ, linhagem, Bacen DOC 3040)
  9. `finops-financas.html` (Custos analíticos de dados, FinOps aplicado)
- [ ] Dispatch Peer Reviewer to verify Batch 3.

### Milestone 5: Global Sidebar Restructuring & Migration
- [ ] Dispatch Worker to update `/components/sidebar.html`:
  - Add main collapsible section `🏦 Conhecimentos Financeiros` with links to all 9 pages under `pages/financas/`.
  - Remove old reference to `financas-dados.html` under `visao-geral-cat`.
- [ ] Deactivate/remove old `pages/pratica/financas-dados.html` and update any broken references across codebase.

### Milestone 6: Verification & Forensic Integrity Audit
- [ ] Dispatch Challenger to verify DOM structure, script inclusion, sidebar links, KaTeX rendering, SVG diagram layout across all 9 pages.
- [ ] Dispatch Forensic Auditor for final integrity verification.
