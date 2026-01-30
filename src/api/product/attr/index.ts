import request from '@/utils/request'
// 引入数据类型
import type { resultData, resAttrsData } from '@/api/product/attr/type'

enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  // 获取各个分类下的属性和属性值
  ATTR_URL = '/admin/product/attrInfoList/',
  // 添加或更新属性的接口
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  // 删除属性的接口
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}

// 获取一级分类的接口方法
export function reqC1() {
  return request<any, resultData>({
    method: 'get',
    url: API.C1_URL,
  })
}
// 获取二级分类的接口方法
export function reqC2(C1ID: number | string) {
  return request<any, resultData>({
    method: 'get',
    url: API.C2_URL + C1ID,
  })
}
// 获取三级分类的接口方法
export function reqC3(C2ID: number | string) {
  return request<any, resultData>({
    method: 'get',
    url: API.C3_URL + C2ID,
  })
}
// 获取各个分类下的属性和属性值的接口方法
export function reqCategoryAttrs(
  C1ID: number | string,
  C2ID: number | string,
  C3ID: number | string,
) {
  return request<any, resAttrsData>({
    method: 'get',
    url: API.ATTR_URL + `${C1ID}/${C2ID}/${C3ID}`,
  })
}
// 添加或更新属性的接口方法
export function reqAddOrUpdateAttr(data: any) {
  return request<any, any>({
    method: 'post',
    url: API.ADDORUPDATEATTR_URL,
  })
}
// 删除属性的接口方法
export function reqDeleteAttr(data: number | string) {
  return request<any, any>({
    method: 'delete',
    url: API.DELETEATTR_URL + data,
  })
}
