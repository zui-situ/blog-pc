<template>
  <div class="articles">
    <!-- list -->
    <div class="article-list">
      <placeholder :data="articles.length" :loading="!articles.length && fetching">
        <template #loading>
          <ul class="article-list-skeleton" key="skeleton">
            <li v-for="item in 6" :key="item" class="item">
              <div class="thumb">
                <skeleton-base />
              </div>
              <div class="content">
                <div class="title">
                  <skeleton-line />
                </div>
                <div class="description">
                  <div
                    class="line-item"
                    :class="index"
                    :key="index"
                    v-for="(line, index) in 2"
                  >
                    <skeleton-line />
                  </div>
                </div>
                <skeleton-line class="meta" />
              </div>
            </li>
          </ul>
        </template>
        <template #placeholder>
          <empty class="empty" />
        </template>
        <template #default>
          <div key="list">
            <transition-group name="list-fade">
              <list-item
                v-for="articleItem in articles"
                class="list-item"
                :key="articleItem._id"
                :article="articleItem"
              />
            </transition-group>
          </div>
        </template>
      </placeholder>
      <!-- <transition-group name="list-fade">
        <ListItem
          v-for="articleItem in articles"
          class="list-item"
          :key="articleItem._id"
          :article="articleItem"
        />
      </transition-group> -->
    </div>

    <!-- loadmore -->
    <div class="article-load">
      <button
        class="loadmore-button"
        :disabled="fetching || !isLoadMoreEnabled"
        @click="handleLoadmore"
      >
        <span class="icon">
          <i class="iconfont icon-down"></i>
        </span>
        <span class="text">
          <span v-if="fetching">{{ ArticleLoadMore.ARTICLE_LIST_LOADING }}</span>
          <span v-else-if="isLoadMoreEnabled">{{
            ArticleLoadMore.ARTICLE_LIST_LOADMORE
          }}</span>
          <span v-else>{{ ArticleLoadMore.ARTICLE_LIST_NO_MORE }}</span>
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, computed, watch } from 'vue'
import { Article } from '@/types/index'
import ListItem from './item.vue'
import { ArticleLoadMore } from '@/constants/article'

// export enum Events {
//   Loadmore = 'loadmore'
// }

const props = defineProps({
  articles: {
    type: Array as PropType<Article[]>,
    required: true
  },
  pagination: Object,
  fetching: {
    type: Boolean,
    required: false
  }
})

const isLoadMoreEnabled = computed(() => {
  return props.pagination
    ? props.pagination.current_page < props.pagination.total_page
    : false
})

const handleLoadmore = () => {
  // emit('loadmore')
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import 'src/styles/init.scss';

.articles {
  .article-list-skeleton {
    padding: 0;
    margin: 0;
    list-style: none;
    overflow: hidden;

    .item {
      display: flex;
      height: 10rem;
      padding: $gap;
      margin-bottom: $lg-gap;
      @include common-bg-module();
      @include radius-box($sm-radius);
      &:last-child {
        margin-bottom: 0;
      }

      .thumb {
        height: 100%;
        width: 15rem;
      }

      .content {
        margin-left: $lg-gap;
        flex-grow: 1;

        .title {
          height: 1.5em;
          width: 36%;
        }
        .description {
          .line-item {
            width: 100%;
            height: $lg-gap;
            margin-top: $sm-gap;
          }
        }
        .meta {
          width: 68%;
          height: $lg-gap;
          margin-top: $lg-gap;
        }
      }
    }
  }

  .article-list-mammon {
    width: 100%;
    min-height: 10rem;
    padding: $sm-gap;
    margin-bottom: $lg-gap;
    @include common-bg-module();
    @include radius-box($sm-radius);

    &::v-deep(.mammon-ins) {
      margin: $xs-gap 0;
      height: 100px;
    }
  }

  .article-list {
    margin-bottom: $lg-gap;
    min-height: $lg-gap;
    overflow: hidden;

    .empty {
      height: $gap * 10;
      font-size: $font-size-h4;
      font-weight: bold;
      @include common-bg-module();
      @include radius-box($sm-radius);
    }

    .list-item {
      margin-bottom: $lg-gap;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .article-load {
    overflow: hidden;
    z-index: $z-index-normal;
    @include radius-box($sm-radius);

    .loadmore-button {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: $button-block-height;
      line-height: $button-block-height;
      padding-left: $gap * 2;
      color: $text-reversal;
      @include common-bg-module($transition-time-fast);

      &[disabled] {
        opacity: 0.6;
      }

      &:not([disabled]):hover {
        .iconfont {
          color: rgba($red, 0.8);
        }
        .text {
          background: rgba($red, 0.8);
        }
      }

      .icon {
        font-weight: bold;
        color: $text-secondary;
        @include color-transition();
      }

      .text {
        position: relative;
        height: $button-block-height;
        padding: 0 ($gap * 2) 0 ($gap * 3);
        background: rgba($red, 0.6);
        font-family: 'webfont-bolder', DINRegular;
        text-transform: uppercase;
        color: $white;
        &.en {
          font-weight: bold;
        }

        &::before {
          $size: 1rem;
          content: '';
          display: block;
          position: absolute;
          width: $size;
          height: 200%;
          top: -50%;
          left: -#{math.div($size, 2)};
          background: $body-bg;
          transform: rotate(18deg);
        }
      }
    }
  }

  &.dark {
    .article-load {
      .loadmore-button {
        .text {
          &::before {
            background: $module-bg-darker-1 !important;
          }
        }
      }
    }
  }
}
</style>
