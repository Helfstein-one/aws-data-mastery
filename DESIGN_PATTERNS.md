# 🎨 Design System & Padrões - AWS Data Mastery Portal

## 1. PALETA DE CORES

### Cores Primárias (CSS Variables)
```css
/* Base */
--bg: #ffffff              /* Fundo principal */
--paper: #f8fafc           /* Cards e containers */
--ink: #0f172a             /* Texto primário - Navy escuro */
--muted: #64748b           /* Subtexto - Slate médio */
--border: #cbd5e1          /* Borders e dividers */

/* Acentos Temáticos */
--navy: #1e3a8a            /* Hero sections */
--accent: #2563eb          /* Links e CTAs - Royal Blue */
--spark: #b45309           /* Spark/Engenharia - Amber */
--arch: #0f766e            /* Arquitetura - Teal */
--genai: #a21caf           /* GenAI/IA - Magenta */

/* AWS Service Colors */
--aws-s3: #16a34a          /* S3 - Verde */
--aws-kinesis: #ea580c     /* Kinesis - Laranja */
--aws-glue: #7c3aed        /* Glue - Púrpura */
--aws-redshift: #dc2626    /* Redshift - Vermelho */
--aws-athena: #0284c7      /* Athena - Azul */
--aws-lambda: #ff9900      /* Lambda - Orange */
--aws-emr: #232f3e         /* EMR - Preto AWS */
--aws-rds: #527fff         /* RDS - Azul */
--aws-dynamodb: #527fff    /* DynamoDB - Azul */
--aws-stepfunctions: #ff9900  /* Step Functions - Orange */
```

### Uso de Cores por Contexto

| Elemento | Cor | Uso |
|----------|-----|-----|
| Hero Banner | `--navy`, `--spark`, `--arch`, `--genai` | Fundo de seção principal |
| Card Border | `--accent`, `--spark`, `--arch` | `border-top: 3px solid` |
| Links | `--accent` | Hyperlinks, CTAs |
| Código | `--genai`, `--spark` | Syntax highlighting |
| Callout (Warning) | `--spark` | ⚠️ Avisos |
| Callout (Info) | `--accent` | ℹ️ Informações |
| Callout (Success) | `--aws-s3` | ✅ Sucesso |

---

## 2. TIPOGRAFIA

### Fontes
```css
/* Headlines & Display */
font-family: 'Fraunces', serif;
font-weight: 600;
font-size: 2.5rem to 3rem;

/* Body & Labels */
font-family: 'DM Sans', sans-serif;
font-weight: 400;
font-size: 1rem to 1.125rem;
line-height: 1.6;

/* Code & Technical */
font-family: 'DM Mono', monospace;
font-weight: 400;
font-size: 0.875rem;
letter-spacing: 0.05em;
```

### Hierarquia

- **h1**: 2.5rem (Fraunces 600) - Títulos de página
- **h2**: 2rem (Fraunces 600) - Títulos de seção
- **h3**: 1.5rem (Fraunces 600) - Subtítulos
- **h4**: 1.25rem (DM Sans 600) - Heading de card
- **p**: 1rem (DM Sans 400) - Corpo de texto
- **small**: 0.875rem (DM Sans 400) - Descrições
- **code**: 0.875rem (DM Mono 400) - Código inline

---

## 3. ESTRUTURA DE PÁGINA PADRÃO

### Template Base
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título da Página | AWS Data Mastery</title>
  
  <!-- SEO & OpenGraph -->
  <meta name="description" content="Descrição curta (120 chars)">
  <meta name="keywords" content="aws, dados, engenharia">
  <meta property="og:title" content="Título">
  <meta property="og:image" content="../../assets/images/og-image.jpg">
  
  <!-- Fontes -->
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600&family=DM+Sans:wght@400;600&family=DM+Mono:wght@400&display=swap" rel="stylesheet">
  
  <!-- CSS Global -->
  <link rel="stylesheet" href="../../style.css">
