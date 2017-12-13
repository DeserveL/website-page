<template>
  <ol id="pageNav" class="page-navigator" >

    <li v-if="pageInfo.hasPreviousPage" class="prev">
      <router-link :to="'/indexpage/'+ pageInfo.prePage">←</router-link>
    </li>

    <div v-for="navIndex in pageInfo.navigatepageNums">
      <li :class="pageInfo.pageNum==navIndex ? 'current':'' ">
        <router-link :to="'/indexpage/' + navIndex">{{navIndex}}</router-link>
      </li>
    </div>

    <li v-if="pageInfo.hasNextPage" class="next">
      <router-link :to="'/indexpage/'+ pageInfo.nextPage">→</router-link>
    </li>

  </ol>
</template>

<script>
  export default {
    props: ['pageInfo']
  }
</script>
