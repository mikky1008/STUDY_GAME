// game.js — StudyQuest engine (OS + Philippine History)

// ── STATE ──────────────────────────────────────────────────────────────────
let questions      = [];
let currentIdx     = 0;
let score          = 0;
let lives          = 3;
let streak         = 0;
let bestStreak     = 0;
let correctCount   = 0;
let timerInterval  = null;
let timeLeft       = 30;
let answered       = false;
let history        = [];
let paused         = false;
let _currentStage  = 1;
let _currentSubject = 'os'; // 'os' or 'hist'

window._currentStage   = 1;
window._currentSubject = 'os';

const TOTAL_TIME          = 30;
const QUESTIONS_PER_STAGE = 50;
const CIRCUMFERENCE       = 2 * Math.PI * 22;

// ── POOL LOOKUP — always fetched fresh to avoid init-order issues ─────────
function getPool(subjectKey, stage) {
  if (subjectKey === 'os') {
    return (typeof OS_STAGE_POOLS !== 'undefined' && OS_STAGE_POOLS[stage]) ? OS_STAGE_POOLS[stage] : [];
  } else if (subjectKey === 'os_ch2') {
    return (typeof OS_CH2_STAGE_POOLS !== 'undefined' && OS_CH2_STAGE_POOLS[stage]) ? OS_CH2_STAGE_POOLS[stage] : [];
  } else {
    return (typeof HIST_STAGE_POOLS !== 'undefined' && HIST_STAGE_POOLS[stage]) ? HIST_STAGE_POOLS[stage] : [];
  }
}

// ── SUBJECT CONFIG ─────────────────────────────────────────────────────────
const SUBJECTS = {
  os: {
    name:    'Operating Systems',
    logoText:'OS<span>QUEST</span>',
    chapter: 'Chapter 1 · Introduction to OS',
    stages: [
      { name:'FOUNDATIONS',       icon:'🧱', desc:'OS basics, system structure, bootstrap, system organization & interrupts', topics:['What is an OS','System Structure','OS Definition','Bootstrap','System Org','Interrupts'] },
      { name:'HARDWARE & STORAGE',icon:'⚙️', desc:'I/O structure, DMA, storage hierarchy, caching & system architecture',    topics:['I/O & DMA','Storage Basics','Storage Structure','Hierarchy','Caching','Architecture'] },
      { name:'OS MANAGEMENT',     icon:'🧠', desc:'Multiprogramming, dual-mode, process/memory/storage mgmt, security & environments', topics:['Multiprogramming','Dual-Mode','Process Mgmt','Memory Mgmt','Protection','Environments'] },
    ],
  },
  os_ch2: {
    name:    'Operating Systems',
    logoText:'OS<span>QUEST</span>',
    chapter: 'Chapter 2 · OS Structures',
    stages: [
      { name:'SERVICES & UI',     icon:'🖥️', desc:'OS services, CLI, GUI, touchscreen interfaces & system calls fundamentals', topics:['OS Services','CLI','GUI','Touchscreen','System Calls','Parameter Passing'] },
      { name:'CALLS & PROGRAMS',  icon:'📞', desc:'Types of system calls, system programs, OS design goals & policy vs mechanism', topics:['Process Control','File Mgmt','Device Mgmt','System Programs','OS Design','Policy/Mechanism'] },
      { name:'STRUCTURE & BOOT',  icon:'🏗️', desc:'OS structure models, mobile OS, debugging, OS generation & system boot', topics:['Simple Structure','Layered','Microkernel','Modules','Hybrid/Mobile','Debugging','Boot'] },
    ],
  },
  hist: {
    name:    'Philippine History',
    logoText:'HIST<span>QUEST</span>',
    chapter: 'Philippine History · Colonial Era',
    stages: [
      { name:'PRE-COLONIAL PH',     icon:'🏺', desc:'Barangay structure, social classes, marriage customs, spiritual beliefs & early culture', topics:['Barangay','Social Classes','Slavery','Pre-Colonial Laws','Marriage','Spiritual Beliefs'] },
      { name:'SPANISH COLONIZATION',icon:'⛵', desc:'Magellan expedition, conquest, colonial institutions, revolts & Church-State relations', topics:['Magellan','Legazpi','Encomienda','Polo','Reduccion','Early Revolts'] },
      { name:'RESISTANCE & REFORM', icon:'✊', desc:'Propaganda Movement, key propagandists, La Solidaridad & institutional impact', topics:['Propaganda Movement','La Solidaridad','Rizal','Del Pilar','Lopez Jaena','Institutional Impact'] },
    ],
  },
};

