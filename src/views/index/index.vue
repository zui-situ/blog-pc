<template>
  <div>
    <ArticleList
      :articles="getArticleList"
      @loadmore="loadmoreArticles"
      :fetching="fetching"
    />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/article'
import ArticleList from '@/components/articleList/list.vue'
import { useMeta } from '@/transforms/meta'

const articleListStore = useArticleStore()
const { getArticleList, pagination, fetching } = storeToRefs(articleListStore)

const { actionArticleList } = articleListStore

const loadmoreArticles = async () => {
  const currentPage = pagination.value?.currentPage || 0
  await actionArticleList({
    pageNo: currentPage + 1
  })
}

useMeta(() => {
  return { pageTitle: '首页' }
})

onBeforeMount(() => {
  actionArticleList({ pageNo: 1 })
})
</script>

<style scoped lang="scss"></style>
