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

## 2026-07-31T02:10:37Z

O objetivo deste projeto é decompor a página concentrada `financas-dados.html` em 9 novas páginas independentes dentro de uma nova pasta `pages/financas/`. Uma nova categoria colapsável `🏦 Conhecimentos Financeiros` deve ser integrada ao sidebar global, e o conteúdo de cada página deve ser extensivamente aprofundado e refinado usando uma parceria de Agente Redator Especialista e Agente Revisor Independente para cada tópico.

Working directory: /Users/mauriciohelfstein/dev/aws-data-mastery
Integrity mode: development

## Requirements

### R1. Decomposição em Páginas Individuais (`pages/financas/`)
- Criar a pasta `/pages/financas/` e gerar os seguintes 9 arquivos HTML independentes a partir do conteúdo de `financas-dados.html`:
  1. `onboarding.html` (Processo de Crédito, KYC, SCR, Prevenção a Fraude)
  2. `matematica-financeira.html` (SAC, Price, IOF, VPL, Deságio)
  3. `ciclo-vida-credito.html` (Fases 1 a 6 e fluxo de eventos/estado do contrato)
  4. `pos-venda-reconciliacao.html` (Reconciliação, Flink Join, Gateway PIX, DLQ e tolerâncias)
  5. `contabilidade-razonetes.html` (Partidas dobradas, eventos contábeis, contas de carteira contábil, COSIF e movimentos financeiros)
  6. `risco-montecarlo.html` (Basileia, IRB, Vasicek, Simulação de Monte Carlo e VaR)
  7. `normas-regulatorio.html` (CMN 4.557, CMN 4.966 / IFRS 9 e reporte de risco)
  8. `auditoria-dados.html` (Qualidade de dados com Glue DQ, linhagem, e reporte Bacen DOC 3040)
  9. `finops-financas.html` (Custos analíticos de dados e FinOps aplicado a finanças)

### R2. Parceria Writer-Reviewer por Tópico (Aprofundamento Funcional)
- Para cada uma das 9 páginas, invocar um fluxo contendo:
  - **Agente Especialista (Redator):** Expandir e refinar detalhadamente as regras de negócio, fluxos funcionais de processos, fórmulas matemáticas (com KaTeX), tabelas e diagramas SVG nativos.
  - **Agente Revisor (Peer Reviewer):** Auditar e revisar de forma independente o conteúdo contábil/financeiro gerado para garantir conformidade técnica, integridade das contas e correta renderização matemática.

### R3. Reestruturação do Sidebar Global
- Modificar o arquivo `/components/sidebar.html` para:
  - Criar um novo grupo colapsável principal chamado `🏦 Conhecimentos Financeiros` no mesmo nível dos outros grupos de arquitetura e engenharia.
  - Listar as 9 novas páginas criadas dentro dessa nova categoria com seus respectivos ícones e links.
  - Remover a antiga referência à página `financas-dados.html` e seus sub-links que estavam sob a categoria `🗺️ Visão Geral & Introdução`.

### R4. Consistência Visual e Navegação
- Garantir que todas as 9 páginas usem o arquivo de estilos global `style.css`.
- Integrar o script de carregamento dinâmico da sidebar (`sidebar-loader.js`) e scripts de acessibilidade em todas as novas páginas.
- Garantir que não haja links quebrados e que a navegação do botão hambúrguer funcione perfeitamente.

## Acceptance Criteria

### Estrutura de Arquivos e Diretórios
- [ ] A pasta `/pages/financas/` foi criada e contém exatamente as 9 novas páginas HTML especificadas no requisito R1.
- [ ] A página concentrada `/pages/pratica/financas-dados.html` foi removida (ou desativada) e seu tráfego/referências foram migrados para a nova estrutura.

### Sidebar Global
- [ ] O arquivo `/components/sidebar.html` foi atualizado para conter a nova categoria principal `🏦 Conhecimentos Financeiros` com links para as 9 páginas sob `/pages/financas/`.
- [ ] A referência antiga à página `financas-dados.html` sob `visao-geral-cat` foi completamente removida.

### Qualidade e Integridade do Conteúdo
- [ ] Cada uma das 9 páginas foi expandida com conteúdo técnico aprofundado e funcional (fórmulas renderizadas com KaTeX de forma nativa e sem delimitadores de cifrão).
- [ ] Cada página contém seus respectivos diagramas SVG nativos com fluxos funcionais perfeitamente visíveis e sem sobreposição de textos.
- [ ] Os scripts de acessibilidade (`a11y.js`) e progresso de leitura (`progress.js`) funcionam corretamente nas novas páginas.

