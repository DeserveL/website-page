<template>
  <div class="main-content index-page clearfix">
    <div class="post-lists">
      <div class="post-lists-body">
        <div class="post-list-item" v-for="article in pageInfo.list">
          <div class="post-list-item-container">
            <div class="item-thumb bg-deepgrey" :style="'background-image:url('+ article.thumbImg +');'"></div>
            <router-link :to="'/article/'+ article.cid">
              <div class="item-desc">
                <p>{{article.content}}</p>
              </div>
            </router-link>
            <div class="item-slant reverse-slant bg-deepgrey"></div>
            <div class="item-slant"></div>
            <div class="item-label">
              <div class="item-title"><router-link :to="'/article/'+ article.cid">{{article.title}}</router-link>
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
      <pageNav :pageInfo="pageInfo" v-on:getPageData="getData"></pageNav>
    </div>
  </div>
</template>
<script>
  import pageNav from '../components/pageNav.vue'
  export default {
    components: {pageNav},
    data () {
      return {
        pageInfo: {}
      }
    },
    created () {
      this.getData(1)
    },
    methods: {
      getData (page) {
        this.$api.get('index/', { page: page, limit: 12 }, r => {
          this.pageInfo = r.payload
        })
      }
    }
  }
</script>
