<template>
  <div :id="article.cid " class="comment-container">
    <div id="comments" class="clearfix">
      <div v-if="article.allowComment">
          <span class="response" v-if="login_user.username != null && login_user.username!=''">
        Hi，<a :href="login_user.homeUrl" data-no-instant>{{login_user.username}}</a>
            如果你想 <a href="javascript:void(0)" @click="logout()" title="注销" data-no-instant>注销</a>  ?
          </span>
        <form id="comment-form" class="comment-form" onsubmit="return false;">
          <input name="author" maxlength="12" id="author" class="form-control input-control clearfix"
                 placeholder="姓名 (*)" v-model="commentTemp.author" required/>
          <input type="email" name="mail" id="mail" class="form-control input-control clearfix" placeholder="邮箱 (*)"
                 v-model="commentTemp.mail" required/>
          <input type="url" name="url" id="url" class="form-control input-control clearfix" placeholder="网址 (http://)"
                 v-model="commentTemp.url"/>
          <textarea name="content" id="textarea" class="form-control" placeholder="基佬，留下你的评论." required minlength="5"
                    maxlength="2000" v-model="commentTemp.content"></textarea>
          <button class="submit" id="misubmit" @click="subComment()">提交</button>
        </form>
      </div>
      <div v-if="!article.allowComment"><span class="response">评论已关闭.</span></div>
      <!-- 评论 -->
      <ol class="comment-list">
        <li v-for="comment in pageInfo.list" :id="'li-comment-'+comment.coid"
            class="comment-body comment-parent comment-odd">
          <div :id="'comment-'+comment.coid">
            <div class="comment-view" onclick="">
              <div class="comment-header">
                <img class="avatar" :src="$utils.gravatarImg(comment.mail)+'?s=80&r=G&d=identicon'"
                     :title="comment.author"
                     width="80" height="80">
                <span class="comment-author">
                   <a :href="comment.url" target="_blank" rel="external nofollow">{{comment.author}}</a>
              </span>
              </div>
              <div class="comment-content">
                <span class="comment-author-at"></span>
                <p>{{comment.content}}</p>
              </div>
              <div class="comment-meta">
                <time class="comment-time">{{$utils.formatDate(comment.created, 'yyyy-MM-dd')}}</time>
                <span class="comment-reply">
                <a rel="nofollow" @click="replyComment(comment.coid)">回复</a>
              </span>
              </div>
            </div>
          </div>
          <div class="comment-children" v-if="comment.levels > 0">
            <ol class="comment-list">
              <li v-for="child in  comment.children" :id="'li-comment-'+child.coid"
                  class="comment-body comment-child comment-level-odd comment-odd">
                <div :id="'comment-'+ child.coid">
                  <div class="comment-view">
                    <div class="comment-header">
                      <img class="avatar" :src="$utils.gravatarImg(child.mail)+'?s=80&r=G&d=identicon'"
                           :title="child.author"
                           width="80"
                           height="80">
                      <span class="comment-author comment-by-author">
                      <a href="child.url" target="_blank"
                         rel="external nofollow">{{child.author}}</a>
                    </span>
                    </div>
                    <div class="comment-content">
                    <span class="comment-author-at">
                     <!-- <a href="javascript:void(0)" @click="goAnchor('comment-'+child.parent)">@{{comment.author}}</a>-->
                      <router-link :to="'#comment-' + child.parent ">@{{comment.author}} </router-link>
                    </span>
                      <p>{{child.content}}</p>
                    </div>
                    <div class="comment-meta">
                      <time class="comment-time">{{$utils.formatDate(child.created, 'yyyy-MM-dd')}}</time>
                      <span class="comment-reply">
                          <a rel="nofollow" @click="replyComment(child.coid)">回复</a>
                    </span>
                    </div>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </li>
      </ol>
      <!--评论翻页 -->
      <div class="lists-navigator clearfix">
        <pageNav :pageInfo="pageInfo" v-on:getPageData="getData"></pageNav>
      </div>
    </div>

  </div>
</template>
<script>
  import pageNav from './pageNav.vue'

  export default {
    props: ['article'],
    data () {
      return {
        login_user: {},
        pageInfo: {},
        commentTemp: {}
      }
    },
    components: {
      pageNav
    },
    created: function () {
      this.addCommentInputValue()
    },
    watch: {
      article () {
        this.getData()
      }
    },
    methods: {
      getData (page) {
        this.getComments(this.article.cid, page)
      },
      /**
       * 获取文章评论
       * @param cid 文章Id
       */
      getComments (cid, page) {
        this.commentTemp.cid = cid
        if (cid !== undefined && cid !== '') {
          this.$api.get('comments', {
            cid: cid,
            page: page,
            limit: 10
          }, r => {
            this.pageInfo = r.payload
          })
        }
      },
      /**
       * 评论
       */
      subComment () {
        this.$api.post('saveComment', this.commentTemp, result => {
          if (result && result.success) {
            alert('评论成功')
            window.location.reload()
          } else {
            alert('评论失敗')
          }
        }, r => {
          alert(r.msg)
        })
      },
      /** 回复评论 **/
      replyComment (coid) {
        this.commentTemp.parent = coid
        document.getElementById('textarea').focus()
        document.body.scrollTop = document.getElementById('comment-form').offsetTop - 100
      },
      /* eslint-disable */
     /* goAnchor (anchor) {
        document.body.scrollTop = document.getElementById(anchor).offsetTop - 100
      },*/
      /** 注销 --删除cookie **/
      logout () {
        this.$cookie.delete('tale_remember_author')
        this.$cookie.delete('tale_remember_mail')
        this.$cookie.delete('tale_remember_url')
        this.login_user = {}
        this.commentTemp.author = ''
        this.commentTemp.mail = ''
        this.commentTemp.url = ''
      },
      /**
       * 获取cookie中的内容
       */
      addCommentInputValue () {
        this.login_user.username = this.$cookie.get('tale_remember_author')
        this.login_user.email = this.$cookie.get('tale_remember_mail')
        this.login_user.homeUrl = this.$cookie.get('tale_remember_url')
        if (this.login_user.username !== '') {
          this.commentTemp.author = this.login_user.username
          this.commentTemp.mail = this.login_user.email
          this.commentTemp.url = this.login_user.homeUrl
        }
      }
    }
  }
</script>