// ── UTILITIES ──────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── SUBJECT SELECTION ──────────────────────────────────────────────────────
function selectSubject(subjectKey) {
  _currentSubject = subjectKey;
  window._currentSubject = subjectKey;
  const subj = SUBJECTS[subjectKey];

  // Apply theme
  if (subjectKey === 'hist') {
    document.body.classList.add('hist-mode');
  } else {
    document.body.classList.remove('hist-mode');
  }

  // Update start screen
  document.getElementById('start-subject-label').textContent = subj.name;
  document.getElementById('start-logo').innerHTML = subj.logoText;
  document.getElementById('start-chapter').textContent = subj.chapter;

  // Build stage cards
  buildStageCards(subjectKey);

  // Build cheat sheet
  buildCheatSheet(subjectKey);

  // Update module screen labels
  const icons = { os: '🖥️', hist: '🏛️' };
  document.getElementById('module-subject-label').textContent = subj.name;

  show('module-screen');
}

// ── MODULE ROUTING ─────────────────────────────────────────────────────────
function goModule1() {
  // Module 1 = Chapter 1 quiz (os)
  _currentSubject = 'os';
  window._currentSubject = 'os';
  buildStageCards('os');
  buildCheatSheet('os');
  const s = SUBJECTS['os'];
  document.getElementById('start-subject-label').textContent = s.name;
  document.getElementById('start-logo').innerHTML = s.logoText;
  document.getElementById('start-chapter').textContent = s.chapter;
  show('start-screen');
}

function goModule2() {
  // Module 2 = Chapter 2 quiz (os_ch2)
  _currentSubject = 'os_ch2';
  window._currentSubject = 'os_ch2';
  buildStageCards('os_ch2');
  const s = SUBJECTS['os_ch2'];
  document.getElementById('start-subject-label').textContent = s.name;
  document.getElementById('start-logo').innerHTML = s.logoText;
  document.getElementById('start-chapter').textContent = s.chapter;
  show('start-screen');
}

function buildStageCards(subjectKey) {
  const subj = SUBJECTS[subjectKey];
  const container = document.getElementById('stage-cards-container');
  container.innerHTML = '';
  subj.stages.forEach((stage, i) => {
    const stageNum = i + 1;
    const card = document.createElement('div');
    card.className = 'stage-card';
    card.onclick = () => startGame(stageNum);
    card.innerHTML = `
      <div class="stage-num-badge">0${stageNum}</div>
      <div class="stage-card-icon">${stage.icon}</div>
      <div class="stage-card-name">${stage.name}</div>
      <div class="stage-card-desc">${stage.desc}</div>
      <div class="stage-card-topics">${stage.topics.map(function(t){ return '<span>'+t+'</span>'; }).join('')}</div>
      <div class="stage-card-count">50 Questions · 30s each</div>
      <div class="stage-play-btn">START STAGE ${stageNum} →</div>
    `;
    container.appendChild(card);
  });
}

