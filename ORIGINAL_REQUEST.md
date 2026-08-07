# Original User Request

## 2026-07-29T23:15:17Z

O objetivo do projeto é expandir, organizar e aprofundar a página `financas-dados.html`, estruturando-a em exatamente 13 tópicos (seções) irmãos sob o contêiner `<main class="main-content">`. O trabalho será executado por um time de 13 pares de agentes temáticos especializados (Redatores + Revisores) sob a coordenação de um Orquestrador Central.

Working directory: /Users/mauriciohelfstein/dev/aws-data-mastery
Integrity mode: demo

## Requirements

### R1. Reorganização Estrutural em 13 Tópicos (Siblings)
A página deve possuir exatamente 13 seções no DOM, diretas filhas de `main`, na seguinte sequência exata:
1. `jornada` (Originação e Onboarding)
2. `matematica` (Precificação e Matemática)
3. `razo-timeline` (O Ciclo de Vida de Crédito)
4. `pos-venda` (Pós-venda e Reconciliação)
5. `contabilidade` (Contabilidade Bancária e Razonetes)
6. `deep-dive-riscos` (Risco de Crédito e Monte Carlo)
7. `basileia-irb` (Basileia III & Modelagem IRB) [NOVO TÓPICO DESTACADO]
8. `marco-regulatorio` (Normas e Marco Regulatório BACEN)
9. `auditoria-linhagem` (Auditoria e Linhagem de Dados BACEN)
10. `enterprise-arch` (Enterprise Data Platform)
11. `investimentos-mercado` (Investimentos e Mercado Financeiro) [NOVO TÓPICO DESTACADO]
12. `finops-financas` (FinOps e Custos)
13. `referencias` (Referências & Notas de Curadoria) [ÚLTIMA PÁGINA ABSOLUTA]

### R2. Novos Diagramas Draw.io (SAC, PRICE e IPCA)
- Criar e embutir no formato de mxgraph XML um diagrama completo comparando as trajetórias e as curvas de amortização de SAC, PRICE e o impacto da inflação/IPCA no saldo devedor.

### R3. Aprofundamento do Risco, Basileia III (RWA) e IRB
- Criar a nova seção `basileia-irb` detalhando as regras de Basileia III, cálculo de RWA (Risk-Weighted Assets) para risco de crédito sob abordagens padronizada, F-IRB (Foundation Internal Ratings-Based) e A-IRB (Advanced Internal Ratings-Based), incluindo a fórmula do modelo de correlação de Vasicek.

### R4. Evento Contábil, COSIF e Carteira Contábil
- Na seção `contabilidade`, adicionar uma tabela estruturada do plano de contas COSIF (título, classificação, código contábil de 15 dígitos fictícios, razonete D/C) detalhando a apropriação de juros (Accrual), provisões de PDD e movimentações de carteira.

### R5. Investimentos e Mercado Financeiro (Arquitetura de Dados)
- Criar a nova seção `investimentos-mercado` detalhando os tipos de investimentos (Renda Fixa - Tesouro/CDB, Renda Variável - Ações/FIIs, Fundos de Investimento) e propor uma arquitetura de dados (modelo de tabelas e fluxos analíticos no Lakehouse) para consolidar a custódia e posições diárias de investimentos.

## Acceptance Criteria

### Estrutura do HTML
- [ ] O contêiner `<main class="main-content">` possui exatamente 13 tags `<section>` filhas diretas, nas quais o ID de cada seção corresponde exatamente à lista ordenada de R1.
- [ ] A seção `#referencias` é o último elemento filho direto do contêiner `main`.
- [ ] Não há seções aninhadas incorretamente no DOM.
- [ ] Todas as numerações visuais visíveis (`sec-num`) correspondem exatamente ao índice do elemento de `01` a `13`.

### Diagramas
- [ ] Presença de pelo menos 16 diagramas Draw.io (`div.mxgraph`) na página, incluindo o novo diagrama de SAC/PRICE/IPCA e os dois diagramas de conformidade adicionados anteriormente.

### Qualidade e Coesão de Conteúdo
- [ ] Presença de explicações detalhadas de Basileia III, IRB (F-IRB/A-IRB) e fórmula de Vasicek na seção `#basileia-irb`.
- [ ] Presença da tabela COSIF estruturada na seção `#contabilidade`.
- [ ] Presença da arquitetura de custódia e tabela de dados de investimentos na seção `#investimentos-mercado`.

## 2026-07-31T19:23:10Z

<USER_REQUEST>
O objetivo deste projeto é expandir e aprimorar de forma aprofundada e modular as 9 páginas de Conhecimentos Financeiros em `/pages/financas/` na branch `feat/financas-dados-cleanup`. O projeto deve contar com um fluxo de redação de Agentes Especialistas dedicados por tema e uma auditoria de qualidade visual, de UX e regulatória liderada por um Agente Layout Reviewer, um UX Evaluator e um Agente Juiz independente.

