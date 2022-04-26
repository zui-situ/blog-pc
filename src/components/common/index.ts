import { App } from 'vue'

import Divider from './divider.vue'
import Udate from './udate'
import Placeholder from './placeholder'
import Empty from './empty.vue'
import SkeletonLine from './skeleton/line.vue'
import SkeletonBase from './skeleton/base.vue'
import SkeletonParagraph from './skeleton/paragraph.vue'

export default (app: App) => {
  app.component(Divider.name as string, Divider)
  app.component(Udate.name, Udate)
  app.component(Empty.name, Empty)
  app.component(Placeholder.name, Placeholder)
  app.component(SkeletonBase.name as string, SkeletonBase)
  app.component(SkeletonLine.name as string, SkeletonLine)
  app.component(SkeletonParagraph.name as string, SkeletonParagraph)
}
