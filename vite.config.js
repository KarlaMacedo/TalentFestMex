import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000 // Ajustar el límite de tamaño de chunk a 1 MB
  }
})
