<template>
  <div>
    <article-list-header icon="icon-search" :backgroundImage="searchImage">
      <span class="header">{{ `和 “${keyword}” 有关的所有文章` }} </span>
    </article-list-header>
    <article-list
      :articles="getArticleList"
      @loadmore="loadmoreArticles"
      :fetching="fetching"
    ></article-list>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, watch, onBeforeMount, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/article'
import ArticleList from '@/components/articleList/list.vue'
import ArticleListHeader from '@/components/articleList/header.vue'
import { useMeta } from '@/transforms/meta'
import searchImg from '@/assets/search.png'

const props = defineProps({
  keyword: {
    type: String,
    required: true
  }
})

const searchImage = ref(searchImg)

const articleListStore = useArticleStore()

const { getArticleList, pagination, fetching } = storeToRefs(articleListStore)

const { actionArticleList } = articleListStore

const loadmoreArticles = async () => {
  const currentPage = pagination.value?.currentPage || 0
  await actionArticleList({
    pageNo: currentPage + 1
  })
}

watch(
  () => props.keyword,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      actionArticleList({ keyword: newVal, pageNo: 1 })
    }
  }
)

useMeta(() => {
  return { pageTitle: `${props.keyword} | search` }
})

onBeforeMount(() => {
  actionArticleList({ keyword: props.keyword, pageNo: 1 })
})
</script>

<style scoped lang="scss">
.header {
  font-size: 1.4rem;
}
</style>
