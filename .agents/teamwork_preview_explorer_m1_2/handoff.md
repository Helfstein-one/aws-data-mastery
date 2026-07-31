# Handoff Report: Draw.io Diagram Audit & Structure Analysis for `financas-dados.html`

## 1. Observation
- **Target File**: `pages/pratica/financas-dados.html`
- **Script Import**: Line 1547: `<script src="https://viewer.diagrams.net/js/viewer-static.min.js" type="text/javascript"></script>`
- **Total Draw.io Diagrams Currently Present**: Exactly **15** `div.mxgraph` elements found across the document.
- **Per-Section Distribution of `div.mxgraph`**:
  1. `#jornada` (Section 01): 0 diagrams
  2. `#matematica` (Section 02): 0 diagrams
  3. `#razo-timeline` (Section 03): 7 diagrams (Lines 366, 371, 376, 381, 386, 391, 396)
  4. `#pos-venda` (Section 04): 1 diagram (Line 442)
  5. `#contabilidade` (Section 05): 2 diagrams (Lines 478, 524)
  6. `#deep-dive-riscos` (Section 06): 2 diagrams (Lines 654, 919)
  7. `#marco-regulatorio` (Section 08 / pos-reorg): 1 diagram (Line 1078)
  8. `#auditoria-linhagem` (Section 09 / pos-reorg): 1 diagram (Line 1229)
  9. `#enterprise-arch` (Section 10 / pos-reorg): 1 diagram (Line 1243)
  10. `#finops-financas` (Section 12): 0 diagrams
  11. `#referencias` (Section 13): 0 diagrams

- **Diagram Markup & Attribute Structure**:
  - **Outer Element**: `<div class="mxgraph" data-mxgraph='...' style="..."></div>`
  - **`data-mxgraph` JSON Attribute Payload**:
    - `highlight`: Color hex string e.g. `"#3b82f6"`, `"#FF6B00"`, `"#10b981"`, `"#38bdf8"`
    - `nav`: `true`
    - `resize`: `true`
    - `toolbar`: `"zoom layers tags lightbox"`
    - `edit`: `"_blank"`
    - `xml`: HTML-entity-escaped Draw.io XML (`mxGraphModel`) string.
  - **Entity Escaping Rules**:
    - Standard XML tags escaped: `<` -> `&lt;`, `>` -> `&gt;`
    - Attribute quotes inside JSON escaped: `"` -> `\"`
    - Labels with formatting/newlines escaped: `&` -> `&amp;`, line breaks -> `&amp;lt;br&amp;gt;` or `&amp;#10;`
  - **Companion Legend Element**: Immediately following every `div.mxgraph`, a callout element `<div class="callout callout-tip" style="...">...</div>` is included to provide context and architectural legend.

## 2. Logic Chain
1. **Baseline Assessment**: Acceptance Criteria require at least 16 Draw.io diagrams (`div.mxgraph`) in `financas-dados.html`.
2. **Current State**: Automated DOM parsing confirms 15 active `div.mxgraph` elements.
3. **Gap Analysis**: Adding at least 1 new diagram will raise the count from 15 to 16, satisfying requirement R2 & AC.
4. **Target Location Identification**: Section `#matematica` (Section 02) currently contains detailed textual and tabular explanations comparing SAC vs PRICE amortization systems, but has 0 `div.mxgraph` diagrams.
5. **Architectural Alignment**: Placing the SAC vs PRICE vs IPCA diagram in `#matematica` directly reinforces the section's core content while resolving the zero-diagram gap in Section 02.

## 3. Caveats
- Additional new sections being created in subsequent milestones (e.g., `#basileia-irb` or `#investimentos-mercado`) might also add diagrams, which will further increase the count beyond 16.
- The single-quote boundaries of `data-mxgraph='...'` require that any single quotes inside label text or XML attributes be properly handled or avoided to prevent JSON parsing errors by `viewer-static.min.js`.

## 4. Conclusion
- Current diagram count in `financas-dados.html` is **15**.
- To satisfy requirement R2 and meet the acceptance criterion of >= 16 diagrams, 1 new `div.mxgraph` diagram for SAC vs PRICE vs IPCA must be added into section `#matematica` (Section 02).
- The diagram XML must be HTML-entity escaped and formatted into the standard `data-mxgraph` JSON attribute structure with a companion callout legend.

## 5. Verification Method
- **Count Check Command**:
  ```bash
  python3 -c "from bs4 import BeautifulSoup; soup = BeautifulSoup(open('pages/pratica/financas-dados.html').read(), 'html.parser'); print(f'Total div.mxgraph count: {len(soup.find_all(\"div\", class_=\"mxgraph\"))}')"
  ```
- **Validation Criteria**: Output must display `Total div.mxgraph count: 16` (or greater).
