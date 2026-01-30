<template>
  <div class="layout_container">
    <!-- 左侧导航区域 -->
    <div class="layout_slider">
      <!-- logo组件 -->
      <Logo></Logo>
      <!-- 菜单组件 -->
      <el-menu
        :default-active="$route.path"
        background-color="#001529"
        text-color="#fff"
        :collapse="layoutStore.fold ? true : false"
        style="border: none"
      >
        <Menu :menuList="userStore.menuRoute"></Menu>
      </el-menu>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: layoutStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 内容区域 -->
    <div
      class="layout_content"
      :class="{ fold: layoutStore.fold ? true : false }"
    >
      <el-scrollbar class="content_scrollbar">
        <Content></Content>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
// 引入logo组件
import Logo from './logo/index.vue'
// 引入菜单组件
import Menu from './menu/index.vue'
// 引入tabbar组件
import Tabbar from './tabbar/index.vue'
// 引入content组件
import Content from './content/index.vue'
// 从user仓库中引入存储的常量路由
import useUserStore from '@/store/modules/user'
import useLayoutStore from '@/store/modules/layout'
const userStore = useUserStore()
const layoutStore = useLayoutStore()

const $route = useRoute()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    color: #fff;
    transition: 0.3s all;
    .scrollbar {
      height: calc(100vh - $base-menu-logo-height);
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-topbar-height;
    // background-color: skyblue;
    top: 0;
    left: $base-menu-width;
    transition: 0.3s all;
    &.fold {
      left: 50px;
      width: calc(100% - 50px);
    }
  }
  .layout_content {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-topbar-height);
    top: $base-topbar-height;
    left: $base-menu-width;
    padding: 20px;
    box-sizing: border-box;
    transition: 0.3s all;
    &.fold {
      left: 50px;
      width: calc(100% - 50px);
    }
    .content_scrollbar {
      height: calc(100vh - $base-topbar-height - 20px);
    }
  }
}
</style>
