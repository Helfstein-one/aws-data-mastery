# Handoff Report — Explorer 3 (Milestone 1.3 Analysis: R3, R4, R5)

**Date**: 2026-07-29  
**Agent**: Explorer 3 (`teamwork_preview_explorer_m1_3`)  
**Target File**: `pages/pratica/financas-dados.html`  
**Reference Specs**: `.agents/orchestrator/PROJECT.md` & `.agents/orchestrator/ORIGINAL_REQUEST.md`

---

## 1. Observation

A detailed audit of `pages/pratica/financas-dados.html` was conducted against the specifications in `PROJECT.md` and `ORIGINAL_REQUEST.md`. Here are the direct observations:

### 1.1 Current DOM Section Structure & Badge Inventory
The `<main class="main-content">` container currently contains **11 direct `<section>` child elements** (instead of the required 13):

| Current DOM Index | Section ID | Line Start | Visual Badge (`sec-num`) | Required Index in Specs | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `jornada` | Line 38 | `01` | 1 (`01`) | OK |
| 2 | `matematica` | Line 62 | `02` | 2 (`02`) | OK |
| 3 | `razo-timeline` | Line 208 | `03` | 3 (`03`) | OK |
| 4 | `pos-venda` | Line 399 | `04` | 4 (`04`) | OK |
| 5 | `contabilidade` | Line 457 | `05` | 5 (`05`) | Gaps in content (R4) |
| 6 | `deep-dive-riscos` | Line 532 | `06` | 6 (`06`) | Contains IRB data that should be in 07 |
| -- | `basileia-irb` | **MISSING** | -- | 7 (`07`) | **MISSING SECTION (R3)** |
| 7 | `marco-regulatorio` | Line 924 | `07` (Incorrect) | 8 (`08`) | Mismatched badge index |
| 8 | `auditoria-linhagem` | Line 1143 | `08` (Incorrect) | 9 (`09`) | Mismatched badge index |
| 9 | `enterprise-arch` | Line 1233 | `09` (Incorrect) | 10 (`10`) | Mismatched badge index |
| -- | `investimentos-mercado` | **MISSING** | -- | 11 (`11`) | **MISSING SECTION (R5)** |
| 10 | `finops-financas` | Line 1257 | `10` (Incorrect) | 12 (`12`) | Mismatched badge index |
| 11 | `referencias` | Line 1439 | `11` (Incorrect) | 13 (`13`) | Must be strictly last |

### 1.2 Inspection of Specific Requirements (R3, R4, R5)

#### A. Requirement R3 — Basileia III & Modelagem IRB (`#basileia-irb`)
- **Observation**: `<section id="basileia-irb">` does NOT exist as an independent DOM section.
- **Current Location of IRB Content**: Content regarding IRB, Vasicek formula, and Credit VaR is embedded inside `<section id="deep-dive-riscos">` starting at Line 812 (`<div class="topic-section">`).
- **Missing Elements for R3**:
  1. Standalone section tag `<section class="section" id="basileia-irb">` with badge `07`.
  2. Detailed comparison of RWA calculation methodologies: Standardized Approach (Abordagem Padronizada with FPR), Foundation IRB (F-IRB), and Advanced IRB (A-IRB).
  3. Structured comparison table for Standardized vs F-IRB vs A-IRB parameters (PD, LGD, EAD, M) and governance requirements.

#### B. Requirement R4 — Plano de Contas COSIF (`#contabilidade`)
- **Observation**: Section `<section class="section" id="contabilidade">` exists at Line 457 (Badge `05`).
- **Present Content**: Accrual concept, EMR/Spark/Iceberg accrual pipeline diagram, CMN 4.966 notes, Stop Accrual & Write-off cards, Flink/Iceberg Data Mesh accounting engine diagram.
- **Missing Elements for R4**:
  1. A structured HTML table (`<table class="data-table">`) for the **COSIF chart of accounts (Plano de Contas COSIF)**.
  2. Table must detail: Account Title, Classification (Ativo/Passivo/DRE), 15-digit synthetic/analytical COSIF account code, Debit/Credit (D/C) nature for:
     - Interest Accrual (Apropriação de Juros - Spot Accrual)
     - PDD Provisions (Provisão para Devedores Duvidosos / ECL)
     - Portfolio Movements & Concession (Concessão e Movimentação de Carteira)
     - Write-off (Baixa a Prejuízo) and Credit Recovery (Recuperação de Crédito)

