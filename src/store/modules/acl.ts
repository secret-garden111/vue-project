// 引入defineStore方法
import { defineStore } from 'pinia'
// 引入用户权限管理接口
import { reqHasUser } from '@/api/acl/user/index'
// 引入相关数据类型
import type { resultDataType, parameter } from '@/api/acl/user/type'

// 创建仓库
const useAclStore = defineStore('acl', {
  // 数据存储
  state: () => {
    return {
      // 控制抽屉的显示与隐藏
      drawerControler: false,
    }
  },

  // 异步与逻辑
  actions: {
    async getHasUser(data: parameter) {
      let result: resultDataType = await reqHasUser(data)
      return result
    },
  },

  //
  getters: {},
})

// 导出仓库
export default useAclStore
