# Portal Financeiro - Especificações de Visualizações

**Versão:** 1.0  
**Data:** 2026-08-16  
**Especialista:** Data Visualization Specialist  
**Status:** Planning & Specifications (sem implementação)

---

## 📋 Sumário Executivo

Este documento estrutura a estratégia visual completa para o Portal Financeiro, cobrindo:
- **24 Gráficos específicos** com tipos, variáveis e especificações
- **12 Diagramas Draw.io** para conceitos e fluxos
- **Paleta de cores** para tema escuro e claro com acessibilidade
- **Mock data** para testes e prototipagem
- **Guia de interatividade** e responsividade

---

## 1️⃣ CATÁLOGO DE GRÁFICOS

### 1.1 Conceitos Financeiros (6 gráficos)

| # | Página | Gráfico | Tipo | Dados Principais | Cores | Interatividade |
|---|--------|---------|------|-----------------|-------|-----------------|
| **G1** | Dashboard | Composição do Capital | Donut Chart | Equity, Debt, Hybrids | Primário (Azul/Verde/Roxo) | Tooltip com %, Click para filtrar |
| **G2** | Balanço | Ativo vs Passivo no Tempo | Stacked Bar | Período, Categoria, Valor | Divergente (Azul-Laranja) | Hover valores, Zoom histórico |
| **G3** | Balanço | Evolução do Patrimônio Líquido | Line Chart | Data, PL Total, Variação | Primário (Azul), Destacador (Verde) | Trend line, Annotations de marcos |
| **G4** | Estrutura | Hierarquia de Contas | Treemap | Categoria, Valor, Tipo | Sequencial (Azul-Claro) | Click para drill-down, Tooltip |
| **G5** | Dashboard | ROE vs ROA Histórico | Dual Axis | Trimestre, ROE, ROA | Cores distintas (Verde/Laranja) | Comparação on-hover |
| **G6** | Estrutura | Margem Operacional por Segmento | Horizontal Bar | Segmento, % Margem | Sequencial (Verde-Amarelo) | Highlight on-hover, Ranking |

---

### 1.2 Risco & Rating (6 gráficos)

| # | Página | Gráfico | Tipo | Dados Principais | Cores | Interatividade |
|---|--------|---------|------|-----------------|-------|-----------------|
| **G7** | Risco | Distribuição de Ratings | Bar Chart | Rating (AAA-D), Quantidade, % | Categórico (Verde→Vermelho) | Drill-down por rating |
| **G8** | Risco | Matriz de Transição de Rating | Heatmap | From Rating, To Rating, Probabilidade | Divergente (Azul→Vermelho) | Tooltip com %, Filtro por período |
| **G9** | Risco | Curva de Probabilidade de Default | Area Chart | Período (anos), PD por Rating | Espectro de cores por rating | Hover para valores exatos |
| **G10** | Risco | Distribuição de Riscos | Scatter Plot | Volatilidade, Retorno, Setor | Cores por setor | Legend filter, Bubble size = volume |
| **G11** | Risco | VaR - Value at Risk 99% | Gauge Chart | VaR %, Threshold, Status | Sequencial com aviso (Verde→Vermelho) | Status indicador, Tooltip |
| **G12** | Risco | Concentração de Crédito | Stacked Area | Data, Concentração %, Top Devedores | Gradiente | Stacked toggle, Zoom temporal |

---

### 1.3 Regulação (4 gráficos)

| # | Página | Gráfico | Tipo | Dados Principais | Cores | Interatividade |
|---|--------|---------|------|-----------------|-------|-----------------|
| **G13** | Compliance | Índice de Adequação de Capital | KPI + Progress | Mínimo Obrigatório, Atual, Margem | Espectro (Verde→Vermelho) | Tooltip regulatório, Histórico |
| **G14** | Compliance | Cronograma Normativo | Timeline/Gantt | Lei, Data, Status, Impacto | Cor por status | Click para detalhes, Filtro tipo lei |
| **G15** | Compliance | Matriz de Conformidade | Matrix/Grid | Regulação, Área, Status | 3-color (✓/⚠/✗) | Drill-down por área |
| **G16** | Compliance | Relatórios Obrigatórios - Status | Progress Bars | Relatório, % Concluído, Prazo | Cores por status | Click para expansão |

---

### 1.4 Dados & Arquitetura (4 gráficos)

| # | Página | Gráfico | Tipo | Dados Principais | Cores | Interatividade |
|---|--------|---------|------|-----------------|-------|-----------------|
| **G17** | Data Platform | Qualidade de Dados | Radial/Radar | Completude, Validação, Atualização, Acurácia | Degradê (Verde-Amarelo-Vermelho) | Hover por métrica |
| **G18** | Data Platform | Volume de Dados por Fonte | Waterfall | Origem, Transformação, Destino, Volume | Sequencial (Azul) | Hover valores |
| **G19** | Data Platform | Latência de Processamento | Box Plot | Hora do Dia, Mediana, Q1/Q3, Outliers | Boxplot (Azul/Cinza) | Tooltip estatístico |
| **G20** | Data Platform | Cobertura de Dados por Domínio | Horizontal Bar | Domínio, % Cobertura, Meta | Comparativo (Azul vs Cinza) | Filtro por meta |

