<template>
  <main class="main-container">
    <div class="top">
      <Header />
    </div>

    <div class="bottom">
      <el-row>
        <el-col :span="4">
          <Nav />
        </el-col>
        <el-col :span="20">
          <div class="content">
            <router-view />
          </div>
        </el-col>
      </el-row>
    </div>
  </main>
</template>

<script lang="ts" setup>
// import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'
</script>

<style scoped lang="scss">
@import '../assets/style/basic.scss';
$top-height: 60px;
$left-side-width: 80px;
.main-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  // background: $second-background-color;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .el-row {
    height: 100%;
  }
  .top {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: $top-height;
    // margin-bottom: 10px;
    box-shadow: 0 2px 8px #f0f1f2;
    z-index: 10;
  }

  .bottom {
    position: relative;
    box-sizing: border-box;
    padding-top: 40px;
    width: 100%;
    height: 100%;
    .content {
      padding: 0 20px;
    }
  }
}

.page-links {
  a {
    font-weight: bold;
    margin: 0 20px;
  }
}
</style>