</head>
<body>
  <!-- Menu Hamburger (Mobile) -->
  <button id="hamburger" onclick="toggleNav()">☰</button>
  
  <!-- Sidebar (Injetada dinamicamente) -->
  <nav id="sidebar"></nav>
  
  <!-- Conteúdo Principal -->
  <div id="main">
    <!-- HERO SECTION -->
    <div class="hero" style="border-left: 6px solid var(--spark);">
      <div class="hero-badge">🔥 Tema/Categoria</div>
      <h1>Título Principal com <em>Ênfase</em></h1>
      <p class="hero-d">Descrição executiva em 1-2 linhas. Contexto do tema.</p>
      <div class="pills">
        <span class="pill">AWS</span>
        <span class="pill">Python</span>
        <span class="pill">Avançado</span>
      </div>
    </div>
    
    <!-- CONTEÚDO PRINCIPAL -->
    <main class="main-content">
      <!-- SEÇÃO 01 -->
      <section class="section">
        <div class="sec-hdr">
          <div class="sec-num">01</div>
          <h2>Título da Seção</h2>
        </div>
        <p>Parágrafo introdutório...</p>
        
        <!-- Grid de Cards -->
        <div class="grid-2">
          <div class="card" style="border-top: 3px solid var(--accent);">
            <h4>Conceito 1</h4>
            <p>Descrição breve do conceito.</p>
          </div>
          <div class="card" style="border-top: 3px solid var(--spark);">
            <h4>Conceito 2</h4>
            <p>Comparação ou alternativa.</p>
          </div>
        </div>
      </section>
      
      <!-- SEÇÃO 02 - COM DIAGRAMA -->
      <section class="section">
        <div class="sec-hdr">
          <div class="sec-num">02</div>
          <h2>Arquitetura & Fluxos</h2>
        </div>
        
        <!-- Diagrama mxGraph Inline -->
        <div class="mxgraph" data-mxgraph='{"xml": "...BASE64_ENCODED_DRAWIO..."}'></div>
        
        <!-- Descrição do diagrama -->
        <div class="abox note">
          📌 <strong>Fluxo Principal:</strong> Dados → Processamento → ML → Inference
        </div>
      </section>
      
      <!-- SEÇÃO 03 - CÓDIGO -->
      <section class="section">
        <div class="sec-hdr">
          <div class="sec-num">03</div>
          <h2>Implementação Prática</h2>
        </div>
        
        <h3>Exemplo em Python</h3>
        <pre><code class="language-python">
# Código de exemplo
import pyspark.sql as sql

spark = sql.SparkSession.builder \
    .appName("DataProcessing") \
    .getOrCreate()

df = spark.read.parquet("s3://bucket/data/")
result = df.groupBy("category").agg({"value": "sum"})
        </code></pre>
      </section>
      
      <!-- SEÇÃO 04 - COMPARAÇÃO/TRADEOFF -->
      <section class="section">
        <div class="sec-hdr">
          <div class="sec-num">04</div>
          <h2>Comparação & Trade-offs</h2>
        </div>
        
        <div class="comparison-table">
          <table>
            <tr>
              <th>Aspecto</th>
              <th>Opção A</th>
              <th>Opção B</th>
            </tr>
            <tr>
              <td>Performance</td>
              <td>⚡ Muito rápido</td>
              <td>⚡⚡ Ultra rápido</td>
            </tr>
            <tr>
              <td>Custo</td>
              <td>💰 Baixo</td>
              <td>💰💰💰 Alto</td>
            </tr>
            <tr>
              <td>Complexidade</td>
              <td>📚 Média</td>
              <td>📚📚 Alta</td>
            </tr>
          </table>
        </div>
      </section>
      
      <!-- SEÇÃO 05 - CASE REAL / EXEMPLO -->
      <section class="section">
        <div class="sec-hdr">
          <div class="sec-num">05</div>
          <h2>Case Real: Bancário</h2>
        </div>
        
        <div class="card" style="border-left: 4px solid var(--arch); background: var(--paper);">
          <h4>🏦 Detecção de Fraude em Tempo Real</h4>
          <p><strong>Contexto:</strong> Banco X processa 1M+ transações/dia.</p>
          <p><strong>Solução:</strong> Pipeline com Kinesis → Lambda → SageMaker</p>
          <p><strong>Resultado:</strong> 99.2% acurácia, latência <100ms</p>
        </div>
      </section>
      
      <!-- SEÇÃO 06 - REFERÊNCIAS -->
      <section class="section">
        <div class="sec-hdr">
          <div class="sec-num">06</div>
          <h2>Referências & Leitura Complementar</h2>
        </div>
        
        <ul>
          <li><a href="https://docs.aws.amazon.com/...">AWS Documentation: Serviço X</a></li>
          <li><a href="https://arxiv.org/...">Paper: Model Architecture (2024)</a></li>
          <li><a href="../../pages/...">Página Relacionada: Topic Y</a></li>
        </ul>
      </section>
    </main>
  </div>
  
  <!-- Scripts -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.1.0/mxClient.min.js"></script>
  <script src="../../js/sidebar-loader.js"></script>
  <script src="../../js/progress.js"></script>
  <script>
    mxgraph_init(); // Renderizar diagramas
  </script>
