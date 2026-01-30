import type { Trademark } from '@/api/product/trademark/type'
// 返回值公共类型
export interface CommonDataType {
  code: number
  message: string
  ok: boolean
}
// request发送请求后服务器的返回值类型
export interface responseData extends CommonDataType {
  data: dataType
}
// 服务器返回值当中data项的数据类型
export interface dataType {
  records: recordsData[]
  current: number
  pages: number
  size: number
  total: number
}
// 服务器返回值records项的数据类型
export interface recordsData {
  category3Id?: number | string
  description: string
  id?: number
  spuName: string
}
// 定义获取所有spu品牌接口方法的返回值类型
export interface spuTrademarkData extends CommonDataType {
  data: Trademark[]
}

// 定义获取某个spu品牌的全部商品图片时返回数据当中data数组的类型
export interface spuImageDataType {
  id?: number
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}

// 定义获取某个spu品牌的全部商品图片时返回数据的类型
export interface resSpuImageData extends CommonDataType {
  data: spuImageDataType[]
}

// 定义获取某个spu品牌销售属性时返回值data数组当中销售属性值的类型
export interface spuSaleAttrValueList {
  id?: number
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
}

// 定义获取某个spu品牌销售属性时返回值data数组的数据类型
export interface spuSaleAttrList {
  id?: number
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: spuSaleAttrValueList[]
  flag?: boolean
  newAttrValue?: string
}

// 获取spu销售属性时返回值的数据类型
export interface reqSpuSaleAttrData extends CommonDataType {
  data: spuSaleAttrList[]
}

// 获取全部spu销售属性时返回数据当中data数组的类型
export interface AllSpuSaleAttrList {
  id: number
  name: string
}

// 获取全部spu销售属性时返回数据的类型
export interface reqAllSpuSaleAttrData extends CommonDataType {
  data: AllSpuSaleAttrList[]
}

// spu数据完整的数据类型，即在添加和修改spu数据时需要传递的参数的数据类型
export interface spuDataType extends recordsData {
  tmId: number | string
  spuImageList: null | spuImageDataType[]
  spuSaleAttrList: null | spuSaleAttrList[]
}
