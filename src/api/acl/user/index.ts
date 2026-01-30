// 引入request
import request from '@/utils/request'
// 引入数据类型
import type { resultDataType, parameter } from '@/api/acl/user/type'

// 枚举请求地址
enum API {
  // 获取已有用户的数据
  HASUSER_URL = '/admin/acl/user/',
}

// 获取已有用户数据的接口方法
export function reqHasUser(data: parameter) {
  return request<any, resultDataType>({
    method: 'get',
    url: API.HASUSER_URL + `${data.page}/${data.limit}`,
    data: data,
  })
}
