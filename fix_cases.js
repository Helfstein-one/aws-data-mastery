const fs = require('fs');

let html = fs.readFileSync('pages/pratica/cases.html', 'utf8');

// Fix headers and remove <div class="content"> and its closing tag for cases 34-39
const updates = [
  {
    find: /<section class="section" id="case-advanced-34">\s*<div class="sec-hdr">\s*<span class="badge">Case 34 • Governança<\/span>\s*<h2>Data Mesh e Governança Descentralizada com Amazon DataZone<\/h2>\s*<\/div>\s*<div class="content">/g,
    replace: `<section class="section" id="case-advanced-34">
      <div class="sec-hdr">
        <div class="sec-num" style="color:var(--glue)">34</div>
        <div class="sec-meta">
          <div class="sec-acc" style="background:var(--glue)"></div>
          <h2>Case 34: Data Mesh e Governança Descentralizada com Amazon DataZone</h2>
          <p>Automação de acesso e discovery com DataZone e Lake Formation</p>
        </div>
      </div>`
  },
  {
    find: /<section class="section" id="case-advanced-35">\s*<div class="sec-hdr">\s*<span class="badge">Case 35 • Arquitetura \/ FinOps<\/span>\s*<h2>Custos de Rede Ocultos em Arquiteturas Multi-AZ \(Cross-AZ Traffic\)<\/h2>\s*<\/div>\s*<div class="content">/g,
    replace: `<section class="section" id="case-advanced-35">
      <div class="sec-hdr">
        <div class="sec-num" style="color:var(--arch)">35</div>
        <div class="sec-meta">
          <div class="sec-acc" style="background:var(--arch)"></div>
          <h2>Case 35: Custos de Rede Ocultos em Arquiteturas Multi-AZ (Cross-AZ Traffic)</h2>
          <p>Análise FinOps e correção de roteamento para reduzir custos de Data Transfer</p>
        </div>
      </div>`
  },
  {
    find: /<section class="section" id="case-captacao-liquida">\s*<div class="sec-hdr">\s*<span class="badge">Case 36 • Arquitetura<\/span>\s*<h2>Case 36: Arquitetura de Dados para Captação Líquida<\/h2>\s*<\/div>\s*<div class="content">/g,
    replace: `<section class="section" id="case-captacao-liquida">
      <div class="sec-hdr">
        <div class="sec-num" style="color:var(--arch)">36</div>
        <div class="sec-meta">
          <div class="sec-acc" style="background:var(--arch)"></div>
          <h2>Case 36: Arquitetura de Dados para Captação Líquida</h2>
          <p>Arquitetura Lambda e Data Mesh para visão Intraday e Batch Oficial</p>
        </div>
      </div>`
  },
  {
    find: /<section class="section" id="case-ia-cadastro">\s*<div class="sec-hdr">\s*<span class="badge" style="background: var\(--spark\); color: #fff;">Case 37 • IA & Automação<\/span>\s*<h2>Case 37: Triagem de Documentos \(IA Cadastro Banco\)<\/h2>\s*<\/div>\s*<div class="content">/g,
    replace: `<section class="section" id="case-ia-cadastro">
      <div class="sec-hdr">
        <div class="sec-num" style="color:var(--spark)">37</div>
        <div class="sec-meta">
          <div class="sec-acc" style="background:var(--spark)"></div>
          <h2>Case 37: Triagem de Documentos (IA Cadastro Banco)</h2>
          <p>Pipeline 100% Serverless para triagem de PDFs usando Textract e Bedrock</p>
        </div>
      </div>`
  },
  {
    find: /<section class="section" id="case-ia-oficios">\s*<div class="sec-hdr">\s*<span class="badge" style="background: var\(--sql\); color: #fff;">Case 38 • IA & Integrações<\/span>\s*<h2>Case 38: Automação de Ofícios Jurídicos \(Task Tokens\)<\/h2>\s*<\/div>\s*<div class="content">/g,
    replace: `<section class="section" id="case-ia-oficios">
      <div class="sec-hdr">
        <div class="sec-num" style="color:var(--sql)">38</div>
        <div class="sec-meta">
          <div class="sec-acc" style="background:var(--sql)"></div>
          <h2>Case 38: Automação de Ofícios Jurídicos (Task Tokens)</h2>
          <p>Orquestração de IA com Step Functions e pausa de fluxo (Wait for Task Token)</p>
        </div>
      </div>`
  },
  {
    find: /<section class="section" id="case-ia-cambio">\s*<div class="sec-hdr">\s*<span class="badge" style="background: var\(--dbt\); color: #fff;">Case 39 • Express Workflows<\/span>\s*<h2>Case 39: Operação de Câmbio & Compliance em Real-Time<\/h2>\s*<\/div>\s*<div class="content">/g,
    replace: `<section class="section" id="case-ia-cambio">
      <div class="sec-hdr">
        <div class="sec-num" style="color:var(--dbt)">39</div>
        <div class="sec-meta">
          <div class="sec-acc" style="background:var(--dbt)"></div>
          <h2>Case 39: Operação de Câmbio & Compliance em Real-Time</h2>
          <p>Step Functions Express Workflows para SLAs de baixa latência em análises restritivas</p>
        </div>
      </div>`
  }
];

