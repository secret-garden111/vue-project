<template>
  <div>
    <h1>Home组件</h1>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API函数之生命周期函数
import { onMounted } from 'vue'
// 引入用户仓库
import useUserStore from '../store/modules/user.ts'
// 创建仓库实例
const userStore = useUserStore()

onMounted(() => {
  userStore.userInfo()
})
</script>

<style></style>
