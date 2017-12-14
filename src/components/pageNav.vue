<template>
  <ol id="pageNav" class="page-navigator" >

    <li v-if="pageInfo.hasPreviousPage" class="prev" @click="getData(pageInfo.prePage)">
      <a href="javascript:void(0)">←</a>
    </li>

    <li v-for="navIndex in pageInfo.navigatepageNums" :class="pageInfo.pageNum==navIndex ? 'current':'' " @click="getData(navIndex)">
      <a href="javascript:void(0)">{{navIndex}}</a>
    </li>

    <li v-if="pageInfo.hasNextPage" class="next" @click="getData(pageInfo.nextPage)">
      <a href="javascript:void(0)">→</a>
    </li>

  </ol>
</template>

<script>
  export default {
    props: ['pageInfo'],
    methods: {
      getData (page) {
        // page要传递的参数 - 这里很重要,getPageData就是父组件$on监测的自定义函数不是父组件的自定义函数
        this.$emit('getPageData', page)
      }
    }
  }
</script>
