// 此文件用于定义与SPU业务相关的接口
import request from '@/utils/request'
// 数据类型
import type {
  responseData,
  spuTrademarkData,
  resSpuImageData,
  reqSpuSaleAttrData,
  reqAllSpuSaleAttrData,
  spuDataType,
} from './type'

// 接口地址
enum API {
  // 获取已有的spu品牌的接口地址
  GETHADSPU_URL = '/admin/product/',
  // 获取所有spu品牌的接口地址，用于在添加和修改已有spu时发送请求
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某个spu下所有商品图片的接口地址
  SPUIMAGE_URL = '/admin/product/spuImageList/',
  // 获取某个spu下销售属性的接口地址
  SPUSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目所有spu销售属性的接口地址
  ALLSPUSALEATTR_URL = '/admin/product/baseSaleAttrList',
  // 添加新的spu数据
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  // 更新已有的spu
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
}

// 获取已有三级分类下的spu的接口方法
export function reqHadSpu(
  currentPage: number,
  pageSize: number,
  C3ID: number | string,
) {
  return request<any, responseData>({
    method: 'get',
    url: API.GETHADSPU_URL + `${currentPage}/${pageSize}?category3Id=${C3ID}`,
  })
}

// 获取所有spu品牌的接口方法
export function reqAllTrademark() {
  return request<any, spuTrademarkData>({
    method: 'get',
    url: API.ALLTRADEMARK_URL,
  })
}

// 获取某个spu下所有商品图片的接口地址
export function reqSpuImage(SPUID: number) {
  return request<any, resSpuImageData>({
    method: 'get',
    url: API.SPUIMAGE_URL + SPUID,
  })
}

// 获取某个spu下销售属性的接口方法
export function reqSpuSaleAttr(SPUID: number) {
  return request<any, reqSpuSaleAttrData>({
    method: 'get',
    url: API.SPUSALEATTR_URL + SPUID,
  })
}

// 获取整个项目所有spu销售属性的接口方法
export function reqAllSpuSaleAttr() {
  return request<any, reqAllSpuSaleAttrData>({
    method: 'get',
    url: API.ALLSPUSALEATTR_URL,
  })
}

// 发送请求添加一个新的spu数据或更新已有的spu数据
export function reqAddOrUpdateSpu(data: spuDataType) {
  if (data.id) {
    return request<any, any>({
      method: 'post',
      url: API.UPDATESPU_URL,
      data,
    })
  } else {
    return request<any, any>({
      method: 'post',
      url: API.ADDSPU_URL,
      data,
    })
  }
}
