<template>
  <div class="main-content common-page clearfix">
    <div class="categorys-item">
      <div class="common-title" v-for="category in categories">
        {{types[type]}}：
        <router-link v-if="type === 'categories'" :to="'/category/' + category.name">{{category.name}} ({{category.count}})</router-link>
        <router-link v-if="type === 'tags'" :to="'/tag/' + category.name">{{category.name}} ({{category.count}})</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        type: this.$route.path.split('/')[1],
        types: {'categories': '分类', 'tags': '标签'},
        categories: []
      }
    },
    created () {
      this.getData()
    },
    watch: {
      // 检测路由参数变化
      $route () {
        this.type = this.$route.path.split('/')[1]
      },
      type () {
        this.getData()
      }
    },
    methods: {
      getData () {
        this.$api.get(this.type, null, r => {
          this.categories = r.payload
        })
      }
    }
  }
</script>
