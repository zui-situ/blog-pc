<template>
  <div class="nav-middle">
    <el-divider content-position="left">热门文章</el-divider>
    <ul class="article-list">
      <li v-for="(item, index) in state.hotList" :key="index">
        <a href="">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
  hotList: [
    {
      name: '文章名称'
    },
    {
      name: '文章名称'
    },
    {
      name: '文章名称'
    }
  ]
})
</script>
<style lang="scss" scoped>
.nav-middle {
  // border-top: 1px solid $line-color;
  .article-list {
    li {
      // padding: 0 20px;
      a {
        padding: 5px 20px;
        font-size: 14px;
        cursor: pointer;
        display: block;
        color: $light-text;
      }
      a:hover {
        color: $light-blue;
      }
    }
    li:hover {
      background: $base-bgc;
    }
  }
}
</style>
