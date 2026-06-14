# Changelog - AWS Data Mastery

Todas as mudanças notáveis para o repositório **AWS Data Mastery** são documentadas neste arquivo.

## [v1.4.0] - 2026-06-14

### Adicionado
- **Data Quality & Business Quality**: Criação de novas páginas completas (`data-quality.html`) englobando os conceitos essenciais da AWS (Circuit Breakers no Glue, Macie, regras Deequ) e o pilar de *Business Quality*.
- **Gamificação no Bento Grid**: As barras de porcentagem do painel gamificado agora interagem e preenchem progressivamente de forma embutida na base de cada card do Bento Grid.

### Modificado
- **Nova Interface Bento Box**: Fusão impecável do Ecossistema Core com as Trilhas de Especialização, adotando o design assíncrono moderno (Bento Box) contendo ícones AWS de alta resolução empilhados de forma inteligente.
- **Dashboard Global Refatorado**: O *dashboard* central de progresso e Conquistas (Badges com animação em SVG) foi reposicionado organicamente ao redor do painel de navegação (Bento Grid) mantendo a estrutura gamificada sem sobrecarregar a UX.

## [v1.3.0] - 2026-06-13

### Adicionado
- **Macro Temas na Sidebar**: Agrupamento lógico extenso de tópicos do Apache Spark & EMR em categorias (SPARK CORE & INTERNALS, DESENVOLVIMENTO & TUNING, DEBUGGING, AWS EMR & GLUE, OUTROS MOTORES).
- **Gamificação Integrada Dinâmica**: Arquivo `progress.js` inteiramente refatorado para consumir automaticamente a árvore de links do sidebar, garantindo que o percentual rastreie 100% das páginas adicionadas (Cases, Crises, PMO).
- **Novos Diagramas AWS 2026**: Adição e injeção de dezenas de novos diagramas lógicos (`mxgraph`) diretamente em seções teóricas que antes não possuíam conteúdo visual (ex: Playbook de Crises, Cases Multirregião, FinOps).
- **Identidade Visual**: Transição massiva de todos os componentes antigos para a paleta Dark Theme (Fundo `#080f1e`) utilizando ícones oficiais da biblioteca AWS 2026.

### Modificado
- **Ecossistema Core AWS**: Seção movida no `index.html` para figurar antes do Mapa da Trilha de Especialização.
- **Limpeza de Repositório**: Refinamento do arquivo `.gitignore` isolando os scripts de engenharia e montagem de artefatos (`*.py`, `*.txt`).
- **README**: Atualização para refletir os novos temas arquiteturais.

## [v1.2.0] - Versões Anteriores

### Adicionado
- Páginas Fundamentais: PMO & SME de Dados, Engenharia de Dados & POO, Finanças em Dados.
- Hubs de Prática: Playbook de Crises, 15+ Cases de Arquitetura.
- Simuladores Interativos de Entrevista (Arquitetura, Governança, Engenharia).
