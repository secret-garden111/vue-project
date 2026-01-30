import { createApp } from 'vue'
import App from '@/App.vue'
// 引入全局样式
import '@/styles/index.scss'
// 引入element-plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
// 注册svg图标
import 'virtual:svg-icons-register'
// 引入自定义插件，用于注册全部的全局组件
import globalComponents from '@/plugins'
// 引入路由器
import router from '@/router/index'
// 引入pinia实例
import pinia from '@/store/index'
// 注册所有element-plus的图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 安装插件
app.use(globalComponents)
// 安装pinia实例
app.use(pinia)
// 注册路由器
app.use(router)
// 引入路由鉴权
import './permission'

app.mount('#app')
