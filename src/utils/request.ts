// 引入axios
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 引入用户仓库，获取其中存储的token
import useUserStore from '@/store/modules/user'
// 调用create()方法创建axios实例
// 在实例当中可以进行一些配置，如基础路径、请求超时限制等
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

// 配置请求拦截器
request.interceptors.request.use(function (config) {
  // config配置对象具有属性headers，即请求头，用于给服务器传递公共参数
  // console.log("请求拦截器",config)
  // 创建仓库实例
  const userStore = useUserStore()
  config.headers.token = userStore.token
  return config
})

// 配置响应拦截器
request.interceptors.response.use(
  function (response) {
    // console.log('响应拦截器', response.data.data)
    // return response
    // 可以直接返回response.data，其中存储着mock当中接口返回的数据
    return response.data
  },
  function (error: any) {
    // 此函数用于处理http网络错误
    // 定义一个变量，存储网络错误信息
    // console.log(error.response)

    let message = ''
    const status: number = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器错误'
        break
      default:
        message = '网络错误'
        break
    }
    // 提示错误信息
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

export default request