#### C. Requirement R5 — Investimentos e Mercado Financeiro (`#investimentos-mercado`)
- **Observation**: Section `<section class="section" id="investimentos-mercado">` does NOT exist. Search for investment types (Renda Fixa, Renda Variável, Fundos) and custody architecture returned **0 matches** in `financas-dados.html`.
- **Missing Elements for R5**:
  1. Entire `<section class="section" id="investimentos-mercado">` with visual badge `11`.
  2. Content covering investment modalities:
     - Fixed Income (Renda Fixa: Tesouro Direto, CDB, LCI/LCA, Debêntures; Pricing MtM vs MtC).
     - Variable Income (Renda Variável: Ações ON/PN, FIIs, ETFs, BDRs; Corporate Events: JCP, Dividendos, Inplit/Splits).
     - Investment Funds (Fundos: Cotas, NAV calculation, Come-Cotas, Taxa de Adm/Performance).
  3. Lakehouse Custody and Position Data Architecture:
     - Bronze (Raw B3/Selic/Cetip feeds), Silver (Standardized Iceberg `fato_posicao_custodia`), Gold (Consolidated Position & P&L).
  4. Draw.io mxGraph XML diagram (`div.mxgraph`) depicting Lakehouse Custody Architecture.

---

## 2. Logic Chain

1. **Prerequisite Analysis**: `PROJECT.md` specifies a strict 13-section DOM hierarchy under `<main class="main-content">`. The baseline document currently has 11 sections because `#basileia-irb` (Section 07) and `#investimentos-mercado` (Section 11) were omitted or combined into `#deep-dive-riscos`.
2. **Impact on Section Indexing**: Because Sections 07 and 11 are missing in the DOM, the badge indices for sections 7..11 in the original HTML are off by 1 or 2 positions (e.g., `#marco-regulatorio` is marked `07` instead of `08`; `#referencias` is marked `11` instead of `13`).
3. **Refactoring `#deep-dive-riscos` & Creating `#basileia-irb`**:
   - Extracting lines 812–923 from `#deep-dive-riscos` into a standalone `<section class="section" id="basileia-irb">` (Section 07) resolves R3, aligns the sequence, and isolates risk management (Monte Carlo / VaR / Liquidity in 06) from regulatory capital modeling (Basileia III / RWA / Vasicek in 07).
   - Adding explicit definitions and a comparison table for Standardized (SA), F-IRB, and A-IRB satisfies the complete R3 specification.
4. **Enriching `#contabilidade`**:
   - Inserting a 15-digit COSIF chart of accounts table into `#contabilidade` directly satisfies R4 without disturbing existing diagrams and concept cards.
5. **Creating `#investimentos-mercado`**:
   - Placing `<section class="section" id="investimentos-mercado">` (Section 11) between `#enterprise-arch` (Section 10) and `#finops-financas` (Section 12) completes the 13-section DOM requirement (R1) and satisfies R5. Adding the Draw.io mxGraph diagram for custody architecture also contributes toward the 16+ diagram acceptance criterion.

---

## 3. Caveats

