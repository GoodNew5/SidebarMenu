import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const NODE_ENV = process.env.NODE_ENV

process.env = { ...process.env, ...loadEnv(NODE_ENV || '', process.cwd()) }

export default defineConfig({
  base: process.env.VITE_BASE_DIR,
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
      inject: 'body-last'
    })
  ],
  build: {
    target: 'esnext'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.vue', '.ts', '.js', '.json']
  },
  mode: NODE_ENV
})
