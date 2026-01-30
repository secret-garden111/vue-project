import { fileURLToPath, URL } from 'node:url'

import { defineConfig, UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
// 引入svg管理插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default ({ command, mode }: any) => {
  // 获取各种环境下的对应变量
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueDevTools(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        enable: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/globalVars.scss";`,
        },
      },
    },
    // 代理跨域
    server: {
      proxy: {
        '/api': {
          // 获取数据的服务器地址
          target: env.VITE_SERVE,
          // 是否需要代理跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path: any) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
}
