<template>
  <div>
    <article class="main-content page-page" itemscope itemtype="http://schema.org/Article">

      <div class="post-header">
        <h1 class="post-title" itemprop="name headline">{{article.title}}</h1>
        <div class="post-data">
          <time :datetime="$utils.formatDate(article.created,'yyyy-MM-dd')" itemprop="datePublished">
            {{$utils.formatDate(article.created,'yyyy-MM-dd')}}
          </time>
        </div>
      </div>
      <div id="post-content" class="post-content">
        <article id="article-content" v-html="article.content"></article>
      </div>
    </article>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        cid: this.$route.params.cid,
        article: {}
      }
    },
    created () {
      this.getData()
    },
    computed: {
      // 文章分类
      categories () {
        if (this.article.categories) {
          return this.article.categories.split(',')
        }
        return null
      },
      // 文章标签
      tags () {
        if (this.article.tags) {
          return this.article.tags.split(',')
        }
        return null
      }
    },
    watch: {
      // 检测路由参数变化
      $route () {
        this.cid = this.$route.params.cid
      },
      cid () {
        this.getData()
      }
    },
    methods: {
      getData () {
        if (this.cid == null) {
          this.cid = 1
        }
        this.$api.get('article/' + this.cid, null, r => {
          this.article = r.payload.content
        })
      }
    }
  }
</script>
