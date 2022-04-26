<template>
  <div v-cloak id="app_root" class="app-root default desktop">
    <Main />
  </div>
</template>

<script lang="ts" setup>
import Main from '@/components/layout/main.vue'
</script>

<style lang="scss">
@import 'src/styles/index.scss';
@import 'src/styles/theme.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  .app-root {
    color: $text;

    &.default {
      @include defaultTheme();
    }

    &.dark {
      @include darkTheme();
    }

    &.desktop {
      .container {
        width: $container-width;
        margin: 0 auto;
      }
    }

    &[v-cloak] {
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
