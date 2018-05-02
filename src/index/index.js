import Vue from 'vue'
import App from './App.vue'
import mintui from '../common/mint-ui';


import router from './router/router.js';

mintui()


export default new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
