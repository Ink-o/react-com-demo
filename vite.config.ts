// 引入 vitest 导出的模块包，在 vite 配置中增加 test 属性配置 vitest
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  // vitest 配置
  test: {
    // 指定构建环境为 dom 环境。默认为 nodejs 环境
    environment: 'jsdom',
    include: ['./components/**/*.{test,spec}.?(c|m)[jt]s?(x)']
  }
})
