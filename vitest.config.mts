import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    // The repo lives on an exFAT/SMB volume where macOS writes `._*`
    // AppleDouble sidecars next to every file. They are binary and break
    // the transform if collected as tests.
    exclude: ['**/node_modules/**', '**/.next/**', '**/._*'],
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})

