// 此文件用于创建路由器，并向外暴露
// 引入vue-router
import { createRouter, createWebHashHistory } from 'vue-router'
// 引入定义的常量路由
import constantRoute from './routes'

// 引入组件
/* 
说明：
    - 直接引入所有组件不推荐
    - 原因：这种直接引入所有组件的方式，在打包构建应用时，javascript包是很大的，会影响页面加载
    - 推荐方式：路由懒加载
*/
// import Login from '@/pages/Login.vue'
// import Home from '@/pages/Home.vue'
// import Error from '@/pages/404.vue'

// 创建路由器
const router = createRouter({
  // hash模式（路由的工作模式是必须指定的）
  history: createWebHashHistory(),
  routes: constantRoute,
  // 配置页面滚动行为
  // 说明：导航到新路由时，页面始终滚动到左侧和顶部
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
