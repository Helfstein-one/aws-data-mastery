# Context & Guidelines — IA Algoritmos Deep Rewrite

## Project Overview
AWS Data Mastery Portal (`pages/ia-algoritmos/`) deep rewrite of 5 HTML pages from the perspective of a Senior Data Scientist.

## Detailed Requirements Summary

### R1. Rigor Científico Avançado em Data Science
1. **Pressupostos e Hipóteses de Modelagem**: Explicitar as premissas matemáticas para o funcionamento ideal de cada algoritmo (ex: pressupostos de Gauss-Markov para regressão linear, independência condicional de atributos para Naive Bayes, escala de distância para k-NN/k-Means, convexidade das funções de perda, etc.).
2. **Derivação de Funções de Custo e Otimização**: Apresentar de forma analítica e rigorosa as funções de custo (OLS, Log-Loss/Entropia Cruzada, Hinge Loss, entropia de informação) e o método de otimização (Equação Normal, Gradiente Descendente, subgradientes, L-BFGS, Backpropagation, Adam).
3. **Boas Práticas de Engenharia de Modelagem (Sem Data Leakage)**: No código Python, deve-se aplicar o pipeline correto de machine learning:
   - Definição de semente aleatória (`random_state`) para reprodutibilidade.
   - Pré-processamento (ex: escalonamento Z-Score) ajustado estritamente no conjunto de treino (`fit_transform`) e apenas aplicado no teste (`transform`).
   - Seleção apropriada de métricas de validação de acordo com o problema (MSE, RMSE, R², MAE para regressão; Acurácia, Precisão, Recall, F1-Score, AUC-ROC, Log-Loss para classificação; Silhouette Score para clustering; Explained Variance Ratio para PCA).
4. **Trade-offs Científicos (Bias-Variance & Complexidade)**: Justificar no bloco "Quando Usar vs Não Usar" o comportamento do modelo em termos de sobreajuste (overfitting), subajuste (underfitting), dimensionalidade (maldição da dimensionalidade), impacto de outliers, interpretabilidade vs performance, e custos computacionais (tempo e memória para treinamento e inferência).

### R2. Estrutura Obrigatória por Página (8 Seções por Algoritmo)
1. Introdução
2. Conceitos Fundamentais
3. Fórmulas KaTeX
4. Gráficos SVG Inline
5. Código Python
6. Quando Usar vs Não Usar
7. Pontos Relevantes
8. Referências Bibliográficas

### R3. Qualidade Técnica das Fórmulas KaTeX
- `onload` auto-render:
```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"/>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"
    onload="renderMathInElement(document.body, {
      delimiters: [
        {left: '\\\\(', right: '\\\\)', display: false},
        {left: '\\\\[', right: '\\\\]', display: true}
      ],
      throwOnError: false
    });"></script>
```
- Delimitadores `\(` e `\[` (NUNCA `$`). Single line `\[...\]`. Escaped double backslashes in HTML `\\beta`, `\\theta`.

### R4. Gráficos SVG Inline
- `width="100%"` with `viewBox`.
- Palette: background `#0f172a`, axes `#1e293b`/`#94a3b8`, positive `#38bdf8`, negative `#a78bfa`, hits `#10b981`, errors `#ef4444`, hyperplanes/models `#f59e0b`.

### R5. Peer Review & Audit
- Reviewer checks mathematical rigor, KaTeX syntax, Python code execution/leakage prevention, SVG rendering, global scripts (`progress.js`, `sidebar-loader.js`, `a11y.js`).
- Forensic Auditor checks integrity (no hardcoded outputs or dummy code).