// ── CHEAT SHEETS ───────────────────────────────────────────────────────────
const CHEAT_DATA = {
  os: {
    title: 'CHAPTER 1 · INTRODUCTION TO OS',
    cards: [
      { icon:'🖥', topic:'What is an OS', items:[
        ['Definition','Intermediary between user and hardware — manages resources & enables program execution'],
        ['Resource Allocator','Manages all resources; decides between conflicting requests for fair, efficient use'],
        ['Control Program','Controls execution to prevent errors and improper use'],
        ['Kernel','The ONE program always running; everything else is a system or application program'],
        ['No universal definition','varies wildly between vendors'],
      ]},
      { icon:'🔲', topic:'Computer System Structure', items:[
        ['4 Components','Hardware → OS → Application Programs → Users'],
        ['Hardware','CPU, memory, I/O devices — basic computing resources'],
        ['Bootstrap','Stored in ROM/EPROM (firmware); initializes system & loads kernel at power-up'],
        ['Dual-Mode','User mode vs Kernel mode — distinguished by hardware mode bit'],
        ['Timer','Prevents infinite loops — counter decremented by clock; interrupt at zero'],
      ]},
      { icon:'⚡', topic:'Interrupts & I/O', items:[
        ['Interrupt','Device controller signals CPU it is done by causing an interrupt'],
        ['Interrupt Vector','Contains addresses of ALL interrupt service routines'],
        ['Trap/Exception','Software-generated interrupt (e.g., divide by zero, system call)'],
        ['DMA','Device controller transfers blocks directly to RAM without CPU — only 1 interrupt per block'],
        ['Synchronous I/O','Control returns to program only AFTER I/O completes'],
      ]},
      { icon:'💾', topic:'Storage Hierarchy', items:[
        ['Fastest → Slowest','Registers → Cache → RAM → SSD → HDD → Optical/Tape'],
        ['Main Memory (RAM)','Only storage CPU accesses directly; volatile; random access'],
        ['Caching','Copying info into faster storage temporarily; replacement policy is key'],
        ['Cache coherency','In multiprocessors, all CPUs must see the most recent value'],
        ['WORM','Write-Once, Read-Many-times — archival optical storage'],
      ]},
      { icon:'⚙', topic:'Architecture', items:[
        ['SMP','Symmetric Multiprocessing — all CPUs perform all tasks'],
        ['AMP','Asymmetric — each CPU assigned a specific task'],
        ['Multi-core','Multiple cores on one chip — faster on-chip communication'],
        ['Clustered','Multiple systems sharing storage via SAN; high availability'],
        ['DMA','Frees CPU during bulk transfers — 1 interrupt per block'],
      ]},
      { icon:'📋', topic:'OS Structure & Management', items:[
        ['Multiprogramming','Keeps CPU busy by switching jobs when one waits for I/O'],
        ['Timesharing','CPU switches so fast users can interact — goal &lt;1 sec response'],
        ['Virtual Memory','Run processes not fully in RAM'],
        ['Process','Program in execution — active entity; needs CPU, memory, I/O, files'],
        ['Protection','Controls access of processes/users to OS-defined resources'],
      ]},
      { icon:'🌐', topic:'Computing Environments', items:[
        ['Mobile','iOS &amp; Android; GPS, gyroscope, AR; optimized for battery'],
        ['Client-Server','Compute-server (services) / File-server (storage)'],
        ['P2P','No client/server distinction — all nodes are peers (Napster, Skype)'],
        ['Cloud','SaaS / PaaS / IaaS; Public / Private / Hybrid; built on virtualization'],
        ['Real-time','Fixed time constraints — correct = accurate + on time'],
      ]},
      { icon:'🐧', topic:'Open-Source OS', items:[
        ['Open-Source','Source code publicly available — counter to DRM/closed-source'],
        ['GPL (Copyleft)','FSF license — derivatives must stay open-source'],
        ['Examples','GNU/Linux, BSD UNIX (basis of macOS)'],
        ['VirtualBox','Open source and free on many platforms'],
        ['Kernel data structures','Linked lists, BST O(log n), hash maps, bitmaps'],
      ]},
    ]
  },
  hist: {
    title: 'PHILIPPINE HISTORY · COLONIAL ERA',
    cards: [
      { icon:'🏘', topic:'Barangay & Social Structure', items:[
        ['Barangay','Primary political, economic, sociocultural unit; 30–100 families; from balangay (boat)'],
        ['3 Classes','Maginoo/Kadatoan (nobles) · Maharlika/Timawa (freemen) · Alipin/Oripun (slaves)'],
        ['Datu','Highest official; must have wealth, power, influence; law-maker, judge, war-leader'],
        ['Bagani','Warriors of the community, led by the datu'],
        ['Social mobility','Possible — commoners could transfer to other barangays'],
      ]},
      { icon:'⚖', topic:'Pre-Colonial Laws & Slavery', items:[
        ['Laws','Consisted wholly of tradition and custom — observed with great exactness'],
        ['Slavery types','Ayuey (full-time in master\'s home) · Tumaranpoc (own home, 1 day/4 for master) · Tomatan (banquet service only)'],
        ['Debt slavery','Could not pay fine → pledged self as slave until repaid'],
        ['No death penalty','Crimes punished by gold fines, not execution'],
        ['Datu as judge','Chief + old men decided civil and criminal cases'],
      ]},
      { icon:'🙏', topic:'Spiritual Beliefs', items:[
        ['Babaylan/Catalonan','Spiritual leader of the barangay; usually female; led rituals and sacrifices'],
        ['Diwata/Anito','Deities — manifested by forces of nature or wooden carvings'],
        ['Bathala','Highest Tagalog deity (creator/maker); Visayan equivalent = Laon'],
        ['No formal temples','Worship was individual or done in the chief\'s house during pandot (festival)'],
        ['Manunggul Jar','Archaeological proof of belief in soul and life after death'],
      ]},
      { icon:'⛵', topic:'Spanish Colonization', items:[
        ['Magellan arrived','March 16, 1521 — named territory Archipelago de San Lazaro'],
        ['Battle of Mactan','Lapu-lapu defeated and killed Magellan, April 27, 1521'],
        ['Legazpi','First Governor-General; conquered Manila May 18, 1571; blood compact with Sikatuna in Bohol'],
        ['Reduccion','Resettlement policy — scattered natives into organized towns around plaza complex'],
        ['Encomienda','Grant to meritorious Spaniard to control a place and collect tribute; from encomendar (to entrust)'],
      ]},
      { icon:'🏛', topic:'Colonial Institutions', items:[
        ['Polo y servicios','40-day forced labor (reduced to 15 in 1884) for males 16–60'],
        ['Bandala','Annual enforced sale/requisitioning of rice or goods'],
        ['Tributo → Cedula','Tribute (vassalage to King) replaced by cedula personal in 19th century'],
        ['Governor-General','Commander-in-chief, president of Real Audiencia, vice-real patron'],
        ['Gobernadorcillo','Highest position for a Filipino; needed literacy in Spanish + 4 yrs as cabeza'],
      ]},
      { icon:'⚔', topic:'Early Filipino Revolts', items:[
        ['Causes','Catholic imposition, forced labor (polo), land usurpation by religious orders'],
        ['Bancao Revolt (1621)','Religious revolt in Leyte — preserving old religion (also Tamblot in Bohol)'],
        ['Sumuroy Revolt (1649)','Samar — against polo for galleon construction; spread across Visayas and Mindanao'],
        ['Agrarian Uprisings (1745–46)','Tagalog provinces — against friar land grabbing'],
        ['King\'s response','Indians should use peaceable means, not armed force'],
      ]},
      { icon:'📰', topic:'Propaganda Movement', items:[
        ['Goal','Reform and assimilation — NOT independence; equal rights under Spanish law'],
        ['La Solidaridad','Official mouthpiece (1889 Barcelona); editors: Lopez Jaena then Del Pilar'],
        ['Jose Rizal','Noli Me Tangere (1887); La Liga Filipina (1892); executed Dec 30, 1896'],
        ['Del Pilar','Frailocracia concept; Dasalan at tocsohan; died of TB July 4, 1896 in Barcelona'],
        ['Lopez Jaena','Fray Botod; first editor of Sol; died January 20, 1896 in Barcelona'],
      ]},
      { icon:'📚', topic:'Institutional Impact', items:[
        ['Educational Decree 1863','Free compulsory primary schools; each town: 1 school for boys, 1 for girls'],
        ['UST','Founded 1611 by Dominicans — Colegio de Nuestra Señora del Santísimo Rosario → university 1645'],
        ['Galleon Trade 1565–1815','Benefitted only privileged Spaniards; damaged Filipino agriculture and industries'],
        ['Friar power','Del Pilar: friars controlled education, municipalities, communication, and people\'s minds'],
        ['Malolos Constitution 1898','Separation of Church and State — outstanding innovation of the revolution'],
      ]},
    ]
  },
  os_ch2: {
    title: 'CHAPTER 2 · OPERATING-SYSTEM STRUCTURES',
    cards: [
      { icon:'⚙', topic:'OS Services', items:[
        ['Purpose','Provide environment for program execution and services to programs and users'],
        ['User-helpful services','UI, Program execution, I/O ops, File-system manipulation, Communications, Error detection'],
        ['System-efficiency services','Resource allocation, Accounting, Protection and security'],
        ['Protection','Ensures all access to system resources is controlled'],
        ['Security','Requires user authentication; defends external I/O from invalid access'],
      ]},
      { icon:'💻', topic:'User Interfaces', items:[
        ['CLI','Command-Line Interface — command interpreter / shell; fetches and executes commands'],
        ['Shell','Can be in kernel or system program; multiple flavors possible (bash, etc.)'],
        ['GUI','Desktop metaphor — icons, mouse, keyboard; invented at Xerox PARC'],
        ['Mac OS X GUI','Called Aqua; UNIX kernel underneath with shells available'],
        ['Touchscreen','Gesture-based actions, virtual keyboard, voice commands — no mouse'],
      ]},
      { icon:'📞', topic:'System Calls', items:[
        ['Definition','Programming interface to OS services — typically written in C/C++'],
        ['APIs','Programs use APIs not direct calls: Win32, POSIX, Java API (JVM)'],
        ['System-call interface','Table indexed by system call numbers; invokes intended OS kernel call'],
        ['Parameter passing','Registers (simple) · Block/table in memory (Linux/Solaris) · Stack (pushed/popped)'],
        ['Run-time library','Hides most OS interface details from programmer'],
      ]},
      { icon:'📋', topic:'Types of System Calls', items:[
        ['Process control','Create/terminate process, load/execute, get/set attributes, wait, locks, allocate memory'],
        ['File management','Create/delete, open/close, read/write/reposition, get/set attributes'],
        ['Device management','Request/release, read/write/reposition, get/set attributes, attach/detach'],
        ['Information maintenance','Get/set time, date, system data, process/file/device attributes'],
        ['Communications','Message passing (client→server) or shared memory; create/delete connections'],
        ['Protection','Control access, get/set permissions, allow/deny user access'],
      ]},
      { icon:'🛠', topic:'System Programs & OS Design', items:[
        ['System programs','Provide convenient environment for development & execution'],
        ['Categories','File mgmt, Status info, File modification, Language support, Program loading, Comms, Background services'],
        ['Daemons','Background services running from boot to shutdown in user context'],
        ['Policy vs Mechanism','Policy = WHAT; Mechanism = HOW — separating them allows flexibility'],
        ['User goals','Convenient, easy to learn, reliable, safe, fast'],
        ['System goals','Easy to design/implement/maintain, flexible, reliable, error-free, efficient'],
      ]},
      { icon:'🏗', topic:'OS Structure Models', items:[
        ['Simple (MS-DOS)','Most functionality in least space; interfaces not well separated'],
        ['UNIX','Systems programs + kernel (file sys, CPU sched, memory mgmt) — not fully layered'],
        ['Layered','Layer 0=hardware, Layer N=UI; each layer uses only lower layers'],
        ['Microkernel (Mach)','Most OS in user space; kernel minimal; communication via message passing'],
        ['Modules','Object-oriented; loadable kernel modules; similar to layers but more flexible (Linux, Solaris)'],
        ['Hybrid','Most modern OSes — combines approaches for performance, security, usability'],
      ]},
      { icon:'🔍', topic:'Debugging & Boot', items:[
        ['Core dump','Captures process memory on application failure'],
        ['Crash dump','Captures kernel memory on OS failure'],
        ['Profiling','Periodic sampling of instruction pointer to find statistical trends'],
        ['DTrace','Live instrumentation on production systems (Solaris, FreeBSD, Mac OS X)'],
        ['Bootstrap loader','Stored in ROM/EEPROM; locates kernel, loads it, starts it'],
        ['GRUB','Common bootloader; allows selecting kernel from multiple disks/versions'],
      ]},
    ]
  }
};

