<template>
  <div class="empty">
    <slot>
      <template v-if="props.placeholder">{{ props.placeholder }}</template>
      <template v-else>
        <span>{{ emptyText }}</span>
      </template>
    </slot>
  </div>
</template>

<script lang="ts" setup name="Empty">
import { defineProps, ref } from 'vue'
import { ArticleEmptyText } from '@/constants/article'

const emptyText = ref(ArticleEmptyText)

const props = defineProps({
  placeholder: String
})
</script>

<style lang="scss" scoped>
@import 'src/styles/init.scss';

.empty {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 5em;
  text-align: center;
  justify-content: center;
  align-items: center;
  color: $text-divider;
  letter-spacing: 0.1em;
}
</style>