updates.forEach(u => {
  html = html.replace(u.find, u.replace);
});

// We must also remove the extra </div> that paired with <div class="content"> for cases 34, 35, 36, 37, 38, 39.
// They usually look like:
/*
      </div>
      </div>
    </section>
*/
// Let's replace the double </div> before </section> with a single </div>.
html = html.replace(/<\/div>\s*<\/div>\s*<\/section>/g, `</div>\n    </section>`);


// Now add legends to Cases 26-35. We find the drawio-wrap block and insert the legend after it.
const legends = {
  'Case 26 — Arquitetura de Referência': `        <div class="diagram-legend" style="margin-top: 15px; font-size: 0.9em; color: var(--muted); border-left: 4px solid var(--accent); padding: 15px; background: #0f172a; border-radius: 8px; border: 1px solid #1e293b;">
          <strong style="color: var(--accent);">Detalhamento Arquitetural:</strong>
          <ul style="margin-top: 8px; padding-left: 20px; line-height: 1.6; margin-bottom: 0;">
            <li style="margin-bottom: 4px;"><strong>Ingestão e Processamento:</strong> Eventos via Kinesis Data Streams e processamento sub-segundo no Apache Flink.</li>
            <li style="margin-bottom: 4px;"><strong>Inovação ML:</strong> Requisições diretas do stream para endpoints do SageMaker com baixa latência.</li>
          </ul>
        </div>`,
  'Case 27 — Arquitetura de Referência': `        <div class="diagram-legend" style="margin-top: 15px; font-size: 0.9em; color: var(--muted); border-left: 4px solid var(--accent); padding: 15px; background: #0f172a; border-radius: 8px; border: 1px solid #1e293b;">
          <strong style="color: var(--accent);">Detalhamento Arquitetural:</strong>
          <ul style="margin-top: 8px; padding-left: 20px; line-height: 1.6; margin-bottom: 0;">
            <li style="margin-bottom: 4px;"><strong>Event-Driven:</strong> S3 Event Notifications integram diretamente com EventBridge.</li>
            <li style="margin-bottom: 4px;"><strong>Orquestração Serverless:</strong> Step Functions controla execuções do EMR Serverless (jobs .sync).</li>
          </ul>
        </div>`,
  'Case 28 — Arquitetura de Referência': `        <div class="diagram-legend" style="margin-top: 15px; font-size: 0.9em; color: var(--muted); border-left: 4px solid var(--accent); padding: 15px; background: #0f172a; border-radius: 8px; border: 1px solid #1e293b;">
          <strong style="color: var(--accent);">Detalhamento Arquitetural:</strong>
          <ul style="margin-top: 8px; padding-left: 20px; line-height: 1.6; margin-bottom: 0;">
            <li style="margin-bottom: 4px;"><strong>CDC Contínuo:</strong> MSK Connect com Debezium para capturar WAL do PostgreSQL sem impacto em Selects.</li>
            <li style="margin-bottom: 4px;"><strong>Lakehouse Upserts:</strong> AWS Glue Streaming consumindo Kafka e aplicando Merge no formato Iceberg.</li>
          </ul>
        </div>`,
  'Case 29 — Arquitetura Híbrida': `        <div class="diagram-legend" style="margin-top: 15px; font-size: 0.9em; color: var(--muted); border-left: 4px solid var(--accent); padding: 15px; background: #0f172a; border-radius: 8px; border: 1px solid #1e293b;">
          <strong style="color: var(--accent);">Detalhamento Arquitetural:</strong>
          <ul style="margin-top: 8px; padding-left: 20px; line-height: 1.6; margin-bottom: 0;">
            <li style="margin-bottom: 4px;"><strong>Transferência Acelerada:</strong> AWS DataSync lendo NFS local via porta segura (Direct Connect).</li>
            <li style="margin-bottom: 4px;"><strong>Destinos AWS:</strong> Possibilidade de gravar no EFS, FSx ou nativamente no S3 para Data Lakes.</li>
          </ul>
        </div>`,
  'Case 30 — Data Exchange Architectures': `        <div class="diagram-legend" style="margin-top: 15px; font-size: 0.9em; color: var(--muted); border-left: 4px solid var(--accent); padding: 15px; background: #0f172a; border-radius: 8px; border: 1px solid #1e293b;">
          <strong style="color: var(--accent);">Detalhamento Arquitetural:</strong>
          <ul style="margin-top: 8px; padding-left: 20px; line-height: 1.6; margin-bottom: 0;">
            <li style="margin-bottom: 4px;"><strong>Compartilhamento Zero-ETL:</strong> AWS Data Exchange publica views seguras sem copiar dados massivos.</li>
            <li style="margin-bottom: 4px;"><strong>Integração Redshift:</strong> Consumidores (terceiros) assinam o catálogo e os dados aparecem em seu próprio Redshift.</li>
          </ul>
        </div>`,
  'Case 31 — Amazon MWAA & EKS': `        <div class="diagram-legend" style="margin-top: 15px; font-size: 0.9em; color: var(--muted); border-left: 4px solid var(--accent); padding: 15px; background: #0f172a; border-radius: 8px; border: 1px solid #1e293b;">
          <strong style="color: var(--accent);">Detalhamento Arquitetural:</strong>
          <ul style="margin-top: 8px; padding-left: 20px; line-height: 1.6; margin-bottom: 0;">
            <li style="margin-bottom: 4px;"><strong>Orquestração Centralizada:</strong> MWAA (Airflow gerenciado) ativando jobs Spark Containerizados.</li>
            <li style="margin-bottom: 4px;"><strong>Isolamento EKS:</strong> EMR on EKS garante multitenancy, provisionando pods dedicados para Spark ETLs.</li>
          </ul>
        </div>`,
  'Case 32 — Redshift Streaming Ingestion': `        <div class="diagram-legend" style="margin-top: 15px; font-size: 0.9em; color: var(--muted); border-left: 4px solid var(--accent); padding: 15px; background: #0f172a; border-radius: 8px; border: 1px solid #1e293b;">
          <strong style="color: var(--accent);">Detalhamento Arquitetural:</strong>
          <ul style="margin-top: 8px; padding-left: 20px; line-height: 1.6; margin-bottom: 0;">
            <li style="margin-bottom: 4px;"><strong>Ingestão Direta (Zero-ETL):</strong> O Redshift consome Kinesis/MSK usando Materialized Views, sem Lambdas ou Glue no meio.</li>
            <li style="margin-bottom: 4px;"><strong>Latência:</strong> Views com atualização contínua, disponíveis para análise operacional imediata.</li>
          </ul>
        </div>`,
  'Case 33 — Iceberg MoR & Compaction': `        <div class="diagram-legend" style="margin-top: 15px; font-size: 0.9em; color: var(--muted); border-left: 4px solid var(--accent); padding: 15px; background: #0f172a; border-radius: 8px; border: 1px solid #1e293b;">
          <strong style="color: var(--accent);">Detalhamento Arquitetural:</strong>
          <ul style="margin-top: 8px; padding-left: 20px; line-height: 1.6; margin-bottom: 0;">
            <li style="margin-bottom: 4px;"><strong>Merge-On-Read:</strong> Flink escreve updates rápidos como "Delete Files", mantendo a latência baixa de streaming.</li>
            <li style="margin-bottom: 4px;"><strong>Otimização de Custos:</strong> EMR Serverless (Compaction) consolida os arquivos assincronamente para otimizar leitura do Athena.</li>
          </ul>
        </div>`,
  'Case 34 — Amazon DataZone Workflows': `        <div class="diagram-legend" style="margin-top: 15px; font-size: 0.9em; color: var(--muted); border-left: 4px solid var(--accent); padding: 15px; background: #0f172a; border-radius: 8px; border: 1px solid #1e293b;">
          <strong style="color: var(--accent);">Detalhamento Arquitetural:</strong>
          <ul style="margin-top: 8px; padding-left: 20px; line-height: 1.6; margin-bottom: 0;">
            <li style="margin-bottom: 4px;"><strong>Descentralização:</strong> DataZone facilita publicações de glossários de negócio e discovery pelos consumidores.</li>
            <li style="margin-bottom: 4px;"><strong>Integração Lake Formation:</strong> A aprovação da subscrição executa tags LF no backend de forma transparente.</li>
          </ul>
        </div>`,
  'Case 35 — Cross-AZ Network Transfer Costs': `        <div class="diagram-legend" style="margin-top: 15px; font-size: 0.9em; color: var(--muted); border-left: 4px solid var(--accent); padding: 15px; background: #0f172a; border-radius: 8px; border: 1px solid #1e293b;">
          <strong style="color: var(--accent);">Detalhamento Arquitetural:</strong>
          <ul style="margin-top: 8px; padding-left: 20px; line-height: 1.6; margin-bottom: 0;">
            <li style="margin-bottom: 4px;"><strong>Custo Oculto:</strong> Multi-AZ (Fargate e MSK) em alto throughput gera custos severos de tráfego Cross-AZ.</li>
            <li style="margin-bottom: 4px;"><strong>FinOps:</strong> Corrigido via Topology Aware Routing (Kafka) e provisionamento AZ Affinity para isolar tráfego.</li>
          </ul>
        </div>`
};

for (const [label, legend] of Object.entries(legends)) {
  const labelSearch = `<div class="drawio-label"><span class="dot"></span>${label}</div>`;
  if (html.includes(labelSearch)) {
    // Find where the drawio-wrap div ends
    // Usually: </div>\n      </div>
    // Let's use a regex to inject legend right after the drawio-wrap div
    
    // Create an escaped version of labelSearch for regex
    const escapedLabel = labelSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedLabel}\\s*<div class="mxgraph"[^>]*><\\/div>\\s*<\\/div>)`, 'g');
    
    html = html.replace(regex, `$1\n${legend}`);
  }
}

fs.writeFileSync('pages/pratica/cases.html', html, 'utf8');
console.log('Fix applied');