Working directory: /Users/mauriciohelfstein/dev/aws-data-mastery
Integrity mode: development

## Requirements

### R1. Expansão de Conteúdo e Arquitetura nas Novas Páginas (`/pages/financas/`)
- **`onboarding.html`**:
  - Desenhar o fluxo funcional completo de Onboarding e KYC.
  - Incluir um **JSON Schema completo em formato Standard (Draft-07 ou Draft 2020-12)** para o contrato de dados (Data Contract) do Evento de Proposta de Crédito.
  - Adicionar diagrama funcional detalhado com ícones AWS (versão 2026) e legendas explicativas.
- **`matematica-financeira.html`**:
  - Abordar a matemática financeira do básico ao avançado (Juros Simples/Compostos, Amortização SAC/Price, VPL, Deságio).
  - Incluir citações estruturadas e referências bibliográficas a livros clássicos (como Alexandre Assaf Neto, Stephen Ross).
  - Demonstrar códigos funcionais e executáveis que aplicam os cálculos usando Pandas/NumPy, UDFs PySpark e queries SQL analíticas com dados simulados.
- **`ciclo-vida-credito.html`**:
  - Explicar separadamente e de forma aprofundada cada um dos eventos do ciclo de vida de crédito (Fases 1 a 6).
  - Descrever a arquitetura técnica funcional e os fluxos de mensagens de cada evento no ecossistema AWS (versão 2026).
- **`pos-venda-reconciliacao.html`**:
  - Explicar e detalhar separadamente todos os eventos de pós-venda (amortização antecipada, atraso, multa e juros de mora).
  - Projetar a arquitetura técnica e de processamento de dados (ex: Flink, MSK, S3) para cada evento em conformidade com os padrões da AWS 2026.
- **`contabilidade-razonetes.html`**:
  - Detalhar separadamente cada evento contábil e propor a modelagem física de tabelas contábeis detalhadas (Fato Lançamento, Dimensão Contas, Dimensão Contratos).
  - Adicionar múltiplos cenários contábeis com diagramas de razonetes em SVG (pagamento em atraso, amortização parcial, antecipação, renegociação).
  - Adicionar seção detalhada sobre o novo **BRGAAP (Resolução CMN 4.966)** e o cálculo da Taxa de Juros Efetiva (Taxa Interna de Retorno).
- **`risco-montecarlo.html`**:
  - Introduzir detalhadamente a gestão de risco bancário do iniciante ao avançado (Risco de Crédito, IRB, Vasicek, Perda Esperada vs Inesperada, VaR).
  - Demonstrar simulação de Monte Carlo com PySpark e visualizações associadas.
- **`normas-regulatorio.html`**:
  - Citar e analisar a importância das principais normas (CMN 2.682, 4.557, 4.966, 4.893).
  - Demonstrar graficamente em SVG a distribuição regulatória de estágios de provisão e fluxos de reportes para o BACEN (ex: DOC 3040).
- **`auditoria-dados.html`**:
  - Detalhar técnicas de linhagem física de dados para relatórios do BACEN e CVM.
  - Apresentar exemplos práticos de PySpark para rastreabilidade de dados a nível de coluna (column-level lineage).
  - Projetar diagramas SVG de governança (Lake Formation RLS/CLS, regras Glue DQDL).
- **`finops-financas.html`**:
  - Melhorar e detalhar as seções de otimização de custos FinOps aplicadas a processamento de dados financeiros (Vacuum, Compaction Iceberg, S3 Lifecycle Tiers), incluindo diagramas e tabelas de custos simuladas.

### R2. Correção de Bugs do Sidebar nas Páginas Financeiras
- Garantir que TODAS as 9 páginas em `/pages/financas/` incluam corretamente os scripts inline (`toggleCategory`, `toggleNav`, `scrollToTop`) e os elementos HTML necessários (`#sidebar`, `#hamburger`), resolvendo o problema de links que "não abrem no sidebar" nas páginas `pos-venda-reconciliacao.html`, `contabilidade-razonetes.html`, `risco-montecarlo.html` e `normas-regulatorio.html`.

### R3. Garantia de Layout e Visualização (Acessibilidade)
- Manter o design em Dark Mode premium harmonizado (`style.css`), tipografias elegantes e badges de alto contraste.
- Formatar todas as equações matemáticas estritamente com os delimitadores KaTeX recomendados (`\(` e `\[`).
- Desenhar diagramas SVG responsivos, com alto contraste, fontes integradas e sem nenhuma sobreposição de textos.

### R4. Estrutura e Homologação por Múltiplos Agentes
- **Agentes Especialistas**: Um para cada página HTML, encarregado de implementar e revisar as alterações de conteúdo específicas de sua especialidade técnica/financeira.
- **Agente Layout Reviewer**: Auditar a consistência de CSS, contraste e design responsivo de todos os arquivos.
- **Agente Usuário (UX Evaluator)**: Testar a legibilidade e fluidez didática de cada seção aprimorada.
- **Agente Juiz**: Consolidar a auditoria técnica final e homologar o merge dos arquivos na branch `feat/financas-dados-cleanup`.

