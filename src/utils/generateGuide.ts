import type { Round } from '../data/rounds'

export function generateGuide(rounds: Round[]): void {
  const roundsHtml = rounds.map((round, i) => `
    <div class="round-card">
      <div class="round-header"><span class="round-num">Round ${i + 1}</span></div>
      <div class="round-category">${round.category}</div>
      <div class="round-scenario">${round.scenario} <em>${round.context}</em></div>
      <table class="points-table" style="margin:12px 0;">
        <thead><tr><th>#</th><th>Answer</th><th>Pts</th></tr></thead>
        <tbody>
          ${round.answers.map((a, j) => `
            <tr>
              <td>${j + 1}</td>
              <td>
                <div>${a.text}</div>
                <div style="font-size:11px;color:#6B7280;margin-top:3px;">${a.insight}</div>
              </td>
              <td><strong>${a.points}</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="round-note">${round.facilitatorNote}</div>
    </div>
  `).join('')

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Facilitator Guide — Psych Safety Challenge</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --amber: #D97706; --text: #111827; --muted: #6B7280; --border: #E5E7EB; --surface: #F9FAFB; }
    body { font-family: 'Inter', system-ui, sans-serif; color: var(--text); background: #fff; font-size: 14px; line-height: 1.6; max-width: 780px; margin: 0 auto; padding: 48px 40px; }
    .no-print { background: var(--amber); color: #fff; border: none; border-radius: 8px; padding: 10px 24px; font-size: 14px; font-weight: 700; cursor: pointer; margin-bottom: 40px; font-family: inherit; }
    .header { margin-bottom: 40px; border-bottom: 3px solid var(--amber); padding-bottom: 24px; }
    .header-label { font-size: 11px; font-weight: 700; color: var(--amber); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
    h1 { font-size: 32px; font-weight: 900; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 8px; }
    .subtitle { font-size: 15px; color: var(--muted); }
    h2 { font-size: 18px; font-weight: 800; margin-bottom: 12px; margin-top: 32px; }
    .section { margin-bottom: 32px; }
    .flow-step { display: flex; gap: 16px; margin-bottom: 12px; align-items: flex-start; }
    .step-num { width: 28px; height: 28px; border-radius: 50%; background: var(--amber); color: #fff; font-size: 13px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
    .step-text { flex: 1; }
    .step-text strong { display: block; font-weight: 700; margin-bottom: 2px; }
    .points-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 13px; }
    .points-table th { background: var(--surface); font-weight: 700; text-align: left; padding: 8px 12px; border: 1px solid var(--border); }
    .points-table td { padding: 8px 12px; border: 1px solid var(--border); vertical-align: top; }
    .points-table tr:nth-child(even) td { background: var(--surface); }
    .round-card { border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 16px; break-inside: avoid; }
    .round-header { margin-bottom: 4px; }
    .round-num { font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
    .round-category { font-size: 15px; font-weight: 800; margin-bottom: 6px; }
    .round-scenario { font-size: 13px; color: var(--muted); margin-bottom: 8px; line-height: 1.5; }
    .round-note { font-size: 12px; background: #FFFBEB; border-left: 3px solid var(--amber); padding: 8px 12px; border-radius: 0 4px 4px 0; line-height: 1.5; }
    .tip-box { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 12px; }
    .tip-label { font-size: 11px; font-weight: 700; color: var(--amber); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
    ul { padding-left: 20px; margin-bottom: 12px; }
    ul li { margin-bottom: 6px; }
    p { margin-bottom: 12px; }
    .footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid var(--border); font-size: 12px; color: var(--muted); }
    @media print {
      .no-print { display: none; }
      body { padding: 24px 32px; font-size: 12px; }
      h1 { font-size: 26px; }
      h2 { font-size: 16px; margin-top: 24px; }
      .round-card { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <button class="no-print" onclick="window.print()">Print / Save as PDF →</button>
  <div class="header">
    <div class="header-label">Facilitator Guide</div>
    <h1>Psych Safety Challenge</h1>
    <p class="subtitle">A meeting room game for leadership teams. ${rounds.length} rounds. 2–4 teams. ~${rounds.length * 5}–${rounds.length * 7} minutes.</p>
  </div>

  <div class="section">
    <h2>How a Round Works</h2>
    <div class="flow-step"><div class="step-num">1</div><div class="step-text"><strong>Read the scenario out loud</strong> Give teams 30–60 seconds to discuss quietly before answering.</div></div>
    <div class="flow-step"><div class="step-num">2</div><div class="step-text"><strong>Take an answer from one team</strong> Click their team name at the top to make them active.</div></div>
    <div class="flow-step"><div class="step-num">3</div><div class="step-text"><strong>Open the Judge Panel</strong> Click "Judge Answer" — only you can see this. It shows all answers with points.</div></div>
    <div class="flow-step"><div class="step-num">4</div><div class="step-text"><strong>Award or strike</strong> If their answer is close enough to one on the board, click Award. If not, click Strike.</div></div>
    <div class="flow-step"><div class="step-num">5</div><div class="step-text"><strong>Discuss</strong> After each reveal, use the Facilitator Note for deeper discussion prompts.</div></div>
  </div>

  <div class="section">
    <h2>Scoring</h2>
    <table class="points-table">
      <thead><tr><th>Rank</th><th>What It Means</th><th>Points</th></tr></thead>
      <tbody>
        <tr><td>#1</td><td>Most preferred by employees — highest trust response</td><td>500</td></tr>
        <tr><td>#2</td><td>Strong response — collaborative, supportive</td><td>400</td></tr>
        <tr><td>#3</td><td>Good but incomplete</td><td>300</td></tr>
        <tr><td>#4</td><td>Well-intentioned but disempowering</td><td>200</td></tr>
        <tr><td>#5</td><td>Common management default — lowest trust response</td><td>100</td></tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Round Reference &amp; Answer Key</h2>
    <p style="color:var(--muted);font-size:13px;margin-bottom:20px;">All answers listed #1 (most preferred) → #5 (least preferred). Use this to judge answers off-screen.</p>
    ${roundsHtml}
  </div>

  <div class="footer">
    <p>Psych Safety Challenge · Built by Matt Beran · <a href="https://mattberan.com">mattberan.com</a> · Based on research by Amy Edmondson, Google Project Aristotle, and Kim Scott</p>
  </div>
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
}
