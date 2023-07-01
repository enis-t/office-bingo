/// <reference types="vitest" />

// internal
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import path from 'path'

// plugins
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'

// https://vitejs.dev/config/
export default defineConfig( {
  css: { modules: { localsConvention: 'camelCase' } },

  plugins: [
    react(),
    eslint( { fix: true } ),
    stylelint( {
      files: [ '**/*.scss' ],
      fix: true,
    } ),
  ],
  resolve: { alias: { '@': path.resolve( __dirname, './src' ) } },
  test: {
    ...configDefaults,
    environment: 'jsdom',
    globals: true,
    setupFiles: [ './src/tests/setup.ts' ],
  },

} )
