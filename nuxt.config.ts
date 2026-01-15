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
  modules: ['@tresjs/nuxt', '@nuxt/devtools'],
  tres: {
    glsl: true,
  },
  vite: {
    vue: {
      ...templateCompilerOptions
    },
    optimizeDeps: {
      include: ['@tresjs/cientos', 'three-custom-shader-material/vanilla']
    },
    ssr: {
      noExternal: ['@tresjs/cientos', 'three-custom-shader-material/vanilla']
    },
  }
})