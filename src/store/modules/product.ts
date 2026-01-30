import { defineStore } from 'pinia'

const useProductStore = defineStore('product', {
  state: () => {
    return {
      dialogTableVisible: false,
      id: 0,
      tmName: '',
      logoUrl: '',
    }
  },
  actions: {},
  getters: {},
})

export default useProductStore
