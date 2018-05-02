import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../components/home.vue';

// 引入分组件
import IdInquiry from '../components/idInquiry.vue'
import InquiryResult from '../components/inquiryResult.vue'
import TrainList from '../components/trainList.vue'
import TrainDetail from '../components/trainDetail.vue'

Vue.use(VueRouter);
var router = new VueRouter({
    routes : [
        {path:'/', component: Home},
        {path:'/idInquiry', component: IdInquiry},
        {path: '/inquiryResult', component: InquiryResult},
        {path: '/trainList', component: TrainList},
        {path: '/trainDetail', component: TrainDetail}
    ]
})

export default router;
