/* ── VARIABLES ─────────────────────────────────────────────────── */
:root {
  --bg:          #040d1a;
  --panel:       #071628;
  --border:      #0a3d6b;
  --accent:      #00d4ff;
  --accent2:     #ff6b35;
  --green:       #00ff88;
  --red:         #ff3366;
  --yellow:      #ffd700;
  --text:        #c8e6f5;
  --muted:       #4a7a9b;
  --glow:        0 0 20px rgba(0,212,255,0.4);
  --glow-green:  0 0 20px rgba(0,255,136,0.5);
  --glow-red:    0 0 20px rgba(255,51,102,0.5);
}

/* ── RESET & BASE ──────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Exo 2', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
}

/* Stars background */
#stars {
  position: fixed; top:0; left:0; width:100%; height:100%;
  pointer-events: none; z-index: 0;
  background:
    radial-gradient(1px 1px at 20% 30%, rgba(0,212,255,0.6) 0%, transparent 100%),
    radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.5) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 50% 70%, rgba(0,212,255,0.4) 0%, transparent 100%),
    radial-gradient(1px 1px at 10% 80%, rgba(255,255,255,0.4) 0%, transparent 100%),
    radial-gradient(1px 1px at 90% 60%, rgba(0,255,136,0.4) 0%, transparent 100%),
    radial-gradient(1px 1px at 35% 50%, rgba(255,255,255,0.3) 0%, transparent 100%),
    radial-gradient(1px 1px at 65% 20%, rgba(0,212,255,0.5) 0%, transparent 100%),
    radial-gradient(1px 1px at 15% 45%, rgba(255,255,255,0.3) 0%, transparent 100%),
    radial-gradient(1px 1px at 75% 85%, rgba(0,212,255,0.4) 0%, transparent 100%),
    radial-gradient(1px 1px at 45% 15%, rgba(255,255,255,0.5) 0%, transparent 100%);
}

/* Grid overlay */
body::before {
  content: '';
  position: fixed; top:0; left:0; right:0; bottom:0;
  background-image:
    linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none; z-index: 0;
}

#app { position: relative; z-index: 1; }

/* ── SCREENS ───────────────────────────────────────────────────── */
.screen { display: none; min-height: 100vh; }
.screen.active { display: flex; flex-direction: column; align-items: center; justify-content: center; }

/* ── START SCREEN ──────────────────────────────────────────────── */
#start-screen { padding: 2rem; text-align: center; }

.logo-wrap { margin-bottom: 2rem; }
.logo-sub {
  font-family: 'Orbitron', monospace;
  font-size: 0.75rem; letter-spacing: 6px;
  color: var(--accent); text-transform: uppercase;
  margin-bottom: 0.5rem;
  animation: flicker 4s infinite;
}
.logo {
  font-family: 'Orbitron', monospace;
  font-size: clamp(2.2rem, 6vw, 4rem);
  font-weight: 900; color: var(--accent); line-height: 1.1;
  text-shadow: var(--glow), 0 0 60px rgba(0,212,255,0.3);
}
.logo span { color: var(--accent2); text-shadow: 0 0 20px rgba(255,107,53,0.6); }
.logo-chapter {
  font-family: 'Orbitron', monospace;
  font-size: 0.9rem; letter-spacing: 4px; color: var(--muted); margin-top: 0.4rem;
}

.stats-row {
  display: flex; gap: 1.2rem; justify-content: center;
  margin: 2rem 0; flex-wrap: wrap;
}
.stat-box {
  background: var(--panel); border: 1px solid var(--border);
  border-radius: 8px; padding: 0.9rem 1.5rem; text-align: center;
}
.stat-box .val {
  font-family: 'Orbitron', monospace; font-size: 1.8rem;
  color: var(--accent); font-weight: 700; text-shadow: var(--glow);
}
.stat-box .lbl { font-size: 0.68rem; letter-spacing: 2px; color: var(--muted); margin-top: 0.2rem; text-transform: uppercase; }

.start-actions { display: flex; flex-direction: column; gap: 0.7rem; align-items: center; }

.start-btn {
  font-family: 'Orbitron', monospace; font-size: 0.95rem;
  font-weight: 700; letter-spacing: 3px;
  border: none; border-radius: 6px;
  padding: 0.9rem 2.8rem; cursor: pointer;
  text-transform: uppercase; transition: all 0.2s;
  min-width: 240px;
}
.primary-btn {
  color: var(--bg); background: var(--accent);
  box-shadow: var(--glow), 0 4px 20px rgba(0,212,255,0.3);
}
.primary-btn:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 0 40px rgba(0,212,255,0.7); }
.ghost-btn {
  color: var(--accent); background: transparent;
  border: 1px solid rgba(0,212,255,0.4);
}
.ghost-btn:hover { background: rgba(0,212,255,0.08); box-shadow: var(--glow); }

