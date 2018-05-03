import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入分组件
// import Home from '../components/home.vue';
// import IdInquiry from '../components/idInquiry.vue'
// import InquiryResult from '../components/inquiryResult.vue'
// import TrainList from '../components/trainList.vue'
// import TrainDetail from '../components/trainDetail.vue'


Vue.use(VueRouter);


const User = {
  template: '<div>Userssss</div>'
}
var router = new VueRouter({
    routes : [
        {
            path:'/', 
            // component: Home, 
            component: resolve => require(['../components/home.vue'], resolve),

        },
        {
            path:'/idInquiry', 
            // component: IdInquiry,
            component: resolve => require(['../components/idInquiry.vue'], resolve),
            children: [
                {path: 'user', component: User}
            ]
        },
        {
            path: '/inquiryResult', 
            // component: InquiryResult
            component: resolve => require(['../components/inquiryResult.vue'], resolve)
        },
        {
            path: '/trainList', 
            // component: TrainList
            component: resolve => require(['../components/trainList.vue'], resolve)
        },
        {
            path: '/trainDetail', 
            // component: TrainDetail
            component: resolve => require(['../components/trainDetail.vue'], resolve)
        }
    ]
})

export default router;
