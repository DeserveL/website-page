// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
import router from './router'
// 引用API文件 基于Axios
import api from './api'
// 引用工具文件
import utils from './utils'
// 代码高亮
import hljs from '../static/js/highlight.min.js'

Vue.use(VueCookie)

Vue.config.productionTip = false
// 将API方法绑定到全局
Vue.prototype.$api = api
// 将工具方法绑定到全局
Vue.prototype.$utils = utils

// 在main.js定义自定义代码高亮指令指令，使用v-highlight
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
