<template>
  <header id="header" class="header bg-white">
    <div class="navbar-container">
      <router-link to="/" class="navbar-logo">
        <img src="/static/image/logo.png" alt="ni"/>
      </router-link>
      <div class="navbar-menu">
        <router-link to="/category/摄影">摄影</router-link>
        <router-link to="/archives">归档</router-link>
        <router-link to="/page/links">友链</router-link>
        <router-link to="/page/about">关于</router-link>
      </div>
      <div class="navbar-search" onclick="">
        <span class="icon-search" @click="search"></span>
        <form role="search" onsubmit="return false;">
            <span class="search-box">
                <input type="text" id="search-inp" class="input" placeholder="搜索..." maxlength="30" @keyup.enter="search" v-model="keyword"
                       autocomplete="off">
            </span>
        </form>
      </div>
      <div class="navbar-mobile-menu" onclick="">
        <span class="icon-menu cross"><span class="middle"></span></span>
        <ul>
          <li><router-link to="/category/摄影">摄影</router-link></li>
          <li><router-link to="/archives">归档</router-link></li>
          <li><router-link to="/page/links">友链</router-link></li>
          <li><router-link to="/page/about">关于</router-link></li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
  // 隐藏和展示页面元素
  import Headroom from '../../static/js/headroom.min.js'

  export default {
    data () {
      return {
        keyword: ''
      }
    },
    mounted () {
      // 头部随滚动条动而隐藏展开
      let header = new Headroom(document.getElementById('header'), {
        tolerance: 10,
        offset: 80,
        classes: {
          initial: 'animated',
          pinned: 'slideDown',
          unpinned: 'slideUp'
        }
      })
      header.init()
    },
    methods: {
      search () {
        if (this.keyword !== '') {
          this.$router.push({path: '/search/' + this.keyword})
        }
      }
    }
  }
</script>
