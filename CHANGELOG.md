# Changelog

Todos as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato baseia-se em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- **README.md** e **CHANGELOG.md** adicionados para orientar novos desenvolvedores.
- **Apache Iceberg Deep Dive**: Novos tópicos avançados adicionados em `apache-iceberg.html`, incluindo Time Travel via Amazon Athena e operações de Schema Evolution sem a necessidade de reescrever dados (`Zero Data Rewrite`).
- Inclusão do **Apache Iceberg** no Roadmap da Index e nos "Bento Cards" principais, destacando sua importância para arquiteturas de Storage & Lakehouse.
- **Novos Bento Cards na Home Page**: 12 novos cards adicionados ao `index.html` para unificar e referenciar as páginas desmembradas recentemente (DataOps, Plataforma, Networking, Spark API, Spark UI, EMR, Glue & Flink, PMO, Soft Skills).
- **Ícones Oficiais**: Inclusão do logo oficial do Apache Spark (SVG vetorizado) nos cards referentes a Spark.

### Changed
- Sincronização global da navegação lateral (Sidebar) em **todas as páginas HTML** para incluir a Masterclass sobre Apache Iceberg de maneira unificada.
- Layout flexbox aprimorado nas seções do Apache Iceberg para acomodar dicas dinâmicas.
- **Padronização de Layout na Home**: Atualização de cards minimalistas (bento-small) para cards completos (bento-large) com descrições consistentes para Lakehouse, Iceberg, Segurança e FinOps.

### Fixed
- Correção crítica no parser do Draw.io (`DOMParser`) nas páginas do portal, especialmente `financas-dados.html`, convertendo tags literais HTML (`<mxCell`) para as respectivas entidades XML compatíveis (`&lt;mxCell`) dentro dos payloads JSON do Draw.io, evitando erros fatais de renderização.
- Correção definitiva da arquitetura Draw.io corporativa (`financas-dados.html`) implementando *triple-layer escaping* correto e referenciando os ícones da AWS com caminhos absolutos do repositório para evitar quebras relativas.
- Correção de quebra do Grid HTML (Bento Cards) no `index.html`, onde fechamentos prematuros e falta de `</div>` causavam aninhamento de cards e evasão do grid principal.
- Correção no card de DataOps & MLOps removendo ícone inexistente do SageMaker que quebrava o visual, isolando o logo do AWS Bedrock.

## [1.1.0] - 2026-06-30
### Added
- Reestruturação completa do projeto (Separação massiva).
- Criação de diagramas de infraestrutura Draw.io diretamente inseridos através das tags `<mxGraphModel>`.
- Injeção automática das barras laterais de navegação para interligar todos os tópicos de arquitetura AWS.
