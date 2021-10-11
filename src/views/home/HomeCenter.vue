<template>
  <div class="home-center">
    <div class="article-list">
      <ul>
        <li
          v-for="(item, index) in state.article"
          :key="index"
          class="article-list-item"
        >
          <el-divider content-position="left">
            <span class="title-txt">{{ item.title }}</span>
            <span class="title-time">{{ item.createdAt }}</span>
          </el-divider>
          <div class="article-detail">
            <p>
              博主📒笔记地址 guodada-note，用 vuepress 去做的，react-blog 只是练手项目
              现在这里暂时比较少放文章。
            </p>
            <p>有兴趣请关注 guodada-note ，我的个人笔记平台！</p>
          </div>
          <div class="list-item-others">
            <div class="others-item">
              <i class="el-icon-chat-square" size="14" color="#8590a6"></i>
              <i class="item-num">{{ item.comments }}</i>
            </div>
            <div class="others-item">
              <i class="el-icon-view" size="14" color="#8590a6"></i>
              <i class="item-num">{{ item.viewCount }}</i>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      :total="400"
    >
    </el-pagination>
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
  ],
  currentPage: 1
})
function handleSizeChange(): void {}
function handleCurrentChange(): void {}
</script>
<style lang="scss" scoped>
.home-center {
  width: 100%;
}
.article-list-item {
  padding: 16px 24px;
  margin-bottom: 10px;
  background: #fff;
  transition: all 0.2s linear;
  @include b();
  .title-txt {
    font-weight: 600;
    font-size: 24px;
  }
  .title-time {
    font-size: 14px;
    padding-left: 20px;
  }
  .list-item-others {
    @include faj(center, flex-start);
    color: $light-text;
    .others-item {
      margin-right: 10px;
      .item-num {
        margin-left: 2px;
        font-size: 12px;
      }
    }
  }
}
.el-divider__text {
  background: none;
}
.article-list-item:hover {
  background: $background-color;
  box-shadow: 0 15px 30px 0 rgb(0 0 0 / 10%);
}
</style>
