import re

with open('architecture.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract header
head_match = re.search(r'(.*?<nav id="sidebar">.*?</nav>)', content, re.DOTALL)
header = head_match.group(1)

# Extract footer
footer_match = re.search(r'(<button id="scrollTop".*)', content, re.DOTALL)
footer = footer_match.group(1)

html_content = header + """
<div id="main">
  <div class="hero" style="background-color: var(--navy)">
    <div class="hero-ey">Domínio Financeiro & Engenharia</div>
    <h1>Conhecimentos Financeiros <em>para Dados</em></h1>
    <p class="hero-d">A ponte definitiva entre o negócio bancário (operações de crédito, tabelas de amortização, inadimplência) e a arquitetura técnica de dados. Visão agnóstica para Modelagem, Streaming e Analytics.</p>
    <div class="pills">
      <span class="pill">Credit Scoring</span>
      <span class="pill">Tabela SAC vs Price</span>
      <span class="pill">Juros & IOF</span>
      <span class="pill">SCD Tipo 2</span>
      <span class="pill">Default & Atraso</span>
    </div>
  </div>

  <main class="main-content">

    <!-- SEÇÃO 1 -->
    <section class="section" id="jornada">
      <div class="sec-hdr">
        <div class="sec-num" style="color:var(--emr)">01</div>
        <div class="sec-meta">
          <div class="sec-acc" style="background:var(--emr)"></div>
          <h2>A Jornada do Crédito: Originação & Cadastro (KYC)</h2>
          <p>O início de tudo: como um usuário vira um Lead qualificado e como a Engenharia cruza os dados para avaliar o Risco (Scoring).</p>
        </div>
      </div>

      <div class="callout callout-tip">
        <strong>Conceito de Negócio: KYC (Know Your Customer) e Onboarding</strong>
        <p>A primeira etapa de um relacionamento bancário é a captura de dados demográficos, biométricos e financeiros (renda presumida). O KYC é regulatório (evita lavagem de dinheiro). Na perspectiva de crédito, a instituição precisa responder a uma pergunta de $1 milhão: <em>"Qual a probabilidade deste cliente não me pagar?"</em> Essa métrica é conhecida como <strong>PD (Probability of Default)</strong>.</p>
      </div>

      <h3>A Engenharia por trás do Risco de Crédito</h3>
      <div class="concept-grid">
        <div class="concept-card" style="border-top: 4px solid var(--arch);">
          <div class="cc-tag">Consultas em Bureaus (Serasa/SPC)</div>
          <div class="cc-body">
            Durante o onboarding, a aplicação faz chamadas HTTP Síncronas (via API Gateway) para bureaus de crédito externos. A engenharia captura essas respostas cruas (JSON) no Data Lake. Por causa do alto custo de requisições, os dados do bureau geralmente possuem <em>caches lógicos</em> (ex: TTL de 30 dias no DynamoDB) para evitar múltiplas faturas.
          </div>
        </div>
        <div class="concept-card" style="border-top: 4px solid var(--spark);">
          <div class="cc-tag">Modelagem de Scoring (Feature Store)</div>
          <div class="cc-body">
            Para o time de Data Science calcular a PD (Probability of Default) em milissegundos via MLOps, a Engenharia de Dados mantém uma <strong>Feature Store</strong>. As features incluem "Quantidade de atrasos &gt; 30 dias nos últimos 12 meses", "Renda comprometida" e "Uso do limite do cartão rotativo".
          </div>
        </div>
      </div>
    </section>

    <hr style="border: 0; height: 1px; background: var(--border); margin: 40px 0;">

    <!-- SEÇÃO 2 -->
    <section class="section" id="matematica">
      <div class="sec-hdr">
        <div class="sec-num" style="color:var(--ok)">02</div>
        <div class="sec-meta">
          <div class="sec-acc" style="background:var(--ok)"></div>
          <h2>Matemática do Contrato: Juros, IOF e Amortização</h2>
          <p>A física do dinheiro: como um contrato é capitalizado ao longo do tempo e os dois principais sistemas de pagamentos.</p>
        </div>
      </div>

      <h3>1. Juros Simples vs. Compostos</h3>
      <p>O mercado de crédito opera esmagadoramente com <strong>Juros Compostos</strong> (juros sobre juros). A fórmula clássica de capitalização é <code>M = C * (1 + i)^t</code>, onde <em>C</em> é o Capital, <em>i</em> a taxa de juros e <em>t</em> o tempo.</p>
      
      <div class="abox info">
        <div class="abox-hdr" style="background:var(--muted)">Imposto sobre Operações Financeiras (IOF)</div>
        <div class="abox-body">
          No Brasil, qualquer operação de crédito cobra IOF do cliente, diluído nas parcelas. Ele é composto por duas partes cruciais:
          <ul>
            <li><strong>IOF Fixo (Alíquota Adicional):</strong> Geralmente de 0,38% incidente sobre o valor total do crédito.</li>
            <li><strong>IOF Diário:</strong> Um percentual (ex: 0,0082% ao dia) cobrado pelo tempo que o dinheiro fica emprestado (limitado a 365 dias).</li>
          </ul>
          Na Engenharia, o IOF é calculado na emissão (D0) e injetado no <em>Valor Financiado</em>. Se o cliente pegou R$ 1.000,00 de crédito, a tabela de parcelas será calculada em cima de R$ 1.000,00 + IOF + Tarifas (O Custo Efetivo Total - CET).
        </div>
      </div>

      <h3>2. Tabela Price vs. Tabela SAC</h3>
      <p>A forma como o saldo devedor é abatido (Amortização) define o valor das parcelas do cliente. O Analista de Dados deve entender perfeitamente essas duas curvas matemáticas:</p>

      <div class="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>Característica</th>
              <th>Tabela Price (Sistema Francês)</th>
              <th>Tabela SAC (Amortização Constante)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Valor da Parcela</strong></td>
              <td><strong>Fixo</strong> do início ao fim do contrato.</td>
              <td><strong>Decrescente.</strong> A primeira é mais cara, a última é a mais barata.</td>
            </tr>
            <tr>
              <td><strong>Amortização (Abatimento da Dívida)</strong></td>
              <td>Crescente. No início você paga muito juro e abate pouca dívida. No fim abate muita dívida.</td>
              <td><strong>Fixa/Constante.</strong> O saldo devedor cai de forma igual todos os meses.</td>
            </tr>
            <tr>
              <td><strong>Juros Pagos</strong></td>
              <td>Decrescentes. Mas o total de juros pago no final é <strong>maior</strong> que na SAC.</td>
              <td>Decrescentes rápidos. O total de juros pago no final é <strong>menor</strong> que na Price.</td>
            </tr>
            <tr>
              <td><strong>Uso Típico</strong></td>
              <td>Crédito Pessoal, Empréstimos por App, Financiamento de Veículos.</td>
              <td>Financiamento Imobiliário.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="callout callout-tip" style="border-left-color:var(--ext)">
        <strong>Engenharia: Modelagem do Contrato em um Datalake (SCD Tipo 2)</strong>
        <p>Um contrato de empréstimo não é estático. O cliente pode pedir renegociação, alongar o prazo ou mudar a data de vencimento. Se você usar uma tabela mutável simples (<code>UPDATE</code>), você destrói a história analítica. Em Bancos e Fintechs, adotamos as <strong>Slowly Changing Dimensions (SCD Tipo 2)</strong>. Cada mudança no contrato insere um registro novo na tabela `dim_contratos` com colunas <code>validade_inicio</code>, <code>validade_fim</code> e <code>is_active_flag</code>. Isso permite ao analista financeiro reconstruir a foto de carteira do banco em qualquer data do passado (Time-Travel lógico).</p>
      </div>

    </section>

    <hr style="border: 0; height: 1px; background: var(--border); margin: 40px 0;">

    <!-- SEÇÃO 3 -->
    <section class="section" id="pos-venda">
      <div class="sec-hdr">
        <div class="sec-num" style="color:var(--warn)">03</div>
        <div class="sec-meta">
          <div class="sec-acc" style="background:var(--warn)"></div>
          <h2>Pós-venda: Baixas, Deságios e Inadimplência</h2>
          <p>A fase final do ciclo de crédito envolve lidar com os pagamentos recebidos (Baixas) e a matemática dos atrasos.</p>
        </div>
      </div>

      <div class="concept-grid">
        <div class="concept-card" style="border-top: 4px solid var(--spark);">
          <div class="cc-tag">Liquidação Antecipada (VPL)</div>
          <div class="cc-body">
            Por lei, o cliente pode antecipar parcelas de trás para frente. Como a parcela da Tabela Price já carrega os juros futuros embutidos, o banco deve retirar esses juros. Aplicamos o <strong>Valor Presente Líquido (VPL)</strong> com a taxa de Deságio (a mesma taxa de juros da contratação). A Engenharia escuta eventos de `AntecipacaoEfetuada` no Kafka para recalcular o fluxo de caixa projetado da instituição analiticamente.
          </div>
        </div>
        <div class="concept-card" style="border-top: 4px solid var(--warn);">
          <div class="cc-tag">Atraso: Multa + Juros de Mora</div>
          <div class="cc-body">
            Quando a parcela passa do vencimento, entram os encargos de inadimplência:
            <br>1. <strong>Multa:</strong> Um valor fixo percentual (Ex: 2% por lei no BR) cobrado <em>uma única vez</em>.
            <br>2. <strong>Juros de Mora:</strong> Um valor diário (Pro-rata) cobrado por cada dia de atraso (Ex: 1% ao mês proporcional).<br>Isso faz a dívida escalar em "bola de neve".
          </div>
        </div>
      </div>

      <h3>A Inadimplência na Engenharia de Dados</h3>
      <p>Um cliente atrasado vira um registro de "Overdue". A métrica sagrada do banco é o índice de inadimplência (<strong>NPL - Non-Performing Loans</strong>). Geralmente o banco olha para atrasos maiores de 15, 30, 60 e 90 dias.</p>
      
      <div class="callout callout-tip" style="border-left-color:var(--emr)">
        <strong>Problema de Pipeline: "Late-Arriving Data" nas Baixas de PIX/Boleto</strong>
        <p>Um problema severo de engenharia na liquidação bancária é a assincronicidade. O cliente paga o boleto na sexta à noite. A câmara de compensação (CIP) ou o Banco Central envia o arquivo de confirmação apenas na segunda-feira pela manhã. Se o pipeline rodar na sexta à meia-noite, marcará o cliente como Inadimplente.</p>
        <p><strong>Solução:</strong> A Engenharia utiliza janelas de chegada (Watermarks) no Apache Flink ou Spark Structured Streaming para tolerar dados atrasados, além de atualizar o <code>fato_pagamentos</code> no Apache Iceberg retroativamente usando <code>MERGE INTO</code> com a data de pagamento efetiva do banco de origem, garantindo que o cálculo de Multas seja revertido analiticamente.</p>
      </div>

    </section>

  </main>
</div>
""" + footer

with open('financas-dados.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("financas-dados.html created.")
