<template>
  <div>
    <!-- 分类组件 -->
    <Category :scene="scene"></Category>
    <!-- SPU详情页面 -->
    <el-card>
      <!-- 场景1：显示已有的spu数据 -->
      <div v-show="scene === 1">
        <!-- 添加SPU按钮 -->
        <el-button
          type="primary"
          icon="Plus"
          :disabled="categoryStore.C3ID ? false : true"
          @click="addSpuData"
        >
          添加SPU
        </el-button>
        <!-- 各个SPU表格展示 -->
        <el-table :border="true" class="spu-table" :data="spuArr">
          <el-table-column
            label="序号"
            width="100px"
            align="center"
            type="index"
          ></el-table-column>
          <el-table-column label="SPU名称">
            <template #="{ row, $index }">
              <p class="spu-name">{{ row.spuName }}</p>
            </template>
          </el-table-column>
          <el-table-column label="SPU描述">
            <template #="{ row, $index }">
              <p>{{ row.description }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button
                size="small"
                type="primary"
                icon="Plus"
                title="添加SKU"
              ></el-button>
              <el-button
                size="small"
                type="warning"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                size="small"
                type="info"
                icon="InfoFilled"
                title="查看SKU列表"
              ></el-button>
              <el-button
                size="small"
                type="danger"
                icon="Delete"
                title="删除SPU"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="getHasSpu"
          @size-change="changePageSize"
        />
      </div>
      <!-- 场景2：添加或修改spu的子组件 -->
      <SpuForm
        ref="spu"
        v-show="scene === 2"
        @changeScene="changeScene"
      ></SpuForm>
      <!-- 场景3：添加sku的子组件 -->
      <SkuForm v-show="scene === 3"></SkuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 引入category组件
import Category from '@/components/Category/index.vue'
// 引入category仓库
import useCategoryStore from '@/store/modules/category'
// 创建仓库实例
const categoryStore = useCategoryStore()
// 引入响应式数据
import { ref, watch, onMounted } from 'vue'
// 引入接口方法
import { reqHadSpu } from '@/api/product/spu/index'
// 数据类型
import type { responseData, recordsData } from '@/api/product/spu/type'
// 引入场景子组件
import SpuForm from '@/pages/product/spuForm.vue'
import SkuForm from '@/pages/product/skuForm.vue'
// 定义控制场景切换的变量
// 1：展示已有的spu数据；2：添加或修改spu数据；3：添加sku数据
let scene = ref<number>(1)
// 当前页
let currentPage = ref<number>(1)
// 每页显示的条数
let pageSize = ref<number>(3)
// 总的数据条目
let total = ref<number>(0)
// 存储获取到的三级分类下的已有spu数据
let spuArr = ref<recordsData[]>([])
// 获取组件实例
let spu = ref<any>()

// 将获取已有spu数据的业务封装为一个方法
async function getHasSpu(pager = 1) {
  // 当修改页面显示内容条数时发送请求获取数据，此时是没有传递currentPage参数的
  // 所以要让页码跳转到第一页，即获取第一页的数据
  currentPage.value = pager
  // 调用函数发送请求
  const result: responseData = await reqHadSpu(
    currentPage.value,
    pageSize.value,
    categoryStore.C3ID,
  )
  if (result.code === 200) {
    spuArr.value = result.data.records
    total.value = result.data.total
  }
}

// 当第三级分类的id存在时，调用getHasSpu()函数获取已有spu数据
watch(
  () => categoryStore.C3ID,
  () => {
    // 务必保证在第三级分类的ID存在时再发请求
    if (!categoryStore.C3ID) return
    getHasSpu()
  },
)

// 当页面显示内容条数变化时调用事件的回调函数
function changePageSize() {
  getHasSpu()
}

// 添加spu数据按钮的回调函数
function addSpuData() {
  // 场景切换至spuForm
  scene.value = 2
  // 调用spuForm组件向外导出的方法，获取所有spu品牌和spu销售属性
  spu.value.addSpuReq(categoryStore.C3ID)
}

// 自定义事件的回调函数
function changeScene(sceneFlag: number) {
  scene.value = sceneFlag
}

// 修改spu按钮的回调函数
function updateSpu(row: recordsData) {
  scene.value = 2
  spu.value.reqHasSpu1(row)
  spu.value.reqHasSpu2(row)
  spu.value.reqHasSpu3(row)
  spu.value.reqHasSpu4(row)
}
</script>

<style scoped lang="scss">
.spu-table {
  margin: 15px 0;
  .spu-name {
    color: steelblue;
    font-weight: bold;
  }
}
</style>
