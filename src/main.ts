import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'

// element-Plus
import ElementPlus from './plugins/element'

createApp(App).use(ElementPlus).use(router).use(store).mount('#app')
