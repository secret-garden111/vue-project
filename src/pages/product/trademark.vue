<template>
  <div>
    <!-- 卡片组件 -->
    <el-card>
      <!-- 添加品牌按钮 -->
      <el-button type="primary" :icon="Plus" @click="addTrademark">
        添加品牌
      </el-button>
      <!-- 表格组件 -->
      <el-table :border="true" style="margin: 10px 0" :data="trademarkArr">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="品牌名称">
          <template #="{ row, column, $index }">
            <pre style="color: steelblue; font-size: 20px">{{
              row.tmName
            }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{ row, column, $index }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row, column, $index }">
            <el-button
              type="primary"
              :icon="Edit"
              @click="updateTrademark(row)"
            ></el-button>
            <el-popconfirm
              :title="`确定要删除${row.tmName}吗？`"
              width="200px"
              icon="Delete"
              @confirm="deleteTrademark(row.id)"
            >
              <template #reference>
                <el-button type="primary" :icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="count"
        :background="true"
        layout="prev, pager, next, jumper,->, sizes,total"
        :total="total"
        :pager-count="9"
        @current-change="getHasTrademark"
        @size-change="changePageSize"
      />
    </el-card>
    <Dialog
      :getHasTrademark="getHasTrademark"
      @send-ruleRef="sendRuleRef"
    ></Dialog>
  </div>
</template>

<script setup lang="ts" name="Trademark">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ref, reactive, onMounted, nextTick } from 'vue'
import {
  reqHasTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark/index'
import { reqAddOrEditTrademark } from '@/api/product/trademark'
import { ElMessage } from 'element-plus'
// 引入数据类型
import type { responseData, Trademark } from '../../api/product/trademark/type'
// 引入对话框组件
import Dialog from '@/pages/product/dialog/index.vue'
// 引入product仓库
import useProductStore from '@/store/modules/product'
// 创建仓库实例
const productStore = useProductStore()

// current-page:当前页
const currentPage = ref<number>(1)
// page-size:每页显示的条数
const pageSize = ref<number>(3)
// page-sizes:每一页显示个数配置
const count = reactive<number[]>([3, 5, 7, 9])
// total:总条目数
const total = ref<number>(0)
// trademarkArr:存储服务器返回的品牌信息
const trademarkArr = ref<Trademark[]>()
// 用于接收自定义事件传递的数据
let ruleRef = ref()

// 发送请求获取品牌信息
// 将发送请求获取已有品牌的功能封装为一个函数
async function getHasTrademark(pager = 1) {
  // 当每页显示的条数变化时，默认跳转到第一页
  currentPage.value = pager
  const result: responseData = await reqHasTrademark(
    currentPage.value,
    pageSize.value,
  )

  if (result.code === 200) {
    // 存储服务器返回的数据的总数和具体品牌信息
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}

// 当组件挂载后，发送一次请求
onMounted(function () {
  getHasTrademark()
})

// current-page发生变化时触发的回调函数
// current-change是自定义事件，pagination组件会通过该事件向父组件传递参数，即当前页码的值
// pagination组件已经通过v-model对当前页码的值进行了双向绑定，所以传递的参数也就无需使用
// 以下的事件回调函数也不需要，因为其只是调用了getHasTrademark()发送请求
// 可以直接将发送请求的函数作为自定义事件的值
// function changeCurrentPage() {
// 当前页码发生变化时，再向服务器发送请求获取当前页的品牌数据
//   getHasTrademark()
// }

// 当page-size的值变化时触发事件的回调函数
// 同样是自定义事件，与current-page的原理一样
function changePageSize() {
  // 发送请求获取对应条数的数据
  getHasTrademark()
}

// 自定义事件的回调函数
function sendRuleRef(value: any) {
  ruleRef = value
}

// 添加品牌的事件回调函数
function addTrademark() {
  productStore.dialogTableVisible = true
  // 点击按钮弹出对话框时，先清除表单校验的提示信息
  // 第一次点击添加按钮时，form表单还未渲染，所以获取不到el-form
  // 此时使用ruleRef的值控制台会报错，提示为undefined

  // 第一种写法：el-form实例存在就调用方法，不存在就不调用
  // ruleRef.value?.clearValidate()

  // 第二种写法
  nextTick(() => {
    ruleRef.value.clearValidate()
  })
}

// 编辑品牌的事件回调函数
async function updateTrademark(row: Trademark) {
  // 清除表单校验的提示信息
  // nextTick(() => {
  //   ruleRef.value.clearValidate()
  // })
  // 弹出对话框
  productStore.dialogTableVisible = true
  // 获取当前已有品牌的数据,因为是修改数据，所以应当获取品牌的id属性
  productStore.id = row.id as number
  productStore.tmName = row.tmName
  productStore.logoUrl = row.logoUrl
}

// 删除品牌的回调函数
async function deleteTrademark(id: number) {
  const result = await reqDeleteTrademark(id)
  console.log(result)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功！',
    })
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败！',
    })
  }
  // 重新加载品牌列表
}
</script>

<style></style>
