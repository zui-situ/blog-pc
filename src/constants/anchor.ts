export const ARTICLE_CONTENT_HEADING_ELEMENT_ID_PREFIX = 'A_article_content_heading'
export const getArticleContentHeadingElementID = (level: number, heading: string) => {
  return `${ARTICLE_CONTENT_HEADING_ELEMENT_ID_PREFIX}_${level}_${heading}`
}

export const ARTICLE_CONTENT_ELEMENT_ID = 'A_article_content'
export const ARTICLE_READMORE_ELEMENT_ID = 'A_article_readmore'
