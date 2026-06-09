/**
 * progress.js - Sistema Interativo de Progresso e Gamificação
 * AWS Data Engineering Specialist - Portal de Estudos
 * Autor: Antigravity AI Pair Programmer
 */

(function() {
  // Configuração das trilhas e suas respectivas seções/hashes para cálculo de progresso
  const MODULES = {
    architecture: {
      name: "📐 Arquitetura & Padrões",
      badge: "Arquiteto de Dados",
      color: "var(--arch)",
      items: [
        "architecture.html#pilares",
        "architecture.html#mensageria",
        "architecture.html#kafka",
        "architecture.html#triggers",
        "architecture.html#workflows",
        "architecture.html#lakeformation",
        "architecture.html#lambda",
        "architecture.html#kappa",
        "architecture.html#lakehouse",
        "architecture.html#datamesh",
        "architecture.html#modelagem-dados",
        "architecture.html#data-product-management"
      ]
    },
    softskills: {
      name: "🧠 Soft Skills",
      badge: "Especialista Tático",
      color: "var(--spark)",
      items: [
        "soft-skills.html#personas",
        "soft-skills.html#pilares",
        "soft-skills.html#implementacao"
      ]
    },
    perguntas: {
      name: "❓ Perguntas de Entrevista",
      badge: "Mestre das Perguntas",
      color: "var(--spark)",
      items: [
        "perguntas.html#q1",
        "perguntas.html#q5",
        "perguntas.html#q7",
        "perguntas.html#q14",
        "perguntas.html#q24"
      ]
    },
    cases: {
      name: "💼 Cases de Plataformas",
      badge: "Resolvedor de Cases",
      color: "var(--ext)",
      items: [
        "cases.html#case-streaming",
        "cases.html#case-mesh",
        "cases.html#case-genai",
        "cases.html#case-genai-avancado",
        "cases.html#case-ai-data-quality",
        "cases.html#case-polaris-flink",
        "cases.html#case-iot",
        "cases.html#case-reverse-etl"
      ]
    },
    ingestion: {
      name: "⚡ Ingestão & Streaming",
      badge: "Mestre da Ingestão",
      color: "var(--emr)",
      items: [
        "ingestion.html#kinesis",
        "ingestion.html#firehose",
        "ingestion.html#msk",
        "ingestion.html#ecs-fargate",
        "ingestion.html#dms",
        "ingestion.html#dynamodb"
      ]
    },
    storage: {
      name: "💾 Lakehouse & Storage",
      badge: "Guardião do Storage",
      color: "var(--arch)",
      items: [
        "storage-lakehouse.html#s3-camadas",
        "storage-lakehouse.html#s3-tiers",
        "storage-lakehouse.html#formatos",
        "storage-lakehouse.html#iceberg",
        "storage-lakehouse.html#iceberg-vs-delta",
        "storage-lakehouse.html#iceberg-rest-catalog"
      ]
    },
    processing: {
      name: "⚙️ Processamento Spark",
      badge: "Guru do Spark",
      color: "var(--ext)",
      items: [
        "processing.html#spark-conceitos",
        "processing.html#spark-arch",
        "processing.html#spark-yarn-pyramid",
        "processing.html#spark-math",
        "processing.html#tungsten",
        "processing.html#spark-gc",
        "processing.html#spark-skew",
        "processing.html#spark-advanced-functions",
        "processing.html#spark-joins",
        "processing.html#spark-cache",
        "processing.html#spark-streaming",
        "processing.html#spark-tuning",
        "processing.html#spark-debug",
        "processing.html#spark-erros",
        "processing.html#spark-specialist-debug",
        "processing.html#glue-jobs",
        "processing.html#emr-ec2",
        "processing.html#emr-serverless",
        "processing.html#emr-eks",
        "processing.html#emr-comparativo",
        "processing.html#spark-finops-costs",
        "processing.html#spark-ui-deepdive",
        "processing.html#flink-streaming",
        "processing.html#spark-e2e-integrations"
      ]
    },
    serving: {
      name: "📊 Analytics & Serving",
      badge: "Mestre do Analytics",
      color: "var(--genai)",
      items: [
        "serving.html#athena",
        "serving.html#athena-avancado",
        "serving.html#iceberg-manutencao",
        "serving.html#redshift",
        "serving.html#explain-tuning"
      ]
    },
    genai: {
      name: "🤖 GenAI & Dados",
      badge: "Arquiteto de GenAI",
      color: "#a78bfa",
      items: [
        "genai.html#genai-teoria",
        "genai.html#rag",
        "genai.html#pgvector",
        "genai.html#prompt-engineering"
      ]
    },
    dataops: {
      name: "⚙️ DataOps & MLOps",
      badge: "Líder de Operations",
      color: "#06b6d4",
      items: [
        "dataops-mlops.html#dataops-core",
        "dataops-mlops.html#mlops-core"
      ]
    },
    networking: {
      name: "🌐 Rede &amp; Ingress de Dados",
      badge: "Mestre das Redes",
      color: "#06b6d4",
      items: [
        "networking-ingress.html#dns-cdn",
        "networking-ingress.html#api-alb",
        "networking-ingress.html#vpc-endpoints"
      ]
    },
    security: {
      name: "🛡️ Segurança & IaC",
      badge: "Guardião de Segurança",
      color: "var(--muted)",
      items: [
        "governance-security.html#lakeformation",
        "governance-security.html#iam-kms",
        "governance-security.html#secretsmanager",
        "governance-security.html#observabilidade",
        "governance-security.html#data-quality",
        "governance-security.html#data-quality-avancado",
        "governance-security.html#data-contracts",
        "governance-security.html#data-lineage",
        "governance-security.html#plataforma-testes"
      ]
    },
    finops: {
      name: "💸 FinOps & Custos",
      badge: "Lenda das Finanças",
      color: "var(--ok)",
      items: [
        "finops.html#finops-fundamentos",
        "finops.html#finops-boas-praticas",
        "finops.html#finops-analise",
        "finops.html#finops-terraform"
      ]
    },
    oop: {
      name: "🏗️ Python & OOP",
      badge: "Engenheiro Pythonico",
      color: "#f43f5e",
      items: [
        "data-engineering-oop.html#boas-praticas",
        "data-engineering-oop.html#oop-dados",
        "data-engineering-oop.html#design-patterns",
        "data-engineering-oop.html#oop-cases-perguntas"
      ]
    },
    playbook: {
      name: "🚒 Playbook de Crises",
      badge: "Gerenciador de Crises",
      color: "var(--warn)",
      items: [
        "playbook-crises.html#introducao",
        "playbook-crises.html#crise-streaming",
        "playbook-crises.html#crise-kms",
        "playbook-crises.html#crise-genai",
        "playbook-crises.html#crise-fechamento",
        "playbook-crises.html#crise-duplicacao",
        "playbook-crises.html#crise-nulos",
        "playbook-crises.html#crise-sla",
        "playbook-crises.html#crise-schema-drift",
        "playbook-crises.html#crise-lgpd",
        "playbook-crises.html#crise-corrupcao"
      ]
    },
    platform: {
      name: "🏗️ Plataforma de Dados",
      badge: "Arquiteto de Plataforma",
      color: "var(--accent)",
      items: [
        "plataforma-dados.html#estrategico",
        "plataforma-dados.html#cenario-cdc",
        "plataforma-dados.html#cenario-sharing",
        "plataforma-dados.html#cenario-lineage",
        "plataforma-dados.html#cenario-llmops",
        "plataforma-dados.html#topologia",
        "plataforma-dados.html#arquitetura",
        "plataforma-dados.html#alinhamento",
        "plataforma-dados.html#perguntas"
      ]
    },
    infra_operacional: {
      name: "🏗️ Computação & Bancos",
      badge: "Especialista em Computação e Bancos",
      color: "#f43f5e",
      items: [
        "computacao-bancos.html#ecs",
        "computacao-bancos.html#load-balancers",
        "computacao-bancos.html#rds-aurora",
        "computacao-bancos.html#operacao"
      ]
    },
    orquestracao: {
      name: "⛓️ Orquestração de Dados",
      badge: "Mestre da Orquestração",
      color: "#a78bfa",
      items: [
        "orquestracao-dados.html#teoria",
        "orquestracao-dados.html#step-functions",
        "orquestracao-dados.html#mwaa-airflow",
        "orquestracao-dados.html#operacional"
      ]
    }
  };

  // Carrega progresso do localStorage
  function loadProgress() {
    try {
      const data = localStorage.getItem("aws_data_mastery_progress");
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error("Falha ao acessar localStorage:", e);
      return {};
    }
  }

  // Salva progresso no localStorage
  function saveProgress(progress) {
    try {
      localStorage.setItem("aws_data_mastery_progress", JSON.stringify(progress));
      updateAllUI();
    } catch (e) {
      console.error("Falha ao salvar progresso:", e);
    }
  }

  // Retorna ID da página atual
  function getCurrentPageName() {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf("/") + 1) || "index.html";
  }

  // Atualiza todo o estado da interface
  function updateAllUI() {
    const progress = loadProgress();
    const stats = calculateStats(progress);

    // 1. Atualiza barra de progresso global na sidebar
    updateSidebarProgress(stats);

    // 2. Sincroniza os checkboxes da sidebar
    updateSidebarCheckboxes(progress);

    // 3. Atualiza os checkboxes das seções físicas da página atual
    updatePageSectionCheckboxes(progress);

    // 4. Se estiver no index.html, renderiza o dashboard
    const dashboardContainer = document.getElementById("student-dashboard");
    if (dashboardContainer) {
      renderDashboard(dashboardContainer, stats);
      updateRoadmapNodes(stats);
    }
  }

  // Atualiza dinamicamente as cores e status dos nós do Roadmap SVG
  function updateRoadmapNodes(stats) {
    for (const modId in stats.modules) {
      const mod = stats.modules[modId];
      const nodeEl = document.getElementById(`node-${modId}`);
      const statusEl = document.getElementById(`status-${modId}`);
      if (nodeEl) {
        if (mod.percent === 100) {
          nodeEl.classList.remove('active');
          nodeEl.classList.add('completed');
        } else if (mod.percent > 0) {
          nodeEl.classList.add('active');
          nodeEl.classList.remove('completed');
        } else {
          nodeEl.classList.remove('active', 'completed');
        }
      }
      if (statusEl) {
        statusEl.textContent = `${mod.percent}%`;
      }
    }
  }

  // Calcula estatísticas gerais
  function calculateStats(progress) {
    let totalItems = 0;
    let completedItems = 0;
    const moduleProgress = {};

    for (const modId in MODULES) {
      const module = MODULES[modId];
      let modTotal = module.items.length;
      let modCompleted = 0;

      module.items.forEach(item => {
        totalItems++;
        if (progress[item]) {
          completedItems++;
          modCompleted++;
        }
      });

      moduleProgress[modId] = {
        name: module.name,
        badge: module.badge,
        color: module.color,
        total: modTotal,
        completed: modCompleted,
        percent: modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0
      };
    }

    const overallPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    
    // Níveis de Gamificação
    let level = "Iniciante dos Dados";
    if (overallPercent >= 25 && overallPercent < 50) level = "Engenheiro Pleno";
    else if (overallPercent >= 50 && overallPercent < 75) level = "Engenheiro Sênior";
    else if (overallPercent >= 75 && overallPercent < 100) level = "Especialista AWS";
    else if (overallPercent === 100) level = "Lenda dos Dados (AWS Master)";

    return {
      total: totalItems,
      completed: completedItems,
      percent: overallPercent,
      level: level,
      modules: moduleProgress
    };
  }

  // Cria e atualiza a barra de progresso no topo da sidebar
  function updateSidebarProgress(stats) {
    let sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    let progressBox = document.getElementById("sidebar-progress-box");
    if (!progressBox) {
      // Cria o container do progresso no topo da sidebar, logo abaixo da logo
      const logo = sidebar.querySelector(".nav-logo");
      progressBox = document.createElement("div");
      progressBox.id = "sidebar-progress-box";
      progressBox.style.padding = "14px 22px";
      progressBox.style.borderBottom = "1px solid #1e293b";
      progressBox.style.marginBottom = "10px";

      if (logo && logo.nextSibling) {
        sidebar.insertBefore(progressBox, logo.nextSibling);
      } else {
        sidebar.prepend(progressBox);
      }
    }

    progressBox.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; font-family:'DM Mono', monospace; font-size:10px; color:#94a3b8; margin-bottom:6px;">
        <span>SEU PROGRESSO</span>
        <span style="color:#38bdf8; font-weight:bold;">${stats.percent}%</span>
      </div>
      <div style="width:100%; height:6px; background:#1e293b; border-radius:99px; overflow:hidden;">
        <div style="width:${stats.percent}%; height:100%; background:linear-gradient(90deg, #38bdf8, #a78bfa); transition:width 0.4s ease; border-radius:99px;"></div>
      </div>
      <div style="font-size:9px; color:#64748b; font-family:'DM Sans', sans-serif; margin-top:5px; text-transform:uppercase; letter-spacing:0.03em;">
        Nível: <strong style="color:#f8fafc;">${stats.level}</strong>
      </div>
    `;
  }

  // Adiciona e atualiza checkboxes interativos ao lado dos links de sub-seções na sidebar
  function updateSidebarCheckboxes(progress) {
    const sublinks = document.querySelectorAll("#sidebar .nav-sub");
    sublinks.forEach(link => {
      const href = link.getAttribute("href");
      if (!href) return;

      // Descobre a chave correspondente no formato "pagname.html#hash"
      let key = href;
      if (!key.includes(".html")) {
        const currentPage = getCurrentPageName();
        key = currentPage.split("#")[0] + href;
      }

      // Adiciona o indicador visual se não existir
      let dot = link.querySelector(".nav-sdot");
      if (dot) {
        dot.style.display = "none"; // Substitui a bolinha clássica por um checkbox customizado
      }

      let check = link.querySelector(".sidebar-check");
      if (!check) {
        check = document.createElement("span");
        check.className = "sidebar-check";
        check.style.width = "10px";
        check.style.height = "10px";
        check.style.borderRadius = "50%";
        check.style.border = "1px solid #475569";
        check.style.display = "inline-block";
        check.style.marginRight = "6px";
        check.style.flexShrink = "0";
        check.style.cursor = "pointer";
        check.style.transition = "all 0.15s ease";

        link.insertBefore(check, link.firstChild);

        // Permite marcar como completo clicando no ícone do checkbox na sidebar
        check.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const currProgress = loadProgress();
          currProgress[key] = !currProgress[key];
          saveProgress(currProgress);
        });
      }

      // Atualiza o visual baseado no estado
      if (progress[key]) {
        check.style.background = "#10b981";
        check.style.borderColor = "#10b981";
        check.innerHTML = `<svg viewBox="0 0 24 24" fill="white" style="width:8px; height:8px; display:block; margin: 1px auto;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
        link.style.color = "#38bdf8";
      } else {
        check.style.background = "transparent";
        check.style.borderColor = "#475569";
        check.innerHTML = "";
        link.style.color = "";
      }
    });
  }

  // Injeta checkboxes interativos diretamente nas seções/cards do conteúdo principal
  function updatePageSectionCheckboxes(progress) {
    const pageName = getCurrentPageName().split("#")[0];

    // Varre todos os hashes conhecidos deste documento e localiza seus containers
    for (const modId in MODULES) {
      MODULES[modId].items.forEach(item => {
        const parts = item.split("#");
        if (parts[0] !== pageName) return;

        const hash = parts[1];
        // Encontra o elemento com o ID correspondente
        const element = document.getElementById(hash);
        if (!element) return;

        // Se for um card, seção ou h3/h2, vamos injetar o checkbox interativo de forma visível e elegante
        let container = element;
        // Se for um cabeçalho, coloca ao lado. Se for uma seção com classe .section, adiciona dentro do cabeçalho de seção (.sec-meta)
        let header = container.querySelector(".sec-meta h2") || container.querySelector("h2") || container.querySelector("h4") || container;

        if (header && !header.querySelector(".section-completed-check")) {
          // Ajusta layout do header para acomodar o check
          header.style.display = "flex";
          header.style.alignItems = "center";
          header.style.gap = "10px";

          const check = document.createElement("span");
          check.className = "section-completed-check";
          check.title = "Marcar esta seção como concluída";
          check.style.width = "20px";
          check.style.height = "20px";
          check.style.borderRadius = "50%";
          check.style.border = "2px solid var(--border)";
          check.style.display = "inline-flex";
          check.style.alignItems = "center";
          check.style.justifyContent = "center";
          check.style.cursor = "pointer";
          check.style.transition = "all 0.2s ease";
          check.style.fontSize = "10px";
          check.style.fontWeight = "bold";

          // Insere no começo ou após o título principal
          header.appendChild(check);

          check.addEventListener("click", (e) => {
            e.stopPropagation();
            const currProgress = loadProgress();
            currProgress[item] = !currProgress[item];
            saveProgress(currProgress);
            
            // Disparar micro animação se marcado como concluído
            if (currProgress[item]) {
              triggerGlowEffect(check);
            }
          });
        }

        // Atualiza estado do botão de check da seção
        const checkBtn = header ? header.querySelector(".section-completed-check") : null;
        if (checkBtn) {
          if (progress[item]) {
            checkBtn.style.background = "var(--ok)";
            checkBtn.style.borderColor = "var(--ok)";
            checkBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="white" style="width:12px; height:12px;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
            container.classList.add("section-completed-state");
            if (container.style) {
              container.style.borderLeft = "4px solid var(--ok)";
            }
          } else {
            checkBtn.style.background = "transparent";
            checkBtn.style.borderColor = "var(--border)";
            checkBtn.innerHTML = "";
            container.classList.remove("section-completed-state");
            if (container.style && container.classList.contains("card")) {
              container.style.borderLeft = "";
            }
          }
        }
      });
    }
  }

  // Helper to generate dynamic premium SVG icons for academic badges
  function getBadgeSVG(modId, hasCompleted) {
    const configs = {
      architecture: { 
        colors: ["#38bdf8", "#818cf8"], 
        icon: `<path class="badge-arch-path" d="M22 28 l10 -5 l10 5 l-10 5 z M22 28 v10 l10 5 v-10 z M42 28 v10 l-10 5 v-10 z" fill="none" stroke="url(#grad-architecture)" stroke-width="2" stroke-linejoin="round"/>` 
      },
      perguntas: { 
        colors: ["#fbbf24", "#f59e0b"], 
        icon: `<path class="badge-preg-crown" d="M28 20 A6 6 0 1 1 34 30 L38 34" fill="none" stroke="url(#grad-perguntas)" stroke-width="3" stroke-linecap="round"/><path class="badge-preg-laurel" d="M20 38 C22 32, 42 32, 44 38 M26 44 L38 44" fill="none" stroke="url(#grad-perguntas)" stroke-width="1.8" stroke-linecap="round"/>` 
      },
      cases: { 
        colors: ["#34d399", "#059669"], 
        icon: `<path class="badge-case-rocket" d="M32 16 L38 28 L38 38 L32 44 L26 38 L26 28 z M26 38 L22 42 M38 38 L42 42 M32 44 L32 48" fill="none" stroke="url(#grad-cases)" stroke-width="2" stroke-linejoin="round"/><path class="badge-case-fire" d="M30 45 L32 51 L34 45 Z" fill="#ef4444" opacity="0"/>` 
      },
      ingestion: { 
        colors: ["#ec4899", "#f43f5e"], 
        icon: `<path class="badge-ingest-bolt" d="M34 14 L24 30 L32 30 L30 46 L40 30 L32 30 z" fill="url(#grad-ingestion)"/>` 
      },
      storage: { 
        colors: ["#6366f1", "#4f46e5"], 
        icon: `<path class="badge-store-cyl" d="M20 22 C20 18, 44 18, 44 22 V28 C44 32, 20 32, 20 28 z M20 30 C20 26, 44 26, 44 30 V36 C44 40, 20 40, 20 36 z M20 38 C20 34, 44 34, 44 38 V44 C44 48, 20 48, 20 44 z" fill="none" stroke="url(#grad-storage)" stroke-width="2"/>` 
      },
      processing: { 
        colors: ["#0ea5e9", "#0284c7"], 
        icon: `<ellipse class="badge-proc-orbit1" cx="32" cy="32" rx="20" ry="6" transform="rotate(30,32,32)" fill="none" stroke="url(#grad-processing)" stroke-width="1.8"/><ellipse class="badge-proc-orbit2" cx="32" cy="32" rx="20" ry="6" transform="rotate(-30,32,32)" fill="none" stroke="url(#grad-processing)" stroke-width="1.8"/><circle class="badge-proc-gear" cx="32" cy="32" r="4" fill="url(#grad-processing)"/>` 
      },
      serving: { 
        colors: ["#f43f5e", "#be123c"], 
        icon: `<rect class="badge-serve-bar" x="20" y="32" width="4" height="12" rx="1" fill="url(#grad-serving)"/><rect class="badge-serve-bar" x="27" y="26" width="4" height="18" rx="1" fill="url(#grad-serving)"/><rect class="badge-serve-bar" x="34" y="20" width="4" height="24" rx="1" fill="url(#grad-serving)"/><circle class="badge-serve-lens" cx="44" cy="24" r="4" fill="none" stroke="url(#grad-serving)" stroke-width="1.8"/><line class="badge-serve-lens" x1="47" y1="27" x2="51" y2="31" stroke="url(#grad-serving)" stroke-width="1.8"/>` 
      },
      genai: { 
        colors: ["#a78bfa", "#8b5cf6"], 
        icon: `<path class="badge-gen-sparkle" d="M32 14 L34 20 L40 22 L34 24 L32 30 L30 24 L24 22 L30 20 z" fill="url(#grad-genai)"/><circle class="badge-gen-node" cx="20" cy="38" r="2" fill="url(#grad-genai)"/><circle class="badge-gen-node" cx="44" cy="38" r="2" fill="url(#grad-genai)"/><circle class="badge-gen-node" cx="32" cy="42" r="2.5" fill="url(#grad-genai)"/><line class="badge-gen-line" x1="20" y1="38" x2="32" y2="30" stroke="url(#grad-genai)" stroke-width="1" stroke-dasharray="2 2"/><line class="badge-gen-line" x1="44" y1="38" x2="32" y2="30" stroke="url(#grad-genai)" stroke-width="1" stroke-dasharray="2 2"/><line class="badge-gen-line" x1="32" y1="42" x2="32" y2="30" stroke="url(#grad-genai)" stroke-width="1" stroke-dasharray="2 2"/>` 
      },
      dataops: { 
        colors: ["#14b8a6", "#0d9488"], 
        icon: `<path class="badge-ops-loop" d="M22 32 C22 26, 30 26, 32 32 C34 38, 42 38, 42 32 C42 26, 34 26, 32 32 C30 38, 22 38, 22 32 z" fill="none" stroke="url(#grad-dataops)" stroke-width="2.5" stroke-linecap="round"/>` 
      },
      networking: { 
        colors: ["#38bdf8", "#0284c7"], 
        icon: `<circle class="badge-net-node" cx="32" cy="20" r="3" fill="url(#grad-networking)"/><circle class="badge-net-node" cx="20" cy="38" r="3" fill="url(#grad-networking)"/><circle class="badge-net-node" cx="44" cy="38" r="3" fill="url(#grad-networking)"/><line class="badge-net-line" x1="32" y1="20" x2="20" y2="38" stroke="url(#grad-networking)" stroke-width="1.8"/><line class="badge-net-line" x1="32" y1="20" x2="44" y2="38" stroke="url(#grad-networking)" stroke-width="1.8"/><line class="badge-net-line" x1="20" y1="38" x2="44" y2="38" stroke="url(#grad-networking)" stroke-width="1.8"/>` 
      },
      security: { 
        colors: ["#64748b", "#475569"], 
        icon: `<path class="badge-sec-shield" d="M20 20 V32 C20 40, 32 46, 32 46 C32 46, 44 40, 44 32 V20 z" fill="none" stroke="url(#grad-security)" stroke-width="2" stroke-linejoin="round"/><circle class="badge-sec-core" cx="32" cy="28" r="3" fill="url(#grad-security)"/><path class="badge-sec-core" d="M31 31 L33 31 L34 35 L30 35 z" fill="url(#grad-security)"/>` 
      },
      finops: { 
        colors: ["#fbbf24", "#f59e0b"], 
        icon: `<circle class="badge-fin-coin" cx="32" cy="32" r="13" fill="none" stroke="url(#grad-finops)" stroke-width="2"/><text class="badge-fin-text" x="32" y="37" font-size="14" font-weight="900" font-family="'DM Sans', sans-serif" text-anchor="middle" fill="url(#grad-finops)">$</text>` 
      },
      oop: { 
        colors: ["#38bdf8", "#fbbf24"], 
        icon: `<path class="badge-oop-bracket" d="M24 24 L18 32 L24 40 M40 24 L46 32 L40 40" fill="none" stroke="url(#grad-oop)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><line class="badge-oop-slash" x1="34" y1="20" x2="30" y2="44" stroke="url(#grad-oop)" stroke-width="2" stroke-linecap="round"/>` 
      },
      playbook: { 
        colors: ["#ef4444", "#b91c1c"], 
        icon: `<path class="badge-play-siren" d="M22 42 L42 42 L38 26 C38 20, 26 20, 26 26 z" fill="url(#grad-playbook)"/><rect class="badge-play-base" x="18" y="42" width="28" height="4" rx="1.5" fill="url(#grad-playbook)"/>` 
      },
      platform: { 
        colors: ["#6366f1", "#a78bfa"], 
        icon: `<path class="badge-plat-layer" d="M16 24 L32 16 L48 24 L32 32 z M16 34 L32 26 L48 34 L32 42 z" fill="none" stroke="url(#grad-platform)" stroke-width="2" stroke-linejoin="round"/>` 
      }
    };

    const cfg = configs[modId] || { colors: ["#cbd5e1", "#94a3b8"], icon: "" };
    
    // Determine colors based on status (grayscale if locked)
    const strokeColor = hasCompleted ? "url(#grad-" + modId + ")" : "#cbd5e1";
    const opacityVal = hasCompleted ? "1" : "0.35";
    const borderDash = hasCompleted ? "none" : "3,3";

    let lockMarkup = "";
    if (!hasCompleted) {
      lockMarkup = `
        <circle cx="32" cy="32" r="10" fill="white" opacity="0.9" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));" />
        <path d="M29 32 V29 C29 27.3, 30.3 26, 32 26 C33.7 26, 35 27.3, 35 29 V32 M27.5 32 H36.5 V39 H27.5 z" fill="#64748b" stroke="#64748b" stroke-width="1" stroke-linejoin="round" />
      `;
    }

    return `
      <svg viewBox="0 0 64 64" width="48" height="48" style="transition: all 0.3s ease; display: inline-block; opacity: ${opacityVal};">
        <defs>
          <linearGradient id="grad-${modId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${cfg.colors[0]}" />
            <stop offset="100%" stop-color="${cfg.colors[1]}" />
          </linearGradient>
        </defs>
        <!-- Background Circle Outer -->
        <circle cx="32" cy="32" r="28" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-dasharray="${borderDash}" />
        <circle cx="32" cy="32" r="25" fill="${hasCompleted ? cfg.colors[0] : 'transparent'}" opacity="${hasCompleted ? '0.05' : '0'}" />
        <!-- Graphics -->
        <g style="${hasCompleted ? '' : 'filter: grayscale(100%);'}">
          ${cfg.icon}
        </g>
        <!-- Lock Overlay -->
        ${lockMarkup}
      </svg>
    `;
  }

  // Micro animação visual de sucesso
  function triggerGlowEffect(el) {
    el.style.transform = "scale(1.3)";
    setTimeout(() => {
      el.style.transform = "scale(1)";
    }, 200);
  }

  // Renderiza o Dashboard Interativo no index.html
  function renderDashboard(container, stats) {
    // Renderiza uma central interativa premium com glassmorphism
    let badgesHTML = "";
    for (const modId in stats.modules) {
      const mod = stats.modules[modId];
      const hasCompleted = mod.percent === 100;
      badgesHTML += `
        <div class="dashboard-badge-card" style="text-align: center; padding: 14px; background: ${hasCompleted ? 'rgba(16, 185, 129, 0.04)' : 'rgba(15, 23, 42, 0.01)'}; border: 1px solid ${hasCompleted ? 'rgba(16, 185, 129, 0.18)' : 'var(--border)'}; border-radius: 12px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: default; position: relative; overflow: hidden;">
          <div style="margin-bottom: 8px; height: 52px; display: flex; align-items: center; justify-content: center;">
            ${getBadgeSVG(modId, hasCompleted)}
          </div>
          <div style="font-size: 11px; font-weight: bold; color: ${hasCompleted ? 'var(--navy)' : 'var(--muted)'}; font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing: 0.02em;">
            ${mod.badge}
          </div>
          <div style="font-size: 9px; color: var(--muted); margin-top: 4px;">
            ${mod.completed}/${mod.total} concluídos
          </div>
        </div>
      `;
    }

    let progressBreakdown = "";
    for (const modId in stats.modules) {
      const mod = stats.modules[modId];
      progressBreakdown += `
        <div style="margin-bottom: 12px;">
          <div style="display:flex; justify-content:space-between; font-size: 11px; margin-bottom:4px; font-family:'DM Mono', monospace;">
            <span style="font-weight: 500;">${mod.name}</span>
            <span style="font-weight: bold; color: ${mod.color};">${mod.percent}%</span>
          </div>
          <div style="width:100%; height:6px; background:#e2e8f0; border-radius:99px; overflow:hidden;">
            <div style="width:${mod.percent}%; height:100%; background:${mod.color}; border-radius:99px; transition:width 0.5s ease;"></div>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div style="background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); border: 2px solid var(--border); border-radius: 20px; padding: 32px; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);">
        
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 32px; align-items: center;" class="db-grid-mobile">
          
          <!-- Circular Progress Meter -->
          <div style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; border-right: 1px solid var(--border); padding-right: 24px;" class="db-circle-mobile">
            <div style="position: relative; width: 140px; height: 140px;">
              <svg viewBox="0 0 36 36" style="width: 140px; height: 140px; transform: rotate(-90deg);">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" stroke-width="3"/>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#db-grad)" stroke-width="3" stroke-dasharray="${stats.percent}, 100" stroke-linecap="round" style="transition: stroke-dasharray 0.6s ease;"/>
                <defs>
                  <linearGradient id="db-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#2563eb" />
                    <stop offset="100%" stop-color="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                <div style="font-family: 'Fraunces', serif; font-size: 2.2rem; font-weight: 900; line-height: 1; color: var(--navy);">${stats.percent}%</div>
                <div style="font-family: 'DM Mono', monospace; font-size: 9px; color: var(--muted); text-transform: uppercase; margin-top: 4px; letter-spacing: 0.05em;">Concluído</div>
              </div>
            </div>
            
            <div style="margin-top: 16px;">
              <span class="badge" style="background: linear-gradient(135deg, var(--navy), var(--accent)); padding: 6px 14px; font-size:10px; border-radius:99px; box-shadow: 0 4px 6px rgba(37,99,235,0.15);">${stats.level}</span>
            </div>
            <div style="font-size: 11px; color: var(--muted); margin-top: 8px;">
              ${stats.completed} de ${stats.total} seções estudadas
            </div>
          </div>
          
          <!-- Category Progress Breakdown -->
          <div>
            <h3 style="margin: 0 0 16px; border-bottom: none; padding-bottom: 0; font-size: 1.4rem;">Status das Trilhas de Estudo</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;" class="db-breakdown-mobile">
              ${progressBreakdown}
            </div>
            <div style="margin-top: 20px; display:flex; gap:12px; justify-content: flex-end;">
              <button id="reset-progress-btn" style="background: transparent; border: 1px dashed var(--warn); color: var(--warn); font-family: 'DM Mono', monospace; font-size: 10px; padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: all 0.2s;">
                Resetar Progresso
              </button>
            </div>
          </div>
        </div>

        <hr style="border:0; height:1px; background:var(--border); margin: 24px 0;">

        <!-- Achievements Grid -->
        <div>
          <h4 style="margin: 0 0 16px; font-size: 1rem; text-transform: uppercase; font-family:'DM Mono', monospace; color: var(--navy);">Suas Conquistas Acadêmicas</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 16px;">
            ${badgesHTML}
          </div>
        </div>

      </div>
    `;

    // Ação do botão de reset
    const resetBtn = document.getElementById("reset-progress-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Você tem certeza que deseja resetar todo o progresso dos seus estudos? Esta ação não pode ser desfeita.")) {
          saveProgress({});
        }
      });
    }
  }

  // Executa ao carregar o DOM
  window.addEventListener("DOMContentLoaded", () => {
    // Adiciona estilos para mobiles caso necessário e inicia renderizações
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      @media (max-width: 768px) {
        .db-grid-mobile { grid-template-columns: 1fr !important; gap: 24px !important; }
        .db-circle-mobile { border-right: none !important; border-bottom: 1px solid var(--border); padding-right: 0 !important; padding-bottom: 24px !important; }
        .db-breakdown-mobile { grid-template-columns: 1fr !important; }
      }
      .section-completed-state {
        background-color: rgba(16, 185, 129, 0.02) !important;
        border-color: var(--ok) !important;
        transition: all 0.3s ease;
      }
      .dashboard-badge-card {
        box-shadow: 0 2px 4px rgba(15, 23, 42, 0.02);
      }
      .dashboard-badge-card:hover {
        transform: translateY(-3px);
        background: rgba(16, 185, 129, 0.08) !important;
        border-color: rgba(16, 185, 129, 0.3) !important;
        box-shadow: 0 8px 16px rgba(15, 23, 42, 0.06);
      }
      .dashboard-badge-card:hover svg {
        transform: scale(1.05);
      }

      /* Custom Badge Inner Animations */
      .dashboard-badge-card:hover .badge-arch-path {
        stroke-dasharray: 100;
        animation: arch-dash 2s linear infinite;
      }
      @keyframes arch-dash {
        to { stroke-dashoffset: -200; }
      }
      

      .dashboard-badge-card:hover .badge-soft-brain {
        transform-origin: 32px 32px;
        animation: brain-pulse 1s ease-in-out infinite alternate;
      }
      @keyframes brain-pulse {
        from { transform: scale(1); filter: drop-shadow(0 0 2px rgba(59,130,246,0.4)); }
        to { transform: scale(1.05); filter: drop-shadow(0 0 6px rgba(59,130,246,0.8)); }
      }

      .dashboard-badge-card:hover .badge-preg-crown {
        transform-origin: 32px 32px;
        animation: crown-glow 1s ease-in-out infinite alternate;
      }
      @keyframes crown-glow {
        from { transform: translateY(0); filter: drop-shadow(0 0 2px rgba(251,191,36,0.4)); }
        to { transform: translateY(-2px); filter: drop-shadow(0 0 6px rgba(251,191,36,0.8)); }
      }
      
      .dashboard-badge-card:hover .badge-case-rocket {
        transform-origin: 32px 32px;
        animation: rocket-sway 0.8s ease-in-out infinite alternate;
      }
      .dashboard-badge-card:hover .badge-case-fire {
        transform-origin: 32px 32px;
        opacity: 1;
        animation: fire-flicker 0.15s ease-in-out infinite alternate;
      }
      @keyframes rocket-sway {
        from { transform: rotate(-2deg); }
        to { transform: rotate(2deg); }
      }
      @keyframes fire-flicker {
        from { transform: scaleY(0.8); opacity: 0.7; }
        to { transform: scaleY(1.2); opacity: 1; }
      }

      .dashboard-badge-card:hover .badge-ingest-bolt {
        transform-origin: 32px 32px;
        animation: bolt-vibe 0.3s linear infinite;
      }
      @keyframes bolt-vibe {
        0%, 100% { transform: translate(0, 0); opacity: 0.9; }
        50% { transform: translate(-1px, 1px); opacity: 1; }
      }

      .dashboard-badge-card:hover .badge-store-cyl {
        animation: store-bounce 1.2s ease-in-out infinite alternate;
      }
      @keyframes store-bounce {
        from { transform: translateY(0); }
        to { transform: translateY(-3px); }
      }

      .dashboard-badge-card:hover .badge-proc-orbit1 {
        transform-origin: 32px 32px;
        animation: spin-clockwise 3s linear infinite;
      }
      .dashboard-badge-card:hover .badge-proc-orbit2 {
        transform-origin: 32px 32px;
        animation: spin-counter 3s linear infinite;
      }
      @keyframes spin-clockwise {
        to { transform: rotate(360deg); }
      }
      @keyframes spin-counter {
        to { transform: rotate(-360deg); }
      }

      .dashboard-badge-card:hover .badge-serve-bar {
        transform-origin: bottom;
        animation: bar-grow 0.8s ease-in-out infinite alternate;
      }
      @keyframes bar-grow {
        from { transform: scaleY(0.8); }
        to { transform: scaleY(1.2); }
      }
      .dashboard-badge-card:hover .badge-serve-lens {
        animation: lens-float 1.5s ease-in-out infinite alternate;
      }
      @keyframes lens-float {
        from { transform: translate(0, 0); }
        to { transform: translate(-2px, -2px); }
      }

      .dashboard-badge-card:hover .badge-gen-sparkle {
        transform-origin: 32px 32px;
        animation: sparkle-rotate 2s linear infinite;
      }
      .dashboard-badge-card:hover .badge-gen-node {
        animation: node-blink 1s ease-in-out infinite alternate;
      }
      @keyframes sparkle-rotate {
        to { transform: rotate(360deg); }
      }
      @keyframes node-blink {
        from { opacity: 0.4; }
        to { opacity: 1; }
      }

      .dashboard-badge-card:hover .badge-ops-loop {
        stroke-dasharray: 20 5;
        animation: loop-flow 1.5s linear infinite;
      }
      @keyframes loop-flow {
        to { stroke-dashoffset: -25; }
      }

      .dashboard-badge-card:hover .badge-net-line {
        stroke-dasharray: 5 3;
        animation: net-flow 1s linear infinite;
      }
      @keyframes net-flow {
        to { stroke-dashoffset: -8; }
      }

      .dashboard-badge-card:hover .badge-sec-shield {
        animation: shield-pulse 1s ease-in-out infinite alternate;
      }
      @keyframes shield-pulse {
        from { filter: drop-shadow(0 0 2px rgba(100,116,139,0.3)); }
        to { filter: drop-shadow(0 0 8px rgba(100,116,139,0.7)); }
      }

      .dashboard-badge-card:hover .badge-fin-coin {
        transform-origin: 32px 32px;
        animation: coin-spin 1.5s ease-in-out infinite alternate;
      }
      @keyframes coin-spin {
        from { transform: scaleX(1); }
        to { transform: scaleX(-1); }
      }

      .dashboard-badge-card:hover .badge-oop-bracket {
        animation: bracket-shake 0.8s ease-in-out infinite alternate;
      }
      @keyframes bracket-shake {
        from { transform: translateX(-1px); }
        to { transform: translateX(1px); }
      }

      .dashboard-badge-card:hover .badge-play-siren {
        animation: siren-alert 0.4s linear infinite alternate;
      }
      @keyframes siren-alert {
        from { fill: #ef4444; filter: drop-shadow(0 0 1px #ef4444); }
        to { fill: #3b82f6; filter: drop-shadow(0 0 8px #3b82f6); }
      }

      .dashboard-badge-card:hover .badge-plat-layer {
        animation: layer-lift 1.2s ease-in-out infinite alternate;
      }
      @keyframes layer-lift {
        from { transform: translateY(0); }
        to { transform: translateY(-4px); }
      }
    `;
    document.head.appendChild(styleEl);

    // Renderiza a interface
    updateAllUI();
  });

})();
