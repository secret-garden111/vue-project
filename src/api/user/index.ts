// 统一管理用户相关接口
import request from '@/utils/request'

// 引入数据类型
import type {
  loginFormData,
  loginResData,
  userInfoResData,
} from '@/api/user/type'

// 与用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录接口
export function reqLogin(data: loginFormData) {
  return request<any, loginResData>({
    url: API.LOGIN_URL,
    method: 'post',
    data,
  })
}

// 获取用户信息接口
export function reqUserInfo() {
  return request<any, userInfoResData>({
    url: API.USERINFO_URL,
    method: 'get',
  })
}

// 退出登录接口
export function reqLogout() {
  return request<any, any>({
    url: API.LOGOUT_URL,
    method: 'post',
  })
}
