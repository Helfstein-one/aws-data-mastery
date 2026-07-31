# Context Memory — Finance Module Decomposition

## Overview
Decomposing `pages/pratica/financas-dados.html` into 9 individual HTML pages under `pages/financas/`.

## Key Paths
- Monolith page: `pages/pratica/financas-dados.html`
- Target folder: `pages/financas/`
- Global Sidebar: `components/sidebar.html`
- Stylesheet: `style.css`
- Sidebar Loader: `js/sidebar-loader.js`
- Accessibility JS: `js/a11y.js`
- Progress Bar JS: `js/progress.js`

## Page Requirements Summary
1. `onboarding.html`: Processo de Crédito, KYC, SCR, Prevenção a Fraude
2. `matematica-financeira.html`: SAC, Price, IOF, VPL, Deságio
3. `ciclo-vida-credito.html`: Fases 1 a 6 e fluxo de eventos/estado do contrato
4. `pos-venda-reconciliacao.html`: Reconciliação, Flink Join, Gateway PIX, DLQ e tolerâncias
5. `contabilidade-razonetes.html`: Partidas dobradas, eventos contábeis, contas de carteira contábil, COSIF e movimentos financeiros
6. `risco-montecarlo.html`: Basileia, IRB, Vasicek, Simulação de Monte Carlo e VaR
7. `normas-regulatorio.html`: CMN 4.557, CMN 4.966 / IFRS 9 e reporte de risco
8. `auditoria-dados.html`: Qualidade de dados com Glue DQ, linhagem, e reporte Bacen DOC 3040
9. `finops-financas.html`: Custos analíticos de dados e FinOps aplicado a finanças

## Formatting Rules
- KaTeX Math: native KaTeX HTML tags or spans, WITHOUT `$` or `$$` delimiters.
- SVG Diagrams: native clean SVG elements, proper viewports, legible non-overlapping labels.
- Sidebar: new section `🏦 Conhecimentos Financeiros` with all 9 pages linked.
