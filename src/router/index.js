import Vue from 'vue'
import Router from 'vue-router'
import View404 from '@/page/404'
import Index from '@/page/index'
import Article from '@/page/article'

Vue.use(Router)

const mainRoutes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '*',
    component: View404
  }, {
    path: '/article/:cid',
    name: 'Article',
    component: Article
  }
]

const router = new Router({
  routes: mainRoutes
})

export default router
