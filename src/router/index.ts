import { createRouter, Router, RouteRecordRaw, createWebHistory } from 'vue-router'

export enum RouteName {
  Home = 'home',
  ArticleDetail = 'article-detail',
  Tag = 'tag-list',
  Category = 'category-list',
  Search = 'Search-list'
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteName.Home,
    component: import('@/views/index/index.vue')
  },
  {
    path: '/article/:id',
    name: RouteName.ArticleDetail,
    component: import('@/views/articleDetail/index.vue')
  },
  {
    path: '/tag/:tag_name',
    name: RouteName.Tag,
    props(to) {
      return {
        tagName: to.params.tag_name
      }
    },
    component: import('@/views/tag/index.vue')
  },
  {
    path: '/category/:category_code',
    name: RouteName.Category,
    props(to) {
      return {
        categoryCode: to.params.category_code
      }
    },
    component: import('@/views/category/index.vue')
  },
  {
    path: '/search/:keyword',
    name: RouteName.Search,
    props(to) {
      return {
        keyword: to.params.keyword
      }
    },
    component: import('@/views/search/index.vue')
  }
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'link-active'
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
