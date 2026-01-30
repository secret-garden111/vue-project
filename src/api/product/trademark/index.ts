// 品牌管理相关接口
// 引入request实例
import request from '@/utils/request'
// 引入数据类型
import type { responseData, Trademark } from './type'
// 枚举请求地址
enum API {
  // 获取已有品牌的接口地址
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌的接口地址
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 编辑品牌的接口地址
  EDITTRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌的接口 地址
  DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}
// 获取已有品牌的方法
export function reqHasTrademark(page: number, limit: number) {
  return request<any, responseData>({
    method: 'get',
    url: API.TRADEMARK_URL + `${page}/${limit}`,
  })
}
// 添加品牌和编辑品牌的方法
export function reqAddOrEditTrademark(data: Trademark) {
  if (data.id) {
    return request<any, any>({
      method: 'put',
      url: API.EDITTRADEMARK_URL,
      data,
    })
  } else {
    return request<any, any>({
      method: 'post',
      url: API.ADDTRADEMARK_URL,
      data,
    })
  }
}
// 删除品牌的方法
export function reqDeleteTrademark(id: number) {
  return request<any, any>({
    method: 'delete',
    url: API.DELETETRADEMARK_URL + id,
  })
}
