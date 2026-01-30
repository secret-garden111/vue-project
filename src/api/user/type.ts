// 定义与用户相关数据的ts类型
// 登录接口传递参数的ts类型
export interface loginFormData {
  username: string
  password: string
}

// 定义全部接口响应数据共有数据的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 定义登录接口返回数据的类型
export interface loginResData extends ResponseData {
  data: string
}

// 定义获取用户信息返回数据的类型
export interface userInfoResData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avator: string
  }
}
