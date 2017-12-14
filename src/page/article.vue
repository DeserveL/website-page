<template>
  <div>
    <article class="main-content page-page" itemscope itemtype="http://schema.org/Article">
      <div class="post-header">
        <h1 class="post-title" itemprop="name headline">
          <a href="${permalink()}">{{article.title}}</a>
        </h1>
        <div class="post-data">
          <time datetime="${created('yyyy-MM-dd')}" itemprop="datePublished">
            发布于 {{$utils.formatDate(article.created,'yyyy-MM-dd')}}
          </time>
          / <a v-if="article.categories && article.categories!=''" v-for="c in article.categories.split(',')" v-bind:href="'/category/' + c">{{c}}</a>
          / <a href="#comments">{{article.commentsNum > 0 ? article.commentsNum+ '条评论': '没有评论'}}</a>
          / {{article.hits}}浏览
        </div>
      </div>
      <div id="post-content" class="post-content" itemprop="articleBody">
        <p class="post-tags"><a v-if="article.tags && article.tags!=''" v-for="t in article.tags.split(',')" v-bind:href="'/tag/' + t">{{t}}</a></p>
        <article id="article-content" v-html="article.content"></article>
        <p class="post-info">
          本文由 <a href="">{{article.authorId}}</a> 创作，采用 <a href="https://creativecommons.org/licenses/by/4.0/"
                                                           target="_blank"
                                                           rel="external nofollow">知识共享署名4.0</a> 国际许可协议进行许可<br>本站文章除注明转载/出处外，均为本站原创或翻译，转载前请务必署名<br>最后编辑时间为:
          {{$utils.formatDate(article.modified,'yyyy-MM-dd hh:mm')}}
        </p>
      </div>
    </article>
    <!--文章目录start-->
    <articleDirectory></articleDirectory>
    <!--文章目录end-->
    <!--最底部分享栏目start-->
    <div id="post-bottom-bar" class="post-bottom-bar">
      <div class="bottom-bar-inner">
        <div class="bottom-bar-items social-share left">
          <span class="bottom-bar-item">Share : </span>
          <span class="bottom-bar-item bottom-bar-facebook"><a
            href="https://www.facebook.com/sharer/sharer.php?u=${permalink()}" target="_blank" title="${title()}"
            rel="nofollow">facebook</a></span>
          <span class="bottom-bar-item bottom-bar-twitter"><a
            href="https://twitter.com/intent/tweet?url=${permalink()}&text=${title()}" target="_blank"
            title="${title()}" rel="nofollow">Twitter</a></span>
          <span class="bottom-bar-item bottom-bar-weibo"><a
            href="http://service.weibo.com/share/share.php?url=${permalink()}&amp;title=${title()}" target="_blank"
            title="${title()}" rel="nofollow">Weibo</a></span>
          <span class="bottom-bar-item bottom-bar-qrcode"><a
            href="//pan.baidu.com/share/qrcode?w=300&amp;h=300&amp;url=${permalink()}" target="_blank" rel="nofollow">QRcode</a></span>
        </div>
        <div class="bottom-bar-items right">
          <span class="bottom-bar-item">${thePrev('→')}</span>
          <span class="bottom-bar-item">${theNext('←')}</span>
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
  export default {
    components: {articleDirectory},
    data () {
      return {
        cid: this.$route.params.cid,
        article: {}
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        if (this.cid == null) {
          this.cid = 1
        }
        this.$api.get('article/' + this.cid, null, r => {
          this.article = r.payload
        })
      }
    }
  }
</script>
