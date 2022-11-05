import Vue from "vue";
import {
    Aside, Breadcrumb, BreadcrumbItem, Button, Card,
    Col,
    Container, DatePicker, Dialog,
    Dropdown,
    DropdownItem,
    DropdownMenu, Form, FormItem,
    Header, Input,
    Main,
    Menu,
    MenuItem,
    MenuItemGroup, Message, MessageBox, Option, Pagination, Row, Select, Submenu, Table, TableColumn, Tag
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css"

Vue.use(Container)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Col)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Row)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message