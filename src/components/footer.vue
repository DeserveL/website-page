<template>
  <footer id="footer" class="footer bg-white">
    <div class="footer-social">
      <div class="footer-container clearfix">
        <social></social>
      </div>
    </div>
    <div class="footer-meta">
      <div class="footer-container">
        <div class="meta-item meta-copyright">
          <div class="meta-copyright-info">
            <a href="" class="info-logo">
              <img src="/static/image/logo.png" alt="">
            </a>
            <div class="info-text">
              <p>一生有所追求.</p>
              <p>&copy; 2018 Powered by <a href="https://github.com/deservel" target="_blank" rel="nofollow">DeserveL</a>
              </p>
              <p><a href="http://www.miitbeian.gov.cn" target="_blank" rel="nofollow">鄂ICP备17026132号-1</a></p>
            </div>
          </div>
        </div>

        <div class="meta-item meta-posts">
          <h3 class="meta-title">最新文章</h3>
          <li v-for="article in recentArticles">
            <router-link :to="'/article/' + article.cid">{{article.title}}</router-link>
          </li>
        </div>

        <div class="meta-item meta-comments">
          <h3 class="meta-title">最新评论</h3>
          <li v-for="comm in recentComments">
            <router-link :to="'/article/' + comm.cid + '#comments'">{{comm.author}}:{{comm.content}}</router-link>
          </li>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
  import social from './social'
  export default {
    components: {social},
    data () {
      return {
        recentArticles: [],
        recentComments: []
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        this.$api.get('index/foot/', null, r => {
          this.recentArticles = r.payload.recentArticles
          this.recentComments = r.payload.recentComments
        })
      }
    }
  }
</script>
