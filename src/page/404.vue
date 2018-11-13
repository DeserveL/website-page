<template>
  <div class="not-found">
    <div>404 not found</div>
    <p>{{ time }}s后将自动跳转到首页</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        time: 5,
        _Interval: null
      }
    },
    created () {
      this.data()
    },
    destroyed () {
      // 清除定时器
      clearInterval(this._Interval)
    },
    methods: {
      data () {
        this._Interval = setInterval(() => {
          if (this.time <= 0) {
            clearInterval(this._Interval)
            this.$router.push({ name: 'Index' })
            return
          }
          this.time -= 1
        }, 1000)
      }
    }
  }
</script>

<style>
  .not-found {
    text-align: center;
    margin-top: 150px;

  }

  .not-found div{
    font-size: 4em;
    color: #f4645f;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, .6);
    margin-bottom: 20px;
  }

  .not-found p{
    color: #666daf;
  }

</style>
