<template>
  <div>
    <el-card class="select-card">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="一级分类">
          <el-select
            v-model="categoryStore.C1ID"
            @change="handlerSecondary"
            :disabled="scene === 1 ? false : true"
          >
            <el-option
              v-for="(c1, index) in categoryStore.c1Arr"
              :key="c1.id"
              :label="c1.name"
              :value="c1.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="categoryStore.C2ID"
            @change="handlerThird"
            :disabled="scene === 1 ? false : true"
          >
            <el-option
              v-for="(c2, index) in categoryStore.c2Arr"
              :key="c2.id"
              :label="c2.name"
              :value="c2.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select
            v-model="categoryStore.C3ID"
            :disabled="scene === 1 ? false : true"
          >
            <el-option
              v-for="(c3, index) in categoryStore.c3Arr"
              :key="c3.id"
              :label="c3.name"
              :value="c3.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 引入生命周期函数
import { onMounted, watch, onBeforeUnmount } from 'vue'
// 引入category仓库
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()
// 接收由attr组件传递的scene数据
defineProps(['scene'])
// 组件挂载完毕，通知仓库发送请求和存储数据
onMounted(() => {
  reqGet()
})
// 将发送请求的业务封装为一个函数
function reqGet() {
  categoryStore.reqGetC1()
}
// 获取二级分类目录的change事件的回调函数
function handlerSecondary() {
  // 当一级分类数据变化时，清空二级分类和三级分类的数据
  categoryStore.C2ID = ''
  categoryStore.c3Arr = []
  categoryStore.C3ID = ''
  // 通过仓库发送请求
  categoryStore.reqGetC2(categoryStore.C1ID)
}
// 获取三级分类目录的change事件的回调函数
function handlerThird() {
  // 当二级分类数据变化时，清空三级分类数据
  categoryStore.C3ID = ''
  // 通过仓库发送请求
  categoryStore.reqGetC3(categoryStore.C2ID)
}
// 监视仓库中三级分类ID是否存在，若存在便发送请求获取各个分类下的属性和属性值
watch(
  () => categoryStore.C3ID,
  () => {
    // 清空属性和属性值
    categoryStore.attrArr = []
    // 如果三级分类的ID不存在，就不发送请求
    if (!categoryStore.C3ID) return
    categoryStore.reqGetCategoryAttrs()
  },
)

// 组件卸载之前，清空分类仓库的数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped lang="scss">
.select-card {
  margin-bottom: 10px;
  .demo-form-inline .el-select {
    --el-select-width: 300px;
  }
}
</style>
