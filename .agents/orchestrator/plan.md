# Project Plan: Financial Knowledge Pages Expansion & Quality Audit

## Overview
Expand and enhance 9 pages in `/pages/financas/` on branch `feat/financas-dados-cleanup`, resolving all sidebar JS/HTML issues, applying KaTeX and SVG guidelines, and completing full multi-agent audit rounds.

## Milestones

### Milestone 1: Baseline Audit & Sidebar Infrastructure Fix
- Task 1.1: Explore `/pages/financas/` pages and sidebar JS scripts (`js/sidebar.js`, etc.).
- Task 1.2: Dispatch Worker to fix sidebar JavaScript/HTML bugs across all 9 pages (ensure `toggleCategory`, `toggleNav`, `scrollToTop`, `#sidebar`, `#hamburger` are present and working without JS errors).

### Milestone 2: Topic Specialists Content Expansion (9 HTML Pages)
- Task 2.1: Specialist Worker for `onboarding.html` (KYC flow, Credit Proposal Data Contract in JSON Schema Draft-07/2020-12, AWS 2026 SVG architecture).
- Task 2.2: Specialist Worker for `matematica-financeira.html` (Financial math basic to advanced, SAC/Price, VPL, Assaf/Ross bibliography, Python/PySpark/SQL executable code).
- Task 2.3: Specialist Worker for `ciclo-vida-credito.html` (Credit lifecycle phases 1-6 detailed, AWS 2026 technical event streams).
- Task 2.4: Specialist Worker for `pos-venda-reconciliacao.html` (Post-sales events: prepayments, late payments, fines, interest; Flink/MSK/S3 streaming architecture).
- Task 2.5: Specialist Worker for `contabilidade-razonetes.html` (COSIF table, accounting entries, SVG T-account diagrams, BRGAAP CMN 4.966 EIR calculation).
- Task 2.6: Specialist Worker for `risco-montecarlo.html` (Banking risk basic to advanced, IRB, Vasicek, Expected vs Unexpected Loss, PySpark Monte Carlo simulation).
- Task 2.7: Specialist Worker for `normas-regulatorio.html` (CMN 2.682, 4.557, 4.966, 4.893 analysis, SVG provision stage diagram, BACEN DOC 3040 reports).
- Task 2.8: Specialist Worker for `auditoria-dados.html` (BACEN/CVM physical lineage, PySpark column-level lineage, Lake Formation & Glue DQDL SVG governance).
- Task 2.9: Specialist Worker for `finops-financas.html` (FinOps cost optimization: Iceberg Vacuum/Compaction, S3 Lifecycle Tiers, diagrams & cost tables).

### Milestone 3: Design & Quality Standard Enforcement
- Task 3.1: Enforce KaTeX math delimiters (`\(` and `\[`) across all 9 pages.
- Task 3.2: Verify dark mode premium theme (`style.css`), high contrast badges, responsive clean SVG diagrams without text overlap.

### Milestone 4: Multi-Agent Audit & Final Homologation
- Task 4.1: Layout Reviewer audit (CSS, contrast, responsive design).
- Task 4.2: UX Evaluator audit (readability, didactic flow, navigation).
- Task 4.3: Forensic Auditor integrity audit (verify genuine implementations, no hardcoded cheating).
- Task 4.4: Judge Agent final consolidation & approval for `feat/financas-dados-cleanup`.
