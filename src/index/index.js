import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js';


// 按需引入
import mintui from '../common/mint-ui';
mintui()


export default new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
