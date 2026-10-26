import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true, // 이미 켜져 있으면 5174 로 또 띄우지 말고 오류 — 켜진 서버를 그대로 쓴다
  },
})
