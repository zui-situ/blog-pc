<template>
  <div class="search">
    <form class="search-box" ref="formElement">
      <input
        id="keyword"
        class="search-input"
        required
        type="search"
        name="search"
        maxlength="16"
        v-model.trim="keyword"
        placeholder="搜索"
        @keyup.enter="handleSearch"
      />
      <button type="submit" class="search-btn" @click="handleSearch">
        <i class="iconfont icon-search" />
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { RouteName } from '@/router'
import { isSearchFlow } from '@/transforms/route'

const formElement = ref<HTMLFormElement>()
const keyword = ref('')
const router = useRouter()
const route = useRoute()
const handleSearch = (event: any) => {
  // 不要执行与事件关联的默认动作
  event.preventDefault()
  const checkStatus = formElement.value?.checkValidity()
  if (!checkStatus) {
    formElement.value?.reportValidity()
    return
  }
  const inputKeyword = keyword.value
  const paramsKeyword = route.params.keyword as string
  const isSearchPage = isSearchFlow(route.name as string)
  if (inputKeyword && (!isSearchPage || paramsKeyword !== inputKeyword)) {
    router.push({
      name: RouteName.Search,
      params: { keyword: inputKeyword }
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/init.scss';

.search {
  padding: $sm-gap;
  // width: 100%;
  height: 3em;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  .search-input,
  .search-btn,
  .archive-btn {
    height: 2em;
    line-height: 2em;
    background-color: $module-bg-darker-1;
    @include background-transition();

    &:hover {
      background-color: $module-bg-hover;
    }
  }

  > .search-box {
    display: flex;
    flex-grow: 1;

    .search-input {
      margin-right: 0;
      flex-grow: 1;
      &::-webkit-calendar-picker-indicator {
        display: none;
      }
    }

    .search-btn {
      width: 2em;
      background-color: $module-bg-darker-3;
      @include background-transition();

      &:hover {
        background-color: $module-bg-darker-4;
      }
    }
  }

  .archive-btn {
    display: inline-block;
    text-align: center;
    margin-left: $sm-gap;
    border-radius: $mini-radius;
    width: 3em;

    .iconfont {
      font-size: $font-size-h4;
    }
  }
}
</style>
