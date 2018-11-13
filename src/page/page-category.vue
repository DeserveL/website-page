<template>
  <div class="main-content common-page clearfix">
    <div class="categorys-item">
      <div class="common-title" v-if="type === 'category'">
        分类：{{keyword}}
      </div>
      <div class="common-title" v-else-if="type === 'tag'">
        标签：{{keyword}}
      </div>
      <div v-if="meta == null || articles.size < 1">
        <p>抱歉，还没有相关文章.</p>
      </div>
      <div class="post-lists" v-else>
        <div class="post-lists-body">
          <div class="post-list-item" v-for="article in articles.list">
            <div class="post-list-item-container">
              <div class="item-label ">
                <div class="item-title">
                  <router-link :to="'/article/'+ article.cid">
                    {{article.title}}
                  </router-link>
                </div>
                <div class="item-meta clearfix">
                  <div :class="'item-meta-ico '+ $utils.show_icon(article.cid)"
                       style="background: url('static/image/bg-ico.png') no-repeat;background-size: 40px auto;"></div>
                  <div class="item-meta-date">发布于 {{$utils.formatDate(article.created,'yyyy-MM-dd')}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        keyword: this.$route.params.keyword,
        type: this.$route.path.split('/')[1],
        meta: null,
        articles: {}
      }
    },
    created () {
      this.getData()
    },
    watch: {
      // 检测路由参数变化
      $route () {
        this.keyword = this.$route.params.keyword
      },
      keyword () {
        this.getData()
      }
    },
    methods: {
      getData () {
        if (this.keyword == null) {
          this.keyword = '默认分类'
        }
        this.$api.get(this.type + '/' + this.keyword, {limit: 999}, r => {
          this.meta = r.payload.meta
          if (this.meta != null) {
            this.articles = r.payload.articles
          }
        })
      }
    }
  }
</script>
