import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward API + uploads to the Express backend during development
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
})