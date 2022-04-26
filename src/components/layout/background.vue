<template>
  <div id="background">
    <div class=""></div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import 'src/styles/init.scss';

#background {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: $z-index-underground;
  background-color: $body-bg;

  .image {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    // background: cdn-url('/images/background.png');

    &.dark {
      opacity: 0.2;
    }
  }
}
</style>
