// SessionStart 훅 — 세션 시작·clear 직후 study-notes.md 의 「지금 위치」와 개발 서버 주소를 화면에 바로 띄운다.
const fs = require('fs');
const net = require('net');
const path = require('path');

const root = path.join(__dirname, '..', '..');

let pos;
try {
  const text = fs.readFileSync(path.join(root, 'study-notes.md'), 'utf8');
  const line = text.split(/\r?\n/).find(l => l.includes('지금 위치'));
  pos = `📖 study-notes.md 불러옴 — 지금 위치: ${line ? line.replace(/\*\*/g, '').replace(/^.*지금 위치:\s*/, '').trim() : '(「지금 위치」 줄 없음)'}`;
} catch (e) {
  pos = `⚠ study-notes.md 못 읽음 — ${e.message}`;
}

// vite.config.js 에 server.port 가 있으면 그 값, 없으면 Vite 기본값 5173
let port = 5173;
try {
  const m = fs.readFileSync(path.join(root, 'vite.config.js'), 'utf8').match(/port\s*:\s*(\d+)/);
  if (m) port = Number(m[1]);
} catch (e) { /* 기본값 사용 */ }

const sock = net.connect({ port, host: 'localhost' });
const done = running => {
  sock.destroy();
  const state = running ? '✅ 지금 켜져 있음' : '⏹ 꺼져 있음 — 터미널에서 npm run dev';
  process.stdout.write(JSON.stringify({ systemMessage: `${pos}\n▶ 실행: http://localhost:${port}  (${state})` }));
  process.exit(0);
};
sock.setTimeout(500, () => done(false));
sock.on('connect', () => done(true));
sock.on('error', () => done(false));
