<template>
  <div class="main-content index-page clearfix">
    <div class="post-lists">
      <div class="post-lists-body">
        <div class="post-list-item" v-for="article in pageInfo.list">
          <div class="post-list-item-container">
            <div class="item-thumb bg-deepgrey" style="background-image:url('static/image/rand/1.jpg');"></div>
            <a href="">
              <div class="item-desc">
                <p>{{article.content}}</p>
              </div>
            </a>
            <div class="item-slant reverse-slant bg-deepgrey"></div>
            <div class="item-slant"></div>
            <div class="item-label">
              <div class="item-title"><a href="${permalink()}">{{article.title}}</a>
              </div>
              <div class="item-meta clearfix">
                <div :class="'item-meta-ico '+ $utils.show_icon(article.cid)"
                     style="background: url('static/image/bg-ico.png') no-repeat;background-size: 40px auto;"></div>
                <div class="item-meta-cat">
                  <a v-for="c in article.categories.split(',')" v-bind:href="'/category/' + c">{{c}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lists-navigator clearfix">
      <pageNav :pageInfo="pageInfo"></pageNav>
    </div>
  </div>
</template>
<script>
  import pageNav from '../components/pageNav.vue'
  export default {
    components: {pageNav},
    data () {
      return {
        page: this.$route.params.page,
        pageInfo: []
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        if (this.page == null) {
          this.page = 1
        }
        this.$api.get('index/', { page: this.page, limit: 12 }, r => {
          this.pageInfo = r.payload
        })
      }
    }
  }
</script>