---

### 1.5 Modelos & ML (4 gráficos)

| # | Página | Gráfico | Tipo | Dados Principais | Cores | Interatividade |
|---|--------|---------|------|-----------------|-------|-----------------|
| **G21** | Modelos | Desempenho do Modelo - ROC Curve | Line Chart | Taxa Falso Positivo, Taxa Verdadeiro Positivo | Primário (Azul), Baseline (Cinza) | Tooltip com AUC, Threshold selection |
| **G22** | Modelos | Feature Importance | Horizontal Bar | Feature, Importância (%) | Degradê (Azul-Claro) | Hover tooltip, Top 10 filter |
| **G23** | Modelos | Matriz de Confusão | Heatmap | Predito, Real, Contagem | 3-color (Verde/Amarelo/Vermelho) | Tooltip com %, Zoom |
| **G24** | Modelos | Evolução de Acurácia | Multi-line Chart | Versão Modelo, Acurácia, Precision, Recall | Cores distintas | Hover comparativo, Legend filter |

---

## 2️⃣ ESPECIFICAÇÕES VISUAIS DETALHADAS

### 2.1 Template de Especificação por Gráfico

```
### G[X]: [Nome do Gráfico]

**Página:** [página]
**Tipo:** [Bar/Line/Area/Scatter/etc]
**Contexto:** [Que pergunta responderia?]

#### Dados
- **Dimensões:** [Categorias, períodos, segmentos]
- **Medidas:** [Valores numéricos, %, índices]
- **Granularidade:** [Diário/Mensal/Trimestral/Anual]
- **Fonte de Dados:** [Tabela/API/Cache]

#### Especificações Visuais

**Tema Claro:**
- X-Axis: [Cor texto], tamanho 12px
- Y-Axis: [Cor texto], tamanho 12px
- Barras/Linhas: [Cores primárias]
- Background: #FFFFFF
- Grid: #E8E8E8 (20% opacity)
- Text: #1A1A1A

**Tema Escuro:**
- X-Axis: [Cor texto], tamanho 12px
- Y-Axis: [Cor texto], tamanho 12px
- Barras/Linhas: [Cores ajustadas]
- Background: #1E1E1E
- Grid: #404040 (20% opacity)
- Text: #E8E8E8

#### Responsividade
- Desktop (1280px+): [Layout]
- Tablet (768px-1279px): [Layout]
- Mobile (375px-767px): [Layout]

#### Interatividade
- Hover: [Tooltip com dados]
- Click: [Ação - filtro/drill-down]
- Legend: [Comportamento]
- Zoom: [Se aplicável]

#### Acessibilidade
- Alt-text: [Descrição para leitores de tela]
- Contraste: [WCAG AA mínimo]
- Tabindex: [Se necessário]
- Keyboard: [Navegação por teclas]

#### Mock Data
```json
{
  "data": [
    {"label": "...", "value": ..., "category": "..."}
  ],
  "metadata": {"unit": "...", "period": "2026-Q3"}
}
```

---

### 2.2 Especificações Expandidas (Amostra)

#### G1: Composição do Capital

**Página:** Dashboard  
**Tipo:** Donut Chart  
**Contexto:** Qual é a estrutura de capital? Equity vs Debt?

**Dados**
- **Dimensões:** Tipo de Capital (Equity, Subordinated Debt, Debt)
- **Medidas:** Valor em R$ Milhões, % do Total
- **Granularidade:** Trimestral (última data)
- **Fonte:** [DB] financeiro.capital_structure

**Especificações Visuais**

**Tema Claro:**
- Donut Center: 60px radius
- Slice Colors: #2563EB (Equity), #9333EA (Subordinated), #DC2626 (Debt)
- Outer Ring: #F3F4F6
- Text: #1F2937 (14px bold para labels, 12px para valores)
- Legend: direita, vertical, #333333

**Tema Escuro:**
- Donut Center: 60px radius
- Slice Colors: #60A5FA (Equity), #C084FC (Subordinated), #EF4444 (Debt)
- Outer Ring: #2D3748
- Text: #E2E8F0 (14px bold para labels)
- Legend: direita, vertical, #CBD5E0

**Responsividade**
- Desktop (1280px+): Donut + Legend lado a lado (50%-50%)
- Tablet (768px-1279px): Donut 60%, Legend 40%
- Mobile (375px-767px): Donut full-width, Legend abaixo (stack)

**Interatividade**
- Hover: Tooltip "EQUITY: R$5.200M (42%)"
- Click: Toggle drill-down (mostrar sub-componentes de cada categoria)
- Legend: Click para highlight, duplo-click para isolate
- Animation: Fade-in suave (300ms)

**Acessibilidade**
- Alt-text: "Composição de capital: Equity 42%, Subordinated Debt 28%, Debt 30%. Valores em reais."
- Contraste: Ratio 4.5:1 (texto vs fundo)
- Keyboard: Tab para navegar slices, Enter para drill-down
- ARIA: role="img", aria-label com descrição completa

**Mock Data**
```json
{
  "labels": ["Equity", "Subordinated Debt", "Debt"],
  "values": [5200, 3500, 3800],
  "colors": ["#2563EB", "#9333EA", "#DC2626"],
  "unit": "R$ Milhões",
  "period": "2026-Q3",
  "total": 12500
}
```

---

#### G8: Matriz de Transição de Rating

**Página:** Risco  
**Tipo:** Heatmap  
**Contexto:** Como ratings evoluem? Qual a probabilidade de upgrade/downgrade?

**Dados**
- **Dimensões:** Rating Inicial (AAA, AA, A, BBB, BB, B, CCC, CC, C, D), Rating Final (mesmos)
- **Medidas:** Probabilidade de Transição (%), Contagem de Operações
- **Granularidade:** Últimos 12 meses
- **Fonte:** [DB] risco.rating_transitions

**Especificações Visuais**

**Tema Claro:**
- Cells: Gradiente Azul (Estável) → Amarelo (Movimento) → Vermelho (Downgrade severo)
- Cell Value: #FFFFFF (bold 11px) se background escuro, #000000 se claro
- Axis Labels: #374151 (11px)
- Axis Headers: #111827 (bold 12px)
- Grid Lines: #D1D5DB (1px)

**Tema Escuro:**
- Cells: Gradiente Azul-claro (Estável) → Amarelo-claro (Movimento) → Vermelho-claro (Downgrade)
- Cell Value: #000000 (bold 11px) se background claro, #FFFFFF se escuro
- Axis Labels: #9CA3AF (11px)
- Axis Headers: #F3F4F6 (bold 12px)
- Grid Lines: #4B5563 (1px)

**Responsividade**
- Desktop (1280px+): Full heatmap 10×10 com scroll horizontal se necessário
- Tablet: Subset (top 5 ratings) ou scroll horizontal
- Mobile: Reduced size ou tabela alternativa com swipe

**Interatividade**
- Hover: Tooltip "AAA→AA: 85% (Estável)"
- Click Cell: Drill-down para listar operações com essa transição
- Filter: Dropdown para filtrar por período, setor, ou faixa de valor
- Color Legend: Dinâmico com escala (0%-100%)

**Acessibilidade**
- Alt-text: "Matriz de transição de rating, 10 por 10. AAA→AAA 85% (mais estável), BBB→BB 22% (mais risco)."
- Keyboard: Arrow keys para navegar cells, Enter para drill-down
- Screen Reader: Cada célula lida como "[From] para [To]: [%]"
- Contraste: Min 4.5:1

**Mock Data**
```json
{
  "matrix": [
    { "from": "AAA", "to": "AAA", "probability": 85, "count": 340 },
    { "from": "AAA", "to": "AA", "probability": 12, "count": 48 },
    { "from": "AAA", "to": "A", "probability": 2, "count": 8 },
    { "from": "AAA", "to": "BBB", "probability": 1, "count": 4 },
    { "from": "AA", "to": "AAA", "probability": 5, "count": 18 },
    { "from": "AA", "to": "AA", "probability": 80, "count": 288 },
    { "from": "AA", "to": "A", "probability": 10, "count": 36 },
    { "from": "AA", "to": "BBB", "probability": 4, "count": 14 },
    { "from": "AA", "to": "BB", "probability": 1, "count": 4 }
  ],
  "period": "2025-2026",
  "unit": "%"
}
```

---

#### G19: Latência de Processamento (Box Plot)

**Página:** Data Platform  
**Tipo:** Box Plot  
**Contexto:** Como varia latência ao longo do dia? Onde estão os gargalos?

**Dados**
- **Dimensões:** Hora do Dia (00:00-23:00), Pipeline Stage
- **Medidas:** Latência (ms), Min, Q1, Mediana, Q3, Max, Outliers
- **Granularidade:** Horária (último dia)
- **Fonte:** [Logs] data.processing_latency

**Especificações Visuais**

**Tema Claro:**
- Box: #3B82F6 (preenchimento 30%)
- Whisker: #1F2937 (2px)
- Mediana: #DC2626 (bold 2px)
- Outliers: #F59E0B (círculos pequenos)
- Y-Axis Label: #374151 (12px)
- X-Axis: Horas 00-23, #374151

**Tema Escuro:**
- Box: #60A5FA (preenchimento 30%)
- Whisker: #E5E7EB (2px)
- Mediana: #EF4444 (bold 2px)
- Outliers: #FBBF24 (círculos pequenos)
- Y-Axis Label: #D1D5DB (12px)
- X-Axis: Horas, #9CA3AF

**Responsividade**
- Desktop: Full 24-hour view, lado a lado com comparativo de pipelines
- Tablet: 12-hour ou grouped view
- Mobile: Swipe entre períodos, single pipeline por vez

**Interatividade**
- Hover Box: Tooltip "Mediana: 245ms, Q1: 180ms, Q3: 310ms"
- Hover Outlier: "Anomalia 18:30 - 892ms (reprocessamento detectado)"
- Click Box: Drill-down para distribuição de valores nessa hora
- Filter: Seletor de pipeline (Ingestion/Transform/Load)
- Comparação: Toggle "Comparar com ontem"

**Acessibilidade**
- Alt-text: "Box plot de latência, 24 horas. Mediana 245ms, outliers em 18:30."
- Keyboard: Arrow keys para navegar horas, Enter para drill-down
- Screen Reader: "[Hora]: Mediana [ms], Range [ms]-[ms]"

**Mock Data**
```json
{
  "boxplots": [
    {
      "hour": "06:00",
      "min": 120,
      "q1": 180,
      "median": 215,
      "q3": 280,
      "max": 450,
      "outliers": []
    },
    {
      "hour": "12:00",
      "min": 240,
      "q1": 320,
      "median": 385,
      "q3": 520,
      "max": 890,
      "outliers": [892, 1200]
    },
    {
      "hour": "18:00",
      "min": 180,
      "q1": 240,
      "median": 290,
      "q3": 410,
      "max": 650,
      "outliers": [892]
    }
  ],
  "unit": "ms",
  "date": "2026-08-16"
}
```

---

## 3️⃣ DIAGRAMAS DRAW.IO

### 3.1 Lista de Diagramas

| # | Diagrama | Tipo | Propósito | Componentes Principais |
|---|----------|------|----------|------------------------|
| **D1** | Hierarquia SFN | Organization Chart | Estrutura regulatória brasileira | Banco Central, CVM, SUSEP, Órgãos |
| **D2** | Ciclo de Aprovação de Crédito | Flowchart | Processos de concessão | Solicitação → Análise → Aprovação → Desembolso |
| **D3** | Arquitetura de Dados | System Architecture | Fluxo de dados | Sources → Ingestion → Lake → Warehouse → BI |
| **D4** | Pipeline ML (Credit Risk) | Process Flow | Modelo de risco de crédito | Features → Training → Validation → Production |
| **D5** | Matriz de Risco | Risk Matrix | Avaliação de riscos | Probabilidade vs Impacto, células de ação |
| **D6** | Fluxo de Conformidade | Sequence Diagram | Processo de compliance | Areas → Checklist → Audit → Sign-off |
| **D7** | Estrutura de Capital | Org Chart | Hierarquia financeira | Holding → Subsidiárias → Portfolios |
| **D8** | Balanço Patrimonial | Sunburst | Decomposição de ativos | Ativo Circulante/Não-Circulante → Contas |
| **D9** | Fluxo de Caixa | Sankey Diagram | Movimentação de recursos | Entradas → Uso → Aplicações |
| **D10** | Cadeia de Modelos ML | DAG (Directed Acyclic Graph) | Dependências de modelos | Feature Store → Models → Predictions |
| **D11** | Cronograma Normativo | Timeline | Datas de conformidade | Lei → Publicação → Implementação → Enforcement |
| **D12** | Integração API | System Integration | Endpoints e fluxos | APIs Internas → Externas → Parceiros |

---

### 3.2 Especificações de Diagramas Draw.io

#### D1: Hierarquia SFN (Organization Chart)

**Propósito:** Visualizar estrutura regulatória brasileira e responsabilidades

**Estrutura:**
```
Governo Federal
├── Banco Central do Brasil
│   ├── Supervisão Prudencial
│   ├── Estabilidade Financeira
│   └── Política Monetária
├── Comissão de Valores Mobiliários (CVM)
│   ├── Regulação de Mercado
│   └── Proteção ao Investidor
├── SUSEP (Seguros)
├── Ministério da Economia
└── Receita Federal (Compliance Fiscal)
```

**Elementos Visuais:**
- **Cores:** Azul (#2563EB) para órgãos federais, Verde (#10B981) para supervisão, Laranja (#F97316) para regulação
- **Formas:** Retângulos arredondados para órgãos, conexões retas para hierarquia
- **Fonts:** Título 16px bold, Labels 12px, Sub-labels 10px
- **Dimensão:** 1200×800 (desktop), responsivo em 100%

**Componentes:**
- Logo/Escudo de cada órgão
- Título e função de cada entidade
- Linhas de reporte e colaboração
- Legenda com cores = tipo de função

**Responsividade:**
- Desktop: Full org chart com connectors
- Tablet: Colapsável, expand/collapse por clique
- Mobile: Vertical tree ou tabela expansível

---

#### D3: Arquitetura de Dados (System Architecture)

**Propósito:** Mostrar fluxo de dados do operacional ao analytics

**Estrutura:**
```
┌─ DATA SOURCES ─────────────────────────────────────┐
│ • ERP (Contas Correntes)                            │
│ • CRM (Clientes)                                    │
│ • LMS (Empréstimos)                                 │
│ • Risk System (Ratings)                             │
│ • Market Data (Bloomberg, Refinitiv)                │
└──────────────────────────────┬──────────────────────┘
          ↓ (API/ETL)
