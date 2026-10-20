/**
 * Dra. Fabiana Barbosa — Advocacia Estratégica
 * Client Logic & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initAreasModal();
  initArticlesModal();
  initContactForm();
  initPhotoManager();
});

/* --------------------------------------------------------------------------
   Header scroll effect
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   Mobile Navigation Toggle & Off-Canvas Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-navigation');
  const overlay = document.getElementById('mobileDrawerOverlay');
  const closeBtn = document.getElementById('closeDrawerBtn');
  const dockMenuTrigger = document.getElementById('dockMenuTrigger');
  const links = document.querySelectorAll('.main-navigation .nav-link');

  if (!nav) return;

  function openDrawer() {
    nav.classList.add('open');
    if (overlay) overlay.classList.add('active');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-locked');
  }

  function closeDrawer() {
    nav.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-locked');
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (dockMenuTrigger) {
    dockMenuTrigger.addEventListener('click', () => {
      openDrawer();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  links.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   Areas of Practice - Filter & Details Modal
   -------------------------------------------------------------------------- */
const AREAS_DATA = {
  criminal: {
    title: "Direito Criminal & Flagrantes",
    badge: "Plantão 24h",
    desc: "Atuação combativa e imediata na defesa técnica em investigações criminais, prisões em flagrante, audiências de custódia e processos judiciais.",
    details: [
      "Acompanhamento presencial imediato em Delegacias e Centrais de Flagrante no Rio de Janeiro e Região dos Lagos.",
      "Audiências de Custódia com foco em liberdade provisória e revogação de prisões ilegais.",
      "Impetração urgente de Habeas Corpus perante o Tribunal de Justiça do RJ, STJ e STF.",
      "Defesa técnica em inquéritos policiais e processos judiciais por crimes contra a pessoa, patrimônio, honra e ordem tributária."
    ],
    whatsappMsg: "Olá, Dra. Fabiana. Preciso de atendimento urgente/orientação sobre Direito Criminal."
  },
  compliance: {
    title: "Gestão de Crise & Compliance",
    badge: "Estratégico",
    desc: "Prevenção, diagnóstico antecipado e gestão célere de impasses jurídicos com potencial de dano à liberdade e à reputação.",
    details: [
      "Diagnóstico e mitigação imediata de riscos penais e reputacionais.",
      "Condução estratégica de situações críticas envolvendo fiscalizações, investigações ou litígios de alta repercussão.",
      "Conformidade e adequação de rotinas para prevenção de passivos legais.",
      "Sigilo rigoroso e preservação da imagem institucional e pessoal do cliente."
    ],
    whatsappMsg: "Olá, Dra. Fabiana. Gostaria de uma consultoria em Gestão de Crise Jurídica e Compliance."
  },
  violencia: {
    title: "Violência Doméstica & Medidas Protetivas",
    badge: "Urgência & Acolhimento",
    desc: "Atuação ágil na Lei Maria da Penha com rigor técnico, sensibilidade e total discrição.",
    details: [
      "Requerimento célere de Medidas Protetivas de Urgência para resguardo da integridade física e emocional.",
      "Atuação humanizada e firme como Assistente de Acusação ou Defesa Técnica especializada.",
      "Orientação preventiva sobre direitos, afastamento do lar e fixação de alimentos provisórios.",
      "Acompanhamento em Delegacias Especializadas de Atendimento à Mulher (DEAM)."
    ],
    whatsappMsg: "Olá, Dra. Fabiana. Gostaria de orientação jurídica sobre Medidas Protetivas / Lei Maria da Penha."
  },
  digitais: {
    title: "Crimes Digitais & Cibernéticos",
    badge: "Segurança Digital",
    desc: "Resposta técnica a golpes virtuais, fraudes eletrônicas, vazamento de dados e crimes contra a honra na internet.",
    details: [
      "Ação imediata para remoção de conteúdos difamatórios, chantagens e exposição indevida nas redes.",
      "Notificação judicial e extrajudicial de provedores para quebra de sigilo e identificação de infratores.",
      "Defesa e atuação contra golpes financeiros digitais, estelionato virtual e clonagem de contas.",
      "Rastreamento de evidências digitais preservando a cadeia de custódia pericial."
    ],
    whatsappMsg: "Olá, Dra. Fabiana. Preciso de suporte jurídico urgente referente a um Crime Digital / Golpe Virtual."
  },
  execucao: {
    title: "Execução Penal & Benefícios",
    badge: "Garantia de Direitos",
    desc: "Acompanhamento rigoroso do cumprimento de pena e requerimento de direitos e benefícios legais.",
    details: [
      "Cálculo preciso de pena e requerimento de Progressão de Regime (Fechado para Semiaberto e Aberto).",
      "Pedidos de Livramento Condicional, Saídas Temporárias e Prisão Domiciliar humanitária.",
      "Remição de pena por estudo, leitura e trabalho comprovados.",
      "Defesa em Procedimentos Administrativos Disciplinares (PAD) no sistema prisional."
    ],
    whatsappMsg: "Olá, Dra. Fabiana. Gostaria de orientação para um processo de Execução Penal / Progressão de Regime."
  },
  familia: {
    title: "Direito de Família & Sucessões",
    badge: "Patrimônio & Relações",
    desc: "Soluções seguras e equilibradas para questões familiares, divórcios, guarda e planejamento patrimonial.",
    details: [
      "Divórcios consensuais e litigiosos, garantindo proteção patrimonial e celeridade.",
      "Fixação, revisão e execução de pensão alimentícia com fundamentação técnica.",
      "Ações de guarda, convivência familiar e alienação parental.",
      "Inventários judiciais e extrajudiciais (em cartório), testamentos e partilhas."
    ],
    whatsappMsg: "Olá, Dra. Fabiana. Gostaria de uma consulta sobre Direito de Família / Inventário / Divórcio."
  },
  previdenciario: {
    title: "Direito Previdenciário",
    badge: "Benefícios INSS",
    desc: "Análise estratégica e concessão de benefícios previdenciários e revisões de aposentadoria.",
    details: [
      "Planejamento previdenciário e cálculo do melhor momento para aposentadoria.",
      "Requerimento e restabelecimento de auxílio por incapacidade temporária (auxílio-doença) e BPC/LOAS.",
      "Ações judiciais contra indeferimentos indevidos do INSS.",
      "Revisões de benefícios para alcance do valor legal correto."
    ],
    whatsappMsg: "Olá, Dra. Fabiana. Gostaria de uma avaliação sobre benefício previdenciário / INSS."
  }
};

