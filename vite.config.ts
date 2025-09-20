// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1400,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('pdfjs-dist')) {
              return 'pdfjs'
            }
            if (id.includes('gsap')) {
              return 'gsap'
            }
            if (id.includes('@react-three') || id.includes('three')) {
              return 'three'
            }
            return 'vendor'
          }
        },
      },
    },
  },
})