/* ── STAGE SELECT ──────────────────────────────────────────────── */
#stage-screen { padding: 1.5rem; justify-content: flex-start; }

.stage-header {
  width: 100%; max-width: 960px; margin: 0 auto 2rem;
  display: flex; align-items: center; justify-content: space-between;
}
.stage-title {
  font-family: 'Orbitron', monospace; font-size: 1.4rem;
  font-weight: 900; color: var(--text); letter-spacing: 4px;
}
.stage-title span { color: var(--accent); text-shadow: var(--glow); }
.back-btn {
  font-family: 'Orbitron', monospace; font-size: 0.72rem; letter-spacing: 2px;
  color: var(--accent); background: transparent;
  border: 1px solid rgba(0,212,255,0.35); border-radius: 6px;
  padding: 0.5rem 1rem; cursor: pointer; transition: all 0.2s;
}
.back-btn:hover { background: rgba(0,212,255,0.1); box-shadow: var(--glow); }

.stage-cards {
  width: 100%; max-width: 960px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.2rem; padding-bottom: 2rem;
}

.stage-card {
  background: var(--panel); border: 1px solid var(--border);
  border-radius: 14px; padding: 1.8rem 1.5rem;
  cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden;
  display: flex; flex-direction: column; gap: 0.7rem;
}
.stage-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  opacity: 0; transition: opacity 0.2s;
}
.stage-card:hover { transform: translateY(-4px); border-color: rgba(0,212,255,0.5); box-shadow: 0 8px 40px rgba(0,212,255,0.12); }
.stage-card:hover::before { opacity: 1; }

.stage-num-badge {
  font-family: 'Orbitron', monospace; font-size: 3rem; font-weight: 900;
  color: rgba(0,212,255,0.1); line-height: 1; position: absolute;
  top: 1rem; right: 1.2rem;
}
.stage-card-icon { font-size: 2rem; }
.stage-card-name {
  font-family: 'Orbitron', monospace; font-size: 1rem; font-weight: 700;
  color: var(--accent); letter-spacing: 2px;
}
.stage-card-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.5; }
.stage-card-topics {
  display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.3rem;
}
.stage-card-topics span {
  background: rgba(0,212,255,0.07); border: 1px solid rgba(0,212,255,0.2);
  border-radius: 20px; padding: 0.2rem 0.6rem;
  font-size: 0.68rem; color: var(--accent);
}
.stage-card-count { font-size: 0.75rem; color: var(--muted); letter-spacing: 1px; margin-top: 0.2rem; }
.stage-play-btn {
  font-family: 'Orbitron', monospace; font-size: 0.72rem; letter-spacing: 2px;
  color: var(--bg); background: var(--accent); border-radius: 5px;
  padding: 0.55rem 1rem; text-align: center; margin-top: 0.4rem;
  box-shadow: var(--glow); transition: all 0.2s;
}
.stage-card:hover .stage-play-btn { box-shadow: 0 0 30px rgba(0,212,255,0.7); }

/* ── GAME SCREEN ───────────────────────────────────────────────── */
#game-screen { padding: 1rem; justify-content: flex-start; }

.hud {
  width: 100%; max-width: 820px; margin: 0 auto 0.8rem;
  display: flex; align-items: center; justify-content: space-between; gap: 0.8rem;
}
.hud-left { display: flex; align-items: center; gap: 0.8rem; }
.hud-center { flex: 1; display: flex; justify-content: center; }
.hud-right { display: flex; align-items: center; gap: 0.8rem; }

.hud-stage-badge {
  font-family: 'Orbitron', monospace; font-size: 0.65rem; letter-spacing: 2px;
  color: var(--bg); background: var(--accent); border-radius: 4px;
  padding: 0.25rem 0.6rem; white-space: nowrap;
}
.hud-score-lbl { font-size: 0.65rem; letter-spacing: 2px; color: var(--muted); display: block; text-transform: uppercase; }
.hud-score-val {
  font-family: 'Orbitron', monospace; font-size: 1.3rem;
  color: var(--accent); font-weight: 700; text-shadow: var(--glow); display: block;
}

.streak-badge {
  font-family: 'Orbitron', monospace; font-size: 0.75rem;
  background: rgba(255,215,0,0.15); border: 1px solid rgba(255,215,0,0.4);
  border-radius: 20px; padding: 0.25rem 0.75rem; color: var(--yellow);
  display: none;
}
.streak-badge.show { display: block; }

