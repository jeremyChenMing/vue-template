import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/home.vue';

Vue.use(VueRouter);
const Bar = { template: '<div>bar</div>' }
var router = new VueRouter({
    routes : [
        {path:'/',component: Home},
        {path:'/bar',component: Bar},
    ]
})

export default router;
