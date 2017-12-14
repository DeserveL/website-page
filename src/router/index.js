import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Article from '@/page/article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/article/:cid',
      name: 'Article',
      component: Article
    }
  ]
})
