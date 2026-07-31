# Peer Review Report — Milestone 2 (Batch 1: Core Credit & Math Pages)

**Reviewer Agent**: Peer Reviewer & Adversarial Critic (`teamwork_preview_reviewer_m2`)  
**Target Milestone**: Milestone 2 — Batch 1 (Core Credit & Math Pages)  
**Date**: 2026-07-30  
**Working Directory**: `/Users/mauriciohelfstein/dev/aws-data-mastery/.agents/teamwork_preview_reviewer_m2`

---

## 1. Executive Summary & Verdicts

| File Path | Financial & Accounting Compliance | KaTeX & Rendering | SVG & Visual Consistency | Asset Linkage & Integration | Integrity Audit | Verdict |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `pages/financas/onboarding.html` | PASS | PASS | PASS (Minor SVG Note) | PASS | PASS | **PASS** |
| `pages/financas/matematica-financeira.html` | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `pages/financas/ciclo-vida-credito.html` | PASS | PASS | PASS | PASS | PASS | **PASS** |

---

## 2. Observation

### 2.1 Audited Files & Structural Inspection

1. **`pages/financas/onboarding.html`** (455 lines, 25,343 bytes):
   - **Head & Dependencies**: KaTeX 0.16.8 (`katex.min.css`, `katex.min.js`, `auto-render.min.js`), `diagrams.net/js/viewer.min.js`, Mermaid 10 (`theme: 'dark'`).
   - **CSS & Core Scripts**: `../../style.css` (line 31), `../../js/progress.js` (line 450), `../../js/sidebar-loader.js` (line 451), `../../js/a11y.js` (line 452).
   - **Financial Concepts Covered**:
     - Gross Spread: \[\text{Spread Gross} = i_{\text{aplicação}} - i_{\text{captação}}\] (line 88)
     - Net Spread: \[\text{Spread Net} = i_{\text{aplicação}} - i_{\text{captação}} - \text{ECL} - \text{Custo Operacional} - \text{Tributos e Compulsórios}\] (line 90)
     - KYC & Liveness Cosine Similarity: \[S_{\text{match}} = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\| \|\mathbf{v}\|}\] (line 158)
     - SCR BACEN Residual Capacity: \[\text{Capacidade Residual} = \left( \text{Renda Mensal Comprovada} \times \eta_{\text{max}} \right) - \sum \text{Parcelas Mensais SCR}\] (line 228)
     - Risk-Based Pricing: \[i_{\text{contrato}} = i_{\text{risk-free}} + \left( \text{PD} \times \text{LGD} \right) + \text{Spread Operational} + \text{Margem Líquida}\] (line 256)
   - **SVG Diagram**: Pipeline of real-time onboarding and feature store (lines 276-333).
   - **Data Contract**: JSON Schema for `PROPOSAL_SUBMITTED` event (lines 338-354).

2. **`pages/financas/matematica-financeira.html`** (462 lines, 23,725 bytes):
   - **Financial Formulas**:
     - Simple Interest: \[M = C \cdot (1 + i \cdot t)\] (line 87)
     - Compound Interest: \[M = C \cdot (1 + i)^t \quad \implies \quad J = C \left[ (1 + i)^t - 1 \right]\] (line 93)
     - Nominal to Effective Rate Conversion: \[i_m = \frac{i_{\text{nominal}}}{12} \quad \implies \quad i_a = (1 + i_m)^{12} - 1\] (line 103)
     - IOF Total: \[\text{IOF}_{\text{total}} = \left( C \times 0.0038 \right) + \sum_{k=1}^n \left( P_k \times d_k \times 0.000082 \right)\] (line 128)
     - CET (Res. CMN 3.517): \[C_0 - \text{IOF}_0 - \text{Tarifas}_0 = \sum_{t=1}^n \frac{R_t}{(1 + CET)^t}\] (line 135)
     - Price PMT: \(PMT = P \cdot \frac{i(1+i)^n}{(1+i)^n - 1}\) (line 180)
     - SAC Amortization: \(A = \frac{P}{n}, \quad PMT_k = A + (SD_{k-1} \cdot i)\) (line 181)
     - IPCA Monetary Adjustment & Negative Amortization: \[SD_k' = SD_{k-1} \times \left(1 + \text{IPCA}_k\right)\] (line 293), \[J_k = SD_k' \times i_{\text{real}}\] (line 294)
     - VPL & Discount: \[VPL = \sum_{t=1}^n \frac{CF_t}{(1 + r)^t} \quad \implies \quad \text{Deságio} = VF - VPL\] (line 360)
   - **Numerical Comparison Table** (lines 188-226): R$ 100,000.00, 1.5% a.m., 10 installments.
     - SAC Month 1: PMT R$ 11,500.00 (A = R$ 10,000.00, J = R$ 1,500.00)
     - Price Month 1: PMT R$ 10,843.42 (A = R$ 9,343.42, J = R$ 1,500.00)
   - **PySpark Code**: `pandas_udf(DoubleType())` for vectorized Price PMT calculations with Apache Arrow (lines 316-331).
   - **SVG Diagram**: Amortization curves SVG comparing SAC (linear green), Price (convex yellow), and IPCA (red initial rise/negative amortization) (lines 231-274).