function buildCheatSheet(subjectKey) {
  const data = CHEAT_DATA[subjectKey];
  document.getElementById('cs-title-sub').textContent = data.title;
  const grid = document.getElementById('cs-grid-container');
  grid.innerHTML = '';
  data.cards.forEach(card => {
    const div = document.createElement('div');
    div.className = 'cs-card';
    div.innerHTML = `
      <div class="cs-card-head"><span class="cs-icon">${card.icon}</span><span class="cs-topic">${card.topic}</span></div>
      <div class="cs-card-body">
        ${card.items.map(([k,v]) => `
          <div class="cs-item"><span class="cs-bullet">›</span>
            <div><span class="cs-key">${k}:</span> <span class="cs-val">${v}</span></div>
          </div>`).join('')}
      </div>
    `;
    grid.appendChild(div);
  });
}

// ── GAME CONTROL ───────────────────────────────────────────────────────────
function startGame(stage) {
  _currentStage = stage;
  window._currentStage = stage;

  const pool = getPool(_currentSubject, stage);
  questions = shuffle(pool).slice(0, QUESTIONS_PER_STAGE);

  currentIdx   = 0; score = 0; lives = 3; streak = 0; bestStreak = 0;
  correctCount = 0; history = []; paused = false;

  document.getElementById('pause-overlay').classList.remove('show');
  const pauseBtn = document.querySelector('.pause-btn');
  if (pauseBtn) pauseBtn.textContent = '⏸ PAUSE';

  document.getElementById('hud-stage').textContent = `STAGE ${stage}`;
  show('game-screen');
  updateHUD();
  loadQuestion();
}

