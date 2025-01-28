import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { fileURLToPath } from 'url'

// __dirname 대체
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hook': path.resolve(__dirname, './src/hook'),
      '@zustand': path.resolve(__dirname, './src/zustand'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@constant': path.resolve(__dirname, './src/constant'),
      '@api': path.resolve(__dirname, './src/api'),
      '@plugins': path.resolve(__dirname, './src/plugins'),
    },
  },
  server: {
    hmr: {
      overlay: true, // 오류 메시지를 브라우저 화면에 띄울지 여부
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})