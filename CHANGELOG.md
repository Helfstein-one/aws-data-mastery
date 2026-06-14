# Changelog - AWS Data Mastery

Todas as mudanças notáveis para o repositório **AWS Data Mastery** são documentadas neste arquivo.

## [Unreleased]
### Added
- **Python Mastery**: Nova página avançada cobrindo CPython, Heap/Stack, Garbage Collector, Magic Methods (OOP Massivo), Pandas e frameworks (`pages/linguagem/python-mastery.html`).
- **Software Testing na Engenharia de Dados**: Nova página dissecando a pirâmide de testes para dados (Unit/Mocks, Integration via PySpark local, E2E) e Data Quality as Code (`pages/linguagem/testing.html`).
- **AWS Certification Gaps**: Injeção de questões e cenários de prova baseados nas certificações SAA-C03 e DEA-C01 referentes a resiliência Multi-Region, Direct Connect, Athena Partition Projection e Redshift Vacuum em `perguntas-arquitetura.html` e `perguntas-engenharia.html`.
- **Diagramas Técnicos (Draw.io)**: Adição de 3 novos diagramas ilustrativos para ciclo de vida do Python, Estrutura de Projeto em Pastas e Pirâmide de Testes.
- **Bento Grid & Roadmap**: Atualização do mapa principal para englobar os novos temas.

## [v1.6.0] - 2026-06-14

### Adicionado
- **Arquitetura de Dados (Power Designer & IaC)**: Mergulho profundo em modelagem física e lógica.
  - Diagramas lógicos RDBMS para E-Commerce, ERPs (Junction Table N:M) e RH (Self-Referencing) injetados em Computação e Bancos.
  - Padrões de acesso NoSQL massivos no DynamoDB (Adjacency List para Redes Sociais, Time-Series para IoT e Global Secondary Index para Gaming Leaderboards).
  - Blocos de infraestrutura como código (Terraform HCL) acoplados diretamente sob cada diagrama para provisionamento imediato.
- **Deep Dive: Mensageria (SQS & SNS)**: Página inteiramente refatorada com o padrão ouro corporativo.
  - Dissecados os dilemas e configurações críticas: Long Polling, Batch Window, FIFO vs Standard e Poison Pills.
  - Novas arquiteturas em Draw.io: Padrão Fan-Out com Filtros SNS (Message Attributes) e Ciclo de Vida da Mensagem detalhando o Visibility Timeout e a Dead Letter Queue (DLQ).
- **Legendas Dinâmicas Educacionais**: Todos os novos diagramas arquiteturais ganharam painéis de legendas embutidos, mapeando e explicando o comportamento de conectores lógicos, zonas de invisibilidade e índices.

### Modificado
- **Renderização de Diagramas (CORS/CSP Fix)**: Transição absoluta de todas as referências de imagens da AWS nos arquivos `.drawio` do Github RAW para a CDN Global **JSDelivr**, blindando as pranchas arquiteturais contra bloqueios do visualizador e garantindo 100% de confiabilidade no carregamento dos ícones.
- **Página Inicial (Index)**: Ajustes de redimensionamento e padronização visual nos cartões Bento Grid, acompanhados da atualização da imagem de *preview* de metadados (`aws-data-mastery-preview.png`).

## [v1.5.0] - 2026-06-14

### Adicionado
- **Módulo de Containers & Docker**: Novo hub completo focado em infraestrutura de dados moderna (`containers-docker.html`), abrangendo teorias de Cgroups/Namespaces, Fargate vs EC2, imagens customizadas e arquitetura Híbrida (MWAA + ECS Fargate + EMR on EKS).
- **Aprofundamentos Arquiteturais de Especialista**: Dezenas de novas seções e diagramas interativos (*draw.io*) focados no nível avançado de Engenharia:
  - **Networking Fundamental**: Blocos CIDR, VPCs Públicas/Privadas e Security Groups.
  - **Data Perimeter**: Topologia Hub & Spoke com Transit Gateway e VPC Endpoints.
  - **CDC & DynamoDB**: Arquitetura real-time CDC integrando RDS, DynamoDB Streams e EMR Serverless para Data Lakes (Iceberg).
  - **FinOps Serverless**: Pipeline Preditivo de anomalias financeiras utilizando Cost Explorer ML, EventBridge e auto-remediação.
  - **Business & Topologies**: Mapeamento do Value Stream e Topologias de Time de Dados.
- **Novas Badges & Gameficação**: Novo SVG oficial do Docker implementado no Bento Grid, e nova conquista "*Mestre em Containers*" adicionada ao motor de rastreamento (`progress.js`).
- **Scripts de Screenshot Automático**: Criação de automação Node.js (Playwright) para captura programática de *previews* visuais do portal para documentação no README.

## [v1.4.0] - 2026-06-14### Adicionado
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