.lives { display: flex; gap: 4px; }
.life { font-size: 1.1rem; transition: all 0.3s; }
.life.lost { opacity: 0.2; filter: grayscale(1); transform: scale(0.8); }

.pause-btn {
  font-family: 'Orbitron', monospace; font-size: 0.7rem; letter-spacing: 2px;
  color: var(--accent); background: transparent;
  border: 1px solid rgba(0,212,255,0.35); border-radius: 6px;
  padding: 0.4rem 0.8rem; cursor: pointer; transition: all 0.2s;
  white-space: nowrap;
}
.pause-btn:hover { background: rgba(0,212,255,0.1); box-shadow: var(--glow); }

/* Timer ring */
.timer-ring { position: relative; width: 52px; height: 52px; }
.timer-ring svg { transform: rotate(-90deg); }
.timer-ring circle { fill: none; stroke-width: 4; stroke-linecap: round; }
.timer-ring .bg-circle { stroke: rgba(255,255,255,0.07); }
.timer-ring .fg-circle {
  stroke: var(--accent); stroke-dasharray: 138; stroke-dashoffset: 0;
  transition: stroke-dashoffset 1s linear, stroke 0.3s;
}
.timer-num {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  font-family: 'Orbitron', monospace; font-weight: 700; font-size: 0.95rem;
  color: var(--accent);
}

/* Progress */
.progress-wrap {
  width: 100%; max-width: 820px; margin: 0 auto 0.3rem;
  background: rgba(255,255,255,0.05); border-radius: 4px; height: 6px; overflow: hidden;
}
.progress-bar {
  height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent2));
  border-radius: 4px; transition: width 0.4s ease;
  box-shadow: 0 0 10px rgba(0,212,255,0.5);
}
.progress-label {
  width: 100%; max-width: 820px; margin: 0 auto 0.8rem;
  text-align: right; font-size: 0.68rem; color: var(--muted);
  letter-spacing: 1px; font-family: 'Orbitron', monospace;
}

/* Question card */
.q-card {
  width: 100%; max-width: 820px; margin: 0 auto;
  background: var(--panel); border: 1px solid var(--border);
  border-radius: 12px; padding: 2rem;
  box-shadow: 0 0 40px rgba(0,212,255,0.05);
  animation: slideUp 0.3s ease;
}
@keyframes slideUp {
  from { opacity:0; transform:translateY(16px); }
  to   { opacity:1; transform:translateY(0); }
}