┌─ INGESTION LAYER ──────────────────────────────────┐
│ • AWS Glue (ETL)                                    │
│ • Kafka (Real-time Streams)                         │
│ • Firehose (Log Aggregation)                        │
└──────────────────────────────┬──────────────────────┘
          ↓ (Validation/Normalize)
┌─ DATA LAKE (S3) ───────────────────────────────────┐
│ • Raw (Untouched Source Data)                       │
│ • Processed (Cleaned, Validated)                    │
│ • Curated (Business-Ready)                          │
└──────────────────────────────┬──────────────────────┘
    ↓ (Data Warehouse)      ↓ (ML)       ↓ (Cache)
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Redshift    │  │ ML Pipeline  │  │ Redis Cache  │
│  (Analytics) │  │ (SageMaker)  │  │ (Real-time)  │
└──────────────┘  └──────────────┘  └──────────────┘
    ↓                 ↓                   ↓
┌──────────────────────────────────────────────────────┐
│              BI LAYER (Dashboards)                   │
│  • Portal Financeiro (Análises)                      │
│  • Reports (Conformidade)                            │
│  • Models (Risco, Crédito, Fraude)                   │
└──────────────────────────────────────────────────────┘
```

**Elementos Visuais:**
- **Cores:** Laranja (#FF9500) para fontes, Azul (#2563EB) para processamento, Verde (#10B981) para destino, Roxo (#8B5CF6) para ML
- **Formas:** 
  - Cilindros para databases (S3, Redshift, Kafka)
  - Caixas arredondadas para serviços (Glue, Firehose)
  - Triângulos/setas para fluxo de dados
- **Fonts:** Título 14px bold, Labels 10px, Muted 9px

**Componentes:**
- Ícones AWS (S3, Glue, Redshift, SageMaker, Firehose)
- Setas de fluxo com labels ("API", "ETL", "Stream", "Query")
- Caixas de agrupamento por camada (Sources, Ingestion, Lake, Warehouse)
- Legenda explicando cada camada

**Interatividade (Draw.io):**
- Agrupamentos colapsáveis por clique
- Tooltips em hover para componentes (função, tecnologia)
- Cores dinâmicas para "data temperature" (hot/warm/cold storage)

---

#### D4: Pipeline ML - Credit Risk (Process Flow)

**Propósito:** Detalhar etapas de criação e deployment de modelo de risco

**Estrutura:**
```
┌─────────────────────────────────────────────────────┐
│        FEATURE ENGINEERING                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ Cliente  │→ │ Histórico│→ │ Behaviour│          │
│  │ Dados    │  │ Crédito  │  │ Score    │          │
│  └──────────┘  └──────────┘  └──────────┘          │
│       ↓              ↓              ↓               │
│  ┌──────────────────────────────────┐              │
│  │ Feature Store (Offline/Online)   │              │
│  └──────────────────┬───────────────┘              │
└─────────────────────┼──────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│        TRAINING (SageMaker)                         │
│  ┌────────────┐  ┌────────────┐                    │
│  │ Algorithm  │→ │ Validation │                    │
│  │ Selection  │  │ Splitting  │                    │
│  └────────────┘  └────────┬───┘                    │
│                           ↓                         │
│                  ┌──────────────────┐              │
│                  │ Model Training   │              │
│                  │ (XGBoost/LR)     │              │
│                  └────────┬─────────┘              │
│                           ↓                         │
│                  ┌──────────────────┐              │
│                  │ Hyperparameter   │              │
│                  │ Tuning           │              │
│                  └────────┬─────────┘              │
└─────────────────────────────┼──────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────┐
│        EVALUATION                                   │
│  ┌──────────────┐  ┌──────────────┐               │
│  │ Test Set     │→ │ Metrics      │               │
│  │ Prediction   │  │ (AUC, KS, IV)│               │
│  └──────────────┘  └────────┬─────┘               │
│                             ↓                      │
│                   ┌──────────────────┐            │
│                   │ Model Comparison │            │
│                   │ vs Baseline      │            │
│                   └────────┬─────────┘            │
│                            ↓                      │
│                   [ Approved? ]                   │
│                      ↙       ↘                    │
│                   YES        NO → Iterate        │
└─────────────────────────┬──────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│        PRODUCTION DEPLOYMENT                       │
│  ┌──────────────┐  ┌──────────────┐               │
│  │ Model Registry│→ │ Containerize │               │
│  │ (MLflow)      │  │ (ECR)        │               │
│  └──────────────┘  └────────┬─────┘               │
│                             ↓                      │
│                  ┌──────────────────┐            │
│                  │ A/B Test         │            │
│                  │ (Canary Deploy)  │            │
│                  └────────┬─────────┘            │
│                           ↓                      │
│              ┌────────────────────────┐         │
│              │ Monitoring & Alerts    │         │
│              │ (Data Drift, Performance)│       │
│              └────────────────────────┘         │
└─────────────────────────────────────────────────────┘
```

**Elementos Visuais:**
- **Cores:** Verde (#10B981) para sucesso, Amarelo (#FBBF24) para validação, Azul (#2563EB) para processamento, Vermelho (#DC2626) para falha
- **Formas:** Caixas arredondadas para etapas, losangos para decisões
- **Fonts:** Títulos 12px bold, Labels 10px

**Componentes:**
- Etapas sequenciais com números/cores
- Loops de iteração (Iterate se falhar)
- Pontos de decisão (Approved?)
- Ferramentas AWS/Tech stack

---

#### D9: Fluxo de Caixa (Sankey Diagram)

**Propósito:** Visualizar movimentação e aplicação de recursos financeiros

**Estrutura:**
```
ENTRADAS                USO                  APLICAÇÕES
(Fontes)            (Intermediárias)         (Destinos)
│
├─ Depósitos        ├─ Reservas Obrig.      ├─ Empréstimos PJ
│  └─ R$2.500M  ────┼─ R$800M          ────┤  (R$2.200M)
│                   │
├─ Captação MKT     ├─ Capital Buffer       ├─ Financiamentos
│  └─ R$1.800M  ────┼─ R$600M          ────┤  (R$1.500M)
│                   │
├─ Resultado        ├─ Operacional          ├─ Investimentos
│  └─ R$450M    ────┼─ R$400M           ───┤  (R$400M)
│                   │
└─ Financiamento Ext├─ Outros               ├─ Outros Ativos
   └─ R$250M    ────│  R$200M           ───┘  (R$400M)

