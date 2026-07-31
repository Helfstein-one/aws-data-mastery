# Sidebar and Navigation Script Standards

- Qualquer nova página HTML modular adicionada sob o diretório `/pages/` deve obrigatoriamente incluir no rodapé do documento:
  - O bloco de scripts JavaScript que define as funções inline:
    1. `toggleNav()` (para alternar a exibição da sidebar)
    2. `toggleCategory(catId, headerEl)` (para expandir e colapsar os submenus do sidebar)
    3. `scrollToTop()` (para suporte ao botão de voltar ao topo)
  - As tags `<nav id="sidebar"></nav>` e o botão de hambúrguer `<button id="hamburger" onclick="toggleNav()">☰</button>` no corpo do documento.
