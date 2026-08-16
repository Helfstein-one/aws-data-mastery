# Execution Plan — AWS Data Mastery AI Section Diagrams & Audit

## Master Objectives
1. **R1: Add Draw.io / responsive SVG diagrams** to all target AI section pages:
   - `pages/engenharia/genai-*.html` (all matching files)
   - `pages/operacoes/advanced-architectures.html`
   - `pages/operacoes/deep-learning-fundamentals.html`
   - `pages/operacoes/cnn-deep-dive.html`
   - `pages/operacoes/rnn-lstm-deep-dive.html`
   - `pages/operacoes/transformers-attention.html`
   - `pages/operacoes/mlops-model-registry.html`
   - `pages/operacoes/evaluation-features.html`
   Each Draw.io diagram must be a `<div class="mxgraph" ...>` wrapped inside a `<div class="drawio-wrap">` (or responsive conceptual SVG).
2. **R2: Client renderer script & `.diagram-legend` callout box**:
   - Ensure `<script src="https://viewer.diagrams.net/js/viewer-static.min.js" type="text/javascript"></script>` is placed immediately before `</body>` on every diagram page.
   - Insert a `.diagram-legend` callout box immediately after each diagram container detailing AWS components, integration, and context.
3. **R3: Multi-agent audit & verification**:
   - Validate technical content & Boto3/Python code accuracy across AI section pages.
   - Verify 100% W3C XML / JSON parsing of `data-mxgraph` attributes using `xml.etree.ElementTree.fromstring` and `json.loads`.
   - Verify DOM visibility and rendering styling.

## Phased Approach

### Phase 0: Survey & Codebase Mapping (Parallel Explorers)
- Spawn 3 Explorers (`teamwork_preview_explorer`) to inspect target directory, locate all target files (especially `genai-*.html`), analyze existing HTML structure, CSS styles, existing diagrams, and scripts.
- Synthesize findings into `PROJECT.md`.

### Phase 1: Test Infrastructure Track (E2E Testing Track)
- Spawn test writing / testing orchestrator subagent to construct validation harness and test scripts:
  - HTML validation script (W3C XML parsing, `json.loads` of `data-mxgraph`, presence of viewer-static.min.js before `</body>`, `.drawio-wrap` structure, `.diagram-legend` structure).
  - Boto3/Python code accuracy validator for code snippets on these pages.
  - DOM visibility & CSS class checker.

### Phase 2: Implementation Track
- Milestone 1: Implementation of diagrams, viewer script, and legends on `pages/engenharia/genai-*.html`.
- Milestone 2: Implementation of diagrams, viewer script, and legends on `pages/operacoes/*.html` target pages.
- Worker -> Reviewer -> Challenger -> Forensic Auditor iteration per milestone.

### Phase 3: Final Audit & Verification
- Execute full test suite (Tiers 1-5).
- Run Forensic Auditor (`teamwork_preview_auditor`) to ensure 100% compliance with no hardcoded/facade cheating.
