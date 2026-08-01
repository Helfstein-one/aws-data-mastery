/**
 * progress.js - Sistema Interativo de Progresso e Gamificação
 * AWS Data Engineering Specialist - Portal de Estudos
 * Autor: Antigravity AI Pair Programmer
 */

(function() {
  // Configuração das trilhas e suas respectivas seções/hashes para cálculo de progresso
  const MODULES = {
    // Fase 1
    "plataforma-dados": { name: "Plataforma de Dados", badge: "Arquiteto", color: "#3b82f6", items: ["plataforma-dados.html"] },
    "pmo-dados": { name: "PMO & Produto", badge: "Líder Técnico", color: "#3b82f6", items: ["pmo-dados.html"] },
    "sme-dados": { name: "SME & Delivery", badge: "Líder Técnico", color: "#3b82f6", items: ["sme-dados.html"] },
    "sustentacao-dados": { name: "Sustentação & FinOps", badge: "Líder Técnico", color: "#3b82f6", items: ["sustentacao-dados.html"] },
    "soft-skills": { name: "Soft Skills & Liderança", badge: "Gestor", color: "#3b82f6", items: ["soft-skills.html"] },
    "sql": { name: "SQL Analytics", badge: "Analista", color: "#3b82f6", items: ["sql-mastery.html"] },
    "python": { name: "Python Legend", badge: "Desenvolvedor", color: "#3b82f6", items: ["python-legend.html"] },
    
    // Fase 2
    "padroes-arquitetura": { name: "Padrões de Arquitetura", badge: "Arquiteto", color: "#8b5cf6", items: ["padroes-arquitetura.html"] },
    "modelagem-produtos": { name: "Modelagem de Produtos", badge: "Arquiteto", color: "#8b5cf6", items: ["modelagem-produtos.html"] },
    "testing": { name: "Testes E2E", badge: "Quality", color: "#8b5cf6", items: ["testing.html"] },
    "infra_operacional": { name: "Computação AWS", badge: "Cloud", color: "#8b5cf6", items: ["computacao-bancos.html"] },
    "containers_docker": { name: "Containers & Docker", badge: "DevOps", color: "#8b5cf6", items: ["containers-docker.html"] },
    "networking": { name: "Networking & VPC", badge: "Cloud", color: "#8b5cf6", items: ["networking-ingress.html"] },
    "protocolos-rede": { name: "Protocolos & TLS", badge: "Cloud", color: "#06b6d4", items: ["protocolos-rede.html"] },
    "dynamodb": { name: "NoSQL & DynamoDB", badge: "NoSQL", color: "#8b5cf6", items: ["nosql-dynamodb.html"] },
    "mensageria": { name: "Mensageria e Filas", badge: "Streaming", color: "#8b5cf6", items: ["event-driven-mensageria.html"] },
    "mensageria-eventos": { name: "Padrões de Eventos", badge: "Event-Driven", color: "#8b5cf6", items: ["mensageria-eventos.html"] },
    "api_gateway": { name: "API & Serverless", badge: "Serverless", color: "#8b5cf6", items: ["api-gateway.html"] },

    // Fase 3
    "engenharia-avancada": { name: "Engenharia Avançada", badge: "Data Engineer", color: "#f59e0b", items: ["engenharia-avancada.html"] },
    "ingestion": { name: "Ingestão & Stream", badge: "Data Engineer", color: "#f59e0b", items: ["ingestion.html"] },
    "modern-data-integration": { name: "Modern ELT", badge: "Data Engineer", color: "#f59e0b", items: ["modern-data-integration.html"] },
    "apache-flink": { name: "Apache Flink", badge: "Data Engineer", color: "#f59e0b", items: ["apache-flink.html"] },
    "storage": { name: "Lakehouse & Storage", badge: "Data Engineer", color: "#f59e0b", items: ["storage-lakehouse.html"] },
    "apache-iceberg": { name: "Apache Iceberg", badge: "Data Engineer", color: "#f59e0b", items: ["apache-iceberg.html"] },
    "dbt-analytics-engineering": { name: "dbt Analytics", badge: "Data Engineer", color: "#f59e0b", items: ["dbt-analytics-engineering.html"] },
    "apache-spark-core": { name: "Processamento Spark", badge: "Data Engineer", color: "#f59e0b", items: ["apache-spark-core.html"] },
    "apache-spark-api": { name: "Spark API & Tuning", badge: "Data Engineer", color: "#f59e0b", items: ["apache-spark-api.html"] },
    "spark-ui-troubleshooting": { name: "Spark UI & Debug", badge: "Data Engineer", color: "#f59e0b", items: ["spark-ui-troubleshooting.html"] },
    "aws-emr": { name: "Amazon EMR Master", badge: "Data Engineer", color: "#f59e0b", items: ["aws-emr.html"] },
    "aws-glue": { name: "AWS Glue Ecosystem", badge: "Data Engineer", color: "#f59e0b", items: ["aws-glue.html"] },

    // Fase 4
    "aws-lambda": { name: "AWS Lambda", badge: "Ops", color: "#ef4444", items: ["aws-lambda.html"] },
    "orquestracao": { name: "Orquestração & Arq.", badge: "Ops", color: "#ef4444", items: ["orquestracao-dados.html"] },
    "serving": { name: "Analytics & Serving", badge: "Ops", color: "#ef4444", items: ["serving.html"] },
    "data-quality": { name: "Data Quality & Validação", badge: "Ops", color: "#ef4444", items: ["data-quality.html"] },
    "dataops-mlops": { name: "DataOps & MLOps", badge: "Ops", color: "#ef4444", items: ["dataops-mlops.html"] },
    "data-quality-cicd": { name: "CI/CD em Dados", badge: "Ops", color: "#ef4444", items: ["data-quality-cicd.html"] },
    "security": { name: "Segurança e IAM", badge: "Ops", color: "#ef4444", items: ["governance-security.html"] },
    "troubleshooting-tuning": { name: "Troubleshooting Avançado", badge: "Ops", color: "#ef4444", items: ["troubleshooting-tuning.html"] },
    "gov_finops": { name: "Governança e FinOps", badge: "Ops", color: "#ef4444", items: ["governanca-finops.html"] },
    "finops": { name: "FinOps & Cost", badge: "Ops", color: "#ef4444", items: ["finops.html"] },
    "terraform": { name: "Terraform & IaC", badge: "Ops", color: "#ef4444", items: ["terraform.html"] },

    // Fase 5
    "genai-fundamentos": { name: "Fundamentos GenAI", badge: "AI Engineer", color: "#10b981", items: ["genai-fundamentos.html"] },
    "genai-data-engineering": { name: "Data Eng. para GenAI", badge: "AI Engineer", color: "#10b981", items: ["genai-data-engineering.html"] },
    "genai-system-design": { name: "System Design GenAI", badge: "AI Engineer", color: "#10b981", items: ["genai-system-design.html"] },
    "genai-rag-architectures": { name: "Arquiteturas RAG", badge: "AI Engineer", color: "#10b981", items: ["genai-rag-architectures.html"] },
    "genai-graphrag-neptune": { name: "GraphRAG & Neptune", badge: "AI Engineer", color: "#10b981", items: ["genai-graphrag-neptune.html"] },
    "genai-agents-prompting": { name: "Agentes GenAI", badge: "AI Engineer", color: "#10b981", items: ["genai-agents-prompting.html"] },
    "genai-security-finetuning": { name: "Fine-Tuning", badge: "AI Engineer", color: "#10b981", items: ["genai-security-finetuning.html"] },
    "genai-llmops-evaluation": { name: "LLMOps & Avaliação", badge: "AI Engineer", color: "#10b981", items: ["genai-llmops-evaluation.html"] },
    "genai-multimodal-cognitivo": { name: "Multimodal & Agentes", badge: "AI Engineer", color: "#10b981", items: ["genai-multimodal-cognitivo.html"] },
    "genai-mcp-protocol": { name: "Model Context Protocol", badge: "AI Engineer", color: "#10b981", items: ["genai-mcp-protocol.html"] },
    "genai-llm-hardening": { name: "LLM Hardening & Guardrails", badge: "AI Engineer", color: "#10b981", items: ["genai-llm-hardening.html"] },

    // Fase 6
    "business-value": { name: "Valor de Negócio", badge: "Especialista", color: "#db2777", items: ["business-value.html"] },
        // Fase 6 - Conhecimentos Financeiros & Risco
    "onboarding": { name: "Originação & KYC", badge: "Originação", color: "#3b82f6", items: ["onboarding.html"] },
    "matematica-financeira": { name: "Matemática Financeira", badge: "Quant", color: "#f59e0b", items: ["matematica-financeira.html"] },
    "ciclo-vida-credito": { name: "Ciclo de Crédito", badge: "Crédito", color: "#10b981", items: ["ciclo-vida-credito.html"] },
    "pos-venda-reconciliacao": { name: "Reconciliação & PIX", badge: "Reconciliação", color: "#0ea5e9", items: ["pos-venda-reconciliacao.html"] },
    "contabilidade-razonetes": { name: "Contabilidade COSIF", badge: "COSIF", color: "#8b5cf6", items: ["contabilidade-razonetes.html"] },
    "risco-montecarlo": { name: "Monte Carlo & VaR", badge: "Risk Manager", color: "#ef4444", items: ["risco-montecarlo.html"] },
    "normas-regulatorio": { name: "Normas & BACEN 3040", badge: "Regulatory", color: "#d97706", items: ["normas-regulatorio.html"] },
    "auditoria-dados": { name: "Auditoria & Linhagem", badge: "Data Auditor", color: "#a855f7", items: ["auditoria-dados.html"] },
    "finops-financas": { name: "FinOps Financeiro", badge: "FinOps", color: "#10b981", items: ["finops-financas.html"] },
    "cases-reais": { name: "Cases Reais: Arq", badge: "Especialista", color: "#db2777", items: ["cases-reais.html"] },
    "cases-ecosistema": { name: "Cases: Ecossistema", badge: "Especialista", color: "#db2777", items: ["cases-ecosistema.html"] },
    "cases-batch-lakehouse": { name: "Cases: Batch", badge: "Especialista", color: "#db2777", items: ["cases-batch-lakehouse.html"] },
    "cases-streaming": { name: "Cases: Streaming", badge: "Especialista", color: "#db2777", items: ["cases-streaming.html"] },
    "cases-dataops-ia": { name: "Cases: DataOps", badge: "Especialista", color: "#db2777", items: ["cases-dataops-ia.html"] },
    "entrevistas": { name: "Entrevistas", badge: "Especialista", color: "#db2777", items: ["perguntas-arquitetura-cloud.html"] }
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
    injectFloatingCompletionButton(progress, stats);

    // 4. Se estiver no index.html, renderiza o dashboard
    renderDashboard(stats);
    updateRoadmapNodes(stats);

    // 5. Atualizar Bento Cards na index.html se existirem
    Object.keys(MODULES).forEach(modKey => {
      const bentoPct = document.getElementById(`bento-pct-${modKey}`);
      const bentoFill = document.getElementById(`bento-fill-${modKey}`);
      
      if(bentoPct && bentoFill && stats.modules[modKey]) {
        const modStats = stats.modules[modKey];
        bentoPct.innerText = `${modStats.percent}%`;
        bentoFill.style.width = `${modStats.percent}%`;
        
        if(modStats.percent === 100) {
          bentoFill.style.background = "linear-gradient(90deg, #10b981, #34d399)";
          bentoPct.style.color = "#10b981";
        }
      }
    });
  }


  // Atualiza dinamicamente as cores e status dos nós do Roadmap SVG
  function updateRoadmapNodes(stats) {
    // Definimos agrupamentos para nós do roadmap que representam trilhas compostas
    const roadmapGroups = {
      "processing": ["apache-spark-core", "apache-spark-api", "spark-ui-troubleshooting", "aws-emr", "aws-glue", "apache-flink", "aws-lambda"]
    };

    // Primeiro, atualizamos os nós que mapeiam 1:1 com os módulos
    for (const modId in stats.modules) {
      const mod = stats.modules[modId];
      const nodeEl = document.getElementById(`node-${modId}`);
      const statusEl = document.getElementById(`status-${modId}`);
      const barEl = document.getElementById(`bar-${modId}`);
      if (nodeEl) {
        if (mod.percent === 100) {
          nodeEl.classList.remove('active');
          nodeEl.classList.add('completed');
          nodeEl.setAttribute('data-completed', 'true');
        } else if (mod.percent > 0) {
          nodeEl.classList.add('active');
          nodeEl.classList.remove('completed');
          nodeEl.setAttribute('data-completed', 'false');
        } else {
          nodeEl.classList.remove('active', 'completed');
          nodeEl.setAttribute('data-completed', 'false');
        }
      }
      if (statusEl) {
        statusEl.textContent = `${mod.percent}% concluído`;
        if (mod.percent === 100) {
          statusEl.style.color = '#10b981';
        } else {
          statusEl.style.color = '#cbd5e1';
        }
      }
      if (barEl) {
        barEl.style.width = `${mod.percent}%`;
        if (mod.percent === 100) {
          barEl.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
        } else {
          barEl.style.background = 'linear-gradient(90deg, #38bdf8, #8b5cf6)';
        }
      }
    }

    // Segundo, calculamos o progresso dos nós agrupados
    for (const groupId in roadmapGroups) {
      const groupMods = roadmapGroups[groupId];
      let totalCompleted = 0;
      let totalRequired = 0;
      
      groupMods.forEach(modId => {
        if (stats.modules[modId]) {
          totalRequired += stats.modules[modId].total;
          totalCompleted += stats.modules[modId].completed;
        }
      });
      
      const percent = totalRequired === 0 ? 0 : Math.round((totalCompleted / totalRequired) * 100);
      const nodeEl = document.getElementById(`node-${groupId}`);
      const statusEl = document.getElementById(`status-${groupId}`);
      
      if (nodeEl) {
        if (percent === 100) {
          nodeEl.classList.remove('active');
          nodeEl.classList.add('completed');
        } else if (percent > 0) {
          nodeEl.classList.add('active');
          nodeEl.classList.remove('completed');
        } else {
          nodeEl.classList.remove('active', 'completed');
        }
      }
      if (statusEl) {
        statusEl.textContent = `${percent}%`;
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
      key = key.split('/').pop();

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

  // Injeta Botão Flutuante (FAB) de conclusão
  function injectFloatingCompletionButton(progress, stats) {
    const pageName = getCurrentPageName().split("#")[0];
    
    // Verifica se a página atual pertence a algum módulo
    let currentModule = null;
    let pageIsTracked = false;
    
    for (const modId in MODULES) {
      if (MODULES[modId].items.includes(pageName)) {
        currentModule = MODULES[modId];
        pageIsTracked = true;
        break;
      }
    }
    
    if (!pageIsTracked) return;
    
    // Verifica se já injetou o FAB
    let fab = document.getElementById("progress-fab");
    const isCompleted = !!progress[pageName];
    const moduleColor = currentModule.color || 'var(--accent)';
    
    if (fab) {
      // Apenas atualiza o estado
      updateFabState(fab, isCompleted, moduleColor);
      return;
    }
    
    // Cria o Container do FAB
    fab = document.createElement("div");
    fab.id = "progress-fab";
    fab.title = isCompleted ? "Aula Concluída (Clique para desmarcar)" : "Rolar a página ou Clicar para concluir";
    
    // Estilos base do FAB Container
    fab.style.position = "fixed";
    fab.style.bottom = "110px";
    fab.style.right = "40px";
    fab.style.width = "64px";
    fab.style.height = "64px";
    fab.style.borderRadius = "50%";
    fab.style.display = "flex";
    fab.style.alignItems = "center";
    fab.style.justifyContent = "center";
    fab.style.cursor = "pointer";
    fab.style.zIndex = "9999";
    fab.style.transition = "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease";
    fab.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
    
    // Raio e Circunferência do anel de progresso
    const r = 30;
    const circ = 2 * Math.PI * r;
    
    // SVG Complexo com Anel de Progresso + Ícone de Check
    fab.innerHTML = `
      <svg width="64" height="64" viewBox="0 0 64 64" style="position: absolute; top: 0; left: 0; transform: rotate(-90deg);">
        <!-- Fundo Escuro do Botão -->
        <circle cx="32" cy="32" r="28" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" stroke-width="2" class="fab-bg-circle" style="backdrop-filter: blur(8px); transition: all 0.3s ease;"></circle>
        
        <!-- Anel de Progresso de Scroll -->
        <circle cx="32" cy="32" r="${r}" fill="none" stroke="${moduleColor}" stroke-width="4" stroke-linecap="round" 
                stroke-dasharray="${circ}" stroke-dashoffset="${circ}" class="fab-progress-ring" 
                style="transition: stroke-dashoffset 0.1s linear; opacity: 0;"></circle>
      </svg>
      
      <!-- Ícone Checkmark -->
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="fab-icon" style="width: 28px; height: 28px; transition: all 0.3s ease; position: relative; z-index: 2; color: #64748b;">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
    
    // Aplica estado inicial
    updateFabState(fab, isCompleted, moduleColor);
    
    // Efeito Hover
    fab.addEventListener("mouseenter", () => {
      fab.style.transform = "scale(1.1) translateY(-5px)";
      const isDone = !!loadProgress()[pageName];
      if (!isDone) {
        fab.querySelector('.fab-bg-circle').style.stroke = moduleColor;
        fab.querySelector('.fab-icon').style.color = moduleColor;
      }
    });
    
    fab.addEventListener("mouseleave", () => {
      fab.style.transform = "scale(1) translateY(0)";
      updateFabState(fab, !!loadProgress()[pageName], moduleColor);
    });
    
    // Lógica de Clique e Auto-Complete
    const handleCompletion = (forceState = null) => {
      const currProgress = loadProgress();
      const currentState = currProgress[pageName];
      const newState = forceState !== null ? forceState : !currentState;
      
      // Se já tá no estado que a gente quer, ignora (útil pro scroll não ficar floodando)
      if (currentState === newState) return;
      
      currProgress[pageName] = newState;
      
      // Efeito de pulso no clique
      fab.style.transform = "scale(0.9)";
      setTimeout(() => {
        fab.style.transform = "scale(1.1)";
        updateFabState(fab, newState, moduleColor);
        saveProgress(currProgress);
        setTimeout(() => {
          fab.style.transform = "scale(1)";
        }, 150);
      }, 100);
    };
    
    fab.addEventListener("click", () => handleCompletion());
    
    // === TRACKING DE SCROLL ===
    window.addEventListener("scroll", () => {
      const isDone = !!loadProgress()[pageName];
      const ring = fab.querySelector('.fab-progress-ring');
      
      // Se já acabou a aula, o anel some e botão fica todo preenchido
      if (isDone) {
        ring.style.opacity = "0";
        return;
      }
      
      // Mostra o anel sutilmente enquanto a pessoa desce a página
      ring.style.opacity = "1";
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.documentElement.clientHeight
      );
      
      const scrollable = documentHeight - windowHeight;
      // Calcula porcentagem do scroll (0 a 1)
      let scrolled = scrollable > 0 ? (scrollY / scrollable) : 1;
      
      // Atualiza o círculo SVG (offset)
      const offset = circ - (scrolled * circ);
      ring.style.strokeDashoffset = offset;
      
      // Se chegou em 98% da página, marca concluído automaticamente
      if (scrolled >= 0.98) {
        handleCompletion(true);
      }
    }, { passive: true });
    
    document.body.appendChild(fab);
  }
  
  function updateFabState(fab, isCompleted, color) {
    const bgCircle = fab.querySelector('.fab-bg-circle');
    const icon = fab.querySelector('.fab-icon');
    const ring = fab.querySelector('.fab-progress-ring');
    
    if (isCompleted) {
      bgCircle.style.fill = color;
      bgCircle.style.stroke = color;
      icon.style.color = "#ffffff";
      fab.style.boxShadow = `0 10px 25px -5px ${color}80, 0 0 15px ${color}60`;
      ring.style.opacity = "0"; // Esconde anel de progresso
    } else {
      bgCircle.style.fill = "rgba(15, 23, 42, 0.8)";
      bgCircle.style.stroke = "#334155";
      icon.style.color = "#64748b"; // Cinza inativo
      fab.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
      
      // Reseta anel pro estado atual do scroll, senão fica sumido ao desmarcar no final da pag
      ring.style.opacity = "1";
    }
  }
// Helper to generate dynamic premium SVG icons for academic badges
  function getBadgeSVG(modId, hasCompleted) {
    const configs = {
      "data_quality_cicd": { 
        colors: ["#f59e0b", "#d97706"], 
        icon: `<circle cx="32" cy="32" r="8" fill="none" stroke="url(#grad-data_quality_cicd)" stroke-width="2"/><path d="M32 20 v-4 M32 48 v-4 M20 32 h-4 M48 32 h-4 M23.5 23.5 l-2.8 -2.8 M43.3 40.5 l-2.8 -2.8 M23.5 40.5 l-2.8 2.8 M43.3 23.5 l-2.8 2.8" stroke="url(#grad-data_quality_cicd)" stroke-width="2"/>` 
      },
      "apache-spark-core": { 
        colors: ["#0284c7", "#0369a1"], 
        icon: `<path d="M 32 16 L 36 28 L 48 28 L 38 36 L 42 48 L 32 40 L 22 48 L 26 36 L 16 28 L 28 28 Z" fill="none" stroke="url(#grad-apache-spark-core)" stroke-width="2" stroke-linejoin="round"/>` 
      },
      "containers_docker": { 
        colors: ["#3b82f6", "#2563eb"], 
        icon: `<path d="M 22 36 A 6 6 0 0 1 22 24 A 10 10 0 0 1 42 24 A 6 6 0 0 1 42 36 Z" fill="none" stroke="url(#grad-containers_docker)" stroke-width="2"/>` 
      },
      "troubleshooting": { 
        colors: ["#ef4444", "#b91c1c"], 
        icon: `<circle cx="32" cy="32" r="8" fill="none" stroke="url(#grad-troubleshooting)" stroke-width="2"/><path d="M32 20 v-4 M32 48 v-4 M20 32 h-4 M48 32 h-4 M23.5 23.5 l-2.8 -2.8 M43.3 40.5 l-2.8 -2.8 M23.5 40.5 l-2.8 2.8 M43.3 23.5 l-2.8 2.8" stroke="url(#grad-troubleshooting)" stroke-width="2"/>` 
      },
      "aws-glue": { 
        colors: ["#8b5cf6", "#7c3aed"], 
        icon: `<path class="badge-db" d="M16 22 C 16 18, 48 18, 48 22 V 42 C 48 46, 16 46, 16 42 Z M 16 32 C 16 36, 48 36, 48 32" fill="none" stroke="url(#grad-aws-glue)" stroke-width="2"/>` 
      },
      "soft_skills": { 
        colors: ["#38bdf8", "#0ea5e9"], 
        icon: `<path d="M 18 20 H 32 V 44 H 18 Z M 32 20 H 46 V 44 H 32 Z M 32 20 V 44" fill="none" stroke="url(#grad-soft_skills)" stroke-width="2" stroke-linejoin="round"/>` 
      },
      "pmo": { 
        colors: ["#10b981", "#059669"], 
        icon: `<path d="M 16 44 h 32 M 20 44 v -12 M 28 44 v -24 M 36 44 v -16 M 44 44 v -8" fill="none" stroke="url(#grad-pmo)" stroke-width="2" stroke-linecap="round"/>` 
      },
      "apache-flink": { 
        colors: ["#f97316", "#ea580c"], 
        icon: `<path d="M 32 16 L 36 28 L 48 28 L 38 36 L 42 48 L 32 40 L 22 48 L 26 36 L 16 28 L 28 28 Z" fill="none" stroke="url(#grad-apache-flink)" stroke-width="2" stroke-linejoin="round"/>` 
      },
      "financas_dados": { 
        colors: ["#84cc16", "#65a30d"], 
        icon: `<path d="M 16 44 h 32 M 20 44 v -12 M 28 44 v -24 M 36 44 v -16 M 44 44 v -8" fill="none" stroke="url(#grad-financas_dados)" stroke-width="2" stroke-linecap="round"/>` 
      },
      "cases_streaming": { 
        colors: ["#ec4899", "#db2777"], 
        icon: `<path d="M 32 16 L 36 28 L 48 28 L 38 36 L 42 48 L 32 40 L 22 48 L 26 36 L 16 28 L 28 28 Z" fill="none" stroke="url(#grad-cases_streaming)" stroke-width="2" stroke-linejoin="round"/>` 
      },
      "dynamodb": { 
        colors: ["#3b82f6", "#1d4ed8"], 
        icon: `<path class="badge-db" d="M16 22 C 16 18, 48 18, 48 22 V 42 C 48 46, 16 46, 16 42 Z M 16 32 C 16 36, 48 36, 48 32" fill="none" stroke="url(#grad-dynamodb)" stroke-width="2"/>` 
      },
      "apache-spark-api": { 
        colors: ["#0284c7", "#0369a1"], 
        icon: `<path d="M 32 16 L 36 28 L 48 28 L 38 36 L 42 48 L 32 40 L 22 48 L 26 36 L 16 28 L 28 28 Z" fill="none" stroke="url(#grad-apache-spark-api)" stroke-width="2" stroke-linejoin="round"/>` 
      },
      "system_design": { 
        colors: ["#f59e0b", "#d97706"], 
        icon: `<circle cx="32" cy="32" r="8" fill="none" stroke="url(#grad-system_design)" stroke-width="2"/><path d="M32 20 v-4 M32 48 v-4 M20 32 h-4 M48 32 h-4 M23.5 23.5 l-2.8 -2.8 M43.3 40.5 l-2.8 -2.8 M23.5 40.5 l-2.8 2.8 M43.3 23.5 l-2.8 2.8" stroke="url(#grad-system_design)" stroke-width="2"/>` 
      },
      "aws-lambda": { 
        colors: ["#f97316", "#ea580c"], 
        icon: `<path d="M 22 36 A 6 6 0 0 1 22 24 A 10 10 0 0 1 42 24 A 6 6 0 0 1 42 36 Z" fill="none" stroke="url(#grad-aws-lambda)" stroke-width="2"/>` 
      },
      "spark-ui-troubleshooting": { 
        colors: ["#0284c7", "#0369a1"], 
        icon: `<path d="M 32 16 L 36 28 L 48 28 L 38 36 L 42 48 L 32 40 L 22 48 L 26 36 L 16 28 L 28 28 Z" fill="none" stroke="url(#grad-spark-ui-troubleshooting)" stroke-width="2" stroke-linejoin="round"/>` 
      },
      "testing": { 
        colors: ["#10b981", "#059669"], 
        icon: `<path d="M 20 32 L 28 40 L 44 24" fill="none" stroke="url(#grad-testing)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` 
      },
      "aws-emr": { 
        colors: ["#8b5cf6", "#7c3aed"], 
        icon: `<path d="M 22 36 A 6 6 0 0 1 22 24 A 10 10 0 0 1 42 24 A 6 6 0 0 1 42 36 Z" fill="none" stroke="url(#grad-aws-emr)" stroke-width="2"/>` 
      },
      "dataops_mlops": { 
        colors: ["#14b8a6", "#0d9488"], 
        icon: `<circle cx="32" cy="32" r="8" fill="none" stroke="url(#grad-dataops_mlops)" stroke-width="2"/><path d="M32 20 v-4 M32 48 v-4 M20 32 h-4 M48 32 h-4 M23.5 23.5 l-2.8 -2.8 M43.3 40.5 l-2.8 -2.8 M23.5 40.5 l-2.8 2.8 M43.3 23.5 l-2.8 2.8" stroke="url(#grad-dataops_mlops)" stroke-width="2"/>` 
      },
      "entrevistas": { 
        colors: ["#8b5cf6", "#7c3aed"], 
        icon: `<path d="M 18 20 H 32 V 44 H 18 Z M 32 20 H 46 V 44 H 32 Z M 32 20 V 44" fill="none" stroke="url(#grad-entrevistas)" stroke-width="2" stroke-linejoin="round"/>` 
      },
      "mensageria": { 
        colors: ["#f43f5e", "#e11d48"], 
        icon: `<path d="M 22 36 A 6 6 0 0 1 22 24 A 10 10 0 0 1 42 24 A 6 6 0 0 1 42 36 Z" fill="none" stroke="url(#grad-mensageria)" stroke-width="2"/>` 
      },
      "gov_finops": { 
        colors: ["#10b981", "#059669"], 
        icon: `<path d="M 16 44 h 32 M 20 44 v -12 M 28 44 v -24 M 36 44 v -16 M 44 44 v -8" fill="none" stroke="url(#grad-gov_finops)" stroke-width="2" stroke-linecap="round"/>` 
      },
      "apache-iceberg": { 
        colors: ["#38bdf8", "#0284c7"], 
        icon: `<path class="badge-db" d="M16 22 C 16 18, 48 18, 48 22 V 42 C 48 46, 16 46, 16 42 Z M 16 32 C 16 36, 48 36, 48 32" fill="none" stroke="url(#grad-apache-iceberg)" stroke-width="2"/>` 
      },
      python: { 
        colors: ["#f43f5e", "#e11d48"],
        icon: `<path fill="url(#grad-python)" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>`
      },
      sql: { 
        colors: ["#f59e0b", "#d97706"],
        icon: `<path fill="url(#grad-sql)" d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z"/>`
      },
      terraform: { 
        colors: ["#8b5cf6", "#7c3aed"],
        icon: `<path fill="url(#grad-terraform)" d="M1.44 0v7.575l6.561 3.79V3.787zm21.12 4.227l-6.561 3.791v7.574l6.56-3.787zM8.72 4.23v7.575l6.561 3.787V8.018zm0 8.405v7.575L15.28 24v-7.578z"/>`
      },
      architecture: { 
        colors: ["#38bdf8", "#818cf8"], 
        icon: `<path class="badge-arch-path" d="M22 28 l10 -5 l10 5 l-10 5 z M22 28 v10 l10 5 v-10 z M42 28 v10 l-10 5 v-10 z" fill="none" stroke="url(#grad-architecture)" stroke-width="2" stroke-linejoin="round"/>` 
      },
      
      perguntas_arquitetura: { 
        colors: ["#38bdf8", "#818cf8"], 
        icon: `<path class="badge-preg-crown" d="M28 20 A6 6 0 1 1 34 30 L38 34" fill="none" stroke="url(#grad-perguntas_arquitetura)" stroke-width="3" stroke-linecap="round"/><path class="badge-preg-laurel" d="M20 38 C22 32, 42 32, 44 38 M26 44 L38 44" fill="none" stroke="url(#grad-perguntas_arquitetura)" stroke-width="1.8" stroke-linecap="round"/>` 
      },
      perguntas_engenharia: { 
        colors: ["#fbbf24", "#f59e0b"], 
        icon: `<path class="badge-preg-crown" d="M28 20 A6 6 0 1 1 34 30 L38 34" fill="none" stroke="url(#grad-perguntas_engenharia)" stroke-width="3" stroke-linecap="round"/><path class="badge-preg-laurel" d="M20 38 C22 32, 42 32, 44 38 M26 44 L38 44" fill="none" stroke="url(#grad-perguntas_engenharia)" stroke-width="1.8" stroke-linecap="round"/>` 
      },
      perguntas_governanca: { 
        colors: ["#94a3b8", "#64748b"], 
        icon: `<path class="badge-preg-crown" d="M28 20 A6 6 0 1 1 34 30 L38 34" fill="none" stroke="url(#grad-perguntas_governanca)" stroke-width="3" stroke-linecap="round"/><path class="badge-preg-laurel" d="M20 38 C22 32, 42 32, 44 38 M26 44 L38 44" fill="none" stroke="url(#grad-perguntas_governanca)" stroke-width="1.8" stroke-linecap="round"/>` 
      },
      business_value: { 
        colors: ["#f59e0b", "#d97706"], 
        icon: `<path class="badge-fin-coin" d="M22 28 l10 -5 l10 5 l-10 5 z M22 28 v10 l10 5 v-10 z M42 28 v10 l-10 5 v-10 z" fill="none" stroke="url(#grad-business_value)" stroke-width="2" stroke-linejoin="round"/>` 
      },
            onboarding: { 
        colors: ["#3b82f6", "#1d4ed8"], 
        icon: `<path fill="none" stroke="url(#grad-onboarding)" stroke-width="2" d="M 22 18 H 42 V 46 H 22 Z M 28 26 H 36 M 28 32 H 36 M 28 38 H 32"/>` 
      },
      "matematica-financeira": { 
        colors: ["#f59e0b", "#d97706"], 
        icon: `<text x="32" y="38" font-size="18" font-weight="900" font-family="'DM Sans', sans-serif" text-anchor="middle" fill="url(#grad-matematica-financeira)">%</text>` 
      },
      "ciclo-vida-credito": { 
        colors: ["#10b981", "#059669"], 
        icon: `<path fill="none" stroke="url(#grad-ciclo-vida-credito)" stroke-width="2" d="M 18 32 C 18 20, 46 20, 46 32 C 46 44, 18 44, 18 32 Z M 32 20 V 44"/>` 
      },
      "pos-venda-reconciliacao": { 
        colors: ["#0ea5e9", "#0284c7"], 
        icon: `<path fill="none" stroke="url(#grad-pos-venda-reconciliacao)" stroke-width="2" d="M 20 24 L 32 36 L 44 24 M 20 40 L 44 40"/>` 
      },
      "contabilidade-razonetes": { 
        colors: ["#8b5cf6", "#7c3aed"], 
        icon: `<path fill="none" stroke="url(#grad-contabilidade-razonetes)" stroke-width="2.5" d="M 18 20 H 46 M 32 20 V 46"/>` 
      },
      "risco-montecarlo": { 
        colors: ["#ef4444", "#b91c1c"], 
        icon: `<path fill="none" stroke="url(#grad-risco-montecarlo)" stroke-width="2" d="M 18 44 Q 28 44, 32 20 Q 36 44, 46 44"/>` 
      },
      "normas-regulatorio": { 
        colors: ["#d97706", "#b45309"], 
        icon: `<path fill="none" stroke="url(#grad-normas-regulatorio)" stroke-width="2" d="M 32 16 L 48 24 V 40 L 32 48 L 16 40 V 24 Z"/>` 
      },
      "auditoria-dados": { 
        colors: ["#a855f7", "#9333ea"], 
        icon: `<circle cx="32" cy="32" r="10" fill="none" stroke="url(#grad-auditoria-dados)" stroke-width="2"/><path d="M 39 39 L 47 47" stroke="url(#grad-auditoria-dados)" stroke-width="2.5"/>` 
      },
      "finops-financas": { 
        colors: ["#10b981", "#047857"], 
        icon: `<circle cx="32" cy="32" r="12" fill="none" stroke="url(#grad-finops-financas)" stroke-width="2"/><text x="32" y="37" font-size="14" font-weight="bold" text-anchor="middle" fill="url(#grad-finops-financas)">$</text>` 
      },
      financas: { 
        colors: ["#0284c7", "#0369a1"], 
        icon: `<circle class="badge-fin-coin" cx="32" cy="32" r="13" fill="none" stroke="url(#grad-financas)" stroke-width="2"/><text class="badge-fin-text" x="32" y="37" font-size="14" font-weight="900" font-family="'DM Sans', sans-serif" text-anchor="middle" fill="url(#grad-financas)">$</text>` 
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
      data_quality: { 
        colors: ["#34d399", "#10b981"], 
        icon: `<path class="badge-case-rocket" d="M32 20 l8 12 h-16 z M28 32 v8 h8 v-8" fill="none" stroke="url(#grad-data_quality)" stroke-width="2" stroke-linejoin="round"/>` 
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
      plataforma: { 
        colors: ["#6366f1", "#a78bfa"], 
        icon: `<path class="badge-plat-layer" d="M16 24 L32 16 L48 24 L32 32 z M16 34 L32 26 L48 34 L32 42 z" fill="none" stroke="url(#grad-plataforma)" stroke-width="2" stroke-linejoin="round"/>` 
      },
      api_gateway: { 
        colors: ["#8b5cf6", "#c084fc"], 
        icon: `<path class="badge-api-plug" d="M30 18 v-6 M34 18 v-6 M26 26 h12 v10 a6 6 0 0 1 -12 0 z M32 36 v10 M28 46 h8" fill="none" stroke="url(#grad-api_gateway)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` 
      },
      infra_operacional: { 
        colors: ["#f43f5e", "#fb7185"], 
        icon: `<rect class="badge-infra-rack1" x="22" y="16" width="20" height="10" rx="2" fill="none" stroke="url(#grad-infra_operacional)" stroke-width="2"/><rect class="badge-infra-rack2" x="22" y="30" width="20" height="10" rx="2" fill="none" stroke="url(#grad-infra_operacional)" stroke-width="2"/><circle class="badge-infra-led" cx="26" cy="21" r="1.5" fill="url(#grad-infra_operacional)"/><circle class="badge-infra-led" cx="26" cy="35" r="1.5" fill="url(#grad-infra_operacional)"/>` 
      },
      orquestracao: { 
        colors: ["#a78bfa", "#c084fc"], 
        icon: `<path class="badge-orq-chain" d="M24 22 a6 6 0 1 1 0 12 a6 6 0 1 1 0 -12 z M40 22 a6 6 0 1 1 0 12 a6 6 0 1 1 0 -12 z M28 28 h8" fill="none" stroke="url(#grad-orquestracao)" stroke-width="2" stroke-linecap="round"/>` 
      },
      softskills: { 
        colors: ["#38bdf8", "#7dd3fc"], 
        icon: `<path class="badge-soft-brain" d="M32 16 c-8 0 -12 6 -12 12 c0 4 2 8 6 10 c1 2 2 6 -2 8 c6 0 10 -2 12 -4 c2 2 6 4 12 4 c-4 -2 -3 -6 -2 -8 c4 -2 6 -6 6 -10 c0 -6 -4 -12 -12 -12 z" fill="none" stroke="url(#grad-softskills)" stroke-width="2" stroke-linejoin="round"/>` 
      },
      "modern-data-integration": { 
        colors: ["#8b5cf6", "#7c3aed"], 
        icon: `<path class="badge-sync" d="M18 26 h16 M30 20 l8 6 l-8 6 M46 38 h-16 M34 32 l-8 6 l8 6" fill="none" stroke="url(#grad-modern-data-integration)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` 
      },
      "dbt-analytics-engineering": { 
        colors: ["#ff694b", "#ef4444"], 
        icon: `<path class="badge-cube" d="M32 18 L20 25 L20 39 L32 46 L44 39 L44 25 Z M32 18 L32 32 M20 25 L32 32 M44 25 L32 32" fill="none" stroke="url(#grad-dbt-analytics-engineering)" stroke-width="2.5" stroke-linejoin="round"/>` 
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
        <defs>      <linearGradient id="grad-python" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f43f5e" />
        <stop offset="100%" stop-color="#e11d48" />
      </linearGradient>
      <linearGradient id="grad-sql" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#d97706" />
      </linearGradient>
      <linearGradient id="grad-terraform" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#8b5cf6" />
        <stop offset="100%" stop-color="#7c3aed" />
      </linearGradient>
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
  
  function renderDashboard(stats) {
    const headerContainer = document.getElementById("dashboard-header");
    const badgesContainer = document.getElementById("dashboard-badges");

    if (headerContainer) {
      const currProgress = loadProgress();
      let nextLink = "#";
      let nextLinkText = "Começar Trilha";
      let startedModule = null;
      
      for (const modId in stats.modules) {
        if (stats.modules[modId].percent > 0 && stats.modules[modId].percent < 100) {
          startedModule = modId;
          break;
        }
      }
      if (!startedModule) {
        for (const modId in stats.modules) {
          if (stats.modules[modId].percent === 0) {
            startedModule = modId;
            break;
          }
        }
      }
      
      if (startedModule) {
        const modData = MODULES[startedModule];
        for (const item of modData.items) {
          if (!currProgress[item]) {
            nextLink = item;
            
            // Busca o link real e completo na sidebar
            const sbLink = document.querySelector(`#sidebar a[href$="${item}"]`);
            if (sbLink) {
              nextLink = sbLink.getAttribute("href");
            }
            
            nextLinkText = "Continuar: " + modData.name.replace(/[^a-zA-Z0-9\s&]/g, '').trim();
            break;
          }
        }
      }

      headerContainer.innerHTML = `
        <div style="background: var(--paper); border: 1px solid var(--border); border-radius: 16px; padding: 32px; margin-bottom: 32px; display: grid; grid-template-columns: 1fr 2fr; gap: 40px; align-items: center; box-shadow: 0 4px 6px rgba(15, 23, 42, 0.05);" class="db-grid-mobile">
          <!-- Circular Progress -->
          <div style="display: flex; flex-direction: column; align-items: center; border-right: 1px solid var(--border); padding-right: 40px;" class="db-circle-mobile">
            <h3 style="margin: 0 0 16px; font-family: var(--body-font); font-size: 1.3rem; color: var(--text);">Progresso Global</h3>
            <div style="position: relative; width: 140px; height: 140px;">
              <svg width="140" height="140" viewBox="0 0 140 140" style="transform: rotate(-90deg);">
                <!-- Background track -->
                <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255, 255, 255, 0.05)" stroke-width="12" />
                <!-- Progress bar -->
                <circle cx="70" cy="70" r="60" fill="none" stroke="url(#global-grad)" stroke-width="12" stroke-linecap="round" 
                  stroke-dasharray="376.99" stroke-dashoffset="${376.99 - (376.99 * stats.percent / 100)}" 
                  style="transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);" />
                <defs>
                  <linearGradient id="global-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#38bdf8" />
                    <stop offset="100%" stop-color="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <span style="font-size: 2rem; font-weight: 800; color: var(--text); line-height: 1;">${stats.percent}%</span>
              </div>
            </div>
          </div>
          
          <!-- Breakdown & Actions -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;" class="db-breakdown-mobile">
            <div>
              <div style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Módulos Concluídos</div>
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--text);">${Object.values(stats.modules).filter(m => m.percent === 100).length} <span style="font-size: 1rem; color: var(--text-muted); font-weight: 400;">de ${Object.keys(stats.modules).length}</span></div>
            </div>
            <div>
              <div style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Páginas e Tópicos</div>
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--text);">${stats.completed} <span style="font-size: 1rem; color: var(--text-muted); font-weight: 400;">de ${stats.total}</span></div>
            </div>
            <div style="grid-column: 1 / -1; margin-top: 12px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
              <a href="${nextLink}" style="display: inline-flex; align-items: center; justify-content: center; background: var(--spark); color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 0.95rem; transition: background 0.2s;">
                ▶ ${nextLinkText}
              </a>
              <button id="reset-progress-btn" style="background: transparent; border: 1px dashed var(--warn); color: var(--warn); font-family: var(--body-font); font-size: 0.9rem; padding: 9px 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
                Resetar Progresso
              </button>
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

    if (badgesContainer) {
      let badgesHTML = "";
      for (const modId in stats.modules) {
        const mod = stats.modules[modId];
        const hasCompleted = mod.percent === 100;
        badgesHTML += `
          <div class="dashboard-badge-card" style="text-align: center; padding: 14px; background: ${hasCompleted ? 'rgba(16, 185, 129, 0.04)' : 'rgba(15, 23, 42, 0.01)'}; border: 1px solid ${hasCompleted ? 'rgba(16, 185, 129, 0.18)' : 'var(--border)'}; border-radius: 12px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: default; position: relative; overflow: hidden;">
            <div style="margin-bottom: 8px; height: 52px; display: flex; align-items: center; justify-content: center;">
              ${getBadgeSVG(modId, hasCompleted)}
            </div>
            <div style="font-size: 11px; font-weight: bold; color: ${hasCompleted ? 'var(--navy)' : 'var(--muted)'}; font-family: 'DM Mono', monospace; margin-bottom: 4px; line-height: 1.2;">
              ${mod.badge}
            </div>
            <div style="font-size: 9px; color: var(--muted); text-transform: uppercase;">
              ${hasCompleted ? '✅ Desbloqueado' : '🔒 Pendente'}
            </div>
          </div>
        `;
      }
      
      badgesContainer.innerHTML = `
        <div style="background: var(--paper); border: 1px solid var(--border); border-radius: 16px; padding: 32px; margin-top: 32px; box-shadow: 0 4px 6px rgba(15, 23, 42, 0.05);">
          <h4 style="margin: 0 0 16px; font-size: 1rem; text-transform: uppercase; font-family:'DM Mono', monospace; color: var(--navy);">Suas Conquistas Acadêmicas</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 16px;">
            ${badgesHTML}
          </div>
        </div>
      `;
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

  // Re-renderiza a interface (especialmente o dashboard) quando o sidebar terminar de carregar de forma assíncrona
  document.addEventListener('sidebarLoaded', () => {
    updateAllUI();
  });

})();
