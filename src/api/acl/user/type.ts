// 返回数据result的数据类型
export interface resultDataType {
  code: number
  data: dataType
  message: string
  ok: boolean
}

// result数据中data的数据类型
export interface dataType {
  current: number
  pages: number
  records: records[]
  size: number
  total: number
}

// records数据类型
export interface records {
  ID: number
  createTime: string
  id: number
  name: string
  password: string
  phone: string
  roleName: string
  updateTime: string
  username: string
}

// 发送请求获取已有用户数据时，传递参数的数据类型
export interface parameter {
  page: number
  limit: number
}
