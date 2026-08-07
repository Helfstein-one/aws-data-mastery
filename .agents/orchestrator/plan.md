# Master Project Plan — IA Algoritmos Rewrite

## Architecture & Scope
Deep rewrite of the 5 pages in `pages/ia-algoritmos/` for the AWS Data Mastery portal from the perspective of a Senior Data Scientist.
All 15 algorithms must adhere strictly to requirements R1 (Scientific Rigor), R2 (Mandatory 8-section structure), R3 (KaTeX formatting), R4 (Inline SVG graphs), and R5 (Senior Data Scientist Peer Review & Audit).

## Milestones

| # | Milestone Name | Scope File / Algorithms | Dependencies | Status |
|---|----------------|------------------------|--------------|--------|
| 1 | M1: Supervisionado Regressão | `pages/ia-algoritmos/supervisionado-regressao.html`<br>(Linear Regression, Logistic Regression, Decision Tree) | None | DONE |
| 2 | M2: Supervisionado Ensembles | `pages/ia-algoritmos/supervisionado-ensembles.html`<br>(Random Forest, Gradient Boosting, XGBoost, SVM) | M1 | DONE |
| 3 | M3: Supervisionado Classificadores | `pages/ia-algoritmos/supervisionado-classificadores.html`<br>(k-NN, Naive Bayes) | M1, M2 | DONE |
| 4 | M4: Não-Supervisionado Clustering | `pages/ia-algoritmos/nao-supervisionado-clustering.html`<br>(k-Means, DBSCAN, PCA) | M1, M2, M3 | DONE |
| 5 | M5: Deep Learning & Transformers | `pages/ia-algoritmos/deep-learning-transformers.html`<br>(ANN/MLP, CNN, Transformer) | M1-M4 | IN_PROGRESS |

---

## Mandatory 8-Section Structure per Algorithm (R2)
1. **Introdução**: O que é, para que serve e contexto histórico conceitual.
2. **Conceitos Fundamentais**: Intuição e pressupostos teóricos (Gauss-Markov, independência condicional, distâncias, convexidade, etc.).
3. **Fórmulas KaTeX**: Equações analíticas precisas com delimitadores `\(` e `\[` (NUNCA `$`), blocos em linha única, símbolos escapados com `\\`. Tabela/legenda de símbolos obrigatória.
4. **Gráficos SVG Inline**: Diagramas SVG nativos no HTML (responsivos com `width="100%"` e `viewBox`), paleta oficial (`#0f172a`, `#1e293b`, `#94a3b8`, `#38bdf8`, `#a78bfa`, `#10b981`, `#ef4444`, `#f59e0b`).
5. **Código Python**: Script autocontido, `random_state`, pré-processamento sem data leakage (`fit_transform` no treino, `transform` no teste), métricas adequadas.
6. **Quando Usar vs Não Usar**: Grid/tabela de prós e contras justificando sobreajuste, subajuste, dimensionalidade, outliers, interpretabilidade vs performance, custos computacionais.
7. **Pontos Relevantes**: Dicas práticas de engenharia, regularização, tuning de hiperparâmetros.
8. **Referências Bibliográficas**: Mínimo de 2 referências acadêmicas consagradas (Hastie et al., Bishop, Goodfellow et al., etc.).

---

## Quality Rules & Technical Constraints
- **KaTeX Header (R3)**: `onload` script auto-render, `delimiters: [{left: '\\\\(', right: '\\\\)', display: false}, {left: '\\\\[', right: '\\\\]', display: true}]`.
- **Global Scripts (R5.5)**: Must include `progress.js`, `sidebar-loader.js`, `a11y.js` and functional CSS links. Sidebar active link set to "🤖 IA, MLOps & Algoritmos".
- **Zero Integrity Violations**: No placeholder code, no fake/hardcoded test outputs, authentic mathematical derivations and Python implementations.
