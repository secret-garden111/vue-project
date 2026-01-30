// 此文件用于定义与分类相关的数据的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 分类数组元素的数据类型
export interface categoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}
// 响应数据result的数据类型
export interface resultData extends ResponseData {
  data: categoryObj[]
}
// 三级分类下返回的数据中data下的attrValueList的数据类型
export interface attrValueList {
  id: number | string
  valueName: string
  attrId: number
}
// 三级分类下返回的数据中data的数据类型
export interface attrData {
  id: number | string
  attrName: string
  categoryId: number
  attrValueList: attrValueList[]
  categoryLevel: number
}
// 三级分类下返回数据的数据类型
export interface resAttrsData extends ResponseData {
  data: attrData[]
}
