import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/biolink/', // Deve ser exatamente o nome do repositório no GitHub
})