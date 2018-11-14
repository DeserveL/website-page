<template>
  <div id="app">
    <myHeader></myHeader>
    <router-view/>
    <myFooter></myFooter>
  </div>
</template>
<script>
  import myHeader from './components/header.vue'
  import myFooter from './components/footer.vue'
  export default {
    name: 'app',
    components: { myHeader, myFooter }
  }
</script>

<style lang="scss">
  @import "./style/style";
  @import '../static/css/xcode.min.css';
  @import '../static/css/style.min.css';
</style>
