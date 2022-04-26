<template>
  <div class="article-page">
    <placeholder :loading="fetching">
      <template #loading>
        <article-skeleton :social-count="8" :related-count="3" />
      </template>
      <template #default>
        <div v-if="article">
          <div class="module margin background overflow">
            <article-content
              :article="article"
              :id="ANCHORS.ARTICLE_CONTENT_ELEMENT_ID"
              :readmore-id="ANCHORS.ARTICLE_READMORE_ELEMENT_ID"
            />
          </div>
        </div>
      </template>
    </placeholder>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ArticleSkeleton from './skeleton.vue'
import ArticleContent from './content.vue'
import { useArticleDetailStore } from '@/stores/article'
import * as ANCHORS from '@/constants/anchor'
import { useMeta } from '@/transforms/meta'

const router = useRouter()

const articleDetailStore = useArticleDetailStore()

const { fetchArticleDetail } = articleDetailStore

const { article, fetching } = storeToRefs(articleDetailStore)

const articleId = router.currentRoute.value.params.id

useMeta(() => {
  const { title, description } = article.value || {}
  return {
    pageTitle: title,
    description,
    keywords: title
  }
})

onMounted(() => fetchArticleDetail(articleId))
</script>
<style lang="scss" scoped>
@import 'src/styles/init.scss';

.article-page {
  .module {
    position: relative;

    &.margin {
      margin-bottom: $lg-gap;
    }

    &.background {
      border-radius: $sm-radius;
      @include common-bg-module();
    }

    &.overflow {
      overflow: hidden;
    }

    .divider {
      border-top: 2px solid $module-bg-darker-1;
    }

    .bridge {
      $distance: 3rem;
      position: absolute;
      top: -$lg-gap;
      width: $lg-gap;
      height: $lg-gap;
      background: linear-gradient(to bottom, $module-bg, $module-bg-darker-1);
      &.left {
        left: $distance;
      }
      &.right {
        right: $distance;
      }
    }
  }
}
</style>
