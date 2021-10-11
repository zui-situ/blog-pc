import { createApp } from 'vue'
import importUiFramework from '@/utils/import-ui-framework'
import router from '@/router/index'
import { key, store } from '@/store'
import App from './App.vue'
import '@/assets/style/basic.scss'
// import 'element-plus/dist/index.css'

const app = createApp(App)
importUiFramework(app).use(router).use(store, key).mount('#app')
