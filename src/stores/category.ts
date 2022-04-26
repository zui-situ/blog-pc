import { defineStore } from 'pinia'
import categoryApi from '@/api/category'
import { Category } from '@/types/index'

const useCategoryStore = defineStore({
  id: 'category', // id必填，且需要唯一
  state: () => {
    return {
      categories: [] as Array<Category>
    }
  },
  actions: {
    async actionCategoryList() {
      const res = await categoryApi.categoryList({
        status: 1,
        pageNo: 1,
        pageSize: 999
      })
      if (res.code === 200) {
        this.setCategory(res.data.list)
      }
    },
    setCategory(list: any) {
      this.categories = list
    }
  },
  getters: {
    getCategoryList: (state) => {
      return state.categories
    }
  }
})

export default useCategoryStore
