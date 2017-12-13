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
      path: '/indexpage/:page',
      name: 'IndexPage',
      component: Index
    }, {
      path: '/article/:id',
      name: 'Article',
      component: Article
    }
  ]
})
