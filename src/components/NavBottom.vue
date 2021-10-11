<template>
  <div class="nav-bottom">
    <el-divider content-position="left">标签</el-divider>
    <div class="tag-list">
      <el-tag
        v-for="item in state.items"
        :key="item.label"
        :type="item.type"
        size="mini"
        effect="plain"
      >
        <a href="">{{ item.label }}</a>
      </el-tag>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

const state = reactive({
  items: [
    { type: '', label: '标签一' },
    { type: 'success', label: '标签二' },
    { type: 'info', label: '标签三' },
    { type: 'danger', label: '标签四' },
    { type: 'warning', label: '标签五' }
  ]
})
</script>
<style lang="scss" scoped>
.tag-list {
  padding: 20px;
  .el-tag {
    margin: 0 6px 6px 0;
  }
}
</style>
