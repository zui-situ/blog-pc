<template>
  <div class="desktop-nav">
    <nav class="nav-list">
      <div v-for="menu in menus" :key="menu.code">
        <router-link v-if="menu.route" class="item" :to="menu.route" exact>
          <i class="iconfont" :class="menu.icon"></i>
          <span class="text">{{ menu.name }}</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { menus } from './menu'
import useCategoryStore from '@/stores/category'

const categoryStore = useCategoryStore()

const { actionCategoryList } = categoryStore

onMounted(() => {
  actionCategoryList()
})
</script>

<style lang="scss" scoped>
@import 'src/styles/init.scss';

.desktop-nav {
  width: $navbar-width;
  height: auto;

  .nav-list {
    width: $navbar-width;
    padding: 0;
    margin: 0;
    position: fixed;

    &.en {
      .item {
        .text {
          font-size: $font-size-h6;
        }
      }
    }

    .item {
      display: block;
      position: relative;
      width: 100%;
      height: 3em;
      line-height: 3em;
      padding: 0 $lg-gap;
      text-decoration: none;
      text-transform: uppercase;
      font-weight: bold;
      border-radius: $mini-radius;
      color: $text-secondary;
      font-family: 'webfont-normal', DINRegular;
      letter-spacing: 0.5px;
      margin-bottom: $sm-gap;
      will-change: background-color;
      transition: background-color $transition-time-fast * 0.6;
      @include radius-box($sm-radius);
      &:last-child {
        margin-bottom: 0;
      }
      &:hover {
        color: $primary-lighter;
        background-color: $module-bg-translucent;
      }

      &.link-active {
        color: $primary;
        background-color: $module-bg-lighter;

        &.guestbook {
          background: linear-gradient(to bottom, $module-bg-lighter, transparent);
        }
      }

      .newscript {
        margin-left: $sm-gap;
        .iconfont {
          font-size: $font-size-small;
        }
      }

      .superscript {
        margin-left: $sm-gap;
        .iconfont {
          width: auto;
          margin-right: 0;
          color: $red;
        }
      }

      &.hot {
        color: $red;
      }

      &.app {
        color: $surmon;
      }

      .image-icon {
        width: 1em;
        height: 1em;
        margin-right: $gap;
        border-radius: $xs-radius;
      }

      .iconfont {
        width: 1em;
        margin-right: $gap;
        display: inline-block;
        font-weight: normal;
      }
    }

    .divider {
      display: block;
      height: 0;
      background-color: transparent;
      border-top: 1px dotted $module-bg-darker-2;
      margin-bottom: $sm-gap;
    }
  }
}
</style>