- **Read-Only Scope**: This analysis does not alter `pages/pratica/financas-dados.html`. Implementation must be performed in subsequent milestones.
- **Diagram Count Target**: Acceptance criteria require $\ge 16$ total `div.mxgraph` elements. Adding the Investment Custody architecture diagram in `#investimentos-mercado` brings the overall diagram count closer to target.
- **CSS Styling Compliance**: Added tables and elements must use existing CSS classes (`data-table`, `callout`, `concept-grid`, `concept-card`, `mxgraph`, `sec-hdr`, `sec-num`, `sec-meta`, `sec-acc`) to maintain visual consistency.

---

## 4. Conclusion & Detailed Technical Specifications

Below are the exact specifications, HTML structures, formulas, tables, and architectural diagrams required for implementation to satisfy R3, R4, and R5.

---

### 4.1 Specification for R3: `#basileia-irb` (Section 07)

#### DOM Location & Header
- **Position**: Direct child of `<main class="main-content">`, placed immediately after `</section><!-- end deep-dive-riscos -->` and before `<section class="section" id="marco-regulatorio">`.
- **HTML Header Snippet**:
```html
<section class="section" id="basileia-irb">
<div class="sec-hdr">
  <div class="sec-num" style="color:var(--spark)">07</div>
  <div class="sec-meta">
    <div class="sec-acc" style="background:var(--spark)"></div>
    <h2>Basileia III &amp; Modelagem IRB</h2>
    <p>Estrutura de Capital Regulatório, RWA (Padronizado, F-IRB, A-IRB), Fórmula de Correlação de Vasicek e Stress Testing.</p>
  </div>
</div>
<p class="sec-intro" style="font-size: 1.05rem; line-height: 1.7; color: var(--text-dim); margin: 18px 0 24px 0;">
  O Acordo de Basileia III estabelece as diretrizes globais para adequação de capital das instituições financeiras. Esta seção detalha as metodologias de cálculo dos Ativos Ponderados pelo Risco (RWA) sob as abordagens Padronizada, F-IRB e A-IRB, e a fundamentação matemática do modelo de correlação de ativos de Vasicek.
</p>
```

#### Content & Comparison Table (RWA Approaches)
To be added to `#basileia-irb`:

```html
<h3>Metodologias de Cálculo do RWA para Risco de Crédito</h3>
<p>O Patrimônio de Referência Exigido (PRE) é diretamente proporcional ao RWA (Risk-Weighted Assets). O BACEN permite que as instituições evoluam da abordagem padronizada para modelos internos mediante autorização regulatória:</p>

<table class="data-table" style="width:100%; border-collapse:collapse; margin:20px 0;">
  <thead>
    <tr style="background:var(--card-bg); text-align:left;">
      <th>Abordagem RWA</th>
      <th>Estimativa de PD</th>
      <th>Estimativa de LGD</th>
      <th>Estimativa de EAD &amp; M</th>
      <th>Fator de Ponderação / Fórmula</th>
      <th>Governança BACEN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Padronizada (Standardized - SA)</strong></td>
      <td>Regulatória (FPR fixo)</td>
      <td>Regulatória (FPR fixo)</td>
      <td>Regulatória / Valor Nominal</td>
      <td>\( RWA = EAD \times FPR \) (ex: Corporativo 100%, Varejo 75%)</td>
      <td>Regras padronizadas do regulador (sem aprovação de modelo).</td>
    </tr>
    <tr>
      <td><strong>F-IRB (Foundation IRB)</strong></td>
      <td>Modelo Interno (Estável 12m)</td>
      <td>Regulatória (ex: 45% Senior Unsecured)</td>
      <td>Regulatória (EAD e Maturidade M = 2.5 anos)</td>
      <td>Fórmula Regulatória de Vasicek usando PD interna e LGD fixa.</td>
      <td>Exige histórico mínimo de 3 anos e validação técnica do BACEN.</td>
    </tr>
    <tr>
      <td><strong>A-IRB (Advanced IRB)</strong></td>
      <td>Modelo Interno (PIT / TTC)</td>
      <td>Modelo Interno (Downturn LGD)</td>
      <td>Modelo Interno (CCF para EAD) e M efetiva</td>
      <td>Fórmula Regulatória de Vasicek com todos os parâmetros internos.</td>
      <td>Rigor máximo: 5+ anos de dados, backtesting contínuo, validação independente.</td>
    </tr>
  </tbody>
</table>
```

