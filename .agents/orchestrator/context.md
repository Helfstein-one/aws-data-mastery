# Context & Findings Index

## Target File Scope
### Engenharia:
- `pages/engenharia/genai-*.html` (to be enumerated by survey explorers)

### Operacoes:
- `pages/operacoes/advanced-architectures.html`
- `pages/operacoes/deep-learning-fundamentals.html`
- `pages/operacoes/cnn-deep-dive.html`
- `pages/operacoes/rnn-lstm-deep-dive.html`
- `pages/operacoes/transformers-attention.html`
- `pages/operacoes/mlops-model-registry.html`
- `pages/operacoes/evaluation-features.html`

## Technical Requirements Summary
- Diagrams: Draw.io `<div class="mxgraph" ...>` wrapped in `<div class="drawio-wrap">` or responsive conceptual SVGs.
- Client Renderer Script: `<script src="https://viewer.diagrams.net/js/viewer-static.min.js" type="text/javascript"></script>` immediately before `</body>`.
- Diagram Legend: `<div class="diagram-legend">...</div>` immediately after each diagram container detailing AWS components, integration, and context.
- Audit & Verification:
  - Technical content & Boto3/Python code accuracy.
  - 100% W3C XML / JSON parsing of `data-mxgraph` attributes using `xml.etree.ElementTree.fromstring` and `json.loads`.
  - DOM visibility.
