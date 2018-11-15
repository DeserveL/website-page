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
  routes: mainRoutes,
  mode: 'history',
  // 锚点定位
  scrollBehavior (to, from, savedPosition) {
    // 如果你的連結是帶 # 這種
    // to.hash 就會有值(值就是連結)
    // 例如 #3
    console.log('to', to)
    if (to.hash) {
      return {
        // 這個是透過 to.hash 的值來找到對應的元素
        // 照你的 html 來看是不用多加處理這樣就可以了
        // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
        selector: to.hash
      }
    }
  }
})

export default router
