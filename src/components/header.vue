<template>
  <header id="header" class="header bg-white">
    <div class="navbar-container">
      <a href="" class="navbar-logo">
        <img src="static/image/logo.png" alt="ni"/>
      </a>
      <div class="navbar-menu">
        <router-link to="/page/archives">归档</router-link>
        <router-link to="/page/links">友链</router-link>
        <router-link to="/page/about">关于</router-link>
      </div>
      <div class="navbar-search" onclick="">
        <span class="icon-search"></span>
        <form role="search" onsubmit="return false;">
                <span class="search-box">
                    <input type="text" id="search-inp" class="input" placeholder="搜索..." maxlength="30"
                           autocomplete="off">
                </span>
        </form>
      </div>
      <div class="navbar-mobile-menu" onclick="">
        <span class="icon-menu cross"><span class="middle"></span></span>
        <ul>
          <li><router-link to="/page/archives">归档</router-link></li>
          <li><router-link to="/page/links">友链</router-link></li>
          <li><router-link to="/page/about">关于</router-link></li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
  export default {
    created () {
      this.getData()
    },
    methods: {
      getData () {
        // this.$api.get('topics', null, r => {
        //   console.log(r)
        // })
      }
    }
  }
</script>
