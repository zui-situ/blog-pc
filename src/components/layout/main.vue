<template>
  <div class="desktop-main">
    <background />
    <header-view />
    <main class="main-container">
      <nav-view class="nav-view" />
      <aside-view class="aside-view" />
      <div class="main-view layout-normal">
        <!-- unuse suspense -> async route component -> can't extract style to css file -->
        <router-view v-slot="{ Component, route }">
          <div class="router-view">
            <transition name="page" mode="out-in">
              <suspense>
                <component :is="Component" :key="route.name" />
              </suspense>
            </transition>
          </div>
        </router-view>
      </div>
    </main>
    <!-- <footer-view class="footer-view" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Background from './background.vue'
import NavView from './nav.vue'
import AsideView from './aside/index.vue'
import HeaderView from './header.vue'
import FooterView from './footer.vue'

export default defineComponent({
  name: 'DesktopMain',
  components: {
    Background,
    HeaderView,
    FooterView,
    AsideView,
    NavView
  }
})
</script>

<style lang="scss" scoped>
@import 'src/styles/init.scss';

.desktop-main {
  padding-top: $header-height + $lg-gap;

  @media screen and (max-width: 1200px) {
    #theme,
    #language,
    .main-share {
      display: none !important;
    }
  }

  .main-share {
    position: fixed;
    top: 12%;
    left: 0;
    height: auto;
    max-width: 4rem;
    display: flex;
    flex-direction: column;
    opacity: 0.4;

    &:hover {
      opacity: 1;
    }

    ::v-deep(.share-ejector) {
      $height: 2.1em;
      width: 3rem;
      height: $height;
      line-height: $height;
      font-size: $font-size-h4;
      border-top-right-radius: $xs-radius;
      border-bottom-right-radius: $xs-radius;
      transition: width $transition-time-fast;
      &:hover {
        width: 120%;
      }
    }
  }

  .main-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: $container-width;
    margin: 0 auto;
    .nav-view {
      order: 1;
      flex-shrink: 0;
      margin-right: $lg-gap;
    }

    .aside-view {
      order: 3;
      flex-shrink: 0;
      margin-left: $lg-gap;
    }

    .main-view {
      order: 2;
      flex-grow: 1;
      position: relative;
      overflow: hidden;
      transition: none;

      &:-moz-full-screen {
        overflow-y: auto;
      }

      &:-webkit-full-screen {
        overflow-y: auto;
      }

      &:fullscreen {
        overflow-y: auto;
      }
    }
  }

  .footer-view {
    margin-top: $lg-gap;
  }
}
</style>
