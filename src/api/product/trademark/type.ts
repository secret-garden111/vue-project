// 定义trademark品牌管理数据类型
// 各个品牌的数据类型
export interface Trademark {
  id?: number
  logoUrl: string
  tmName: string
}
// 响应数据中data的数据类型
interface dataType {
  records: Trademark[]
  current: number
  pages: number
  searchCount: number
  size: number
  total: number
}
// request发送请求后的响应数据类型
export interface responseData {
  code: number
  message: string
  ok: boolean
  data: dataType
}
