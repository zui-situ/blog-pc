import { createApp } from 'vue'
// import importUiFramework from '@/utils/import-ui-framework'
import router from '@/router/index'
import store from '@/stores'
import App from './App.vue'
import '@/styles/index.scss'
import commonComponents from '@/components/common/index'
import { exportLozadToGlobal } from '@/utils/lozad'
import META from '@/config/index'
import { createMeta } from '@/transforms/meta'

// import 'element-plus/dist/index.css'

const meta = createMeta({
  titler: (title: string) => `${title} | ${META.title}`
})

exportLozadToGlobal()

const app = createApp(App)
  // importUiFramework(app)
  .use(router)
  .use(store)
  .use(commonComponents)
  .use(meta)
  .mount('#app')
