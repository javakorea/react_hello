// SessionStart 훅 — 세션 시작·clear 직후 study-notes.md 의 「지금 위치」를 화면에 바로 띄운다.
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', '..', 'study-notes.md');
let msg;
try {
  const text = fs.readFileSync(file, 'utf8');
  const line = text.split(/\r?\n/).find(l => l.includes('지금 위치'));
  const pos = line ? line.replace(/\*\*/g, '').replace(/^.*지금 위치:\s*/, '').trim() : '(「지금 위치」 줄 없음)';
  msg = `📖 study-notes.md 불러옴 — 지금 위치: ${pos}`;
} catch (e) {
  msg = `⚠ study-notes.md 못 읽음 — ${e.message}`;
}
process.stdout.write(JSON.stringify({ systemMessage: msg }));