#### Mathematical Formulas (Vasicek Model)
Ensure LaTeX/MathJax expressions for the Vasicek Asset Correlation and Regulatory Capital:

1. **Vasicek Single Factor Asset Model**:
   \[ A_i = \sqrt{R} \cdot Z + \sqrt{1 - R} \cdot \epsilon_i \]
2. **Asset Correlation \(R\) for Corporate Exposures**:
   \[ R = 0.12 \times \frac{1 - e^{-50 \cdot PD}}{1 - e^{-50}} + 0.24 \times \left(1 - \frac{1 - e^{-50 \cdot PD}}{1 - e^{-50}}\right) \]
3. **Capital Requirement \(K\)**:
   \[ K = LGD \times \left[ \Phi\left( \frac{\Phi^{-1}(PD) + \sqrt{R} \cdot \Phi^{-1}(0.999)}{\sqrt{1 - R}} \right) - PD \right] \times \frac{1 + (M - 2.5) \cdot b(PD)}{1 - 1.5 \cdot b(PD)} \]
   Onde \( b(PD) = (0.11852 - 0.05478 \cdot \ln(PD))^2 \).
4. **Total RWA Calculation**:
   \[ RWA = 12.5 \times K \times EAD \]

---

### 4.2 Specification for R4: Plano de Contas COSIF (`#contabilidade`)

#### Table Specification to Insert in `#contabilidade`
Insert after the *Apropriação Diária (Spot Accrual)* section (around Line 483):

