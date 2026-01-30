// 引入defineStore()方法
import { defineStore } from 'pinia'
// 引入user接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'
// 引入数据类型
import type {
  loginFormData,
  loginResData,
  userInfoResData,
} from '../../api/user/type'
import type { userState } from './types/type'
// 引入本地存储和读取数据的方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入常量路由
import constantRoute from '@/router/routes'

// 创建用户仓库
const useUserStore = defineStore('user', {
  // 数据存储
  state: function (): userState {
    return {
      // 在仓库当中存储token
      token: GET_TOKEN(),
      menuRoute: constantRoute,
      username: '',
      avator: '',
    }
  },
  // 异步与逻辑
  actions: {
    // 用户登录
    async userLogin(data: loginFormData) {
      const result: loginResData = await reqLogin(data)
      if (result.code === 200) {
        // 用户登录成功后，返回的token需要存储在本地浏览器
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        console.log(this.token)

        // 如果登录成功，就返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 获取用户信息
    async userInfo() {
      const result: userInfoResData = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.name
        this.avator = result.data.avator
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登录时需要向服务器发送请求，以通知服务器用户的唯一标识失效
    // 目前没有退出登录的mock接口
    // 清除存储的数据
    async userLogout() {
      // 发送退出登录的请求
      const result: any = await reqLogout()
      if (result.code === 200) {
        this.token = ''
        this.username = ''
        this.avator = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  //
  getters: {},
})
// 导出仓库
export default useUserStore
