/**
 * 需要多少引入多好组件，减少打包后文件的大小
 *
 */
import Vue from 'vue';
import { 
    Button,
} from 'mint-ui';
import 'mint-ui/lib/style.css';



export default function elementui() {
    Vue.component(Button.name,Button);
}