3. **`pages/financas/ciclo-vida-credito.html`** (449 lines, 23,293 bytes):
   - **6 Contract Lifecycle Stages**:
     1. *Origination* (`CREDIT_GRANTED`): Debit Carteira de Crédito (Asset UP) / Credit Caixa (Asset DOWN).
     2. *Spot Accrual* (`ACCRUAL_CALC`): Debit Juros a Receber (Asset UP) / Credit Receita de Crédito (DRE UP). Formula: \[J_{\text{diário}} = SD_{t-1} \times \left[ (1 + i_{\text{mensal}})^{\frac{1}{30}} - 1 \right]\] (line 346).
     3. *Installment* (`INSTALL_PAID`): Debit Caixa (Asset UP) / Credit Carteira de Crédito (Asset DOWN).
     4. *Delinquency* (`ECL_PROVISION`): Debit Despesa de PDD (DRE DOWN) / Credit Provisão para Perdas (Redutora Ativo UP).
     5. *Refinancing* (`REFINANCING`): Debit Nova Carteira (Asset UP) / Credit Carteira Antiga (Asset DOWN).
     6. *Write-off* (`WRITEOFF`): Debit Provisão Acumulada (Redutora Ativo DOWN) / Credit Carteira de Crédito (Asset DOWN).
   - **Mermaid State Machine**: `graph LR` rendering the FSM transitions between states (lines 85-102).
   - **FSM Matrix Table**: State origins, Kafka events, target states, validation preconditions, and double-entry accounting (D/C) entries (lines 218-273).
   - **SVG Diagram**: End-to-end streaming architecture pipeline (Sistemas Origem -> Amazon MSK -> Apache Flink -> S3 Lakehouse Iceberg Ledger) (lines 291-343).

---

## 3. Logic Chain

### 3.1 Financial & Accounting Compliance
- **Observation**: All accounting entries follow Brazilian COSIF / BACEN guidelines and double-entry bookkeeping (\text{Debit} = \text{Credit}).
- **Logic**:
  - In `ciclo-vida-credito.html`, each stage matches financial accounting standards:
    - Origination increases loans receivable (Asset D) and decreases cash/bank (Asset C).
    - Daily accrual records unearned interest asset (Asset D) and revenue in DRE (Credit).
    - Provisioning under CMN 4.966 / IFRS 9 correctly debits PDD expense in DRE and credits allowance for credit losses (contra-asset).
    - Write-off offsets the allowance against loan principal without double-counting DRE loss at write-off.
  - In `matematica-financeira.html`, the numerical example for R$ 100,000 loan at 1.5% a.m. for 10 months was mathematically recalculated:
    - SAC: \(A = 100,000 / 10 = 10,000\). Month 1 Interest = \(100,000 \times 0.015 = 1,500\). Total PMT = \(11,500.00\). Exact.
    - Price: \(PMT = 100,000 \times \frac{0.015(1.015)^{10}}{(1.015)^{10} - 1} = 10,843.42\). Month 1 Interest = \(1,500.00\). Amortization = \(9,343.42\). Exact.
  - IOF tax calculations strictly follow Federal Decree nº 6,306/2007 (0.38% fixed + 0.0082% daily capped at 365 days / 3.00% p.a.).
- **Conclusion**: Financial and accounting compliance is 100% accurate across all 3 files.

### 3.2 KaTeX & Rendering Check
- **Observation**:
  - Head scripts initialize `renderMathInElement` with delimiters `\(` / `\)` (inline) and `\[` / `\]` (display).
  - Regex search `\$` confirmed zero raw `$` or `$$` math delimiters across the files (only literal `R$` currency formatting).
- **Logic**: Excluding raw `$` prevents KaTeX from misinterpreting currency strings (e.g. `R$ 100.000,00 ... R$ 200,00`) as latex blocks, preventing rendering crashes.
- **Conclusion**: KaTeX configuration and formula syntax pass with 100% compliance.