.q-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.q-num { font-family: 'Orbitron', monospace; font-size: 0.7rem; letter-spacing: 2px; color: var(--muted); text-transform: uppercase; }
.q-topic {
  font-size: 0.68rem; letter-spacing: 1.5px; color: var(--accent);
  background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.2);
  border-radius: 20px; padding: 0.2rem 0.7rem; text-transform: uppercase;
}
.q-text { font-size: 1.1rem; font-weight: 600; line-height: 1.6; color: #e8f4f8; margin-bottom: 1.5rem; }

.options { display: flex; flex-direction: column; gap: 0.65rem; }
.option-btn {
  background: rgba(255,255,255,0.03); border: 1px solid var(--border);
  border-radius: 8px; padding: 0.9rem 1.2rem;
  color: var(--text); font-family: 'Exo 2', sans-serif; font-size: 0.95rem;
  cursor: pointer; text-align: left;
  display: flex; align-items: center; gap: 0.8rem;
  transition: all 0.15s;
}
.option-btn:hover:not(:disabled) {
  background: rgba(0,212,255,0.08); border-color: rgba(0,212,255,0.5);
  transform: translateX(4px);
}
.option-btn .opt-letter {
  font-family: 'Orbitron', monospace; font-size: 0.75rem; font-weight: 700;
  color: var(--muted); min-width: 22px; text-align: center;
}
.option-btn.correct { background: rgba(0,255,136,0.12) !important; border-color: var(--green) !important; color: var(--green) !important; box-shadow: var(--glow-green); }
.option-btn.correct .opt-letter { color: var(--green); }
.option-btn.wrong { background: rgba(255,51,102,0.12) !important; border-color: var(--red) !important; color: var(--red) !important; box-shadow: var(--glow-red); }
.option-btn.wrong .opt-letter { color: var(--red); }
.option-btn:disabled { cursor: default; }

.feedback { margin-top: 1rem; padding: 0.9rem 1.2rem; border-radius: 8px; font-size: 0.9rem; line-height: 1.5; opacity: 0; transition: opacity 0.3s; }
.feedback.show { opacity: 1; }
.feedback.correct-fb { background: rgba(0,255,136,0.07); border: 1px solid rgba(0,255,136,0.3); color: var(--green); }
.feedback.wrong-fb  { background: rgba(255,51,102,0.07); border: 1px solid rgba(255,51,102,0.3); color: #ff8099; }

.next-btn {
  font-family: 'Orbitron', monospace; font-size: 0.8rem; letter-spacing: 2px;
  color: var(--bg); background: var(--accent); border: none; border-radius: 6px;
  padding: 0.7rem 2rem; cursor: pointer; margin-top: 1rem; float: right;
  box-shadow: var(--glow); transition: all 0.2s; display: none;
}
.next-btn.show { display: block; }
.next-btn:hover { transform: translateY(-1px); box-shadow: 0 0 30px rgba(0,212,255,0.7); }

/* ── RESULT SCREEN ─────────────────────────────────────────────── */
#result-screen { padding: 2rem; text-align: center; }

.result-stage-label {
  font-family: 'Orbitron', monospace; font-size: 0.8rem; letter-spacing: 4px;
  color: var(--accent); text-transform: uppercase; margin-bottom: 0.5rem;
}
.result-grade {
  font-family: 'Orbitron', monospace; font-size: 6rem; font-weight: 900;
  margin-bottom: 0.5rem;
  animation: pulseGrade 2s infinite;
}
@keyframes pulseGrade {
  0%,100% { text-shadow: 0 0 30px currentColor, 0 0 60px currentColor; }
  50%      { text-shadow: 0 0 60px currentColor, 0 0 120px currentColor; }
}
.result-msg { font-family: 'Orbitron', monospace; font-size: 1.1rem; letter-spacing: 3px; color: var(--text); margin-bottom: 2rem; }

.result-stats { display: flex; gap: 1.2rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem; }
.r-stat { background: var(--panel); border: 1px solid var(--border); border-radius: 10px; padding: 1rem 1.8rem; text-align: center; }
.r-stat .rv { font-family: 'Orbitron', monospace; font-size: 2rem; font-weight: 700; color: var(--accent); text-shadow: var(--glow); }
.r-stat .rl { font-size: 0.68rem; letter-spacing: 2px; color: var(--muted); text-transform: uppercase; margin-top: 0.3rem; }

.result-breakdown {
  width: 100%; max-width: 700px; margin: 0 auto 2rem;
  background: var(--panel); border: 1px solid var(--border); border-radius: 10px;
  overflow: hidden; max-height: 260px; overflow-y: auto;
}
.result-breakdown::-webkit-scrollbar { width: 4px; }
.result-breakdown::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
.rb-row { display: flex; align-items: center; gap: 1rem; padding: 0.7rem 1.2rem; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 0.82rem; }
.rb-icon { font-size: 1rem; min-width: 20px; }
.rb-q { flex: 1; color: var(--text); }
.rb-a { color: var(--muted); font-size: 0.75rem; }

.result-actions { display: flex; gap: 0.8rem; flex-wrap: wrap; justify-content: center; }
.restart-btn {
  font-family: 'Orbitron', monospace; font-size: 0.8rem; letter-spacing: 2px;
  border: none; border-radius: 6px; padding: 0.9rem 1.8rem; cursor: pointer; transition: all 0.2s;
}
.primary-result-btn { color: var(--bg); background: var(--accent); box-shadow: var(--glow); }
.primary-result-btn:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(0,212,255,0.7); }
.ghost-result-btn { color: var(--accent); background: transparent; border: 1px solid rgba(0,212,255,0.4); }
.ghost-result-btn:hover { background: rgba(0,212,255,0.08); }

/* ── PAUSE OVERLAY ─────────────────────────────────────────────── */
#pause-overlay {
  display: none; position: fixed; top:0; left:0; right:0; bottom:0;
  background: rgba(4,13,26,0.93); backdrop-filter: blur(6px);
  z-index: 900; align-items: center; justify-content: center; flex-direction: column; gap: 1.5rem;
}
#pause-overlay.show { display: flex; }
.pause-title { font-family: 'Orbitron', monospace; font-size: 2.5rem; font-weight: 900; color: var(--accent); text-shadow: var(--glow); letter-spacing: 6px; }
.pause-sub { color: var(--muted); font-size: 0.85rem; letter-spacing: 2px; }
.resume-btn {
  font-family: 'Orbitron', monospace; font-size: 0.9rem; letter-spacing: 3px;
  color: var(--bg); background: var(--accent); border: none; border-radius: 6px;
  padding: 0.9rem 2.5rem; cursor: pointer; box-shadow: var(--glow); transition: all 0.2s; margin-top: 0.5rem;
}
.resume-btn:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(0,212,255,0.7); }

