# Context for Worker: Layout & CSS Fixes

## Target Files
- `/style.css`
- `/pages/financas/contabilidade-razonetes.html`
- `/pages/financas/pos-venda-reconciliacao.html`
- All 9 pages in `/pages/financas/*.html` (for H1 spacing)

## Requirements
1. In `style.css`: Add alias CSS variables to `:root`:
   ```css
   --text-dim: var(--muted);
   --card-bg: var(--paper);
   --aws: var(--accent);
   --err: var(--warn);
   --red: var(--warn);
   --text: var(--ink);
   --text-bright: #f8fafc;
   --alert: var(--warn);
   ```
2. In `contabilidade-razonetes.html` and `pos-venda-reconciliacao.html`: Fix badge text color contrast on warning badges (replace `color:#000;` with `color:#fff;` or remove inline `color:#000;`).
3. Fix spacing around ampersands/commas in `<h1>` titles across all 9 pages.
