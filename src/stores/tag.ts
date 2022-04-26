import { defineStore } from 'pinia'
import tagApi from '@/api/tag'
import { Tag } from '@/types/index'

const useTagStore = defineStore({
  id: 'tag', // id必填，且需要唯一
  state: () => {
    return {
      tags: [] as Array<Tag>
    }
  },
  actions: {
    async actionTagList() {
      const res = await tagApi.tagList({
        status: 1,
        pageNo: 1,
        pageSize: 999
      })
      if (res.code === 200) {
        this.setTag(res.data.list)
      }
    },
    setTag(list: any) {
      this.tags = list
    }
  },
  getters: {
    getTagList: (state) => {
      return state.tags
    }
  }
})

export default useTagStore
