<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h4>jeremy</h4>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <div class="box">
      <h2>jeremu11111---</h2> 
    </div>
    <div class="upvi-icon icon">&#xe729;</div>
  </div>
</template>

<script>
import { getSomeMes } from '../common/services/service'
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    console.log('entry in created lifeCycle')
    const id = 'b8c0d143-46dd-11e8-b9da-0a580af4030b'
    // const token = this.getToken()
    // getSomeMes(id, {}, token).then( data => {
    //   console.log(data)
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  mounted() {
    // console.log('entry in mounted lifeCycle')
  },
  methods: {
    getToken: function () {
      return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoidXB2aXIiLCJjb21wYW55X25hbWUiOiLljJfkuqzkvIHpo57np5HmioDvvIjmvJTnpLrvvInmnInpmZDlhazlj7giLCJjb21wYW55X3Nob3J0X25hbWUiOiIiLCJlbXBsb3llZV9pZCI6ImI4YzBkMTQzLTQ2ZGQtMTFlOC1iOWRhLTBhNTgwYWY0MDMwYiIsImVtcGxveWVlX3N0YXR1cyI6ImFjdGl2ZSIsImV4cCI6MTUyNDU3MDQ1NiwiZmlyc3RfdXNlcl9pZCI6IjQ1OWRhYmMwLWFmZjQtNDNkYi05MTY1LWRmODdhNzM2Y2I1ZSIsImZpcnN0X3VzZXJfbW9iaWxlIjoiMTg2MTI4MTk0MjciLCJoYXNfcHdkIjp0cnVlLCJsYXN0X3RlbmFudF9pZCI6dHJ1ZSwicm9sZXMiOltdLCJ0ZW5hbnRfYWNjb3VudCI6IiIsInRlbmFudF9pZCI6IjI4YWQ0OWZkLTAyNmMtNGQ5Yy05MTJkLWU5MDVkNjFhN2JmNSIsInVzZXJfaWQiOiI4ZTE3YTU1Ni0zNTJjLTExZTctYWQzMi0wMDE2M2UwMDcwNTMiLCJ1c2VyX21vYmlsZSI6IjE3NjEwMjYzNzIzIiwidXNlcl9uYW1lIjoi5aSn546LIiwidXNlcl9zZXgiOiIiLCJ1c2VyX3N0YXR1cyI6ImFjdGl2ZSIsInVzZXJfdHlwZSI6IjAifQ.s0iBnB-DgFxFLFFrcX-Z_zvUPFoWwChUdTfy2oLjbi0'
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/index.less';
.box{
  background-color: rgba(0,0,0,.1);
  // display: flex;
  & > img{
    width: 100%;
  }
  & > h2{
    color: #ccf;
  }
}
.icon{
  font-size: 2rem;
}

</style>
