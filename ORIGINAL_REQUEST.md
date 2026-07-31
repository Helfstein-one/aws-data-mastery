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