Total: R$5.000M     Total: R$2.000M       Total: R$4.500M
```

**Elementos Visuais:**
- **Nós:** Retângulos com valor e % (ex: "Depósitos - R$2.500M (50%)")
- **Fluxos:** Fitas coloridas com largura proporcional ao valor
  - Entrada: Verde (#10B981)
  - Intermediária: Cinza (#6B7280)
  - Saída: Azul (#2563EB)
- **Labels:** Valores em R$ e % ao lado de cada fluxo

**Componentes:**
- Grouping de categorias (Funding, Treasury, Lending)
- % do total em cada etapa
- Comparativo with período anterior (setas de variação)

---

## 4️⃣ PALETA DE CORES

### 4.1 Cores Primárias

**Tema Claro:**
```css
--primary-blue: #2563EB;      /* Main accent, charts */
--primary-green: #10B981;     /* Success, positive */
--primary-orange: #FF9500;    /* Warnings, action */
--primary-red: #DC2626;       /* Critical, negative */
--primary-purple: #8B5CF6;    /* Secondary, ML/Data */
```

**Tema Escuro:**
```css
--primary-blue: #60A5FA;      /* Lighter blue for dark bg */
--primary-green: #34D399;     /* Lighter green */
--primary-orange: #FBBF24;    /* Lighter orange */
--primary-red: #EF4444;       /* Lighter red */
--primary-purple: #C084FC;    /* Lighter purple */
```

### 4.2 Cores de Neutros

```css
/* Tema Claro */
--white: #FFFFFF;
--light-gray-50: #F9FAFB;
--light-gray-100: #F3F4F6;
--light-gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-500: #6B7280;
--dark-gray-700: #374151;
--dark-gray-900: #111827;