function initAreasModal() {
  const modal = document.getElementById('areasModal');
  const closeBtn = document.getElementById('closeAreasModal');
  const detailButtons = document.querySelectorAll('[data-area-key]');
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  const cards = document.querySelectorAll('.area-card');

  // Filter tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Open modal with area details
  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.areaKey;
      const data = AREAS_DATA[key];
      if (!data || !modal) return;

      document.getElementById('modalAreaTitle').textContent = data.title;
      document.getElementById('modalAreaBadge').textContent = data.badge;
      document.getElementById('modalAreaDesc').textContent = data.desc;

      const listEl = document.getElementById('modalAreaList');
      listEl.innerHTML = '';
      data.details.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listEl.appendChild(li);
      });

      const whatsappBtn = document.getElementById('modalAreaWhatsapp');
      if (whatsappBtn) {
        const encoded = encodeURIComponent(data.whatsappMsg);
        whatsappBtn.href = `https://wa.me/5521964383778?text=${encoded}`;
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   Articles Modal Reader
   -------------------------------------------------------------------------- */
const ARTICLES_DATA = {
  1: {
    tag: "Direito Criminal & Garantias",
    title: "Audiência de Custódia: O que a família precisa saber e como agir nas primeiras 24 horas",
    date: "Atualizado • Informativo Jurídico",
    body: `
      <p>A prisão em flagrante de um familiar é um dos momentos mais angustiantes e desestabilizadores que uma família pode vivenciar. No entanto, agir com calma e rapidez nas primeiras horas faz toda a diferença para o desfecho processual.</p>
      
      <h4>O que é a Audiência de Custódia?</h4>
      <p>A audiência de custódia é uma garantia fundamental em que a pessoa presa é apresentada perante um juiz de direito em até 24 horas após a prisão. O objetivo central é verificar a legalidade da prisão, averiguar se houve tortura ou maus-tratos policiais e decidir se a pessoa deve responder ao processo em liberdade ou ter a prisão preventiva decretada.</p>
      
      <h4>Como a família pode ajudar de imediato?</h4>
      <p>Para aumentar significativamente as chances de concessão de liberdade provisória na audiência, a família deve reunir com urgência:</p>
      <ul>
        <li><strong>Comprovante de residência fixa recente</strong> (água, luz ou contrato em nome do preso ou parentes próximos);</li>
        <li><strong>Comprovante de ocupação lícita ou trabalho</strong> (carteira de trabalho assinada, contrato MEI, declaração do empregador ou holerites);</li>
        <li><strong>Documentos pessoais</strong> (RG, CPF e certidão de nascimento de filhos menores de 12 anos, se houver);</li>
        <li><strong>Laudos médicos ou receitas</strong> caso o custodiado faça uso de medicação contínua ou tenha condição de saúde grave.</li>
      </ul>

      <h4>O papel indispensável da Defesa Técnica</h4>
      <p>A presença de uma advogada criminalista desde a delegacia e na sala de audiência de custódia garante que os argumentos técnicos de ausência dos requisitos da prisão preventiva sejam apresentados de forma sólida ao juiz e ao Ministério Público, assegurando que direitos fundamentais não sejam violados.</p>
    `,
    whatsappMsg: "Olá, Dra. Fabiana. Gostaria de orientações sobre Audiência de Custódia / Familiar Preso."
  },
  2: {
    tag: "Flagrantes & Prisão",
    title: "Familiar Preso: Primeiras providências essenciais para resguardar direitos",
    date: "Atualizado • Informativo Jurídico",
    body: `
      <p>Quando alguém recebe a notícia de que um parente foi detido, é comum sentir desespero e desorientação. Saber exatamente quais passos tomar resguarda a integridade do familiar e preserva as chances de uma resposta judicial favorável.</p>

      <h4>1. Descubra a Unidade Policial Correta</h4>
      <p>Identifique com exatidão para qual Delegacia de Polícia (DP) ou Central de Flagrantes o familiar foi conduzido. No Rio de Janeiro e Região dos Lagos, muitas ocorrências são encaminhadas a centrais integradas de plantão.</p>

      <h4>2. Direito ao Silêncio e à Comunicação</h4>
      <p>A Constituição Federal garante a toda pessoa presa o direito de permanecer em silêncio e de se comunicar com sua família e com um advogado de sua escolha. O silêncio na fase policial não significa admissão de culpa; é uma garantia técnica para que nenhuma declaração precipitada prejudique a defesa futura.</p>

      <h4>3. Não assine documentos sem assistência técnica</h4>
      <p>Oriente o familiar a ler com cautela qualquer termo de declaração e, sempre que possível, aguardar a presença da sua advogada antes de prestar qualquer depoimento.</p>

      <h4>4. Contato Imediato com a Defesa Especializada</h4>
      <p>A intervenção ágil nas primeiras horas evita irregularidades no Auto de Prisão em Flagrante (APF) e possibilita o requerimento célere de fiança ou relaxamento de prisão ilegítima.</p>
    `,
    whatsappMsg: "Olá, Dra. Fabiana. Preciso de orientações urgentes sobre um familiar recém-detido."
  },
  3: {
    tag: "Compliance & Prevenção",
    title: "Gestão de Crise Jurídica: Como antecipar riscos e resguardar reputações",
    date: "Atualizado • Informativo Jurídico",
    body: `
      <p>No ambiente contemporâneo, um impasse jurídico não se limita às paredes dos tribunais: ele repercute na reputação profissional, no bem-estar pessoal e na estabilidade dos negócios.</p>

      <h4>O que é a Gestão de Crise Jurídica?</h4>
      <p>Trata-se de uma abordagem estratégica integrada que combina rigor técnico-jurídico com medidas assertivas de contenção de danos e proteção de imagem. Não se espera a crise explodir; identificam-se vulnerabilidades antes que se tornem processos litigiosos irreversíveis.</p>

      <h4>Pilares de uma gestão eficiente:</h4>
      <ul>
        <li><strong>Resposta Rápida:</strong> As primeiras 48 horas definem a narrativa jurídica e a capacidade de reação legal;</li>
        <li><strong>Rigor e Confidencialidade:</strong> Tratamento discreto sob estrito sigilo profissional;</li>
        <li><strong>Coordenação Estratégica:</strong> Alinhamento entre as teses jurídicas, proteção de dados e comunicação responsável.</li>
      </ul>
    `,
    whatsappMsg: "Olá, Dra. Fabiana. Gostaria de entender mais sobre Gestão de Crise Jurídica preventiva."
  }
};

function initArticlesModal() {
  const modal = document.getElementById('articlesModal');
  const closeBtn = document.getElementById('closeArticlesModal');
  const buttons = document.querySelectorAll('[data-article-id]');

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.articleId;
      const data = ARTICLES_DATA[id];
      if (!data || !modal) return;

      document.getElementById('modalArticleTag').textContent = data.tag;
      document.getElementById('modalArticleTitle').textContent = data.title;
      document.getElementById('modalArticleDate').textContent = data.date;
      document.getElementById('modalArticleBody').innerHTML = data.body;

      const whatsappBtn = document.getElementById('modalArticleWhatsapp');
      if (whatsappBtn) {
        const encoded = encodeURIComponent(data.whatsappMsg);
        whatsappBtn.href = `https://wa.me/5521964383778?text=${encoded}`;
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   Contact Form Handler
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Phone input mask
  const phoneInput = document.getElementById('clientPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const area = document.getElementById('clientArea').value;
    const message = document.getElementById('clientMessage').value.trim();

    if (!name || !phone) {
      alert('Por favor, preencha seu nome e telefone de contato.');
      return;
    }

    // Build polite WhatsApp message complying with OAB informational standards
    const text = `Olá, Dra. Fabiana Barbosa.\n\nMeu nome é *${name}* (${phone}).\nAssunto: *${area}*\n\nMensagem: ${message || 'Gostaria de uma orientação jurídica.'}`;
    const url = `https://wa.me/5521964383778?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

/* --------------------------------------------------------------------------
   Dynamic Photo Manager & Live Portrait Loader
   -------------------------------------------------------------------------- */
function initPhotoManager() {
  const portraitImg = document.getElementById('draFabianaPortrait');
  const triggerBtn = document.getElementById('openPhotoManagerBtn');
  const modal = document.getElementById('photoManagerModal');
  const closeBtn = document.getElementById('closePhotoManagerModal');
  const dropzone = document.getElementById('photoDropzone');
  const fileInput = document.getElementById('photoFileInput');
  const resetBtn = document.getElementById('resetPhotoBtn');

  if (!portraitImg) return;

  // 1. Check if user already loaded a photo in localStorage
  const savedPhoto = localStorage.getItem('dra_fabiana_portrait');
  if (savedPhoto) {
    portraitImg.src = savedPhoto;
  } else {
    // Check if assets/img/dra-fabiana.jpg exists
    const testImg = new Image();
    testImg.src = 'assets/img/dra-fabiana.jpg';
    testImg.onload = () => {
      portraitImg.src = 'assets/img/dra-fabiana.jpg';
    };
    testImg.onerror = () => {
      // Default placeholder SVG remains
    };
  }

  // Modal interactions
  if (triggerBtn && modal) {
    triggerBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Dropzone handling
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    });
  }

  function handleFile(file) {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido (JPG, PNG ou WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      portraitImg.src = dataUrl;
      try {
        localStorage.setItem('dra_fabiana_portrait', dataUrl);
      } catch (err) {
        console.warn('Could not cache to localStorage', err);
      }
      closeModal();
    };
    reader.readAsDataURL(file);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('dra_fabiana_portrait');
      portraitImg.src = 'assets/img/dra-fabiana-placeholder.svg';
      closeModal();
    });
  }
}
