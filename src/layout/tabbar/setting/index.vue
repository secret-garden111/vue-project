<template>
  <el-button :icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button :icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-button :icon="Setting" circle></el-button>
  <img :src="userStore.avator" />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="Setting">
// 引入element-plus图标组件
import { Refresh, FullScreen, Setting } from '@element-plus/icons-vue'
// 引入编程式路由导航
import { useRouter, useRoute } from 'vue-router'
// 引入仓库
import useLayoutStore from '@/store/modules/layout'
import useUserStore from '@/store/modules/user'
// 创建仓库实例
const layoutStore = useLayoutStore()
const userStore = useUserStore()
// 创建路由器对象
const $router = useRouter()
const $route = useRoute()
// 刷新业务的回调函数
function updateRefresh() {
  layoutStore.refresh = !layoutStore.refresh
}
// 全屏业务的回调函数
function fullScreen() {
  // DOM对象的一个属性，用于判断当前是否是全屏模式（true：全屏，false：不是全屏）
  const full = document.fullscreenElement
  if (!full) {
    // requestFullscreen()方法，用以实现全屏功能
    document.documentElement.requestFullscreen()
  } else {
    // exitFullscreen()方法，退出全屏
    document.exitFullscreen()
  }
}
// 退出登录的回调函数
async function logout() {
  // 清除user仓库中存储的token、username、avator
  await userStore.userLogout()
  // 路由跳转到login页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style scoped lang="scss">
img {
  width: 24px;
  height: 24px;
  margin: 0 10px;
  border-radius: 50px;
}
</style>
