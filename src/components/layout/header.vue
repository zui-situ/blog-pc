<template>
  <header class="header">
    <div class="header-container container">
      <div class="header-header">
        <!-- <uimage cdn src="/images/logo.svg" class="header-logo" /> -->
        <span class="header-slogan">{{ mate.title }}</span>
        <router-link to="/" class="header-link" />
      </div>
      <div class="toolbox">
        <!-- <button class="button theme">
          <i class="iconfont"></i>
        </button> -->
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import META from '@/config/index'

const mate = ref(META)
</script>

<style lang="scss" scoped>
@import 'src/styles/init.scss';

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $header-height;
  z-index: $z-index-header;
  background-color: $module-bg;
  border-bottom: 1px solid $module-bg-darker-2;
  @include backdrop-blur(5px);

  &.enable-nav:hover {
    .header-nav {
      @include visible();
    }
  }

  .header-container {
    height: 100%;
    display: flex;
    justify-content: space-between;

    .header-header {
      height: 100%;
      display: flex;
      position: relative;
      align-items: center;
      padding-left: $sm-gap;
      width: 29em;
      overflow: hidden;

      @keyframes logo-blink {
        0% {
          mask-position: -30%;
        }
        100% {
          mask-position: 666%;
        }
      }

      .header-logo {
        width: 11rem;
        margin-right: $gap * 4;
        filter: $theme-logo-rotate;
        .logo-st {
          fill: $primary;
        }
      }

      .header-slogan {
        color: $primary;
        font-size: $font-size-h5;
        font-family: 'webfont-medium', DINRegular;
      }

      .header-link {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }

    .toolbox {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
      @include visibility-transition();
      &:hover {
        opacity: 1;
      }

      .button {
        position: relative;
        display: block;
        text-transform: uppercase;
        margin: 0 $gap;
        width: 2rem;
        height: 2rem;

        &::before {
          content: '';
          display: block;
          width: 50%;
          height: 2px;
          position: absolute;
          left: 25%;
          bottom: -2px;
        }

        &.menu {
          cursor: none;
          &::before {
            background-color: $black;
          }
        }

        &.theme {
          &::before {
            background-color: $primary;
          }
        }

        &.language {
          font-weight: bold;

          &.en {
            &::before {
              background-color: $en-primary;
            }
          }
          &.zh {
            &::before {
              background-color: $zh-primary;
            }
          }
        }
      }
    }
  }

  .header-nav {
    width: 100%;
    height: 4rem;
    background-color: $primary-lighter;
    @include hidden();
    @include visibility-transition();

    .nav-list {
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      .divider {
        height: 6px;
        width: 1px;
        background-color: $module-bg-translucent;
      }

      .item {
        text-transform: uppercase;
        color: $text-reversal;
        @include visibility-transition();
        opacity: 0.7;
        &:hover {
          opacity: 1;
        }

        &.link-active {
          .text {
            padding-bottom: 4px;
            border-bottom: 2px solid;
          }
        }

        .image-icon {
          width: 1em;
          height: 1em;
          margin-right: $sm-gap;
          border-radius: $xs-radius;
        }

        > .iconfont {
          margin-right: $sm-gap;
        }

        .newscript,
        .superscript {
          margin-left: $xs-gap;
        }
      }
    }
  }
}
</style>
