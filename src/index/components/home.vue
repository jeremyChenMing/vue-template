<template>
  <div class="content">
    <h1>1111</h1>
    <img src="../assets/logo.png">
    <h1 class="title">{{ msg }}</h1>
    <ul class="list">
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
    <mt-button size="large" type="primary">large</mt-button>
  </div>
</template>

<script>
export default {
  // name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    console.log('123123', this.$moment().format('YYYY-MM-DD'))
  }
}
</script>
<style lang="less" src="./basic.less" scoped>
  // @import url('./basic.less');
</style>

