import { App } from 'vue'

import {
  ElIcon,
  ElLoading,
  ElCard,
  ElButton,
  ElRow,
  ElInput,
  ElCol,
  ElMenu,
  ElMenuItem,
  ElDivider,
  ElTag,
  ElPagination
} from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

export default function importUiFramework(app: App) {
  // 按需载入 Element Plus 组件
  app
    .use(ElButton)
    .use(ElCard)
    .use(ElLoading)
    .use(ElIcon)
    .use(ElRow)
    .use(ElInput)
    .use(ElCol)
    .use(ElMenu)
    .use(ElMenuItem)
    .use(ElDivider)
    .use(ElTag)
    .use(ElPagination)
  return app
}
