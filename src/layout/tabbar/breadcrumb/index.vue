<template>
  <!-- 图标 -->
  <el-icon class="tabbar_icon" @click="changeIcon">
    <component :is="layoutStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 图标 -->
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 匹配到的路由的标题 -->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts" name="Breadcrumb">
import { ArrowRight } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
// 引入布局设置相关的仓库
import useLayoutStore from '../../../store/modules/layout.ts'
// 创建仓库实例
const layoutStore = useLayoutStore()
// 获取路由对象
const $route = useRoute()

function changeIcon() {
  layoutStore.fold = !layoutStore.fold
}
</script>

<style scoped lang="scss">
.tabbar_icon {
  margin: 0 10px;
}
</style>
