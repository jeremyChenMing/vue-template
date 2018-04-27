/**
 * 需要多少引入多好组件，减少打包后文件的大小
 *
 */
import Vue from 'vue';
import { 
    Button,
    Progress,
    Tabbar, TabItem,
    TabContainer, TabContainerItem,
    Header,
    Swipe, SwipeItem,
    Cell,
    InfiniteScroll,
    Spinner,
    
} from 'mint-ui';
import 'mint-ui/lib/style.css';



export default function elementui() {
    Vue.component(Button.name,Button);
    Vue.component(Progress.name,Progress);
    Vue.component(Tabbar.name, Tabbar);
    Vue.component(TabItem.name, TabItem);
    Vue.component(TabContainer.name, TabContainer);
    Vue.component(TabContainerItem.name, TabContainerItem);
    Vue.component(Header.name, Header);
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    Vue.component(Cell.name, Cell);
    Vue.component(Spinner.name, Spinner);
    Vue.use(InfiniteScroll);
}