## Acceptance Criteria

### Estrutura e Correções do Sidebar
- [ ] O sidebar carrega, colapsa e abre links perfeitamente em todas as 9 páginas em `/pages/financas/`.
- [ ] Nenhuma das páginas no diretório `/pages/financas/` apresenta erro de console de JavaScript relacionado à ausência de `toggleCategory` ou `toggleNav`.

### Conteúdos Financeiros e de Risco
- [ ] A página `onboarding.html` contém o JSON Schema Draft-07/2020-12 da Proposta de Crédito e o fluxo funcional SVG com ícones AWS 2026.
- [ ] A página `matematica-financeira.html` apresenta referências bibliográficas acadêmicas, fórmulas KaTeX e exemplos operacionais de código em Python/PySpark/SQL.
- [ ] A página `contabilidade-razonetes.html` inclui diagramas SVG de razonetes, propostas de modelagem física e a seção detalhada de cálculo da Taxa de Juros Efetiva sob o novo BRGAAP (CMN 4.966).
- [ ] A página `risco-montecarlo.html` aborda do básico ao avançado a gestão de risco e implementa simulações de Monte Carlo.
- [ ] A página `auditoria-dados.html` contém linhagem de dados em PySpark voltada para relatórios do Banco Central e CVM.

### Layout e Visualizações
- [ ] Todas as equações matemáticas renderizam sem delimitações brutas visíveis de KaTeX.
- [ ] Todos os novos diagramas SVG nativos estão legíveis, sem sobreposição de textos e adaptados para leitura noturna/diurna.

## 2026-08-07T02:30:51Z

<USER_REQUEST>
# Orquestração de Documentação e Arquitetura Antigravity (Multi-Agent IA Platform, RAG & LangChain)

Working directory: /Users/mauriciohelfstein/dev/aws-data-mastery
Integrity mode: development

## Requirements

### R1. Expansão de Conteúdo Estruturada (Um Agente por Página)
Instancie subagentes especialistas dedicados para cada uma das páginas em `pages/ia-algoritmos/` e `pages/engenharia/` relacionadas a IA e GenAI:
1. `pages/ia-algoritmos/supervisionado-regressao.html`
2. `pages/ia-algoritmos/supervisionado-ensembles.html`
3. `pages/ia-algoritmos/supervisionado-classificadores.html`
4. `pages/ia-algoritmos/nao-supervisionado-clustering.html`
5. `pages/ia-algoritmos/deep-learning-transformers.html`
6. `pages/engenharia/genai-rag-architectures.html`
7. `pages/engenharia/genai-system-design.html`
8. `pages/engenharia/genai-mcp-protocol.html`

Cada agente especialista deve garantir que a respectiva página contenha a estrutura obrigatória:
- **Conceitos:** Explicações teóricas e conceituais acessíveis e aprofundadas.
- **Exemplos Práticos:** Casos de uso do mundo real e aplicações em produtos digitais.
- **Blocos de Código:** Código formatado, executável e comentado em Python/PySpark/SQL.
- **Diagramas Draw.io:** Representações visuais nativas (SVG/Draw.io) com legendas detalhadas mapeando cada nó e interação.
- **Referências:** Seção final com links e bibliografia acadêmica/técnica.

### R2. Arquitetura de Plataforma de IA Multi-agentes (RAG & LangChain)
Nas páginas de arquitetura de IA (`deep-learning-transformers.html`, `genai-rag-architectures.html`, `genai-system-design.html`):
- Desenvolver diagramas de arquitetura complexos de plataformas de IA Multi-Agentes.
- Contemplar a orquestração de múltiplos agentes (LangChain / LangGraph, Agents for Amazon Bedrock), RAG Avançado (Dense/Sparse Hybrid Search, Re-ranking) e integração com Vector DBs (Amazon OpenSearch Serverless, Aurora pgvector).
- É **obrigatório** incluir legendas explicativas detalhadas abaixo de cada diagrama, descrevendo a função de cada componente e a sequência do fluxo de dados.

### R3. Auditoria de Jornada & Auto-correção (Self-Healing)
- Auditar a jornada de leitura e aprendizado de IA no portal.
- Gerar um relatório detalhado de apontamentos identificando ambiguidades ou inconsistências.
- Invocar um Agente Revisor dedicado para aplicar automaticamente todas as correções apontadas nas páginas HTML.

## Acceptance Criteria
- [ ] Todas as 8 páginas da trilha de IA/GenAI contêm Conceitos, Exemplos Práticos, Código, Diagramas com Legenda e Referências.
- [ ] Diagramas da arquitetura Multi-Agente RAG + LangChain com legendas explicativas completas.
- [ ] Relatório de auditoria gerado e correções aplicadas via agente revisor (self-healing).
</USER_REQUEST>
</USER_REQUEST>
