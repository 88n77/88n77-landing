/* 88n77 — EN (primary) / UK language toggle.
   HTML source is English; this maps English → Ukrainian and swaps on toggle.
   Snapshot-based: English originals are kept, so switching back is lossless. */
(() => {
  const UA = {
    // nav / header / footer
    'Skip to content': 'Перейти до вмісту',
    'Socials': 'Соцмережі',
    'Projects': 'Проєкти',
    'About 88n77': 'Про 88n77',
    'Custom work': 'На замовлення',
    'Get in touch': 'Зв’язатись',
    'Custom development': 'Розробка на замовлення',
    'Contact': 'Контакт',
    'Home': 'Головна',
    'Top ↑': 'Нагору ↑',
    // home — hero + sections
    'To projects': 'До проєктів',
    'Code & repositories': 'Код і репозиторії',
    'Blog & updates': 'Блог та оновлення',
    'My': 'Мої',
    'projects': 'проєкти',
    'Products, development & media.': 'Продукти, розробка та медіа.',
    'Pick what to open.': 'Обирай, що відкрити.',
    'Product / 01': 'Продукт / 01',
    'Profiles': 'Профілі',
    '+ Create': '+ Створити',
    'Separate profile.': 'Окремий профіль.',
    'Separate space.': 'Окремий простір.',
    'Antidetect browser for working with accounts.': 'Антидетект-браузер для роботи з акаунтами.',
    'Development / 02': 'Розробка / 02',
    "'your task'": "'твоя задача'",
    'Bots, automations & tools for your task.': 'Боти, автоматизації та інструменти під твою задачу.',
    'Media / 03': 'Медіа / 03',
    'Media project · @radius__X': 'Медіапроєкт · @radius__X',
    'Video project on YouTube.': 'Відеопроєкт на YouTube.',
    'About': 'Про',
    '88n77 is my space for code, ideas and my own projects.': '88n77 — мій простір для коду, ідей та власних проєктів.',
    'I build bots, scripts and tools that take out the routine and simplify work tasks. Here are the projects I’m working on and the things I share online.': 'Створюю ботів, скрипти й інструменти, які прибирають рутину та спрощують робочі задачі. Тут зібрані проєкти, над якими працюю, і те, чим ділюся в мережі.',
    'What you can order': 'Що можна замовити',
    'What do we build': 'Що створимо',
    'An idea, a task or a collab — message me directly.': 'Ідея, задача чи співпраця — пиши напряму.',
    // software page
    '← To projects': '← До проєктів',
    'Development': 'Розробка',
    'for your': 'під твою',
    'task': 'задачу',
    'Bots, scripts, automations and tools for a specific process. From a short idea to a working solution you can test and use.': 'Боти, скрипти, автоматизації та інструменти під конкретний процес. Від короткої ідеї до робочого рішення, яке можна перевірити й використовувати.',
    'Discuss a project': 'Обговорити замовлення',
    '// your next project': '// твій наступний проєкт',
    '"your idea"': '"твоя ідея"',
    '"we discuss together"': '"обговоримо разом"',
    'Scripts & utilities': 'Скрипти й утиліти',
    'Small programs for a specific action: process files, collect data, run a batch operation or simplify a workflow.': 'Невеликі програми під конкретну дію: обробити файли, зібрати дані, виконати пакетну операцію або спростити робочий процес.',
    'Bots for your task': 'Боти під задачу',
    'Telegram bots, notifications, forms, commands and workflows. Logic for a specific process.': 'Telegram-боти, сповіщення, форми, команди та сценарії роботи. Логіка під конкретний процес.',
    'Automations': 'Автоматизації',
    'Scripts for repetitive actions, data and file processing. Tools that remove manual steps.': 'Скрипти для повторюваних дій, обробки даних і файлів. Інструменти, які прибирають ручні кроки.',
    'Web tools': 'Вебінструменти',
    'Dashboards, internal services, trackers and handy interfaces for work tasks.': 'Панелі керування, внутрішні сервіси, трекери та зручні інтерфейси для робочих задач.',
    'APIs & integrations': 'API та інтеграції',
    'Data exchange between services, API connections and automatic actions on events.': 'Обмін даними між сервісами, підключення API та автоматичні дії за подіями.',
    'Prototypes & MVP': 'Прототипи та MVP',
    'A first working version of the idea: build the core logic, test the scenario and define the next step.': 'Перша робоча версія ідеї: зібрати основну логіку, перевірити сценарій та визначити наступний крок.',
    'How to start': 'Як почати',
    'Describe the task': 'Опиши задачу',
    'What the tool should do, who it’s for and the result you need. A few sentences is enough to start.': 'Що має робити інструмент, для кого він і який результат потрібен. Можна почати з кількох речень.',
    'Agree on scope': 'Узгодимо обсяг',
    'We go through scenarios, the features needed, timeline and cost. We fix exactly what we build.': 'Розберемо сценарії, потрібні функції, терміни та вартість. Зафіксуємо, що саме робимо.',
    'Build & verify': 'Зберемо й перевіримо',
    'A working version, testing on your task and fixes within the agreed scope.': 'Робоча версія, перевірка на твоїй задачі та правки в межах узгодженого обсягу.',
    'Easiest to start in Telegram. Send a description of the task and examples, if you have any.': 'Найзручніше почати в Telegram. Надішли опис задачі й приклади, якщо вони є.',
    'Got a task': 'Є задача',
    'Tell me what you need built.': 'Напиши, що потрібно створити.',
    // attributes (aria-label / alt)
    '88n77 — home': '88n77 — головна',
    'Navigation': 'Навігація',
    'Open menu': 'Відкрити меню',
    'Mobile navigation': 'Мобільна навігація',
    'Interactive 88n77 brand animation': 'Інтерактивна анімація бренду 88n77',
    '88n77 formed from white and orange particles that react to the cursor': '88n77 із білих та помаранчевих частинок, що реагують на курсор',
    'Pause animation': 'Призупинити анімацію',
    '88n77 socials': 'Соцмережі 88n77',
    'RadiusX avatar': 'Аватар RadiusX',
    'Rayon avatar': 'Аватар Rayon',
    // document titles
    '88n77 — projects & development': '88n77 — проєкти та розробка',
    'Custom development — 88n77': 'Розробка на замовлення — 88n77',
  };

  const KEY = 'lang';
  const toggle = document.querySelector('[data-lang-toggle]');

  // snapshot translatable text nodes
  const textNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const p = n.parentNode;
      if (p && (p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE')) return NodeFilter.FILTER_REJECT;
      return UA[n.nodeValue.trim()] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const raw = n.nodeValue;
    textNodes.push({ node: n, en: raw, pre: raw.match(/^\s*/)[0], post: raw.match(/\s*$/)[0], key: raw.trim() });
  }

  // snapshot translatable attributes
  const attrNodes = [];
  document.querySelectorAll('[aria-label],[alt]').forEach(el => {
    ['aria-label', 'alt'].forEach(attr => {
      const v = el.getAttribute(attr);
      if (v && UA[v.trim()]) attrNodes.push({ el, attr, en: v, key: v.trim() });
    });
  });

  const titleEN = document.title;
  const titleUA = UA[titleEN.trim()];

  function apply(lang) {
    const uk = lang === 'uk';
    document.documentElement.lang = uk ? 'uk' : 'en';
    textNodes.forEach(o => { o.node.nodeValue = uk ? o.pre + UA[o.key] + o.post : o.en; });
    attrNodes.forEach(o => { o.el.setAttribute(o.attr, uk ? UA[o.key] : o.en); });
    if (titleUA) document.title = uk ? titleUA : titleEN;
    if (toggle) {
      toggle.textContent = uk ? 'EN' : 'UA';
      toggle.setAttribute('aria-pressed', String(uk));
      toggle.setAttribute('aria-label', uk ? 'Switch to English' : 'Перемкнути на українську');
    }
    try { localStorage.setItem(KEY, uk ? 'uk' : 'en'); } catch (_) {}
  }

  let stored = 'en';
  try { stored = localStorage.getItem(KEY) || 'en'; } catch (_) {}
  apply(stored === 'uk' ? 'uk' : 'en');

  toggle?.addEventListener('click', () => {
    apply(document.documentElement.lang === 'uk' ? 'en' : 'uk');
  });
})();