function goNextStage() {
  const next = _currentStage < 3 ? _currentStage + 1 : 1;
  startGame(next);
}

// ── PAUSE ──────────────────────────────────────────────────────────────────
function togglePause() {
  if (answered || lives <= 0) return;
  paused = !paused;
  const overlay = document.getElementById('pause-overlay');
  const btn = document.querySelector('.pause-btn');
  if (paused) {
    clearInterval(timerInterval);
    overlay.classList.add('show');
    if (btn) btn.textContent = '▶ RESUME';
  } else {
    overlay.classList.remove('show');
    if (btn) btn.textContent = '⏸ PAUSE';
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) { clearInterval(timerInterval); if (!answered) timeOut(); }
    }, 1000);
  }
}

// ── HUD ────────────────────────────────────────────────────────────────────
function updateHUD() {
  document.getElementById('score-display').textContent = score.toLocaleString();
  document.getElementById('lives-display')
    .querySelectorAll('.life')
    .forEach((l, i) => l.classList.toggle('lost', i >= lives));
  const badge = document.getElementById('streak-badge');
  if (streak >= 3) { badge.classList.add('show'); document.getElementById('streak-num').textContent = streak; }
  else badge.classList.remove('show');
  const pct = (currentIdx / questions.length) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-label').textContent = `${currentIdx} / ${questions.length}`;
}

