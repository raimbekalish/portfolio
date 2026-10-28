import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { workPages } from './scripts/work-pages'

export default defineConfig({
  plugins: [react(), workPages()],
  base: '/',
})
