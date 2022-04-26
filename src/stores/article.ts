import { defineStore } from 'pinia'
import Service from '@/api/article'
import { Article } from '@/types/index'
import { markdownToHTML } from '@/transforms/markdown'
import { getArticleContentHeadingElementID } from '@/constants/anchor'

export const LONG_ARTICLE_THRESHOLD = 16688 // 是否长文章的

const PAGE_SIZE = 10

export interface pagination {
  count?: number
  limit?: number
  currentPage?: number
  total?: number
}

export const useArticleStore = defineStore({
  id: 'article', // id必填，且需要唯一
  state: () => {
    return {
      list: [] as Array<Article>,
      fetching: false,
      pagination: {} as pagination
    }
  },
  actions: {
    async actionArticleList(params: any = {}) {
      const isRestart = !params.pageNo || params.pageNo === 1
      const isLoadMore = !isRestart && params.pageNo > 1

      // 清空已有数据
      if (isRestart) {
        this.list = []
        this.pagination = {}
      }

      this.fetching = true

      const req = { ...params, status: 1, pageSize: PAGE_SIZE }
      Service.articleList(req)
        .then((res) => {
          if (res.code === 200) {
            this.setPagination(res.data.pagination)
            if (isLoadMore) {
              this.list.push(...res.data.list)
            } else {
              this.list = res.data.list
            }
          }
        })
        .finally(() => {
          this.fetching = false
        })
    },
    setPagination(pagination: any) {
      this.pagination = pagination
    }
  },
  getters: {
    getArticleList: (state) => {
      return state.list
    },
    getPagination: (state) => {
      return state.pagination
    },
    getFetching: (state) => {
      return state.fetching
    }
  }
})

export interface ArticleHeading {
  text: string
  level: number
  id: string
}
const renderArticleMarkdown = (
  markdown: string
): { html: string; headings: ArticleHeading[] } => {
  const headings: Array<ArticleHeading> = []
  const html = markdownToHTML(markdown, {
    sanitize: false,
    relink: false,
    headingIDRenderer: (html: string, level: number, raw: string) => {
      const id = getArticleContentHeadingElementID(
        level,
        raw.toLowerCase().replace(/[^a-zA-Z0-9\u4E00-\u9FA5]+/g, '-')
      )
      headings.push({ level, id, text: raw })
      return id
    }
  })

  return { html, headings }
}

export const useArticleDetailStore = defineStore('articleDetail', {
  state: () => ({
    fetching: false,
    article: null as null | Article,
    renderedFullContent: true
  }),
  getters: {
    getArticleDetail: (state) => {
      return state.article
    },
    contentLength(): number {
      return this.article?.content.length || 0
    },
    isLongContent(): boolean {
      return Boolean(this.article && this.contentLength >= LONG_ARTICLE_THRESHOLD)
    },
    splitIndex(): number | null {
      if (!this.article || !this.isLongContent) {
        return null
      }

      const halfIndex = Math.floor(this.contentLength / 2)
      const index =
        halfIndex >= LONG_ARTICLE_THRESHOLD
          ? Math.floor(LONG_ARTICLE_THRESHOLD * 0.68)
          : halfIndex
      // 坐标优先级：H5 > H4 > H3 > \n\n
      const shortContent = this.article.content.substring(0, index)
      const lastH5Index = shortContent.lastIndexOf('\n####')
      const lastH4Index = shortContent.lastIndexOf('\n####')
      const lastH3Index = shortContent.lastIndexOf('\n###')
      const lastLineIndex = shortContent.lastIndexOf('\n\n')
      const splitIndex = Math.max(lastH5Index, lastH4Index, lastH3Index, lastLineIndex)
      // console.log('-----content length', this.contentLength, index, splitIndex)
      return splitIndex
    },
    defaultContent(): null | {
      markdown: string
      html: string
      headings: ArticleHeading[]
    } {
      if (!this.article) {
        return null
      }
      const markdown = this.isLongContent
        ? this.article.content.substring(0, this.splitIndex!)
        : this.article.content
      const { html, headings } = renderArticleMarkdown(markdown)
      return {
        markdown,
        html,
        headings
      }
    },
    moreContent(): null | {
      markdown: string
      html: string
      headings: ArticleHeading[]
    } {
      if (this.article && this.isLongContent) {
        const markdown = this.article.content.substring(this.splitIndex!)
        const { html, headings } = renderArticleMarkdown(markdown)
        return {
          markdown,
          html,
          headings
        }
      }
      return null
    }
  },
  actions: {
    renderFullContent() {
      this.renderedFullContent = true
    },
    async fetchArticleDetail(articleId: string | string[]) {
      this.fetching = true
      Service.articleDetail(articleId)
        .then((res) => {
          if (res.code === 200) {
            this.setArticle(res.data)
          }
        })
        .finally(() => {
          this.fetching = false
        })
    },
    setArticle(list: any) {
      this.article = list
    }
  }
})
