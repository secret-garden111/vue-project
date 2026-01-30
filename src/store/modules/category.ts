// 引入pinia
import { defineStore } from 'pinia'
// 引入获取一级分类数据的请求接口
import {
  reqC1,
  reqC2,
  reqC3,
  reqCategoryAttrs,
  reqAddOrUpdateAttr,
  reqDeleteAttr,
} from '@/api/product/attr/index'
// 引入数据类型
import type {
  resultData,
  categoryObj,
  resAttrsData,
  attrData,
} from '@/api/product/attr/type'
// 创建仓库
const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      // 存储一级分类的数据
      c1Arr: <categoryObj[]>[],
      // 一级分类数据的id
      C1ID: '',
      // 存储二级分类数据
      c2Arr: <categoryObj[]>[],
      // 二级分类数据的id
      C2ID: '',
      // 存储三级分类的数据
      c3Arr: <categoryObj[]>[],
      // 三级分类数据的id
      C3ID: '',
      // 存储三级分类下返回的属性和属性值
      attrArr: <attrData[]>[],
    }
  },
  actions: {
    async reqGetC1() {
      const result: resultData = await reqC1()
      // 请求发送成功后存储返回的数据
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    },
    async reqGetC2(data: number | string) {
      const result: resultData = await reqC2(data)
      if (result.code === 200) {
        this.c2Arr = result.data
      }
    },
    async reqGetC3(data: number | string) {
      const result: resultData = await reqC3(data)
      if (result.code === 200) {
        this.c3Arr = result.data
      }
    },
    // 获取各个分类下属性和属性值
    async reqGetCategoryAttrs() {
      const result: resAttrsData = await reqCategoryAttrs(
        this.C1ID,
        this.C2ID,
        this.C3ID,
      )
      if (result.code === 200) {
        this.attrArr = result.data
      }
    },
    // 添加属性和属性值
    async reqAddAttr(data: any) {
      const result: any = await reqAddOrUpdateAttr(data)
      return result
    },
    // 删除某个属性
    async deleteAttr(data: number) {
      const result: any = await reqDeleteAttr(data)
      console.log(result)
    },
  },
  getters: {},
})

export default useCategoryStore
