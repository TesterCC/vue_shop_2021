import Vue from 'vue'
import { Button, Form, FormItem, Input, Message, Container, Header, Aside, Main } from 'element-ui'

// 注册为全局可用的组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)

// $message是自定义属性，可以改名字  把弹框组件挂载到Vue.prototype对象上，这样每个组件都可以通过this来访问到$message
Vue.prototype.$message = Message
