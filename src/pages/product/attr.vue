<template>
  <div>
    <!-- Category组件 -->
    <Category :scene="scene"></Category>
    <el-card class="content-card">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="categoryStore.C3ID ? false : true"
          @click="addAttrs"
        >
          添加属性
        </el-button>
        <el-table
          :border="true"
          class="table-style"
          :data="categoryStore.attrArr"
        >
          <el-table-column
            label="序号"
            width="100px"
            align="center"
            type="index"
          ></el-table-column>
          <el-table-column label="属性名称" width="150px">
            <template #="{ row, column, $index }">
              <p style="color: steelblue">{{ row.attrName }}</p>
            </template>
          </el-table-column>
          <el-table-column label="属性值">
            <template #="{ row, column, $index }">
              <el-tag
                style="margin: 5px"
                v-for="(attr, index) in row.attrValueList"
                :key="attr.id"
              >
                {{ attr.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template #="{ row, column, $index }">
              <el-button
                type="primary"
                icon="Edit"
                @click="editAttrs(row)"
              ></el-button>
              <el-button
                type="primary"
                icon="Delete"
                @click="deleteAttr(row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene === 1">
        <el-form>
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              style="width: 300px"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="attrParams.attrName ? false : true"
          @click="addAttrValue"
        >
          添加属性
        </el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-table
          :border="true"
          style="margin: 15px 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            width="80px"
            align="center"
            type="index"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input
                placeholder="请输入属性名称"
                v-model="row.valueName"
                @blur="toLook(row, $index)"
                v-if="row.flag"
                :ref="(element: any) => (inputArr[$index] = element)"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ row, $index }">
              <el-button
                type="primary"
                icon="Delete"
                size="small"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="Attr">
// 响应式数据
import { ref, reactive, nextTick } from 'vue'
// 引入category仓库
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()

// 属性页面场景切换：0代表属性详情页面；1代表添加和编辑属性页面
let scene = ref<number>(0)

// 定义添加属性时需要传递的参数
const attrParams = reactive<any>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})

// 定义数组用于存储所有input标签的唯一标识
let inputArr = reactive<any>([])

// 添加属性按钮的回调函数
function addAttrs() {
  // 点击添加属性按钮前清空手机的数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
  })
  scene.value = 1
}

// 表格操作编辑属性按钮的回调函数
function editAttrs(row: any) {
  // 编辑属性需先展示已有属性
  // 通es6语法Object.assign()将row当中的属性数据赋值给attrParams数组
  /* 
  在修改数据时，需要注意浅拷贝和深拷贝：
      浅拷贝：多份数据指向同一块内存，某一份数据的变化会引起其他数据的变化
      深拷贝：多份数据相互独立，不是同一内存空间，某一数据的变化不会影响其他数据
  */
  // 浅拷贝
  // Object.assign(attrParams, row)
  // 深拷贝
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  scene.value = 1
}

// 取消按钮的回调函数
function cancel() {
  scene.value = 0
}

// 添加属性值按钮的回调函数
function addAttrValue() {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  // 点击添加属性按钮，数组的最后一项聚焦
  nextTick(() => {
    inputArr[inputArr.length - 1].focus()
  })
}

// 保存按钮的回调函数
function save() {
  // 收集三级分类的ID
  attrParams.categoryId = categoryStore.C3ID
  // 发送请求以添加属性
  const result: any = categoryStore.reqAddAttr(attrParams)
  if (result.code === 200) {
    // 切换场景
    scene.value = 0
    // 弹出提示框
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}

// 当属性值输入框失去焦点时触发事件的回调函数
function toLook(row: any, $index: number) {
  // 输入框的值不能为空，若为空，则div标签高度为0，无法点击
  if (!row.valueName.trim()) {
    // 如果输入框值为空，则删除该数组元素（对象），因为拿一个空字符串发请求是无意义的
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '输入框的值不能为空',
    })
    return
  }
  // 输入框的值不能与之前的输入重复
  // 输入框每次输入的值都会作为对象保存在数组attrValueList当中，所以可以通过遍历数组的方式查找重复的值
  const repeatValue = attrParams.attrValueList.find((item: any) => {
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (repeatValue) {
    // 若存在重复的值，则删除当前输入的值
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.flag = false
}

// 点击div标签切换到输入框业务的回调函数
function toEdit(row: any, $index: number) {
  row.flag = true
  // 当div标签切换为input组件时，拿到当前input组件的实例对象
  // 此函数执行，加载input组件，此时是拿不到vc的，因为页面还未重新加载完成
  // 所以需要使用nextTick去获取组件实例
  nextTick(() => {
    inputArr[$index].focus()
  })
}

// 通过ref获取输入框的唯一标识的函数回调
// 此函数在输入框内容变化时会触发、div和input相互切换时也会触发
// 此函数会接收一个参数，即为组件实例对象
/* function getRef(element: any) {
  console.log(element)
} */

// 删除某个属性的回调函数
function deleteAttr(data: number) {
  categoryStore.deleteAttr(data)
}
</script>

<style scoped lang="scss">
.content-card {
  .table-style {
    margin: 15px 0;
  }
}
</style>
