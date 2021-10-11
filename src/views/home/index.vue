<template>
  <div class="home-container page-container">
    <div class="home-list">
      <HomeCenter />
      <HomeRight />
    </div>
    <!-- <img class="vue-element-plus-logo" alt="Vue logo" src="../../assets/logo.png" />
    <div class="page-title">Vite2.x + Vue3.x + TypeScript + Element Plus</div> -->
  </div>
</template>

<script lang="ts" setup>
// import { defineComponent } from 'vue'
import HomeCenter from './HomeCenter.vue'
import HomeRight from './HomeRight.vue'
</script>

<style scoped lang="scss">
.home-container {
  .vue-element-plus-logo {
    width: 50%;
  }
  .home-list {
    width: 100%;
    @include faj(space-between, flex-start);
  }
}
</style>