// ── QUESTION LOADING ───────────────────────────────────────────────────────
function loadQuestion() {
  if (currentIdx >= questions.length) { endGame(); return; }
  answered = false;
  const q = questions[currentIdx];
  document.getElementById('q-num').textContent   = `Q ${currentIdx + 1}`;
  document.getElementById('q-topic').textContent = q.t;
  document.getElementById('q-text').textContent  = q.q;

  const indices = shuffle([0, 1, 2, 3]);
  let newCorrect = 0;
  const opts = document.getElementById('options');
  opts.innerHTML = '';
  indices.forEach((origIdx, newIdx) => {
    if (origIdx === q.a) newCorrect = newIdx;
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="opt-letter">${['A','B','C','D'][newIdx]}</span>${q.o[origIdx]}`;
    btn.dataset.idx  = newIdx;
    btn.dataset.orig = origIdx;
    btn.onclick = () => selectAnswer(btn, newCorrect, q);
    opts.appendChild(btn);
  });

  const fb = document.getElementById('feedback');
  fb.className = 'feedback'; fb.textContent = '';
  document.getElementById('next-btn').classList.remove('show');

  const card = document.getElementById('q-card');
  card.style.animation = 'none'; card.offsetHeight; card.style.animation = '';
  startTimer();
}

// ── TIMER ──────────────────────────────────────────────────────────────────
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = TOTAL_TIME;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) { clearInterval(timerInterval); if (!answered) timeOut(); }
  }, 1000);
}

function updateTimerDisplay() {
  document.getElementById('timer-num').textContent = timeLeft;
  const circle = document.getElementById('timer-circle');
  const offset = CIRCUMFERENCE * (1 - timeLeft / TOTAL_TIME);
  circle.style.strokeDashoffset = offset;
  const color = timeLeft > 15 ? 'var(--accent)' : timeLeft > 8 ? 'var(--yellow)' : 'var(--red)';
  circle.style.stroke = color;
  document.getElementById('timer-num').style.color = color;
}

// ── ANSWERING ──────────────────────────────────────────────────────────────
function selectAnswer(btn, correctIdx, q) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);
  allBtns.forEach(b => { if (parseInt(b.dataset.idx) === correctIdx) b.classList.add('correct'); });
  const selected = parseInt(btn.dataset.idx);
  const isCorrect = selected === correctIdx;
  if (isCorrect) {
    btn.classList.add('correct');
    const bonus = Math.max(0, timeLeft - 5);
    score += 100 + bonus * 10;
    streak++; correctCount++;
    if (streak > bestStreak) bestStreak = streak;
    flashScreen('green');
    if (streak > 0 && streak % 5 === 0) showCombo(streak);
    history.push({ correct: true, q: q.q, a: q.o[q.a] });
  } else {
    btn.classList.add('wrong');
    lives--; streak = 0;
    flashScreen('red');
    history.push({ correct: false, q: q.q, a: q.o[q.a] });
  }
  const fb = document.getElementById('feedback');
  fb.className = `feedback show ${isCorrect ? 'correct-fb' : 'wrong-fb'}`;
  fb.textContent = (isCorrect ? '✓ ' : '✗ ') + q.e;
  document.getElementById('next-btn').classList.add('show');
  updateHUD();
  if (lives <= 0) setTimeout(() => { clearInterval(timerInterval); endGame(); }, 1800);
}

function timeOut() {
  if (answered) return;
  answered = true;
  const q = questions[currentIdx];
  lives--; streak = 0;
  flashScreen('red');
  document.querySelectorAll('.option-btn').forEach(b => {
    b.disabled = true;
    if (parseInt(b.dataset.orig) === q.a) b.classList.add('correct');
  });
  const fb = document.getElementById('feedback');
  fb.className = 'feedback show wrong-fb';
  fb.textContent = "⏱ Time's up! " + q.e;
  document.getElementById('next-btn').classList.add('show');
  history.push({ correct: false, q: q.q, a: q.o[q.a] });
  updateHUD();
  if (lives <= 0) setTimeout(() => endGame(), 1800);
}

function nextQuestion() {
  currentIdx++;
  updateHUD();
  if (currentIdx >= questions.length || lives <= 0) { endGame(); return; }
  loadQuestion();
}

// ── EFFECTS ────────────────────────────────────────────────────────────────
function flashScreen(color) {
  const f = document.getElementById('flash');
  f.className = `flash ${color} show`;
  setTimeout(() => f.className = 'flash', 200);
}

function showCombo(n) {
  const p = document.getElementById('combo-popup');
  p.textContent = `🔥 ${n}x COMBO!`;
  p.className = 'combo-popup pop';
  setTimeout(() => p.className = 'combo-popup', 900);
}

// ── END GAME ───────────────────────────────────────────────────────────────
function endGame() {
  clearInterval(timerInterval);
  const total = Math.min(currentIdx + 1, questions.length);
  const pct   = Math.round((correctCount / Math.max(total, 1)) * 100);
  let grade, msg, color;
  if      (pct >= 90) { grade='A+'; msg='OUTSTANDING!';  color='var(--green)';  }
  else if (pct >= 80) { grade='A';  msg='EXCELLENT!';    color='var(--green)';  }
  else if (pct >= 70) { grade='B';  msg='WELL DONE!';    color='var(--accent)'; }
  else if (pct >= 60) { grade='C';  msg='KEEP GOING!';   color='var(--yellow)'; }
  else if (pct >= 50) { grade='D';  msg='NEEDS WORK!';   color='var(--accent2)';}
  else                { grade='F';  msg='TRY AGAIN!';    color='var(--red)';    }

  const subj    = SUBJECTS[_currentSubject];
  const stageName = subj.stages[_currentStage - 1]?.name || `STAGE ${_currentStage}`;
  document.getElementById('result-stage-label').textContent = `STAGE ${_currentStage} — ${stageName}`;
  document.getElementById('result-grade').textContent       = grade;
  document.getElementById('result-grade').style.color       = color;
  document.getElementById('result-msg').textContent         = msg;
  document.getElementById('r-score').textContent            = score.toLocaleString();
  document.getElementById('r-correct').textContent          = `${correctCount}/${total}`;
  document.getElementById('r-pct').textContent              = pct + '%';
  document.getElementById('r-streak').textContent           = bestStreak;

  const nextBtn = document.getElementById('next-stage-btn');
  if (_currentStage < 3) {
    nextBtn.textContent = `STAGE ${_currentStage + 1} →`;
    nextBtn.style.display = '';
  } else {
    nextBtn.textContent = 'ALL STAGES DONE! 🎉';
    nextBtn.onclick = () => show('stage-screen');
  }

  const bd = document.getElementById('result-breakdown');
  bd.innerHTML = '';
  history.forEach((h, i) => {
    const row = document.createElement('div');
    row.className = 'rb-row';
    row.innerHTML = `<span class="rb-icon">${h.correct ? '✅' : '❌'}</span>
      <span class="rb-q">Q${i+1}: ${h.q.length > 60 ? h.q.slice(0,60)+'…' : h.q}</span>
      <span class="rb-a">${h.a.length > 30 ? h.a.slice(0,30)+'…' : h.a}</span>`;
    bd.appendChild(row);
  });

  show('result-screen');
}
