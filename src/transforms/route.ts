import { RouteName } from '@/router'

type RouteRecordName = string | symbol | null | undefined

export const getTagRoute = (tagNmae: string) => {
  return `/tag/${tagNmae}`
}

export const getArticleRoute = (articleId: string) => {
  return `/article/${articleId}`
}

export const getCategoryRoute = (categoryCode: string) => {
  return `/category/${categoryCode}`
}

export const isSearchFlow = (name: RouteRecordName) => name === RouteName.Search

export const isArticleDetail = (name: RouteRecordName) =>
  name === RouteName.ArticleDetail
