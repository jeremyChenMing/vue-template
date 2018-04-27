import Vue from 'vue'
import App from './App.vue'
import mintui from '../common/mint-ui';


import router from './router/router.js';

mintui()
// const Foo = { template: '<div>foo</div>' }
// new Vue({
//   el: '#app',
//   render: h => h(App)
// })

export default new Vue({
  router,
  render: h => h(App)
}).$mount('#app');





// new Vue({
//   el: '#app',
//   render: h => h(App)
// })