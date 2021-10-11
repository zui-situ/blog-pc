<template>
  <div class="home-right">
    <el-divider content-position="center">快速导航</el-divider>
    <ul class="article-ul">
      <li class="article-list" v-for="(item, idx) in state.article" :key="idx">
        <a href="" class="article-item">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

const state = reactive({
  article: [
    {
      createdAt: '2020-03-12 14:12:57',
      title: '置顶文',
      viewCount: 2397,
      comments: 32,
      content: '',
      tags: [{ name: '服务器与运维' }, { name: 'Node' }]
    },
    {
      createdAt: '2020-03-12 14:12:57',
      title: '置顶文',
      viewCount: 2397,
      comments: 32,
      content: '',
      tags: [{ name: '服务器与运维' }, { name: 'Node' }]
    },
    {
      createdAt: '2020-03-12 14:12:57',
      title: '置顶文',
      viewCount: 2397,
      content: '',
      comments: 32,
      tags: [{ name: '服务器与运维' }, { name: 'Node' }]
    }
  ]
})
</script>
<style lang="scss" scoped>
.home-right {
  width: 292px;
  margin-left: 30px;
  .article-item {
    display: inline-block;
    width: 100%;
    text-align: left;
    color: $light-text;
    padding: 5px 20px;
    font-size: 14px;
  }
  .article-item:hover {
    color: $light-blue;
  }
  li:hover {
    background: $base-bgc;
  }
}
</style>
