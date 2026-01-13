import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 9999
  },
  build: {
    transpile: ["three"]
  },
  vite: {
    vue: {
      ...templateCompilerOptions
    }
  }
})
