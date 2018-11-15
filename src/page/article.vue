<template>
  <div>
    <article class="main-content page-page" itemscope itemtype="http://schema.org/Article">
      <div class="post-header">
        <h1 class="post-title" itemprop="name headline">
          <router-link :to="'/article/'+ article.cid">{{article.title}}</router-link>
        </h1>
        <div class="post-data">
          <time :datetime="$utils.formatDate(article.created, 'yyyy-MM-dd')" itemprop="datePublished">
            发布于 {{$utils.formatDate(article.created,'yyyy-MM-dd')}}
          </time>
          / <router-link v-if="categories != null" v-for="c in categories" :key="c" :to="'/category/' + c">{{c}}</router-link>
          / <a href="#comments">{{article.commentsNum > 0 ? article.commentsNum+ '条评论': '没有评论'}}</a>
          / {{article.hits}}浏览
        </div>
      </div>
      <div id="post-content" class="post-content" itemprop="articleBody">
        <p class="post-tags"><router-link v-if="tags != null" v-for="t in tags" :key="t" :to="'/tag/' + t">{{t}}</router-link></p>
        <article id="article-content" v-html="article.content"></article>
        <p class="post-info">
          本文由 <a href="">DeserveL</a> 创作，采用 <a href="https://creativecommons.org/licenses/by/4.0/"
                                                           target="_blank"
                                                           rel="external nofollow">知识共享署名4.0</a> 国际许可协议进行许可<br>本站文章除注明转载/出处外，均为本站原创或翻译，转载前请务必署名<br>最后编辑时间为:
          {{$utils.formatDate(article.modified,'yyyy-MM-dd hh:mm')}}
        </p>
      </div>
    </article>
    <!--文章目录start-->
    <articleDirectory></articleDirectory>
    <!--文章目录end-->

    <!-- 文章评论-->
    <article-comment :article="article"></article-comment>

    <!--最底部分享栏目start-->
    <div id="post-bottom-bar" class="post-bottom-bar">
      <div class="bottom-bar-inner">
        <div class="bottom-bar-items social-share left">
          <span class="bottom-bar-item">Share : </span>
          <span class="bottom-bar-item bottom-bar-facebook"><a
            :href="'https://www.facebook.com/sharer/sharer.php?u=' + getUrl()" target="_blank" :title="article.title"
            rel="nofollow">facebook</a></span>
          <span class="bottom-bar-item bottom-bar-twitter"><a
            :href="'https://twitter.com/intent/tweet?url=' + getUrl() + '&text=' + article.title" target="_blank"
            :title="article.title" rel="nofollow">Twitter</a></span>
          <span class="bottom-bar-item bottom-bar-weibo"><a
            :href="'http://service.weibo.com/share/share.php?url=' + getUrl() + '&title=' + article.title" target="_blank"
            :title="article.title" rel="nofollow">Weibo</a></span>
          <span class="bottom-bar-item bottom-bar-qrcode"><a
            :href="'https://cli.im/api/qrcode/code?text=' + getUrl() + '&mhid=50eWDQu6nc0hMHcrKtNXPKo'" target="_blank" rel="nofollow">QRcode</a></span>
        </div>
        <div class="bottom-bar-items right">
          <span class="bottom-bar-item"><router-link v-if="prevArticle != null" :to="'/article/'+ prevArticle.cid" :title="prevArticle.title">→</router-link></span>
          <span class="bottom-bar-item"><router-link v-if="nextArticle != null" :to="'/article/'+ nextArticle.cid" :title="nextArticle.title">←</router-link></span>
          <span class="bottom-bar-item"><a href="#footer">↓</a></span>
          <span class="bottom-bar-item"><a href="#">↑</a></span>
        </div>
      </div>
    </div>
    <!--最底部分享栏目end-->
  </div>
</template>
<script>
  import articleDirectory from '../components/directory'
  import articleComment from '../components/comments.vue'
  export default {
    components: {
      articleDirectory,
      articleComment
    },
    data () {
      return {
        cid: this.$route.params.cid,
        article: {},
        nextArticle: {},
        prevArticle: {}
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
          this.nextArticle = r.payload.nextContent
          this.prevArticle = r.payload.prevContent
        })
      },
      // 获取当前url
      getUrl () {
        return window.location.href
      }
    }
  }
</script>
