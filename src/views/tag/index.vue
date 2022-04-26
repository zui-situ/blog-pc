<template>
  <div>
    <ArticleListHeader :backgroundImage="currentTagImage" :icon="currentTagIcon">
      <span class="header"> #{{ currentTag?.name }} </span>
    </ArticleListHeader>
    <ArticleList
      :articles="getArticleList"
      @loadmore="loadmoreArticles"
      :fetching="fetching"
    ></ArticleList>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, watch, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/article'
import useTagStore from '@/stores/tag'
import ArticleList from '@/components/articleList/list.vue'
import ArticleListHeader from '@/components/articleList/header.vue'
import { useMeta } from '@/transforms/meta'

const props = defineProps(['tagName'])

const articleListStore = useArticleStore()

const { getArticleList, pagination, fetching } = storeToRefs(articleListStore)

const { actionArticleList } = articleListStore

const tagStore = useTagStore()

const currentTag = computed(() =>
  tagStore.tags.find((tag) => tag.name === props.tagName)
)

const currentTagImage = computed(() => currentTag.value?.cover)

const currentTagIcon = computed(() => currentTag.value?.icon)

const currentTagId = computed(() => currentTag.value?._id)

const loadmoreArticles = async () => {
  const currentPage = pagination.value?.currentPage || 0
  await actionArticleList({
    tag: currentTagId.value,
    pageNo: currentPage + 1
  })
}

watch(
  () => props.tagName,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      actionArticleList({ tag: currentTagId.value, pageNo: 1 })
    }
  }
)

useMeta(() => {
  const { tagName } = props
  return { pageTitle: `${tagName} | tag` }
})

onBeforeMount(() => {
  actionArticleList({ tag: currentTagId.value, pageNo: 1 })
})
</script>

<style scoped lang="scss">
.header {
  font-size: 1.4rem;
}
</style>