```html
<h3>Plano de Contas COSIF — Matriz Contábil e Eventos Financeiros</h3>
<p>O Plano Contábil das Instituições do Sistema Financeiro Nacional (COSIF) normatizado pelo BACEN utiliza uma codificação analítica de 15 dígitos. A tabela abaixo ilustra a matriz de devedores/credores (D/C) para o ciclo completo de crédito:</p>

<div style="overflow-x:auto; margin: 20px 0;">
<table class="data-table" style="width:100%; border-collapse:collapse; font-size:0.9rem;">
  <thead>
    <tr style="background:var(--card-bg); text-align:left; border-bottom:2px solid var(--border);">
      <th style="padding:10px;">Evento Financeiro</th>
      <th style="padding:10px;">Título da Conta COSIF</th>
      <th style="padding:10px;">Classificação</th>
      <th style="padding:10px;">Código COSIF (15 dígitos)</th>
      <th style="padding:10px;">D/C</th>
      <th style="padding:10px;">Função Contábil / Descrição</th>
    </tr>
  </thead>
  <tbody>
    <!-- Concessao -->
    <tr>
      <td rowspan="2" style="font-weight:bold; background:rgba(255,255,255,0.02);">1. Concessão de Crédito</td>
      <td>Financiamentos e Empréstimos</td>
      <td>Ativo Circulante</td>
      <td><code>1.6.1.10.00.00-00-1</code></td>
      <td><span class="badge" style="background:var(--ok); color:#000;">D</span></td>
      <td>Registra o valor presente do principal liberado ao cliente.</td>
    </tr>
    <tr>
      <td>Caixa / Reservas Bancárias</td>
      <td>Ativo (Disponibilidades)</td>
      <td><code>1.1.1.10.00.00-00-5</code></td>
      <td><span class="badge" style="background:var(--err); color:#fff;">C</span></td>
      <td>Saída de recursos da conta de disponibilidades da instituição.</td>
    </tr>
    <!-- Accrual -->
    <tr style="border-top:1px solid var(--border);">
      <td rowspan="2" style="font-weight:bold; background:rgba(255,255,255,0.02);">2. Apropriação Diária (Accrual)</td>
      <td>Rendas a Receber (Juros Acumulados)</td>
      <td>Ativo Circulante (Curva)</td>
      <td><code>1.6.1.90.00.00-00-9</code></td>
      <td><span class="badge" style="background:var(--ok); color:#000;">D</span></td>
      <td>Incorpora pro-rata die os juros incorridos ao saldo contábil.</td>
    </tr>
    <tr>
      <td>Receitas de Operações de Crédito</td>
      <td>DRE (Receita Operacional)</td>
      <td><code>7.1.1.10.00.00-00-2</code></td>
      <td><span class="badge" style="background:var(--err); color:#fff;">C</span></td>
      <td>Reconhecimento do resultado financeiro do dia no DRE.</td>
    </tr>
    <!-- PDD -->
    <tr style="border-top:1px solid var(--border);">
      <td rowspan="2" style="font-weight:bold; background:rgba(255,255,255,0.02);">3. Provisão PDD (ECL / CMN 4.966)</td>
      <td>Despesa com Provisão para Crédito</td>
      <td>DRE (Despesa Operacional)</td>
      <td><code>8.1.1.20.00.00-00-4</code></td>
      <td><span class="badge" style="background:var(--ok); color:#000;">D</span></td>
      <td>Impacta o resultado com base no cálculo de Perda Esperada.</td>
    </tr>
    <tr>
      <td>Provisão para Devedores Duvidosos</td>
      <td>Ativo (Conta Redutora)</td>
      <td><code>1.6.9.10.00.00-00-3</code></td>
      <td><span class="badge" style="background:var(--err); color:#fff;">C</span></td>
      <td>Reduz o valor contábil líquido da carteira no balanço.</td>
    </tr>
    <!-- Write Off -->
    <tr style="border-top:1px solid var(--border);">
      <td rowspan="2" style="font-weight:bold; background:rgba(255,255,255,0.02);">4. Baixa a Prejuízo (Write-Off)</td>
      <td>Provisão para Devedores Duvidosos</td>
      <td>Ativo (Conta Redutora)</td>
      <td><code>1.6.9.10.00.00-00-3</code></td>
      <td><span class="badge" style="background:var(--ok); color:#000;">D</span></td>
      <td>Utilização da provisão previamente constituída.</td>
    </tr>
    <tr>
      <td>Financiamentos e Empréstimos</td>
      <td>Ativo Circulante</td>
      <td><code>1.6.1.10.00.00-00-1</code></td>
      <td><span class="badge" style="background:var(--err); color:#fff;">C</span></td>
      <td>Baixa definitiva do contrato irrecuperável da carteira ativa.</td>
    </tr>
    <!-- Recuperação -->
    <tr style="border-top:1px solid var(--border);">
      <td rowspan="2" style="font-weight:bold; background:rgba(255,255,255,0.02);">5. Recuperação de Crédito Baixado</td>
      <td>Caixa / Reservas Bancárias</td>
      <td>Ativo (Disponibilidades)</td>
      <td><code>1.1.1.10.00.00-00-5</code></td>
      <td><span class="badge" style="background:var(--ok); color:#000;">D</span></td>
      <td>Entrada do valor recuperado via cobrança/renegociação.</td>
    </tr>
    <tr>
      <td>Recuperação de Créditos Baixados</td>
      <td>DRE (Outras Receitas)</td>
      <td><code>7.1.9.10.00.00-00-8</code></td>
      <td><span class="badge" style="background:var(--err); color:#fff;">C</span></td>
      <td>Reversão de prejuízo diretamente na receita operacional.</td>
    </tr>
  </tbody>
</table>
</div>
```

---

### 4.3 Specification for R5: `#investimentos-mercado` (Section 11)

