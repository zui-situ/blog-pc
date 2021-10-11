<template>
  <div class="header">
    <el-row>
      <el-col :span="4">
        <div class="title" @click="router.push('/')">
          <span>我的博客</span>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="header-right">
          <div class="search">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              class="search-input"
              size="mini"
            ></el-input>
          </div>
          <div class="header-tab">
            <div>
              <el-menu
                :default-active="state.activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                active-text-color="#409eff"
                @select="handleSelect"
              >
                <el-menu-item index="0">
                  <i class="el-icon-house"></i>
                  <template #title>首页</template>
                </el-menu-item>
                <el-menu-item index="1">
                  <i class="el-icon-edit"></i>
                  <template #title>归档</template>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-folder"></i>
                  <template #title>分类</template>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-user"></i>
                  <template #title>关于</template>
                </el-menu-item>
              </el-menu>
            </div>
            <div>
              <el-button>登录</el-button>
              <el-button>注册</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

const state = reactive({
  activeIndex: '0'
})
const handleSelect = (val: string): void => {
  state.activeIndex = val
}
// eslint-disable-next-line no-unused-vars
const router = useRouter()
</script>

<style scoped lang="scss">
.el-menu {
  .is-active {
  }
}
.header {
  width: 100%;
  height: 100%;
  background: #fff;
  box-sizing: border-box;
  font-weight: bold;

  .title {
    @include wh(100%);
    font-size: 20px;
    @include faj(center, center);
  }
  .search {
    @include faj(center, flex-start);
    @include bl();
    height: 100%;
    .search-input {
      padding-left: 10px;
      border: 0;
    }
  }
  .header-tab {
    @include faj(center, flex-start);
  }
  .header-right {
    @include faj(center, space-between);
  }
}
</style>
