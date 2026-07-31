# Project: AWS Data Mastery — Finance Module Decomposition

## Architecture
Decomposition of monolithic `pages/pratica/financas-dados.html` into 9 focused HTML pages within `/pages/financas/`. Each page operates as a standalone article with shared layout conventions (`style.css`, KaTeX, SVG diagrams, dynamic sidebar loader `sidebar-loader.js`, accessibility `a11y.js`, progress bar `progress.js`).

## Target Pages & Scope
1. `pages/financas/onboarding.html`: Processo de Crédito, KYC, SCR, Prevenção a Fraude.
2. `pages/financas/matematica-financeira.html`: SAC, Price, IOF, VPL, Deságio.
3. `pages/financas/ciclo-vida-credito.html`: Fases 1 a 6 e fluxo de eventos/estado do contrato.
4. `pages/financas/pos-venda-reconciliacao.html`: Reconciliação, Flink Join, Gateway PIX, DLQ e tolerâncias.
5. `pages/financas/contabilidade-razonetes.html`: Partidas dobradas, eventos contábeis, contas de carteira contábil, COSIF e movimentos financeiros.
6. `pages/financas/risco-montecarlo.html`: Basileia, IRB, Vasicek, Simulação de Monte Carlo e VaR.
7. `pages/financas/normas-regulatorio.html`: CMN 4.557, CMN 4.966 / IFRS 9 e reporte de risco.
8. `pages/financas/auditoria-dados.html`: Qualidade de dados com Glue DQ, linhagem, e reporte Bacen DOC 3040.
9. `pages/financas/finops-financas.html`: Custos analíticos de dados e FinOps aplicado a finanças.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Baseline Assessment & Setup | Inspect HTML/CSS/JS, create `pages/financas/` dir and templates | none | IN_PROGRESS |
| 2 | Batch 1 Pages | `onboarding.html`, `matematica-financeira.html`, `ciclo-vida-credito.html` | M1 | PLANNED |
| 3 | Batch 2 Pages | `pos-venda-reconciliacao.html`, `contabilidade-razonetes.html`, `risco-montecarlo.html` | M1 | PLANNED |
| 4 | Batch 3 Pages | `normas-regulatorio.html`, `auditoria-dados.html`, `finops-financas.html` | M1 | PLANNED |
| 5 | Sidebar & Navigation | Restructure `/components/sidebar.html` with `🏦 Conhecimentos Financeiros` and migrate links | M2, M3, M4 | PLANNED |
| 6 | Verification & Audit | Empirical check + Forensic Integrity Audit | M5 | PLANNED |

## Code Layout & Conventions
- Assets path from `/pages/financas/*.html`:
  - Stylesheet: `../../style.css`
  - JS loader: `../../js/sidebar-loader.js`
  - Accessibility: `../../js/a11y.js`
  - Reading progress: `../../js/progress.js`
- Sidebar component: `/components/sidebar.html`
- KaTeX Math: Use native KaTeX HTML tags or spans, WITHOUT `$` or `$$` delimiters.
- Diagrams: Native SVG with explicit viewport, non-overlapping text, clear colors.
