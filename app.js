document.addEventListener('DOMContentLoaded', () => {
  // Initialize state
  const state = {
    currentTab: 'tutorial',
    promptsData: {} // Holds current edited prompt templates
  };

  // Load default prompt templates from BDD_DATA into state safely
  if (typeof BDD_DATA !== 'undefined' && BDD_DATA.prompts) {
    BDD_DATA.prompts.forEach(p => {
      state.promptsData[p.id] = p.template;
    });
  } else {
    console.error("BDD_DATA is not defined. Prompt templates cannot be loaded.");
  }

  // Configure marked options if available
  if (typeof marked !== 'undefined') {
    try {
      marked.setOptions({
        breaks: true,
        gfm: true
      });

      // Custom marked renderer for GitHub-style alerts
      const renderer = new marked.Renderer();
      const originalBlockquote = renderer.blockquote.bind(renderer);
      renderer.blockquote = (quote) => {
        let cleanQuote = quote;
        let className = '';
        
        if (quote.includes('[!NOTE]')) {
          className = 'alert-note';
          cleanQuote = quote.replace(/\[!NOTE\]\s*<br\s*\/?>?/g, '').replace('[!NOTE]', '');
        } else if (quote.includes('[!TIP]')) {
          className = 'alert-tip';
          cleanQuote = quote.replace(/\[!TIP\]\s*<br\s*\/?>?/g, '').replace('[!TIP]', '');
        } else if (quote.includes('[!IMPORTANT]')) {
          className = 'alert-important';
          cleanQuote = quote.replace(/\[!IMPORTANT\]\s*<br\s*\/?>?/g, '').replace('[!IMPORTANT]', '');
        } else if (quote.includes('[!WARNING]')) {
          className = 'alert-warning';
          cleanQuote = quote.replace(/\[!WARNING\]\s*<br\s*\/?>?/g, '').replace('[!WARNING]', '');
        }
        
        if (className) {
          return `<blockquote class="${className}">${cleanQuote}</blockquote>`;
        }
        return originalBlockquote(quote);
      };
      marked.use({ renderer });
    } catch (e) {
      console.error("Error configuring marked:", e);
    }
  } else {
    console.warn("marked.js not loaded. Advanced markdown rendering will be unavailable.");
  }

  // Initialize UI elements
  initMenuToggle();
  initTabs();
  initSubTabs();
  initTutorial();
  initExample();
  initPrompts();
  initOutputHandlers();

  // 0. Hamburger Menu Toggle Logic
  function initMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (menuToggle && sidebar && overlay) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.add('open');
        overlay.classList.add('active');
      });
    }

    if (menuClose && sidebar && overlay) {
      menuClose.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      });
    }

    if (overlay && sidebar) {
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      });
    }
  }

  // 1. Sidebar Tab Switching
  function initTabs() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetTab = item.getAttribute('data-tab');
        
        // Update nav items active state
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Show/hide tab panels
        tabPanels.forEach(panel => {
          panel.classList.remove('active');
          if (panel.id === `${targetTab}-tab`) {
            panel.classList.add('active');
          }
        });

        state.currentTab = targetTab;

        // Auto close sliding sidebar on selection
        if (sidebar && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
        }
        if (overlay && overlay.classList.contains('active')) {
          overlay.classList.remove('active');
        }
      });
    });
  }

  // 1.5. Sub-tab (template/output) Switching inside Panels
  function initSubTabs() {
    const subtabs = document.querySelectorAll('.wb-tab');
    subtabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const parentPanel = tab.closest('.tab-panel');
        if (!parentPanel) return;

        const targetView = tab.getAttribute('data-subtab');
        
        // Update sub-tab active state
        parentPanel.querySelectorAll('.wb-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show/hide sub-panel views
        parentPanel.querySelectorAll('.wb-panel-view').forEach(view => {
          view.classList.remove('active');
          if (view.getAttribute('data-view') === targetView) {
            view.classList.add('active');
          }
        });
      });
    });
  }

  // 2. Render Tutorial Mermaid Diagram
  function initTutorial() {
    const tutorialContentEl = document.getElementById('tutorial-content');
    if (tutorialContentEl) {
      // Post-process to render mermaid blocks in tutorial
      renderMermaidInElement(tutorialContentEl);
      
      // Render static mermaid divs in tutorial
      if (typeof mermaid !== 'undefined') {
        try {
          mermaid.init(undefined, tutorialContentEl.querySelectorAll('.mermaid'));
        } catch (e) {
          console.error("Static Mermaid render failed:", e);
        }
      }
    }
  }

  // 2.5. Render Example Mermaid Diagram
  function initExample() {
    const exampleContentEl = document.getElementById('example-content');
    if (exampleContentEl && typeof mermaid !== 'undefined') {
      try {
        mermaid.init(undefined, exampleContentEl.querySelectorAll('.mermaid'));
      } catch (e) {
        console.error("Static Mermaid render failed in example:", e);
      }
    }
  }

  // 3. Initialize Prompt textareas and default behaviors
  function initPrompts() {
    if (typeof BDD_DATA === 'undefined' || !BDD_DATA.prompts) return;

    BDD_DATA.prompts.forEach(p => {
      const textarea = document.getElementById(`${p.id}-textarea`);
      if (textarea) {
        // Set value from state
        textarea.value = state.promptsData[p.id] || '';

        // Track user edits
        textarea.addEventListener('input', (e) => {
          state.promptsData[p.id] = e.target.value;
        });

        // Copy button behavior
        const copyBtn = document.getElementById(`copy-${p.id}-btn`);
        if (copyBtn) {
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(textarea.value).then(() => {
              showToast('Prompt 已複製到剪貼簿！');
            });
          });
        }

        // Reset button behavior
        const resetBtn = document.getElementById(`reset-${p.id}-btn`);
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            textarea.value = p.template;
            state.promptsData[p.id] = p.template;
            showToast('已重設為預設 Prompt！');
          });
        }

        // Download button behavior
        const downloadBtn = document.getElementById(`download-${p.id}-btn`);
        if (downloadBtn) {
          downloadBtn.addEventListener('click', () => {
            downloadFile(`${p.id}_Template.md`, textarea.value);
            showToast('Prompt 模板下載成功！');
          });
        }
      }
    });
  }

  // 4. Handle Output Input pasting & Preview toggling
  function initOutputHandlers() {
    if (typeof BDD_DATA === 'undefined' || !BDD_DATA.prompts) return;

    BDD_DATA.prompts.forEach(p => {
      const inputEl = document.getElementById(`${p.id}-input`);
      const previewEl = document.getElementById(`${p.id}-preview`);
      
      const editBtn = document.getElementById(`toggle-${p.id}-edit-btn`);
      const previewBtn = document.getElementById(`toggle-${p.id}-preview-btn`);
      const downloadOutputBtn = document.getElementById(`download-${p.id}-output-btn`);

      // Edit / Preview Tab Toggles
      if (editBtn && previewBtn) {
        editBtn.addEventListener('click', () => {
          editBtn.classList.add('active');
          previewBtn.classList.remove('active');
          inputEl.classList.add('active');
          previewEl.classList.remove('active');
        });

        previewBtn.addEventListener('click', () => {
          editBtn.classList.remove('active');
          previewBtn.classList.add('active');
          inputEl.classList.remove('active');
          previewEl.classList.add('active');

          // Parse markdown and render html
          const htmlContent = parseMarkdown(inputEl.value || '*（無輸入內容，請在編輯器中貼上 AI 的產出成果）*');
          previewEl.innerHTML = htmlContent;

          // Render mermaid blocks in preview
          renderMermaidInElement(previewEl);
        });
      }

      // Download Output report button
      if (downloadOutputBtn) {
        downloadOutputBtn.addEventListener('click', () => {
          const content = inputEl.value;
          if (!content) {
            showToast('產出內容為空，無法下載！');
            return;
          }
          const filename = p.id === 'prompt4' ? 'prompt4_Playwright_Test.spec.ts' : `${p.id}_Output_Report.md`;
          downloadFile(filename, content);
          showToast(p.id === 'prompt4' ? '自動化代碼下載成功！' : '產出報告下載成功！');
        });
      }
    });
  }

  // Helper: Markdown Parser with fallback
  function parseMarkdown(text) {
    if (typeof marked !== 'undefined') {
      try {
        return marked.parse(text);
      } catch (e) {
        console.error("Markdown parsing failed:", e);
      }
    }
    
    // Minimal fallback text formatting if offline & marked.js fails
    return text
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\n/g, '<br>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }

  // Helper: Find and render mermaid code blocks safely
  function renderMermaidInElement(container) {
    const codeBlocks = container.querySelectorAll('pre code.language-mermaid');
    if (codeBlocks.length === 0) return;

    codeBlocks.forEach((codeEl, index) => {
      const preEl = codeEl.parentElement;
      const mermaidCode = codeEl.textContent;
      const uniqueId = `mermaid-container-${Date.now()}-${index}`;

      const div = document.createElement('div');
      div.className = 'mermaid';
      div.id = uniqueId;
      div.textContent = mermaidCode;

      // Replace pre block with the new div
      preEl.parentNode.replaceChild(div, preEl);
    });

    // Run mermaid compile safely
    if (typeof mermaid !== 'undefined') {
      try {
        mermaid.init(undefined, container.querySelectorAll('.mermaid'));
      } catch (e) {
        console.error('Mermaid render error:', e);
      }
    } else {
      console.warn("mermaid.js not loaded. Mermaid diagrams will be shown as text.");
    }
  }

  // Helper: Download a text content as a file
  function downloadFile(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/markdown;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  // Helper: Toast Notifications
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    if (toast && toastText) {
      toastText.textContent = message;
      toast.classList.add('show');
      
      // Auto hide after 3 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }
});
