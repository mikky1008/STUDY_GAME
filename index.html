// game.js — OSQuest game engine

// ── STATE ──────────────────────────────────────────────────────────────────
let questions    = [];
let currentIdx   = 0;
let score        = 0;
let lives        = 3;
let streak       = 0;
let bestStreak   = 0;
let correctCount = 0;
let timerInterval = null;
let timeLeft     = 30;
let answered     = false;
let history      = [];
let paused       = false;
let _currentStage = 1;

window._currentStage = 1; // exposed for result screen "retry" button

const TOTAL_TIME   = 30;
const QUESTIONS_PER_STAGE = 50;
const CIRCUMFERENCE = 2 * Math.PI * 22; // ~138.2

const STAGE_NAMES = {
  1: "FOUNDATIONS",
  2: "HARDWARE & STORAGE",
  3: "OS MANAGEMENT",
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

// ── GAME CONTROL ───────────────────────────────────────────────────────────
function startGame(stage) {
  _currentStage = stage;
  window._currentStage = stage;

  const pool = STAGE_POOLS[stage] || QUESTIONS;
  questions = shuffle(pool).slice(0, QUESTIONS_PER_STAGE);

  currentIdx   = 0;
  score        = 0;
  lives        = 3;
  streak       = 0;
  bestStreak   = 0;
  correctCount = 0;
  history      = [];
  paused       = false;

  // Reset pause overlay and button
  document.getElementById('pause-overlay').classList.remove('show');
  const pauseBtn = document.querySelector('.pause-btn');
  if (pauseBtn) pauseBtn.textContent = '⏸ PAUSE';

  // Set stage badge in HUD
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
  const btn     = document.querySelector('.pause-btn');
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

  // Lives
  document.getElementById('lives-display')
    .querySelectorAll('.life')
    .forEach((l, i) => l.classList.toggle('lost', i >= lives));

  // Streak badge
  const badge = document.getElementById('streak-badge');
  if (streak >= 3) {
    badge.classList.add('show');
    document.getElementById('streak-num').textContent = streak;
  } else {
    badge.classList.remove('show');
  }

  // Progress
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

  // Shuffle answer options while tracking where the correct one ends up
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

  // Reset feedback & next button
  const fb = document.getElementById('feedback');
  fb.className = 'feedback';
  fb.textContent = '';
  document.getElementById('next-btn').classList.remove('show');

  // Animate card in
  const card = document.getElementById('q-card');
  card.style.animation = 'none';
  card.offsetHeight; // force reflow
  card.style.animation = '';

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

  // Highlight correct option always
  allBtns.forEach(b => {
    if (parseInt(b.dataset.idx) === correctIdx) b.classList.add('correct');
  });

  const selected   = parseInt(btn.dataset.idx);
  const isCorrect  = selected === correctIdx;

  if (isCorrect) {
    btn.classList.add('correct');
    const bonus = Math.max(0, timeLeft - 5);
    const pts   = 100 + bonus * 10;
    score += pts;
    streak++;
    correctCount++;
    if (streak > bestStreak) bestStreak = streak;
    flashScreen('green');
    if (streak > 0 && streak % 5 === 0) showCombo(streak);
    history.push({ correct: true,  q: q.q, a: q.o[q.a] });
  } else {
    btn.classList.add('wrong');
    lives--;
    streak = 0;
    flashScreen('red');
    history.push({ correct: false, q: q.q, a: q.o[q.a] });
  }

  // Show explanation
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
  lives--;
  streak = 0;
  flashScreen('red');

  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => {
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
  if      (pct >= 90) { grade = 'A+'; msg = 'OUTSTANDING!';  color = 'var(--green)';  }
  else if (pct >= 80) { grade = 'A';  msg = 'EXCELLENT!';    color = 'var(--green)';  }
  else if (pct >= 70) { grade = 'B';  msg = 'WELL DONE!';    color = 'var(--accent)'; }
  else if (pct >= 60) { grade = 'C';  msg = 'KEEP GOING!';   color = 'var(--yellow)'; }
  else if (pct >= 50) { grade = 'D';  msg = 'NEEDS WORK!';   color = 'var(--accent2)';}
  else                { grade = 'F';  msg = 'TRY AGAIN!';    color = 'var(--red)';    }

  // Result labels
  document.getElementById('result-stage-label').textContent = `STAGE ${_currentStage} — ${STAGE_NAMES[_currentStage]}`;
  document.getElementById('result-grade').textContent       = grade;
  document.getElementById('result-grade').style.color       = color;
  document.getElementById('result-msg').textContent         = msg;
  document.getElementById('r-score').textContent            = score.toLocaleString();
  document.getElementById('r-correct').textContent          = `${correctCount}/${total}`;
  document.getElementById('r-pct').textContent              = pct + '%';
  document.getElementById('r-streak').textContent           = bestStreak;

  // Next stage button label
  const nextBtn = document.getElementById('next-stage-btn');
  if (_currentStage < 3) {
    nextBtn.textContent = `STAGE ${_currentStage + 1} →`;
    nextBtn.style.display = '';
  } else {
    nextBtn.textContent = 'ALL STAGES DONE! 🎉';
    nextBtn.onclick = () => show('stage-screen');
  }

  // Build question breakdown
  const bd = document.getElementById('result-breakdown');
  bd.innerHTML = '';
  history.forEach((h, i) => {
    const row = document.createElement('div');
    row.className = 'rb-row';
    row.innerHTML =
      `<span class="rb-icon">${h.correct ? '✅' : '❌'}</span>
       <span class="rb-q">Q${i + 1}: ${h.q.length > 60 ? h.q.slice(0, 60) + '…' : h.q}</span>
       <span class="rb-a">${h.a.length > 30 ? h.a.slice(0, 30) + '…' : h.a}</span>`;
    bd.appendChild(row);
  });

  show('result-screen');
}
