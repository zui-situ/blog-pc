import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'

const mdPlugin = require('vite-plugin-markdown')

const CWD = process.cwd()

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 环境变量
  const { VITE_BASE_URL, VITE_API_BASE_URL, VITE_API_PROXY_URL } = loadEnv(mode, CWD)
  return {
    plugins: [
      vue(),
      VueSetupExtend(), // 可以更优雅的写component的name
      // // 按需载入 Element Plus
      // styleImport({
      //   libs: [
      //     {
      //       libraryName: 'element-plus',
      //       esModule: true,
      //       ensureStyleFile: true,
      //       resolveStyle: (name) => {
      //         return `element-plus/lib/theme-chalk/${name}.css`
      //       },
      //       resolveComponent: (name) => {
      //         return `element-plus/lib/${name}`
      //       }
      //     }
      //   ]
      // }),
      mdPlugin.plugin({
        mode: ['html']
      })
    ],
    root: resolve(__dirname), // 项目根目录（index.html 文件所在的位置）
    publicDir: 'public', // 静态资源服务的文件夹
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
      }
    },
    base: VITE_BASE_URL, // 设置打包路径
    server: {
      port: 4500, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      // 设置代理，根据我们项目实际情况配置
      proxy: {
        [VITE_API_PROXY_URL]: {
          target: VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
          // 给导入的路径最后加上 ;
          // additionalData: `@import "./src/assets/style/variables.scss";`
        }
      }
    },
    optimizeDeps: {
      include: [
        // Tree shaking
        'highlight.js/lib/core',
        'highlight.js/lib/languages/go',
        'highlight.js/lib/languages/css',
        'highlight.js/lib/languages/sql',
        'highlight.js/lib/languages/php',
        'highlight.js/lib/languages/xml',
        'highlight.js/lib/languages/json',
        'highlight.js/lib/languages/bash',
        'highlight.js/lib/languages/less',
        'highlight.js/lib/languages/scss',
        'highlight.js/lib/languages/yaml',
        'highlight.js/lib/languages/rust',
        'highlight.js/lib/languages/java',
        'highlight.js/lib/languages/shell',
        'highlight.js/lib/languages/nginx',
        'highlight.js/lib/languages/stylus',
        'highlight.js/lib/languages/python',
        'highlight.js/lib/languages/javascript',
        'highlight.js/lib/languages/typescript'
      ],
      exclude: [
        // Effect polyfill
        'intersection-observer',
        // Tree shaking
        'highlight.js',
        // Node
        'express',
        'lru-cache',
        'node-schedule',
        'cookie-parser',
        'serialize-javascript',
        'cross-env',
        'simple-netease-cloud-music',
        'wonderful-bing-wallpaper',
        '@vue/compiler-sfc',
        '@vue/server-renderer'
      ]
    },
    build: {
      // https://vitejs.dev/config/#build-csscodesplit
      // https://vitejs.dev/guide/features.html#css-code-splitting
      cssCodeSplit: false,
      sourcemap: true,
      manifest: true,
      rollupOptions: {
        output: {
          entryFileNames: '[name]-[hash].js',
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: '[name]-[hash].[ext]',
          // eslint-disable-next-line consistent-return
          manualChunks(id) {
            if (id.includes('/node_modules/')) {
              const expansions = [
                'swiper',
                // MARK: important > swiper need dom7
                'dom7',
                'amplitudejs',
                'emoji-233333',
                'lozad',
                'marked',
                'amplitude',
                'highlight.js',
                'ua-parse-js'
              ]
              if (expansions.some((exp) => id.includes(`/node_modules/${exp}`))) {
                return 'expansion'
              }
              return 'vendor'
            }
          }
        }
      }
    }
  }
})