#### DOM Location & Header
- **Position**: Direct child of `<main class="main-content">`, placed immediately after `</section><!-- end enterprise-arch -->` and before `<section class="section" id="finops-financas">`.
- **HTML Header Snippet**:
```html
<section class="section" id="investimentos-mercado">
<div class="sec-hdr">
  <div class="sec-num" style="color:var(--aws)">11</div>
  <div class="sec-meta">
    <div class="sec-acc" style="background:var(--aws)"></div>
    <h2>Investimentos e Mercado Financeiro</h2>
    <p>Renda Fixa, Renda Variável, Fundos e Arquitetura de Dados de Custódia e Posição Consolidada no Lakehouse.</p>
  </div>
</div>
<p class="sec-intro" style="font-size: 1.05rem; line-height: 1.7; color: var(--text-dim); margin: 18px 0 24px 0;">
  A gestão de ativos de mercado exige a consolidação precisa de múltiplos custodiantes (B3, SELIC, CETIP) e modalidades de investimentos. Esta seção detalha as classes de ativos e apresenta a arquitetura analítica de custódia e precificação no Lakehouse.
</p>
```

#### Content Sections to Insert

1. **Investment Modalities Concept Grid**:
```html
<div class="concept-grid">
  <div class="concept-card" style="border-top: 4px solid var(--aws);">
    <div class="cc-tag">1. Renda Fixa</div>
    <div class="cc-body">
      <strong>Títulos Públicos e Privados:</strong> Tesouro Direto (LFT, NTN-B, LTN), CDBs, LCIs/LCAs e Debêntures.<br/>
      <strong>Precificação:</strong> Marcação a Mercado (MtM - valor de liquidação diário) vs. Marcação na Curva (MtC - taxa contratada pro-rata).
    </div>
  </div>
  <div class="concept-card" style="border-top: 4px solid var(--spark);">
    <div class="cc-tag">2. Renda Variável</div>
    <div class="cc-body">
      <strong>Ações, FIIs, ETFs e BDRs:</strong> Negociados em bolsa (B3) com volatilidade de cotação.<br/>
      <strong>Eventos Corporativos (Corporate Actions):</strong> Tratamento estocástico de Dividendos, Juros sobre Capital Próprio (JCP), Splits, Insplits e Direitos de Subscrição.
    </div>
  </div>
  <div class="concept-card" style="border-top: 4px solid var(--ok);">
    <div class="cc-tag">3. Fundos de Investimento</div>
    <div class="cc-body">
      <strong>Estrutura de Cotas (FIC, FIM, FII, FIDC):</strong> Apuração do Valor da Cota (NAV - Net Asset Value).<br/>
      <strong>Tributação &amp; Taxas:</strong> Regime de Come-Cotas semestral (Maio/Novembro) e provisão de taxa de administração e performance (Benchmark DI/IBOV).
    </div>
  </div>
</div>
```

2. **Custody Data Schema (Apache Iceberg DDL)**:
```html
<h3>Modelagem da Tabela de Posição Diária de Custódia (Apache Iceberg)</h3>
<div class="code-block">
<pre><code class="language-sql">-- fato_posicao_custodia_diaria
CREATE TABLE lakehouse.gold.fato_posicao_custodia (
    data_referencia       DATE           NOT NULL,
    conta_investidor_id   STRING         NOT NULL,
    cpf_cnpj              STRING         NOT NULL,
    codigo_ativo          STRING         NOT NULL, -- Ex: PETR4, NTN-B 2035, CDB_ITAU_120
    classe_ativo          STRING         NOT NULL, -- RENDA_FIXA, RENDA_VARIAVEL, FUNDOS
    agente_custodiante    STRING         NOT NULL, -- B3_SINACOR, SELIC, CETIP
    quantidade_posicao    DECIMAL(18,6)  NOT NULL,
    preco_unitario_mtm    DECIMAL(18,6)  NOT NULL, -- Marcação a Mercado
    preco_unitario_mtc    DECIMAL(18,6)  NOT NULL, -- Marcação na Curva
    valor_bruto_mtm       DECIMAL(18,2)  NOT NULL,
    valor_bruto_mtc       DECIMAL(18,2)  NOT NULL,
    provisao_ir           DECIMAL(18,2)  NOT NULL,
    provisao_iof          DECIMAL(18,2)  NOT NULL,
    valor_liquido         DECIMAL(18,2)  NOT NULL,
    atualizado_em         TIMESTAMP      NOT NULL
)
USING iceberg
PARTITIONED BY (months(data_referencia), classe_ativo);
</code></pre>
</div>
```

