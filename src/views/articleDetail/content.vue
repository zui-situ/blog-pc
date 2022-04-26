<template>
  <div ref="element" class="detail">
    <div class="knowledge" key="knowledge">
      <div class="title">
        <h2 class="text">{{ props.article.title }}</h2>
        <div class="meta">
          <i class="iconfont icon-t"></i>
          <!-- <divider type="vertical" class="vertical" /> -->
          <span>
            <i class="iconfont icon-date-fill"></i>
            <udate to="YMDm" :date="props.article.createdAt" separator="/" />
          </span>
          <divider type="vertical" class="vertical" />
          <span class="read-num">
            <i class="iconfont icon-eye"></i>
            <span>{{ article.readNum }}&nbsp;</span>
            <span>次阅读</span>
          </span>
        </div>
      </div>
      <markdown
        :id="articleContentElementDds.default"
        :html="articleDetailStore.defaultContent?.html"
      />
      <transition
        name="module"
        mode="out-in"
        @after-enter="handleRenderMoreAnimateDone"
      >
        <div :id="readmoreId" v-if="isRenderMoreEnabled" class="readmore">
          <button
            class="readmore-btn"
            :disabled="isRenderMoreContent"
            @click="handleRenderMore"
          >
            <span>阅读余下全文</span>
            <i class="iconfont icon-loadmore"></i>
          </button>
        </div>
        <markdown
          v-else-if="articleDetailStore.renderedFullContent"
          :id="articleContentElementDds.more"
          :html="articleDetailStore.moreContent?.html"
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, nextTick, onMounted, PropType, ref } from 'vue'
import { Article } from '@/types/index'
import markdown from '@/components/markdown/index.vue'
import { useArticleDetailStore } from '@/stores/article'
import { LOADED_CLASS_NAME, LOZAD_CLASS_NAME } from '@/utils/lozad'
import { ARTICLE_CONTENT_ELEMENT_IDS } from '@/constants/article'

const props = defineProps({
  article: {
    type: Object as PropType<Article>,
    required: true
  },
  readmoreId: {
    type: String,
    required: true
  }
})

const articleDetailStore = useArticleDetailStore()

const element = ref<HTMLElement>()

const articleContentElementDds = ref(ARTICLE_CONTENT_ELEMENT_IDS)

const isRenderMoreContent = ref(false)

const isRenderMoreEnabled = computed(() => {
  return articleDetailStore.isLongContent && !articleDetailStore.renderedFullContent
})

const handleRenderMore = () => {
  isRenderMoreContent.value = true
  nextTick(() => {
    setTimeout(() => {
      articleDetailStore.renderFullContent()
      isRenderMoreContent.value = false
    }, 0)
  })
}

const observeLozad = (elementID: string) => {
  const contentElement = element.value?.querySelector(`#${elementID}`)
  const lozadElements =
    contentElement && contentElement.querySelectorAll(`.${LOZAD_CLASS_NAME}`)
  if (lozadElements?.length) {
    const lozadObserver = window.$lozad(lozadElements, {
      loaded: (element) => element.classList.add(LOADED_CLASS_NAME)
    })
    lozadObserver.observe()
  }
}

const handleRenderMoreAnimateDone = () => observeLozad(ARTICLE_CONTENT_ELEMENT_IDS.more)

onMounted(() => {
  observeLozad(ARTICLE_CONTENT_ELEMENT_IDS.default)
})
</script>

<style lang="scss" scoped>
@import 'src/styles/init.scss';

.detail {
  padding: 1rem 2rem;
  position: relative;
  overflow: hidden;
  height: auto;
  transition: height $transition-time-normal;

  .oirigin {
    position: absolute;
    position: absolute;
    top: 0.6rem;
    left: -2.4rem;
    transform: rotate(-45deg);
    width: 8rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    transform-origin: center;
    color: $white;
    font-weight: bold;
    font-size: $font-size-small;
    background-color: var(--color);
    &.original {
      --color: #{rgba($surmon, 0.7)};
    }
    &.hybrid {
      --color: #{rgba($accent, 0.7)};
    }
    &.reprint {
      --color: #{rgba($red, 0.7)};
    }
  }

  .knowledge {
    user-select: text;
    position: relative;

    .title {
      margin: 1em 0 1.5em 0;
      text-align: center;

      .text {
        font-weight: 700;
        font-size: $font-size-h2 * 0.95;
        margin-bottom: $gap;
      }

      .meta {
        display: inline-block;
        color: $text-disabled;
        font-size: $font-size-small;
        user-select: none;
        line-height: 2;
        .iconfont {
          margin-right: $xs-gap;
        }
        .vertical {
          top: -1px;
        }
        .read-num {
        }
      }
    }
  }
}
</style>