</body>
</html>
```

---

## 4. COMPONENTES REUTILIZÁVEIS

### Hero Section
```html
<div class="hero" style="border-left: 6px solid var(--spark);">
  <div class="hero-badge">🔥 Badge Temático</div>
  <h1>Título com <em>Ênfase</em></h1>
  <p class="hero-d">Descrição executiva</p>
  <div class="pills">
    <span class="pill">Tag1</span>
    <span class="pill">Tag2</span>
  </div>
</div>
```

### Section Header (Numerada)
```html
<div class="sec-hdr">
  <div class="sec-num">01</div>
  <h2>Título da Seção</h2>
</div>
```

### Card com Border Top
```html
<div class="card" style="border-top: 3px solid var(--accent);">
  <h4>Título do Card</h4>
  <p>Conteúdo do card. Máx 3-4 linhas.</p>
</div>
```

### Callout Boxes
```html
<!-- Info -->
<div class="abox info">ℹ️ <strong>Info:</strong> Mensagem informativa</div>

<!-- Warning -->
<div class="abox note">⚠️ <strong>Atenção:</strong> Algo importante aqui</div>

<!-- Success -->
<div class="abox success">✅ <strong>Sucesso:</strong> Resultado positivo</div>

<!-- Error -->
<div class="abox error">❌ <strong>Erro:</strong> Algo deu errado</div>
```

### Grid Layouts
```html
<!-- 2 Colunas -->
<div class="grid-2">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
</div>

<!-- 3 Colunas -->
<div class="grid-3">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

### Código
```html
<pre><code class="language-python">
# Python code here
df = spark.read.parquet("s3://...")
</code></pre>
```

---

## 5. PADRÃO DE DIAGRAMAS DRAWIO & SVG

### 5.1 Diagramas DrawIO (Técnicos, Arquitetura)

**Características:**
- Usar ícones AWS oficiais (`shape=mxgraph.aws4.*` ou assets em `/assets/icons/`)
- Envelopar containers `div.mxgraph` em `<div class="drawio-wrap">` com selo visual `.drawio-label`
- **Renderizador JS Obrigatório**: Toda página com `div.mxgraph` DEVE conter `<script src="https://viewer.diagrams.net/js/viewer-static.min.js" type="text/javascript"></script>` imediatamente antes do `</body>`
- **Sintaxe XML W3C**: O atributo `data-mxgraph` deve conter JSON válido cujo campo `xml` passa em `xml.etree.ElementTree.fromstring` (sem duplicação de `html.unescape`, ampersands como `&amp;` e quebras de linha em textos como `&#10;`)
- **Legenda Obrigatória**: Todo diagrama deve ter imediatamente a seguir o container `<div class="diagram-legend">` com Componentes, Integração e Contexto
- Layout: Esquerda→Direita ou Top→Bottom
- Cores: Alinhar com `--aws-*` da paleta

**Exemplo DrawIO (Fluxo de Dados):**
```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  S3 Source  │────▶│  Glue ETL    │────▶│ Redshift DW │
│  (Ingesta)  │     │ (Transform)  │     │  (Analytical)
└─────────────┘     └──────────────┘     └─────────────┘
   Frequência:           Regras SQL:          Queries BI:
   Daily                 Cleaning             Dashboard
```

**Elemento de Diagrama:**
```html
<div class="mxgraph" data-mxgraph='{"xml": "PHN2ZyB4bWxucz..."}'></div>
```

### 5.2 Diagramas SVG (Lógica, Conceitos)

**Características:**
- Usar SVG inline (não external files)
- Cores: Usar CSS variables
- Animações leves (CSS, não JavaScript pesado)
- Responsivo: `viewBox` adequado
- Uso: Explicar fluxo de ML, lógica de algoritmos

**Exemplo SVG (Progressão de Modelos):**
```svg
<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Simples -->
  <circle cx="50" cy="100" r="30" fill="var(--spark)"/>
  <text x="50" y="105" text-anchor="middle">Simple</text>
  
  <!-- Arrow -->
  <line x1="85" y1="100" x2="115" y2="100" stroke="var(--accent)" stroke-width="2"/>
  <polygon points="115,100 110,95 110,105" fill="var(--accent)"/>
  
  <!-- Complexo -->
  <circle cx="200" cy="100" r="30" fill="var(--accent)"/>
  <text x="200" y="105" text-anchor="middle">Medium</text>
  
  <!-- Arrow -->
  <line x1="235" y1="100" x2="265" y2="100" stroke="var(--accent)" stroke-width="2"/>
  
  <!-- Expert -->
  <circle cx="350" cy="100" r="30" fill="var(--genai)"/>
  <text x="350" y="105" text-anchor="middle">Expert</text>
</svg>
```

---

## 6. ÍCONES & ASSETS

### 6.1 Ícones AWS
Local: `/assets/icons/`

