# Project: AWS Data Mastery — AI, AI Operations & Machine Learning Expansion

## Architecture
- Modular HTML pages under `/pages/ia-algoritmos/`
- Shared navigation sidebar loaded via `components/sidebar.html`
- Global search index recompiled in `js/search-index.js`
- LaTeX math formulas rendered with KaTeX using `\(` `\)` inline and `\[` `\]` block syntax
- Draw.io diagram embeds inside `.drawio-wrap` containers with `data-mxgraph` attribute (escaped quotes `&quot;`) using AWS 2026 architecture icons

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Baseline Exploration | Inspect layout, sidebar, search build script | None | DONE |
| M2.1 | Supervised Regression | `supervisionado-regressao.html` (LinReg, LogReg, DecTree) | M1 | DONE |
| M2.2 | Supervised Ensembles | `supervisionado-ensembles.html` (RF, GradBoost, XGBoost, SVM) | M1 | DONE |
| M2.3 | Supervised Classifiers | `supervisionado-classificadores.html` (k-NN, Naive Bayes) | M1 | DONE |
| M2.4 | Unsupervised & Clustering | `nao-supervisionado-clustering.html` (k-Means, DBSCAN, PCA) | M1 | DONE |
| M2.5 | Deep Learning & Transformers | `deep-learning-transformers.html` (ANN, CNN, Transformer) | M1 | DONE |
| M3 | Sidebar & Search Index | Update `/components/sidebar.html` & `js/search-index.js` | M2 | DONE |
| M4 | Audit & Hardness | Reviewer, Forensic Auditor, and Hardness Log | M3 | DONE |

## Interface & Quality Contracts
- KaTeX Math: Strictly `\(...\)` for inline and `\[...\]` for block. NO single or double dollar signs (`$` or `$$`).
- Draw.io Diagrams: Responsive width (NO fixed `width="1240"` or `width="1240px"` inline style). Class `drawio-wrap` + `div.mxgraph`. Must use AWS 2026 icons.
- Code Blocks: Executable Python snippets using scikit-learn, XGBoost, PyTorch, or Hugging Face Transformers with synthetic dataset creation and MLOps best practices.
- Search Index: `python3 scratch/build_search_index.py` must run with 0 exit code and index all 5 pages.
