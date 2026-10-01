import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Em produção o próprio backend serve o dist/ (uma porta só). O proxy é só
// para desenvolver com `npm run dev`.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      '/api': { target: 'http://127.0.0.1:8001' },
      '/ws': { target: 'ws://127.0.0.1:8001', ws: true },
    },
  },
})
