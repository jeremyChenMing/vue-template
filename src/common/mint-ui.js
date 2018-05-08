/**
 * 需要多少引入多好组件，减少打包后文件的大小
 */
import Vue from 'vue';
import { 
    InfiniteScroll,
    Toast,
    Button
} from 'mint-ui';
import moment from 'moment'
export default function elementui() {
    Vue.use(InfiniteScroll);
    Vue.component(Toast.name, Toast);
    Vue.component(Button.name, Button);
    
    Vue.prototype.$moment = moment; //以后在每个页面都可以直接使用 this.$moment ,  不在需要每个页面import 'moment' 。
}