3. **Draw.io Architectural Diagram (`div.mxgraph`) for Lakehouse Custody**:
```html
<div class="drawio-wrap" style="margin-top: 30px; margin-bottom: 30px;">
<div class="drawio-label" style="color:var(--aws)"><span class="dot" style="background:var(--aws)"></span>ARQUITETURA DE DADOS DE CUSTÓDIA E POSIÇÃO CONSOLIDADA (LAKEHOUSE)</div>
<div class="mxgraph" data-mxgraph='{"highlight": "#FF6B00", "nav": true, "resize": true, "toolbar": "zoom layers tags lightbox", "edit": "_blank", "xml": "&lt;mxGraphModel dx=\"1200\" dy=\"600\" grid=\"1\" gridSize=\"10\" guides=\"1\" tooltips=\"1\" connect=\"1\" arrows=\"1\" fold=\"1\" page=\"1\" pageScale=\"1\" pageWidth=\"1000\" pageHeight=\"380\" background=\"#0B1121\"&gt;&lt;root&gt;&lt;mxCell id=\"0\"/&gt;&lt;mxCell id=\"1\" parent=\"0\"/&gt;&lt;mxCell id=\"src\" value=\"EXTERNAL FEEDS&amp;#10;(B3 / SELIC / CETIP / Anbima)\" style=\"rounded=1;fillColor=#1e293b;strokeColor=#475569;fontColor=#ffffff;align=center;verticalAlign=middle;\" vertex=\"1\" parent=\"1\"&gt;&lt;mxGeometry x=\"40\" y=\"150\" width=\"160\" height=\"80\" as=\"geometry\"/&gt;&lt;/mxCell&gt;&lt;mxCell id=\"pipe\" value=\"Ingest\u00e3o Streaming &amp;#10;Amazon MSK / EventBridge\" style=\"shape=mxgraph.aws4.managed_streaming_for_kafka;fillColor=#f59e0b;fontColor=#ffffff;verticalAlign=bottom;spacingBottom=-30;\" vertex=\"1\" parent=\"1\"&gt;&lt;mxGeometry x=\"260\" y=\"150\" width=\"78\" height=\"78\" as=\"geometry\"/&gt;&lt;/mxCell&gt;&lt;mxCell id=\"spark\" value=\"AWS Glue / Spark&amp;#10;C\u00e1lculo MtM vs MtC\" style=\"shape=mxgraph.aws4.glue;fillColor=#3b82f6;fontColor=#ffffff;verticalAlign=bottom;spacingBottom=-30;\" vertex=\"1\" parent=\"1\"&gt;&lt;mxGeometry x=\"420\" y=\"150\" width=\"78\" height=\"78\" as=\"geometry\"/&gt;&lt;/mxCell&gt;&lt;mxCell id=\"iceberg\" value=\"S3 Lakehouse&amp;#10;Iceberg (Bronze/Silver/Gold)\" style=\"shape=mxgraph.aws4.s3;fillColor=#10b981;fontColor=#ffffff;verticalAlign=bottom;spacingBottom=-30;\" vertex=\"1\" parent=\"1\"&gt;&lt;mxGeometry x=\"580\" y=\"150\" width=\"78\" height=\"78\" as=\"geometry\"/&gt;&lt;/mxCell&gt;&lt;mxCell id=\"athena\" value=\"Amazon Athena &amp;#10;&amp;amp; QuickSight Dashboards\" style=\"shape=mxgraph.aws4.quicksight;fillColor=#8b5cf6;fontColor=#ffffff;verticalAlign=bottom;spacingBottom=-30;\" vertex=\"1\" parent=\"1\"&gt;&lt;mxGeometry x=\"760\" y=\"150\" width=\"78\" height=\"78\" as=\"geometry\"/&gt;&lt;/mxCell&gt;&lt;mxCell id=\"e1\" edge=\"1\" source=\"src\" target=\"pipe\" parent=\"1\" style=\"edgeStyle=orthogonalEdgeStyle;strokeColor=#f59e0b;strokeWidth=2;\"/&gt;&lt;mxCell id=\"e2\" edge=\"1\" source=\"pipe\" target=\"spark\" parent=\"1\" style=\"edgeStyle=orthogonalEdgeStyle;strokeColor=#3b82f6;strokeWidth=2;\"/&gt;&lt;mxCell id=\"e3\" edge=\"1\" source=\"spark\" target=\"iceberg\" parent=\"1\" style=\"edgeStyle=orthogonalEdgeStyle;strokeColor=#10b981;strokeWidth=3;\"/&gt;&lt;mxCell id=\"e4\" edge=\"1\" source=\"iceberg\" target=\"athena\" parent=\"1\" style=\"edgeStyle=orthogonalEdgeStyle;strokeColor=#8b5cf6;strokeWidth=3;\"/&gt;&lt;/root&gt;&lt;/mxGraphModel&gt;"}' style="max-width:100%;border:1px solid transparent;overflow:auto;"></div>
<div class="callout callout-tip" style="margin-top:12px; border-left:4px solid var(--aws); background:rgba(59,130,246,0.08); padding:14px 18px;">
  <strong>📌 Legenda &amp; Arquitetura — CUSTÓDIA DE INVESTIMENTOS: </strong><span>Fluxo end-to-end de consolidação de posição de investimentos: ingestão de arquivos de extrato/movimentação dos custodiantes (B3, SELIC, CETIP) via MSK, motor Spark para precificação MtM/MtC e gravação em tabela Iceberg Gold particionada.</span>
</div>
</div>
```

