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
        "processing.html#spark-arch",
        "processing.html#glue-jobs",
        "processing.html#emr-ec2",
        "processing.html#emr-serverless",
        "processing.html#emr-eks",
        "processing.html#flink-streaming"
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
        "playbook-crises.html#crise-sla"
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
        <div class="dashboard-badge-card" style="opacity: ${hasCompleted ? '1' : '0.45'}; text-align: center; padding: 14px; background: ${hasCompleted ? 'rgba(16, 185, 129, 0.08)' : 'rgba(15, 23, 42, 0.02)'}; border: 1px solid ${hasCompleted ? 'rgba(16, 185, 129, 0.25)' : 'var(--border)'}; border-radius: 12px; transition: all 0.3s ease;">
          <div style="font-size: 2.2rem; margin-bottom: 6px; filter: ${hasCompleted ? 'none' : 'grayscale(100%)'};">
            ${hasCompleted ? "🏆" : "🔒"}
          </div>
          <div style="font-size: 11px; font-weight: bold; color: ${hasCompleted ? 'var(--ok)' : 'var(--muted)'}; font-family: 'DM Mono', monospace; text-transform: uppercase;">
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
    `;
    document.head.appendChild(styleEl);

    // Renderiza a interface
    updateAllUI();
  });

})();
