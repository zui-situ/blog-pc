<template>
  <div>
    <ArticleListHeader :backgroundImage="currentCategoryImage" :icon="currentTagIcon">
      <template v-if="currentCategory">
        <span class="header"> #{{ currentCategory.name }} </span>
      </template>
    </ArticleListHeader>
    <ArticleList
      :articles="getArticleList"
      @loadmore="loadmoreArticles"
      :fetching="fetching"
    ></ArticleList>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, defineProps, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/article'
import useCategoryStore from '@/stores/category'
import ArticleList from '@/components/articleList/list.vue'
import ArticleListHeader from '@/components/articleList/header.vue'
import { useMeta } from '@/transforms/meta'

const props = defineProps(['categoryCode'])

const articleListStore = useArticleStore()

const { getArticleList, pagination, fetching } = storeToRefs(articleListStore)

const { actionArticleList } = articleListStore

const categoryStore = useCategoryStore()

const currentCategory = computed(() =>
  categoryStore.categories.find((category) => category.code === props.categoryCode)
)

const currentCategoryImage = computed(() => currentCategory.value?.cover)

const currentTagIcon = computed(() => currentCategory.value?.icon)

const currentCategoryId = computed(() => currentCategory.value?._id)

const loadmoreArticles = async () => {
  const currentPage = pagination.value?.currentPage || 0
  await actionArticleList({
    category: currentCategoryId.value,
    pageNo: currentPage + 1
  })
}

watch(
  () => props.categoryCode,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      actionArticleList({ category: currentCategoryId.value, pageNo: 1 })
    }
  }
)

useMeta(() => {
  const { name, code } = currentCategory.value || {}
  return {
    pageTitle: `${name} | category`,
    description: code,
    keywords: name
  }
})

onBeforeMount(() => {
  actionArticleList({ category: currentCategoryId.value, pageNo: 1 })
})
</script>

<style scoped lang="scss">
.header {
  font-size: 1.4rem;
}
</style>
