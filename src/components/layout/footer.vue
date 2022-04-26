<template>
  <footer class="footer">
    <div class="container"></div>
  </footer>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
</script>

<style lang="scss" scoped>
@import 'src/styles/init.scss';
.footer {
  display: flex;
  align-items: center;
  height: $footer-height;
  @include common-bg-module();

  .container {
    color: $text-secondary;
    font-size: $font-size-h6;
    text-align: center;
    text-transform: uppercase;

    a {
      border-bottom: 1px solid transparent;
      &:hover {
        border-color: initial;
      }
    }
  }
}
</style>