**Ícones Disponíveis (29 total):**
```
- s3.png, lambda.png, glue.png, kinesis.png, athena.png
- redshift.png, rds.png, dynamodb.png, emr.png, spark.png
- stepfunctions.png, sagemaker.png, iam.png, cloudwatch.png
- eventbridge.png, etc...
```

**Uso em HTML:**
```html
<img src="../../assets/icons/s3.png" alt="S3" width="48" height="48">
```

**Uso em Diagrama DrawIO:**
Inserir como imagem local no DrawIO antes de exportar.

### 6.2 Emojis Temáticos
```
🔥 = Conceito principal / Hot topic
📌 = Destaque / Pin
ℹ️ = Informação
⚠️ = Aviso / Warning
✅ = Sucesso
❌ = Erro
🎯 = Objetivo
💼 = Business
📚 = Aprendizado
🚀 = Performance
💾 = Data/Storage
⚡ = Speed/Fast
```

---

## 7. PADRÃO DE SEÇÕES

### Ordem Recomendada
1. **Hero Section** - Contexto + Tags
2. **Introdução** (01) - O que é, por que importa
3. **Conceitos Fundamentais** (02) - Definições, modelos teóricos
4. **Arquitetura/Implementação** (03) - Desenhos, fluxos, diagramas
5. **Exemplos Práticos** (04) - Código, casos reais, comparações
6. **Trade-offs & Considerações** (05) - Vantagens/desvantagens
7. **Conclusão & Próximos Passos** (06) - Referências, leitura complementar

### Comprimento de Página
- **Leve**: 3-4 seções (~2000 palavras)
- **Médio**: 5-6 seções (~4000 palavras)
- **Denso**: 7-8 seções (~6000+ palavras)

---

## 8. PADRÃO DE SIDEBAR

### Estrutura de Categorias IA
```
🤖 IA & Machine Learning
  ├─ Fundamentos
  │  ├─ O que é IA?
  │  ├─ Tipos de Aprendizado
  │  └─ Métodos Clássicos
  ├─ Deep Learning
  │  ├─ Redes Neurais
  │  ├─ Arquiteturas Modernas
  │  └─ Transformers
  ├─ Operações & IA (MLOps)
  │  ├─ Feature Engineering
  │  ├─ Model Training Pipeline
  │  ├─ Model Deployment
  │  └─ Monitoring & Observability
  └─ Aplicações Práticas
     ├─ Visão Computacional
     ├─ NLP & GenAI
     └─ Time Series & Forecasting
```

---

## 9. CHECKLIST DE QUALIDADE

Para cada página IA criada, validar:

- [ ] **SEO**: Meta description, keywords, og:image presentes
- [ ] **Estrutura**: Hero + 3+ seções numeradas + Referências
- [ ] **Conteúdo**: Mín. 2000 palavras, exemplos, código
- [ ] **Diagramas**: 1+ DrawIO (arquitetura) + 1+ SVG (lógica)
- [ ] **Cores**: Paleta CSS variables, borders top em cards
- [ ] **Links**: Cross-linking para páginas relacionadas
- [ ] **Acessibilidade**: Alt text em imagens, contrast ratio 4.5:1
- [ ] **Mobile**: Responsivo (teste em 320px+)
- [ ] **Performance**: <3s load time, imagens otimizadas
- [ ] **Busca**: Incluída em search-index.js

---

## 10. EXEMPLOS DE PÁGINAS EXISTENTES

### Referência 1: `pages/engenharia/apache-flink.html`
- ✅ Hero section com border-left
- ✅ Seções numeradas
- ✅ Código PySpark inline
- ✅ Diagrama DrawIO embutido
- ✅ Callouts para conceitos-chave
- ✅ Links cruzados para tópicos relacionados

### Referência 2: `pages/pratica/cases-reais.html`
- ✅ 4 cases documentados
- ✅ Arquitetura AWS por case
- ✅ Radar de entrevista (3 níveis)
- ✅ Business value explicado
- ✅ Tecnologias utilizadas

### Referência 3: `index.html`
- ✅ Bento grid com 12+ cards
- ✅ Busca real-time por título/tags
- ✅ Cards com descrição + link
- ✅ Seções temáticas colapsáveis

---

## 11. PRÓXIMOS PASSOS

1. **Para novos autores**: Copiar template base acima
2. **Para reviews**: Usar checklist de qualidade seção 9
3. **Para diagramas**: Usar DrawIO app, exportar XML → Base64
4. **Para SVG**: Editar inline no HTML
5. **Para cores**: Sempre usar CSS variables, nunca hex hardcoded

---

**Versão**: 1.0  
**Data**: Agosto 2026  
**Autor**: Design System Team