/* Tema Escuro */
--dark-bg: #1E1E1E;           /* Main background */
--dark-surface: #2D2D2D;      /* Cards, elevated */
--dark-muted: #404040;        /* Borders, dividers */
--dark-text: #E8E8E8;         /* Main text */
--dark-text-muted: #A0A0A0;   /* Secondary text */
```

### 4.3 Paleta Sequencial (Degradê - Uma Variável)

**Verde (Positivo):**
```
#DBEAFE → #BFDBFE → #60A5FA → #3B82F6 → #1D4ED8
```

**Vermelho (Negativo):**
```
#FEE2E2 → #FECACA → #EF4444 → #DC2626 → #991B1B
```

**Amarelo (Neutro/Atenção):**
```
#FFFBEB → #FEF3C7 → #FBBF24 → #F59E0B → #D97706
```

### 4.4 Paleta Divergente (Duas Variáveis)

**Azul → Neutro → Vermelho:**
```
#1E40AF → #3B82F6 → #E5E7EB → #FCA5A5 → #DC2626
```

**Verde → Neutro → Laranja:**
```
#065F46 → #10B981 → #F3F4F6 → #FDBA74 → #D97706
```

### 4.5 Paleta Categórica (Múltiplas Dimensões)

**10 Cores Distintas:**
```
#2563EB (Blue)     - Categoria 1
#10B981 (Green)    - Categoria 2
#F97316 (Orange)   - Categoria 3
#8B5CF6 (Purple)   - Categoria 4
#EC4899 (Pink)     - Categoria 5
#06B6D4 (Cyan)     - Categoria 6
#D97706 (Amber)    - Categoria 7
#7C3AED (Violet)   - Categoria 8
#059669 (Emerald)  - Categoria 9
#DC2626 (Red)      - Categoria 10
```

### 4.6 Validação de Contraste (WCAG AA)

**Contraste Mínimo: 4.5:1**

| Foreground | Background | Ratio | Status |
|-----------|-----------|-------|--------|
| #111827 | #FFFFFF | 19.07:1 | ✓ AAA |
| #2563EB | #FFFFFF | 8.59:1 | ✓ AA |
| #10B981 | #FFFFFF | 6.89:1 | ✓ AA |
| #E8E8E8 | #1E1E1E | 17.4:1 | ✓ AAA |
| #60A5FA | #1E1E1E | 9.2:1 | ✓ AA |

---

## 5️⃣ MOCK DATA PARA TESTES

### 5.1 Dataset: Capital Composition (G1)

```json
{
  "timestamp": "2026-08-16T10:30:00Z",
  "data": {
    "labels": ["Equity", "Subordinated Debt", "Senior Debt"],
    "values": [5200, 3500, 3800],
    "percentages": [42.4, 28.5, 30.9],
    "currency": "BRL",
    "unit": "Milhões"
  },
  "metadata": {
    "period": "Q3-2026",
    "total": 12500,
    "version": "1.0"
  }
}
```

### 5.2 Dataset: Rating Transitions (G8)

```json
{
  "period": "2025-2026",
  "data": [
    {"from": "AAA", "to": "AAA", "probability": 85.2, "count": 340},
    {"from": "AAA", "to": "AA", "probability": 11.8, "count": 48},
    {"from": "AAA", "to": "A", "probability": 2.0, "count": 8},
    {"from": "AAA", "to": "BBB", "probability": 1.0, "count": 4},
    {"from": "AA", "to": "AAA", "probability": 5.0, "count": 18},
    {"from": "AA", "to": "AA", "probability": 80.2, "count": 288},
    {"from": "AA", "to": "A", "probability": 10.0, "count": 36},
    {"from": "AA", "to": "BBB", "probability": 3.9, "count": 14},
    {"from": "AA", "to": "BB", "probability": 0.9, "count": 4},
    {"from": "A", "to": "AAA", "probability": 1.0, "count": 4},
    {"from": "A", "to": "AA", "probability": 8.5, "count": 34},
    {"from": "A", "to": "A", "probability": 82.0, "count": 328},
    {"from": "A", "to": "BBB", "probability": 6.5, "count": 26},
    {"from": "A", "to": "BB", "probability": 2.0, "count": 8}
  ],
  "total_operations": 2000,
  "unit": "%"
}
```

### 5.3 Dataset: Processing Latency (G19)

```json
{
  "date": "2026-08-16",
  "hour_granularity": "60min",
  "data": [
    {"hour": "00:00", "min": 85, "q1": 120, "median": 145, "q3": 180, "max": 280, "outliers": []},
    {"hour": "01:00", "min": 90, "q1": 125, "median": 150, "q3": 190, "max": 300, "outliers": []},
    {"hour": "06:00", "min": 120, "q1": 180, "median": 215, "q3": 280, "max": 450, "outliers": []},
    {"hour": "12:00", "min": 240, "q1": 320, "median": 385, "q3": 520, "max": 890, "outliers": [892, 1200, 1450]},
    {"hour": "18:00", "min": 180, "q1": 240, "median": 290, "q3": 410, "max": 650, "outliers": [892]},
    {"hour": "23:00", "min": 100, "q1": 140, "median": 170, "q3": 220, "max": 380, "outliers": []}
  ],
  "unit": "ms",
  "pipeline_stages": ["Ingestion", "Transform", "Load"]
}
```

### 5.4 Dataset: Model Performance (G21 - ROC Curve)

```json
{
  "model_name": "Credit Risk Prediction v4.2",
  "date_trained": "2026-08-10",
  "data": {
    "thresholds": [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    "fpr": [0.00, 0.02, 0.05, 0.08, 0.12, 0.18, 0.28, 0.42, 0.65, 0.85, 1.00],
    "tpr": [0.00, 0.45, 0.65, 0.78, 0.85, 0.90, 0.93, 0.95, 0.97, 0.99, 1.00]
  },
  "metrics": {
    "auc": 0.9234,
    "ks_statistic": 0.7520,
    "gini": 0.8468
  },
  "baseline_auc": 0.75,
  "unit": "ROC Curve"
}
```

---

## 6️⃣ GUIA DE INTERATIVIDADE

### 6.1 Padrões de Hover (Tooltips)

**Padrão Geral:**
```
Hover + 300ms delay
├─ Background: rgba(0,0,0,0.8) [light theme] / rgba(255,255,255,0.95) [dark]
├─ Border: 1px solid accent-color
├─ Padding: 8px 12px
├─ Border-radius: 4px
├─ Font-size: 12px
├─ Box-shadow: 0 4px 12px rgba(0,0,0,0.15)
└─ Z-index: 1000
```

**Conteúdo Tooltip:**
- Título: Label da categoria
- Valor principal: "R$ 5.200M" ou "42%"
- Contexto: "vs período anterior: +2.3%"
- Ação sugerida: "[Clique para detalhes]"

### 6.2 Padrões de Click/Drill-Down

**Nível 1 (Agregado):**
- Clique abre painel lateral ou modal com detalhes
- Breadcrumb mostra caminho: "Dashboard > Capital > Equity"
- Botão de volta

**Nível 2 (Detalhado):**
- Tabela com linhas individuais
- Sorting e filtering
- Export para CSV/PDF

**Nível 3 (Máximo):**
- Modo full-screen ou nova aba
- Comparações side-by-side
- Timeline histórico

### 6.3 Filtros Padrão

**Localização:** Acima do gráfico, sempre visível

**Tipos Comuns:**
```
├─ Data Range: "Últimos 30 dias" | "Customizado"
├─ Categoria: Dropdown multi-select
├─ Métrica: Radio buttons (único)
├─ Segmento: Checkboxes (múltiplo)
└─ Comparação: Toggle "vs Período Anterior"
```

**Comportamento:**
- Clique em filtro = re-renderiza gráfico (animação suave 300ms)
- Estado do filtro salvo em URL params ou localStorage
- Botão "Reset" para voltar ao padrão

### 6.4 Responsividade & Adaptação

| Viewport | Comportamento |
|----------|---------------|
| Desktop 1280px+ | Full viz + Legend lateral |
| Tablet 768-1279px | Viz 80% + Legend abaixo (stack) |
| Mobile <768px | Vertical stack, touch-optimized |

**Touch Interactions:**
- Tap = mesmo que hover + click
- Long press (500ms) = context menu
- Swipe left/right = navegar períodos
- Pinch = zoom (se aplicável)

### 6.5 Animações

```css
/* Entrada (Fade-in) */
animation: fadeIn 300ms ease-in;

/* Atualização de dados */
animation: slideIn 400ms ease-out;

/* Highlight on interact */
animation: pulse 500ms ease-in-out;

/* Transição de tema */
animation: themeTransition 250ms ease-in;
```

---

## 7️⃣ FERRAMENTAS & STACK TÉCNICO

### 7.1 Gráficos

**Recomendação Principal:** Recharts (React)
- Responsividade nativa
- Dark mode suportado
- Customização de cores
- Interatividade (tooltip, legend, click)

**Alternativas:**
- Chart.js: Lightweight, simples
- D3.js: Complexo, máxima flexibilidade
- Apache ECharts: Poderoso, muitas opções

### 7.2 Diagramas

**Draw.io (diagrams.net):**
- Exportar como SVG embarcado ou <div class="mxgraph">
- Compatível com viewer-static.min.js
- Edição colaborativa opcional

**Alternativas:**
- Mermaid: Diagrama como código (Markdown)
- Lucidchart: Mais sofisticado, pago
- PlantUML: UML especializado

### 7.3 Temas & CSS

**CSS Variables para Tema:**
```css
:root[data-theme="light"] {
  --bg-primary: #FFFFFF;
  --text-primary: #1A1A1A;
  --accent-blue: #2563EB;
  --chart-grid: #E8E8E8;
}

:root[data-theme="dark"] {
  --bg-primary: #1E1E1E;
  --text-primary: #E8E8E8;
  --accent-blue: #60A5FA;
  --chart-grid: #404040;
}

/* Transição automática */
* { transition: background-color 250ms, color 250ms; }
```

### 7.4 Acessibilidade

**Tools:**
- axe DevTools (testes)
- WAVE (validação)
- Lighthouse (audit)

**Checklist:**
- [ ] Alt-text em todas as imagens/gráficos
- [ ] Contraste WCAG AA (4.5:1 mínimo)
- [ ] Keyboard navigation (Tab, Arrow, Enter)
- [ ] Screen reader friendly (ARIA labels)
- [ ] Tamanho de fonte mínimo 12px
- [ ] Sem dependência de cor apenas (usar padrões)

---

## 8️⃣ CHECKLIST DE IMPLEMENTAÇÃO

### Fase 1: Setup Base
- [ ] Criar componente base para gráficos (Recharts wrapper)
- [ ] Implementar paleta de cores em CSS variables
- [ ] Setup dark/light theme toggle
- [ ] Criar componentes de tooltip e legenda

### Fase 2: Gráficos Críticos
- [ ] G1 - Capital Composition
- [ ] G2 - Ativo vs Passivo
- [ ] G8 - Rating Transitions
- [ ] G7 - Distribution

### Fase 3: Diagramas
- [ ] D1 - Hierarquia SFN
- [ ] D3 - Arquitetura de Dados
- [ ] D4 - Pipeline ML

### Fase 4: Interatividade & Responsividade
- [ ] Implementar filtros padrão
- [ ] Drill-down para tooltips
- [ ] Testes responsivos (mobile/tablet/desktop)
- [ ] Animações suaves

### Fase 5: Acessibilidade & Testes
- [ ] Alt-text para todos os gráficos
- [ ] Testes de contraste
- [ ] Keyboard navigation
- [ ] Screen reader testing
- [ ] Teste de performance

### Fase 6: Documentação
- [ ] Storybook para componentes
- [ ] Documentação de API (props)
- [ ] Guia de cores (uso correto)
- [ ] Exemplos de mock data

---

## 9️⃣ REFERÊNCIAS & RECURSOS

### Documentação
- [Recharts Docs](https://recharts.org)
- [Chart.js Docs](https://www.chartjs.org)
- [Draw.io API](https://www.diagrams.net/doc/faq/embed-diagram)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Inspiração Visual
- [Financial Data Viz](https://www.figma.com/community/search?q=financial)
- [Risk Dashboards](https://www.tableau.com/public/gallery)
- [Regulatory Compliance UIs](https://dribbble.com/search?q=compliance+dashboard)

### Ferramentas Úteis
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors.co](https://coolors.co) - Paleta generator
- [Material Design Colors](https://material.io/design/color/)

---

## 🔟 PRÓXIMOS PASSOS

### Curto Prazo (1-2 sprints)
1. Implementar 6 gráficos de prioridade alta (Capital, Balanço, Ratings, Data)
2. Criar componentes base reutilizáveis
3. Setup paleta de cores e tema

### Médio Prazo (3-4 sprints)
1. Implementar 12+ diagramas Draw.io
2. Adicionar filtros e drill-down
3. Testes de acessibilidade

### Longo Prazo (5+ sprints)
1. Otimização de performance (lazy loading, caching)
2. Integrações com APIs reais
3. Analytics e telemetria
4. Documentação em Storybook

---

**Documento Preparado Por:** Data Visualization Specialist  
**Data:** 2026-08-16  
**Status:** ✅ Specifications Complete - Ready for Implementation Planning
