<template>
  <aside class="desktop-aside" ref="element">
    <div class="module">
      <aside-search />
    </div>
    <!-- <div class="module">
      <aside-tag />
    </div> -->
    <div :id="ASIDE_STICKY_ELEMENT_ID" class="aside-sticky-box">
      <div class="module">
        <client-only v-if="isArticlePage">
          <aside-anchor class="sticky-module" />
        </client-only>
        <aside-tag class="sticky-module" v-else />
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AsideTag from './tag.vue'
import AsideSearch from './search.vue'
import AsideAnchor from './anchor.vue'
import { isArticleDetail } from '@/transforms/route'
// import AsideArticle from './article.vue'
const ASIDE_STICKY_ELEMENT_ID = 'aside-sticky-module'
const route = useRoute()
const isArticlePage = computed(() => isArticleDetail(route.name))

onMounted(() => {})
</script>

<style lang="scss" scoped>
@import 'src/styles/init.scss';

.desktop-aside {
  display: block;
  padding: 0;
  width: $aside-width;

  .module {
    margin-bottom: $lg-gap;
    @include radius-box($sm-radius);
    @include common-bg-module();

    &.mammon {
      width: 100%;
    }

    &.mammon-square {
      height: $aside-width;
      display: flex;
      justify-content: center;
      align-items: center;

      .content {
        height: 250px;
        width: 250px;
        overflow: hidden;
      }
    }

    .sticky-module {
      max-height: calc(100vh - 250px - #{$header-height + $lg-gap * 4});
    }
  }

  .aside-sticky-box {
    position: sticky;
    top: $header-height + $lg-gap;
    width: $aside-width;
  }
}
</style>
