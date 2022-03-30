import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: apiPath => apiPath.replace(/^\/api/, ''),
        secure: false,
        headers: {
          Referer: 'http://localhost:3001'
        }
      }
    }
  },
  envDir: path.resolve(__dirname, 'environment'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  },
  plugins: [
    vue(),
    eslintPlugin({
      cache: false // 禁用 eslint 缓存
    }),
    vueJsx()
  ]
})