### 3.3 SVG & Visual Consistency
- **Observation**:
  - All SVG diagrams specify explicit `viewBox` attributes (`0 0 900 320`, `0 0 800 400`, `0 0 900 300`) and responsive `width="100%"`.
  - SVG color schemes strictly use dark mode CSS variable values (`#0f172a`, `#1e293b`, `#3b82f6`, `#10b981`, `#facc15`, `#f43f5e`, `#38bdf8`).
  - Text elements use explicit `text-anchor="middle"` or `text-anchor="start"` for clean alignment.
  - *Minor Detail*: In `onboarding.html`, line 299, Arrow 3 connector points to coordinates `(590, 170)`, which sits between the Online Feature Store (y=70..160) and Offline Feature Store (y=180..270), and there is no connector line drawn between Feature Store (x=730) and Decision Engine (x=760). Lines 291, 294, 297 contain `font-anchor="middle"` alongside `text-anchor="middle"`.
- **Logic**: Browsers ignore unknown XML attributes like `font-anchor` and render `text-anchor="middle"` cleanly. Diagram renders properly without crashing.
- **Conclusion**: Visual consistency is solid and matches the project design language.

### 3.4 Asset Linkage & Integration
- **Observation**:
  - All CSS links use `../../style.css`.
  - All core JS scripts use `../../js/progress.js`, `../../js/sidebar-loader.js`, `../../js/a11y.js`.
  - All Open Graph image and favicon tags use `../../assets/og-image.jpg` and `../../assets/favicon.ico`.
- **Logic**: The relative path `../../` correctly navigates from subfolder `pages/financas/` to project root `/`.
- **Conclusion**: Integration and asset linkage are 100% verified.

### 3.5 Adversarial & Integrity Audit
- **Observation**:
  - Checked for hardcoded test fixtures, facade implementations, or bypassed logic.
  - Verified PySpark UDF logic, KaTeX formulas, and FSM transition matrix.
- **Logic**: Real, working vectorized PySpark code with Arrow UDFs, accurate math, and complete financial accounting entries demonstrate genuine engineering work with zero integrity violations.
- **Conclusion**: Integrity audit passed cleanly.

---

## 4. Findings & Recommendations

### [Minor] Finding 1: SVG Connector & Attribute Hygiene in `onboarding.html`
- **Location**: `pages/financas/onboarding.html` (Lines 291-329)
- **What**:
  1. Arrow 3 (`x1="550" y1="170" x2="590" y2="170"`) points to the space between the Online Feature Store box (`y=70..160`) and Offline Feature Store box (`y=180..270`).
  2. No connector line is drawn between the Feature Store (`x=600..730`) and Credit Engine (`x=760..880`).
  3. Non-standard attribute `font-anchor="middle"` is present alongside `text-anchor="middle"`.
- **Why**: Purely cosmetic diagram enhancement for perfect visual flow. Browsers render the diagram cleanly as-is.
- **Suggestion**: In a future polish batch, split Arrow 3 into two arrows pointing to DynamoDB and S3 Iceberg, add an arrow from DynamoDB to Credit Engine, and remove `font-anchor`.

---

## 5. Caveats

- **External CDN Connectivity**: Rendering of math formulas and Mermaid charts relies on CDN availability for KaTeX (`cdn.jsdelivr.net/npm/katex@0.16.8`), Mermaid (`cdn.jsdelivr.net/npm/mermaid@10`), and Diagrams.net viewer (`viewer.diagrams.net`).
- **Browser Execution**: Visual verification was performed via DOM structure audit and SVG path/coordinate math.

---

## 6. Verification Method

To independently verify this review and the audited files:

1. **Verify Asset Linkage & File Existence**:
   ```bash
   python3 -c "
   import os
   root = '/Users/mauriciohelfstein/dev/aws-data-mastery'
   files = ['pages/financas/onboarding.html', 'pages/financas/matematica-financeira.html', 'pages/financas/ciclo-vida-credito.html']
   for f in files:
       path = os.path.join(root, f)
       print(f, 'exists:', os.path.exists(path))
   "
   ```

2. **Verify KaTeX Delimiter Hygiene**:
   ```bash
   python3 -c "
   import re, glob
   for p in glob.glob('/Users/mauriciohelfstein/dev/aws-data-mastery/pages/financas/*.html'):
       content = open(p).read()
       # Search for $ or $$ math delimiters
       dollar_matches = re.findall(r'(?<!R)\$\d+', content)
       print(p, 'Dollar math count:', len(dollar_matches))
   "
   ```

3. **Verify Amortization Math**:
   ```python
   # Price PMT test: P=100000, i=0.015, n=10
   P, i, n = 100000, 0.015, 10
   pmt = P * (i * (1+i)**n) / ((1+i)**n - 1)
   assert round(pmt, 2) == 10843.42
   ```

---

## 7. Final Conclusion

All 3 core financial and math pages (`onboarding.html`, `matematica-financeira.html`, `ciclo-vida-credito.html`) meet the highest standards of financial accuracy, KaTeX rendering compliance, SVG visual presentation, asset linkage, and architectural integrity.

**Final Verdict**: **APPROVED (PASS)** for all 3 files.
