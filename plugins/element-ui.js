import Vue from 'vue'
import { Button, Input, Radio, RadioGroup, Pagination, Form, FormItem, Select, Option, Checkbox, CheckboxGroup, Dropdown, DropdownMenu, DropdownItem, Menu, Submenu, MenuItem, MenuItemGroup, Table, TableColumn, DatePicker, Tooltip, Tabs, Tag, Icon, Row, Col, Container, Header, Main, Aside, Footer, Divider, Loading, MessageBox,Message, Notification } from 'element-ui'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// 自訂義主題樣式(在這文件內引入所需的樣式)
import '../assets/scss/element-variables.scss'

// configure language
locale.use(lang)

Vue.use(Button)
Vue.use(Input)
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(Tooltip)
Vue.use(Tag)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Divider)

// set
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