---

## 5. Verification Method

To independently verify the implementation after code modifications in Milestone 2:

1. **Verify Section Count & DOM Hierarchy**:
   ```bash
   grep -n '<section' pages/pratica/financas-dados.html
   ```
   *Expected Output*: Exactly 13 `<section>` lines directly under `main.main-content`.

2. **Verify Section Sequence**:
   Ensure section IDs match in exact order:
   `jornada` (01) $\rightarrow$ `matematica` (02) $\rightarrow$ `razo-timeline` (03) $\rightarrow$ `pos-venda` (04) $\rightarrow$ `contabilidade` (05) $\rightarrow$ `deep-dive-riscos` (06) $\rightarrow$ `basileia-irb` (07) $\rightarrow$ `marco-regulatorio` (08) $\rightarrow$ `auditoria-linhagem` (09) $\rightarrow$ `enterprise-arch` (10) $\rightarrow$ `investimentos-mercado` (11) $\rightarrow$ `finops-financas` (12) $\rightarrow$ `referencias` (13).

3. **Verify COSIF Table in `#contabilidade`**:
   Check for table header with 15-digit COSIF column:
   ```bash
   grep -A 10 "1.6.1.10.00.00-00-1" pages/pratica/financas-dados.html
   ```

4. **Verify Basileia III Content & Formulas**:
   Search for Vasicek correlation formula in `#basileia-irb`:
   ```bash
   grep -A 5 "b(PD)" pages/pratica/financas-dados.html
   ```

5. **Verify Investimentos Lakehouse Architecture**:
   Search for `fato_posicao_custodia` DDL and mxGraph:
   ```bash
   grep "fato_posicao_custodia" pages/pratica/financas-dados.html
   ```
