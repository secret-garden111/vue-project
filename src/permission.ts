// 路由鉴权：控制路由跳转
// 引入路由器
import router from '@/router/index'
// 引入进度条
import nprogress from 'nprogress'
// 引入logo文件
import logo from '@/logo'
// 引入进度条样式
import '../node_modules/nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
// 引入总仓库
import pinia from '@/store/index'
// 引入user仓库
import useUserStore from './store/modules/user'
const userStore = useUserStore(pinia)
// console.log(userStore)

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 设置标题
  document.title = `${logo.title} - ${to.meta.title}`
  // 进度条开始
  nprogress.start()
  // 利用仓库中存储的token判断登录状态
  const token = userStore.token
  // 获取仓库中的用户信息
  const username = userStore.username
  if (token) {
    // 登录成功后，若是再要访问login，是无法访问的，让其跳转到首页即可
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 登录成功后允许访问其他路有
      // 如果user仓库中有用户信息，就允许访问其他路有
      if (username) {
        next()
      } else {
        // 如果没有用户信息，就向服务器发送请求获取用户信息
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          // 若token过期，就无法获取用户信息
          // 本地存储的token被用户修改，也无法获取到用户信息
          // 退出登录，清空用户信息
          // 若token过期，则需要在退出登录请求发送成功后再跳转到登录界面
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 用户未登录
    // 若访问的是login，就放行；若是其他路由，就让其跳转到login页面
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  // 进度条结束
  nprogress.done()
})
