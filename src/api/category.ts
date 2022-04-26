import request from '@/utils/request'

const baseApi = '/free/category/'

const categoryApi = {
  list: `${baseApi}list`
}

class Service {
  /**
   * @description GET 文章列表
   */
  static categoryList(params: any) {
    return request({
      url: categoryApi.list,
      method: 'GET',
      json: true,
      params
    })
  }
}

export default Service
