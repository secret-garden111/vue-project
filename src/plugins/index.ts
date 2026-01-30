// 引入全局组件
import SvgIcon from '@/components/SvgIcon/index.vue'
import Category from '@/components/Category/index.vue'
//
import type { App, Component } from 'vue'
// 将全局组件封装为一个对象
const globalComponents: { [name: string]: Component } = { SvgIcon, Category }

export default {
  install(app: App) {
    // Object.keys()返回值是一个由对象的key组成的数组
    Object.keys(globalComponents).forEach((key: string) => {
      app.component(key, globalComponents[key])
    })
  },
}
