// 此仓库用于布局方面的设置
import { defineStore } from 'pinia'

const useLayoutStore = defineStore('layoutStore', {
  state: function () {
    return {
      // 菜单折叠功能
      fold: false,
      // 刷新业务
      refresh: false,
    }
  },
})

export default useLayoutStore
