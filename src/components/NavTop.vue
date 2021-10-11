<template>
  <div class="nav-top">
    <img src="../assets/logo.png" alt="" />
    <span>名字</span>
    <span>个性签名</span>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.nav-top {
  width: 100%;
  // padding-bottom: 20px;
  @include fcaj(center, flex-start);
  img {
    @include wh(132px);
  }
}
</style>
