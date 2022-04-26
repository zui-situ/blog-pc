export type Todo = {
  id: number
  title: string
  completed: boolean
}

export type TitleInfo = {
  value: string
  color: string
}

export interface Article {
  _id: string
  title: string
  readNum: number
  content: string
  status: number
  user: string
  description: string
  cover: string
  classification: {
    name: string
    _id: string
    comments: number
  }
  label: [
    {
      name: string
      _id: string
    }
  ]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Tag {
  _id: string
  name: string
  cover: string
  icon: string
  status: number
  articleCount: number
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Category {
  _id: string
  name: string
  code: string
  cover: string
  icon: string
  status: number
  createdAt: string
  updatedAt: string
  __v: number
}
