# Original User Request

## Initial Request — 2026-08-01T21:26:04-03:00

Reescrita profunda das 5 páginas da seção `pages/ia-algoritmos/` do portal AWS Data Mastery, sob o papel de um Cientista de Dados Sênior, garantindo precisão matemática, pressupostos teóricos detalhados e boas práticas de modelagem.

Working directory: `/Users/mauriciohelfstein/dev/aws-data-mastery`
Branch: `feat/ia-operacoes-algorithms`
Integrity mode: `demo`

---

## Páginas e Distribuição de Algoritmos

| Agente / Página | Algoritmos Cobertos |
|-----------------|---------------------|
| **Agent 1**: `pages/ia-algoritmos/supervisionado-regressao.html` | Linear Regression, Logistic Regression, Decision Tree |
| **Agent 2**: `pages/ia-algoritmos/supervisionado-ensembles.html` | Random Forest, Gradient Boosting, XGBoost, SVM |
| **Agent 3**: `pages/ia-algoritmos/supervisionado-classificadores.html` | k-NN, Naive Bayes |
| **Agent 4**: `pages/ia-algoritmos/nao-supervisionado-clustering.html` | k-Means, DBSCAN, PCA |
| **Agent 5**: `pages/ia-algoritmos/deep-learning-transformers.html` | ANN/MLP, CNN, Transformer |

---

## Requirements

### R1. Rigor Científico Avançado em Data Science (Cientista de Dados Sênior)
Para cada um dos 15 algoritmos, os agentes devem garantir precisão conceitual absoluta:
1. **Pressupostos e Hipóteses de Modelagem**: Explicitar as premissas matemáticas para o funcionamento ideal de cada algoritmo (ex: pressupostos de Gauss-Markov para regressão linear, independência condicional de atributos para Naive Bayes, escala de distância para k-NN/k-Means, convexidade das funções de perda, etc.).
2. **Derivação de Funções de Custo e Otimização**: Apresentar de forma analítica e rigorosa as funções de custo (OLS, Log-Loss/Entropia Cruzada, Hinge Loss, entropia de informação) e o método de otimização (Equação Normal, Gradiente Descendente, subgradientes, L-BFGS, Backpropagation, Adam).
3. **Boas Práticas de Engenharia de Modelagem (Sem Data Leakage)**: No código Python, deve-se aplicar o pipeline correto de machine learning:
   - Definição de semente aleatória (`random_state`) para reprodutibilidade.
   - Pré-processamento (ex: escalonamento Z-Score) ajustado estritamente no conjunto de treino (`fit_transform`) e apenas aplicado no teste (`transform`).
   - Seleção apropriada de métricas de validação de acordo com o problema (MSE, RMSE, R², MAE para regressão; Acurácia, Precisão, Recall, F1-Score, AUC-ROC, Log-Loss para classificação; Silhouette Score para clustering; Explained Variance Ratio para PCA).
4. **Trade-offs Científicos (Bias-Variance & Complexidade)**: Justificar no bloco "Quando Usar vs Não Usar" o comportamento do modelo em termos de sobreajuste (overfitting), subajuste (underfitting), dimensionalidade (maldição da dimensionalidade), impacto de outliers, interpretabilidade vs performance, e custos computacionais (tempo e memória para treinamento e inferência).

### R2. Estrutura Obrigatória por Página
Cada página deve conter as seguintes seções em ordem para cada algoritmo:
1. **Introdução**: O que é, para que serve e contexto histórico conceitual.
2. **Conceitos Fundamentais**: Intuição e pressupostos teóricos (conforme R1.1).
3. **Fórmulas KaTeX**: Equações precisas com delimitadores `\(` e `\[` (NUNCA `$`). Cada símbolo deve estar detalhado em uma legenda ou tabela de descrição.
4. **Gráficos SVG Inline**: Diagramas SVG desenhados nativamente no HTML (sem draw.io/mxgraph para os gráficos dos algoritmos) ilustrando a geometria ou fluxo do modelo (ex: dispersão com reta, sigmoide, fronteira de decisão, hiperplano SVM, grafos de MLP, self-attention, clusters).
5. **Código Python**: Script autocontido, didático, com tratamento de dados sintéticos e boas práticas (conforme R1.3).
6. **Quando Usar vs Não Usar**: Tabela ou grid com vantagens e desvantagens detalhadas sob a ótica de engenharia e ciência de dados.
7. **Pontos Relevantes**: Recomendações e segredos práticos de treinamento, tunagem de hiperparâmetros (ex: regularização L1/L2, profundidade de árvore, kernels de SVM, taxa de aprendizado, número de vizinhos).
8. **Referências Bibliográficas**: Mínimo de 2 referências acadêmicas consagradas (ex: Hastie et al., Bishop, Goodfellow et al., Sutton & Barto).

### R3. Qualidade Técnica das Fórmulas KaTeX
- Usar padrão `onload` no script auto-render (NÃO `DOMContentLoaded`), copiando exatamente este cabeçalho:
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
- Fórmulas `\[...\]` escritas em linha única para evitar quebras de caractere e fragmentos corrompidos de escape (`ight)`, `ho `, `eq j`, `arepsilon`, `alphalpha`).
- Todos os símbolos matemáticos escapados com barra dupla no código HTML (ex: `\\beta`, `\\theta`, `\\mathbf`).

### R4. Qualidade dos Gráficos SVG Inline
- Produzir diagramas responsivos (`width="100%"` e `viewBox`) usando a paleta do portal: fundo `#0f172a`, eixos/linhas `#1e293b` ou `#94a3b8`, e cores contrastantes (`#38bdf8` para classe positiva, `#a78bfa` para negativa, `#10b981` para acertos, `#ef4444` para erros/outliers, `#f59e0b` para modelos/hiperplanos/curvas).
- Labels textuais limpos e bem posicionados.

### R5. Revisão por Agente Cientista Sênior (Peer-Review)
- Cada página será auditada por um agente revisor de Ciência de Dados após a edição para certificar:
  1. Integridade conceitual da matemática e estatística.
  2. Correção absoluta de fórmulas KaTeX (sem delimitadores `$`).
  3. Ausência de bugs ou vazamento de dados no código Python.
  4. Qualidade e responsividade dos diagramas SVG.
  5. Presença de todos os scripts globais (`progress.js`, `sidebar-loader.js`, `a11y.js`) e links de estilo funcionais.

---

## Acceptance Criteria

### Integridade Científica e Conteúdo
- [ ] Todas as 5 páginas cobrem seus respectivos algoritmos sem placeholders.
- [ ] Todos os códigos Python são sintaticamente corretos, executam sem erros e usam sementes randômicas explícitas e pré-processamento sem data leakage.
- [ ] Mínimo de 2 referências acadêmicas clássicas para cada um dos 15 algoritmos.

### Renderização Matemática e Gráficos
- [ ] KaTeX renderizado em todas as fórmulas sem exibir código bruto (zero delimitadores de cifrão).
- [ ] Zero erros de quebras de linha em blocos KaTeX.
- [ ] Ao menos 1 gráfico SVG nativo inserido inline por algoritmo, escalável e legível.

### Layout e Componentes
- [ ] Scripts de sidebar, progresso de leitura e acessibilidade carregando sem erros no console.
- [ ] Sidebar global mantém a categoria "🤖 IA, MLOps & Algoritmos" ativa com todos os links funcionais.
