import { createHead, useHead, HeadObject, HeadAttrs } from '@vueuse/head'
import type { ComputedGetter } from '@vue/reactivity'
import { computed, inject } from 'vue'

export interface MetaResult {
  readonly headTags: string
  readonly htmlAttrs: string
  readonly bodyAttrs: string
}

const MetaTitlerSymbol = Symbol('meta-titler')
type MeatTitler = (title: string) => string
export interface MetaConfig {
  titler?: MeatTitler
}

export const createMeta = (metaConfig?: MetaConfig) => {
  const head = createHead()
  return {
    ...head,
    install(app: any, ...rest: any[]) {
      app.provide(MetaTitlerSymbol, metaConfig?.titler || ((title: any) => title))
      app.use(head, ...rest)
      return head
    }
  }
}

export interface MetaObject extends HeadObject {
  title?: string
  pageTitle?: string
  keywords?: string
  description?: string
}

export function useMeta(source: MetaObject | ComputedGetter<MetaObject>) {
  const titler = inject(MetaTitlerSymbol) as MeatTitler

  const meta = computed<HeadObject>(() => {
    const sourceObject = typeof source === 'function' ? source() : source
    const { title, pageTitle, keywords, description, ...restSource } = sourceObject

    // title | page title
    const mTitle = title || (pageTitle ? titler(pageTitle) : '')

    // metas
    const mMeta = (restSource.meta as HeadAttrs[]) || []

    // keywords
    if (keywords) {
      mMeta.push({
        key: 'keywords',
        name: 'keywords',
        content: keywords
      })
    }

    // description
    if (description) {
      mMeta.push({
        key: 'description',
        name: 'description',
        content: description
      })
    }

    // html i18n
    const mHTMLAttrs = {
      ...restSource.htmlAttrs
    }

    return {
      ...restSource,
      title: mTitle,
      meta: mMeta,
      htmlAttrs: mHTMLAttrs
    }
  })

  return useHead(meta)
}
