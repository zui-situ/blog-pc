import request from '@/utils/request'

const baseApi = '/free/tag/'

const tagApi = {
  tagList: `${baseApi}list`
}

class Service {
  /**
   * @description GET 文章列表
   */
  static tagList(params: any) {
    return request({
      url: tagApi.tagList,
      method: 'GET',
      json: true,
      params
    })
  }
}

export default Service
