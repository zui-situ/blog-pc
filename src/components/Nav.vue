<template>
  <aside class="nav">
    <NavTop />
    <NavMiddle />
    <NavBottom />
  </aside>
</template>

<script lang="ts" setup>
// import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue'
// import { useRouter } from 'vue-router'
import NavTop from './NavTop.vue'
import NavMiddle from './NavMiddle.vue'
import NavBottom from './NavBottom.vue'
</script>

<style scoped lang="scss">
.nav {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #fff;
  @include br();
}
</style>
