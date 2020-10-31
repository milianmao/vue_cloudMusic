import Vue from 'vue'
import {
    Header,
    Container,
    Aside,
    Footer,
    Main,
    Input,
    Menu,
    MenuItemGroup,
    Submenu,
    MenuItem,
    Button,
    Dialog,
    Form,
    FormItem,
    Message,
    Scrollbar,
    Row,
    Col,
    Collapse,
    CollapseItem,
    Tabs,
    TabPane,
    Table,
    TableColumn
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Header)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Input)
Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Scrollbar)
Vue.use(Row)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Col)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.component(Message.name, Message)
Vue.prototype.$message = Message