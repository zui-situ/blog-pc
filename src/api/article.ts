import request from '@/utils/request'

const baseApi = '/free/article/'

const articleApi = {
  articleList: `${baseApi}list`,
  articleDetail: `${baseApi}`
}

class Service {
  /**
   * @description GET 文章列表
   */
  static articleList(params: any) {
    return request({
      url: articleApi.articleList,
      method: 'GET',
      json: true,
      params
    })
  }

  /**
   * @description GET 文章详情
   */
  static articleDetail(id: string | string[]) {
    return request({
      url: articleApi.articleDetail + id,
      method: 'GET',
      json: true
    })
  }
}

export default Service
