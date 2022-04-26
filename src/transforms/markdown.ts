/**
 * @file Markdown parser
 * @module transform.markdown
 * @author Surmon <https://github.com/surmon-china>
 */

import sanitizeHTML from 'sanitize-html'
import { marked, Renderer } from 'marked'
import _escape from 'lodash/escape'
import highlight from '@/utils/highlight'
import { LOZAD_CLASS_NAME } from '@/utils/lozad'
import META from '@/config'

const trimHTML = (html: string) => html.replace(/\s+/g, ' ').replace(/\n/g, ' ')
interface RendererGetterOption {
  sanitize: boolean
  text: (text: string) => string
  headingID: (html: string, level: number, raw: string) => string
}
const getRenderer = (options?: Partial<RendererGetterOption>) => {
  const renderer = new Renderer()

  // text
  renderer.text = (text) => {
    return options?.text ? options.text(text) : text
  }

  // html: escape > sanitize
  renderer.html = (html) => {
    // https://github.com/apostrophecms/sanitize-html#default-options
    return options?.sanitize ? sanitizeHTML(_escape(html)) : html
  }

  // heading
  renderer.heading = (html, level, raw) => {
    const idText = options?.headingID
      ? `id="${options.headingID(html, level, raw)}"`
      : ''
    const safeRaw = _escape(raw)
    return `<h${level} ${idText} alt="${safeRaw}" title="${safeRaw}">${html}</h${level}>`
  }

  // paragraph
  renderer.paragraph = (text) => `<p>${text}</p>`

  // checkbox
  renderer.checkbox = (checked) => {
    return checked
      ? `<i class="checkbox checked iconfont icon-checkbox-selected"></i>`
      : `<i class="checkbox iconfont icon-checkbox-unselected"></i>`
  }

  // link: sanitize
  renderer.link = (href, title, text) => {
    const isSelf = href?.startsWith(META.url)
    const textIsImage = text.includes('<img')
    const linkHTML = trimHTML(`<a
      href="${href}"
      target="_blank"
      class="${textIsImage ? 'image-link' : 'link'}"
      title="${title || (textIsImage ? href : text)}"
      ${isSelf ? '' : 'rel="external nofollow noopener"'}
    >${text}</a>`)

    return !options?.sanitize
      ? linkHTML
      : sanitizeHTML(linkHTML, {
          allowedTags: ['a'],
          allowedAttributes: {
            a: ['href', 'target', 'class', 'title', 'rel', 'data-*']
          }
        })
  }

  // image: sanitize > popup
  renderer.image = (src, title, alt) => {
    // HTTP > proxy
    const imageHTML = trimHTML(`
      <img
        class="${LOZAD_CLASS_NAME}"
        title="${title || alt}"
        alt="${alt || title || src}"
        src="${src}"
        onclick="window.$popup?.vImage('${src}')"
      />
    `)

    return !options?.sanitize
      ? imageHTML
      : sanitizeHTML(imageHTML, {
          allowedTags: ['img'],
          allowedAttributes: {
            img: ['alt', 'onclick', 'class', 'title', 'data-*']
          }
        })
  }

  // code: line number
  renderer.code = (code, lang, isEscaped) => {
    let _code = code
    let _isEscaped = isEscaped
    if (renderer.options.highlight) {
      const output = renderer.options.highlight(_code, lang || '')
      if (output != null && output !== _code) {
        _isEscaped = true
        _code = output
      }
    }

    const lineNumbers = _code
      .split('\n')
      .map((_, i) => `<li class="code-line-number">${i + 1}</li>`.replace(/\s+/g, ' '))
      .join('')

    const readOnlyAttrs = `
      contenteditable="true"
      oncut="return false"
      onpaste="return false"
      onkeydown="if(event.metaKey) return true; return false;"
    `

    return lang
      ? `
        <pre data-lang="${lang}">
          <ul class="code-lines">${lineNumbers}</ul>
          <code
            ${readOnlyAttrs}
            class="${renderer.options.langPrefix}${encodeURI(lang)}"
          >${_isEscaped ? _code : encodeURI(_code)}\n</code>
        </pre>\n
      `
      : `
        <pre>
          <ul class="code-lines">${lineNumbers}</ul>
          <code ${readOnlyAttrs}>${_isEscaped ? _code : encodeURI(_code)}\n</code>
        </pre>
      `
  }

  return renderer
}

marked.setOptions({
  gfm: true,
  breaks: false,
  pedantic: false,
  smartLists: true,
  smartypants: false,
  langPrefix: 'hljs language-',
  highlight(code, language) {
    return highlight.getLanguage(language)
      ? highlight.highlight(code, { language }).value
      : highlight.highlightAuto(code).value
  }
})

export interface MarkdownRenderOption {
  sanitize?: boolean
  headingIDRenderer?: RendererGetterOption['headingID']
}
export const markdownToHTML = (markdown: string, options?: MarkdownRenderOption) => {
  if (!markdown || typeof markdown !== 'string') {
    return ''
  }

  const parseOptions: marked.MarkedOptions = {
    renderer: getRenderer({ headingID: options?.headingIDRenderer })
  }

  // sanitize
  if (options?.sanitize) {
    parseOptions.renderer = getRenderer({
      sanitize: true,
      headingID: options?.headingIDRenderer
    })
  }

  return marked.parse(markdown, parseOptions)
}
