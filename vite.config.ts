import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { workPages } from './scripts/work-pages'
import { dropUnusedImages } from './scripts/drop-unused-images'

export default defineConfig({
  plugins: [react(), workPages(), dropUnusedImages()],
  base: '/',
})
