<template>
  <div class="main-content archive-page clearfix">
    <div class="categorys-item">
      <template v-for="archive in archives">
        <div class="categorys-title">{{archive.dateStr}}</div>
          <div class="post-lists">
            <div class="post-lists-body">
              <div class="post-list-item" v-for="article in archive.articles">
                <div class="post-list-item-container">
                  <div class="item-label">
                    <div class="item-title">
                      <router-link :to="'/article/'+ article.cid">
                        {{article.title}}
                      </router-link>
                    </div>
                    <div class="item-meta clearfix">
                      <div class="item-meta-date">发布于 {{$utils.formatDate(article.created,'yyyy-MM-dd')}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </template>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        archives: {}
      }
    },
    created () {
      this.getData()
    },
    watch: {
    },
    methods: {
      getData () {
        this.$api.get('archives', null, r => {
          this.archives = r.payload
        })
      }
    }
  }
</script>