/* ── CHEAT SHEET ───────────────────────────────────────────────── */
#cheat-screen { padding: 1.5rem; justify-content: flex-start; overflow-y: auto; }

.cs-header {
  width: 100%; max-width: 920px; margin: 0 auto 1.5rem;
  display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
}
.cs-title { font-family: 'Orbitron', monospace; font-size: 1.5rem; font-weight: 900; color: var(--accent); text-shadow: var(--glow); }
.cs-title span { font-size: 0.7rem; display: block; color: var(--muted); letter-spacing: 3px; margin-top: 2px; }
.cs-back {
  font-family: 'Orbitron', monospace; font-size: 0.72rem; letter-spacing: 2px;
  color: var(--accent); background: transparent; border: 1px solid rgba(0,212,255,0.35);
  border-radius: 6px; padding: 0.5rem 1.2rem; cursor: pointer; transition: all 0.2s;
}
.cs-back:hover { background: rgba(0,212,255,0.1); box-shadow: var(--glow); }

.cs-grid {
  width: 100%; max-width: 920px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1rem; padding-bottom: 2rem;
}
.cs-card { background: var(--panel); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
.cs-card-head {
  background: linear-gradient(90deg, rgba(0,212,255,0.15), transparent);
  border-bottom: 1px solid var(--border); padding: 0.65rem 1rem;
  display: flex; align-items: center; gap: 0.6rem;
}
.cs-icon { font-size: 1rem; }
.cs-topic { font-family: 'Orbitron', monospace; font-size: 0.7rem; font-weight: 700; color: var(--accent); letter-spacing: 1.5px; text-transform: uppercase; }
.cs-card-body { padding: 0.85rem 1rem; }
.cs-item { display: flex; gap: 0.6rem; margin-bottom: 0.6rem; font-size: 0.82rem; line-height: 1.45; }
.cs-item:last-child { margin-bottom: 0; }
.cs-bullet { color: var(--accent); font-weight: 700; min-width: 10px; margin-top: 1px; }
.cs-key { color: #e8f4f8; font-weight: 600; }
.cs-val { color: var(--muted); }

.cs-play-btn {
  display: block; width: 100%; max-width: 320px; margin: 0 auto 2rem;
  font-family: 'Orbitron', monospace; font-size: 1rem; font-weight: 700; letter-spacing: 3px;
  color: var(--bg); background: var(--accent); border: none; border-radius: 6px;
  padding: 1rem; cursor: pointer; box-shadow: var(--glow); transition: all 0.2s;
}
.cs-play-btn:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(0,212,255,0.7); }

/* ── EFFECTS ───────────────────────────────────────────────────── */
.flash { position: fixed; top:0; left:0; right:0; bottom:0; pointer-events: none; z-index: 999; opacity: 0; transition: opacity 0.2s; }
.flash.green { background: rgba(0,255,136,0.06); }
.flash.red   { background: rgba(255,51,102,0.08); }
.flash.show  { opacity: 1; }

.combo-popup {
  position: fixed; top: 20%; left: 50%; transform: translate(-50%,-50%);
  font-family: 'Orbitron', monospace; font-size: 2rem; font-weight: 900;
  color: var(--yellow); text-shadow: 0 0 30px rgba(255,215,0,0.8);
  pointer-events: none; z-index: 9999; opacity: 0;
}
.combo-popup.pop { animation: comboPop 0.8s forwards; }
@keyframes comboPop {
  0%   { opacity:0; transform:translate(-50%,-50%) scale(0.5); }
  30%  { opacity:1; transform:translate(-50%,-50%) scale(1.2); }
  70%  { opacity:1; transform:translate(-50%,-50%) scale(1); }
  100% { opacity:0; transform:translate(-50%,-80%) scale(0.9); }
}
@keyframes flicker {
  0%,95%,100% { opacity:1; }
  96% { opacity:0.4; }
  97% { opacity:1; }
  98% { opacity:0.6; }
}

/* ── RESPONSIVE ────────────────────────────────────────────────── */
@media (max-width: 600px) {
  .q-card { padding: 1.2rem; }
  .q-text { font-size: 0.95rem; }
  .option-btn { font-size: 0.85rem; padding: 0.75rem 1rem; }
  .logo { font-size: 2rem; }
  .hud { flex-wrap: wrap; }
  .stage-cards { grid-template-columns: 1fr; }
  .result-actions { flex-direction: column; align-items: center; }
}
