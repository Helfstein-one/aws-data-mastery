// A11y Module - Injected globally
document.addEventListener("DOMContentLoaded", () => {
  // 1. Determine base path from this script's src to correctly load CSS
  const scripts = document.getElementsByTagName('script');
  let basePath = "";
  for(let i=0; i<scripts.length; i++) {
    if(scripts[i].src && scripts[i].src.includes('js/a11y.js')) {
      const src = scripts[i].getAttribute('src');
      basePath = src.replace('js/a11y.js', '');
      break;
    }
  }

  // 2. Inject CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = basePath + 'style-a11y.css';
  document.head.appendChild(link);

  // 3. Inject A11y Widget HTML
  const widgetHtml = `
    <div id="a11y-widget" aria-label="Menu de Acessibilidade">
      <button class="a11y-btn" id="btn-a11y-contrast" aria-label="Alto Contraste" title="Alto Contraste">🌗</button>
      <button class="a11y-btn" id="btn-a11y-font-up" aria-label="Aumentar Fonte" title="Aumentar Fonte">A+</button>
      <button class="a11y-btn" id="btn-a11y-font-down" aria-label="Diminuir Fonte" title="Diminuir Fonte">A-</button>
      <button class="a11y-btn" id="btn-a11y-dyslexic" aria-label="Fonte para Dislexia" title="Fonte para Dislexia">D</button>
      <button class="a11y-btn" id="btn-a11y-read" aria-label="Leitor de Tela" title="Leitor de Tela">🔊</button>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', widgetHtml);

  // 4. State Management (LocalStorage)
  let currentFontSize = parseFloat(localStorage.getItem('a11y-fontsize')) || 1;
  let isHighContrast = localStorage.getItem('a11y-contrast') === 'true';
  let isDyslexic = localStorage.getItem('a11y-dyslexic') === 'true';

  const btnContrast = document.getElementById('btn-a11y-contrast');
  const btnFontUp = document.getElementById('btn-a11y-font-up');
  const btnFontDown = document.getElementById('btn-a11y-font-down');
  const btnDyslexic = document.getElementById('btn-a11y-dyslexic');
  const btnRead = document.getElementById('btn-a11y-read');

  function applyState() {
    document.documentElement.style.fontSize = `${currentFontSize * 100}%`;
    
    if(isHighContrast) {
      document.body.classList.add('a11y-high-contrast');
      btnContrast.classList.add('active');
    } else {
      document.body.classList.remove('a11y-high-contrast');
      btnContrast.classList.remove('active');
    }

    if(isDyslexic) {
      document.body.classList.add('a11y-dyslexic');
      btnDyslexic.classList.add('active');
    } else {
      document.body.classList.remove('a11y-dyslexic');
      btnDyslexic.classList.remove('active');
    }
  }

  applyState();

  btnContrast.addEventListener('click', () => {
    isHighContrast = !isHighContrast;
    localStorage.setItem('a11y-contrast', isHighContrast);
    applyState();
  });

  btnDyslexic.addEventListener('click', () => {
    isDyslexic = !isDyslexic;
    localStorage.setItem('a11y-dyslexic', isDyslexic);
    applyState();
  });

  btnFontUp.addEventListener('click', () => {
    if(currentFontSize < 1.5) {
      currentFontSize += 0.1;
      localStorage.setItem('a11y-fontsize', currentFontSize);
      applyState();
    }
  });

  btnFontDown.addEventListener('click', () => {
    if(currentFontSize > 0.8) {
      currentFontSize -= 0.1;
      localStorage.setItem('a11y-fontsize', currentFontSize);
      applyState();
    }
  });

  // 5. Inject VLibras
  const vlibrasHtml = `
    <div vw class="enabled">
      <div vw-access-button class="active"></div>
      <div vw-plugin-wrapper>
        <div class="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', vlibrasHtml);

  const vlibrasScript = document.createElement('script');
  vlibrasScript.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
  vlibrasScript.onload = () => {
    new window.VLibras.Widget('https://vlibras.gov.br/app');
  };
  document.body.appendChild(vlibrasScript);

  // 6. Text-to-Speech (Leitor de Tela - Enqueue Sync)
  let isReading = false;

  btnRead.addEventListener('click', () => {
    // Se já estiver lendo ou a API travada, cancela tudo
    if (isReading || window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
      isReading = false;
      btnRead.classList.remove('active');
      return;
    }

    // Se não estiver lendo, limpa qualquer fila fantasma e inicia
    window.speechSynthesis.cancel();
    isReading = true;
    btnRead.classList.add('active');

    const contentSections = document.querySelectorAll('.bento-title, .bento-desc, h1, h2, h3, p, li');
    let hasText = false;

    // Enfileira todos os textos de uma vez (Safari/Chrome aprovam pois é síncrono no click)
    contentSections.forEach((el, index) => {
      if (!el.closest('.nav') && !el.closest('#a11y-widget') && !el.closest('.sidebar') && !el.closest('.bento-tags')) {
        const txt = el.innerText.trim();
        if (txt.length > 0) {
          hasText = true;
          const utterance = new SpeechSynthesisUtterance(txt);
          utterance.lang = 'pt-BR';
          utterance.rate = 0.9;
          
          // No último elemento, desativa o botão
          if (index === contentSections.length - 1) {
            utterance.onend = () => {
              isReading = false;
              btnRead.classList.remove('active');
            };
          }
          
          window.speechSynthesis.speak(utterance);
        }
      }
    });

    if (!hasText) {
      isReading = false;
      btnRead.classList.remove('active');
    } else {
      // Force resume in case browser is paused
      window.speechSynthesis.resume();
    }
  });
});
