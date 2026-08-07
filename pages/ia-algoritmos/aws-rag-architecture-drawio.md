# Blueprints de Arquitetura AWS RAG 2026 — Especificação Draw.io (diagrams.net)

> **Documentação de Referência Técnica & Engenharia de Dados**
> Este documento fornece as especificações exatas em formato Blueprint para montagem visual no Draw.io utilizando a biblioteca oficial de ícones **AWS 2026 (Architecture / Machine Learning & Database)**.

---

## 📌 Blueprint 1: RAG ARCHITECTURE — BEDROCK & OPENSEARCH

**Ferramenta:** Draw.io (diagrams.net)  
**Biblioteca de Ícones:** AWS 2026 (Architecture / Machine Learning & Database)  
**Propósito:** Pipeline RAG de ultra-baixa latência com busca vetorial serverless no Amazon OpenSearch Service.

### Componentes (Nós)
- `[A]` **Client/App:** Ícone genérico de *Application* ou *User/Client*.
- `[B]` **Embeddings:** Ícone AWS 2026 **Amazon Bedrock** (Subtítulo: `Titan/Cohere Embeddings`).
- `[C]` **Vector Store:** Ícone AWS 2026 **Amazon OpenSearch Service** (Subtítulo: `Serverless Vector Search`).
- `[D]` **LLM:** Ícone AWS 2026 **Amazon Bedrock** (Subtítulo: `Claude 3`).

### Fluxo de Conexões (Setas Indicativas)
1. `[A]` $\rightarrow$ **Query do Usuário** $\rightarrow$ `[B]`
2. `[B]` $\rightarrow$ **Vetorização da Query** $\rightarrow$ `[C]`
3. `[C]` $\rightarrow$ **Busca Semântica & Retorno de Contexto** $\rightarrow$ `[A]` (ou orquestrador)
4. `[A]` $\rightarrow$ **Query + Contexto Recuperado** $\rightarrow$ `[D]`
5. `[D]` $\rightarrow$ **Resposta Gerada** $\rightarrow$ `[A]`

---

## 📌 Blueprint 2: RAG ARCHITECTURE — BEDROCK + PGVECTOR + KNOWLEDGE BASE

**Ferramenta:** Draw.io (diagrams.net)  
**Biblioteca de Ícones:** AWS 2026 (Architecture / Machine Learning & Database)  
**Propósito:** Arquitetura RAG corporativa totalmente gerenciada via Bedrock Agents / Knowledge Bases e banco vetorial relacional PostgreSQL (pgvector).

### Componentes (Nós)
- `[A]` **Client/App:** Ícone genérico de *Application*.
- `[B]` **Orquestrador:** Ícone AWS 2026 **Agents for Amazon Bedrock** ou **Knowledge Bases for Amazon Bedrock**.
- `[C]` **Vector DB:** Ícone AWS 2026 **Amazon Aurora** ou **Amazon RDS** (Subtítulo: `PostgreSQL + pgvector`).
- `[D]` **LLM:** Ícone AWS 2026 **Amazon Bedrock**.

### Fluxo de Conexões (Setas Indicativas)
1. `[A]` $\rightarrow$ **Query Natural** $\rightarrow$ `[B]`
2. `[B]` $\rightarrow$ **Busca de Documentos Vetorizados** $\rightarrow$ `[C]`
3. `[C]` $\rightarrow$ **Retorno do Contexto (Chunks)** $\rightarrow$ `[B]`
4. `[B]` $\rightarrow$ **Prompt Aumentado (RAG)** $\rightarrow$ `[D]`
5. `[D]` $\rightarrow$ **Geração da Resposta** $\rightarrow$ `[B]`
6. `[B]` $\rightarrow$ **Resposta Final** $\rightarrow$ `[A]`
