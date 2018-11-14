import Vue from 'vue'
import Router from 'vue-router'
import View404 from '@/page/404'
import Index from '@/page/index'
import Article from '@/page/article'
import Page from '@/page/page'
import PageCategory from '@/page/page-category'
import Categories from '@/page/categories'
import Archives from '@/page/archives'

Vue.use(Router)

const mainRoutes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/article/:cid',
    name: 'Article',
    component: Article
  }, {
    path: '/page/:cid',
    name: 'Page',
    component: Page
  }, {
    path: '/categories',
    name: 'Categories',
    component: Categories
  }, {
    path: '/tags',
    name: 'Tags',
    component: Categories
  }, {
    path: '/category/:keyword',
    name: 'PageCategory',
    component: PageCategory
  }, {
    path: '/tag/:keyword',
    name: 'PageTag',
    component: PageCategory
  }, {
    path: '/search/:keyword',
    name: 'PageSearch',
    component: PageCategory
  }, {
    path: '/archives',
    name: 'Archives',
    component: Archives
  }, {
    path: '*',
    name: 'View404',
    component: View404
  }
]

const router = new Router({
  mode: 'history',
  routes: mainRoutes
})

export default router
