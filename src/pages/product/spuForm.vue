<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="spu名称">
        <el-input
          placeholder="请输入spu内容"
          v-model="spuParams.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="spu品牌">
        <el-select v-model="spuParams.tmId">
          <el-option
            v-for="(trademark, index) in spuTrademarkArr"
            :key="trademark.id"
            :label="trademark.tmName"
            :value="trademark.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input type="textarea" v-model="spuParams.description"></el-input>
      </el-form-item>
      <el-form-item label="spu照片">
        <el-upload
          v-model:file-list="spuImageArr"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img
            w-full
            :src="dialogImageUrl"
            alt="Preview Image"
            style="width: 100%"
          />
        </el-dialog>
      </el-form-item>
      <el-form-item label="spu销售属性">
        <el-select v-model="saleAttrIdAndName">
          <el-option
            v-for="value in unselectedSaleAttr"
            :key="value.id"
            :label="value.name"
            :value="`${value.id}:${value.name}`"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="Plus"
          style="margin: 0 10px"
          :disabled="saleAttrIdAndName.length > 0 ? false : true"
          @click="addSaleAttr"
        >
          添加销售属性
        </el-button>
        <el-table :border="true" style="margin: 10px 0" :data="spuSaleAttrArr">
          <el-table-column
            label="序号"
            align="center"
            width="150px"
            type="index"
          ></el-table-column>
          <el-table-column
            label="属性名"
            width="150px"
            prop="saleAttrName"
          ></el-table-column>
          <el-table-column label="属性值">
            <template #="{ row, $index }">
              <el-tag
                v-for="attrValue in row.spuSaleAttrValueList"
                :key="attrValue.id"
                closable
                style="margin: 0px 5px"
                @close="row.spuSaleAttrValueList.splice($index, 1)"
              >
                {{ attrValue.saleAttrValueName }}
              </el-tag>
              <el-input
                ref="attrValueFocus"
                size="small"
                style="width: 100px"
                placeholder="销售属性"
                v-if="row.flag ? true : false"
                v-model="row.newAttrValue"
                @blur="toWatch(row)"
              ></el-input>
              <el-button
                type="primary"
                icon="Plus"
                size="small"
                style="margin: 0 5px"
                v-else
                @click="toEdit(row)"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template v-slot="{ row, $index }">
              <el-button
                type="warning"
                icon="Delete"
                size="small"
                @click="spuSaleAttrArr.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="default" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick, onMounted } from 'vue'
// 声明自定义事件
let $emit = defineEmits(['changeScene'])
// 引入获取spu数据的接口方法
import {
  reqAllTrademark,
  reqSpuImage,
  reqSpuSaleAttr,
  reqAllSpuSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu/index'
// 引入数据类型
import type {
  spuTrademarkData,
  resSpuImageData,
  reqSpuSaleAttrData,
  reqAllSpuSaleAttrData,
  recordsData,
  spuImageDataType,
  spuSaleAttrList,
  AllSpuSaleAttrList,
  spuDataType,
  spuSaleAttrValueList,
} from '@/api/product/spu/type'
import type { Trademark } from '@/api/product/trademark/type'
import { ElMessage } from 'element-plus'
// 存储spu品牌
let spuParams = ref<spuDataType>({
  category3Id: '',
  description: '',
  spuName: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
})
// 存储所有spu品牌
let spuTrademarkArr = ref<Trademark[]>([])
// 照片墙相关数据数组
let spuImageArr = ref<spuImageDataType[]>([])
// 单个spu销售属性
let spuSaleAttrArr = ref<spuSaleAttrList[]>([])
// 所有spu销售属性
let allSpuSaleAttrArr = ref<AllSpuSaleAttrList[]>([])
// 点击已上传的图片时控制对话框弹出
let dialogVisible = ref<boolean>(false)
// 对话框图片链接
let dialogImageUrl = ref<string>('')
// 收集spu销售属性
let saleAttrIdAndName = ref<string>('')
// 获取input输入框的实例
let attrValueFocus = ref()

// 计算未选择的spu销售属性
let unselectedSaleAttr = computed(() => {
  return allSpuSaleAttrArr.value.filter((spuAttr1) => {
    return spuSaleAttrArr.value.every((spuAttr2) => {
      return spuAttr1.name !== spuAttr2.saleAttrName
    })
  })
})

// 取消按钮的回调函数
function cancel() {
  $emit('changeScene', 1)
}

// 用于发送请求获取完整的spu数据
async function reqHasSpu1(row: spuDataType) {
  // spu已有的属性（无需发送请求获取的）
  spuParams.value = row
  // 获取所有的spu品牌
  const spuTrademark: spuTrademarkData = await reqAllTrademark()
  if (spuTrademark.code === 200) {
    spuTrademarkArr.value = spuTrademark.data
  }
  // 获取spu照片墙
  /* const spuImage: resSpuImageData = await reqSpuImage(row.id)
  if (spuImage.code === 200) {
    spuImageArr.value = spuImage.data
  } */
  // 获取某个spu销售属性
  /* const spuSaleAttr: reqSpuSaleAttrData = await reqSpuSaleAttr(row.id)
  if (spuSaleAttr.code === 200) {
    spuSaleAttrArr.value = spuSaleAttr.data
  } */
  // 获取整个项目所有spu属性
  /* const allSpuSaleAttr: reqAllSpuSaleAttrData = await reqAllSpuSaleAttr()
  if (allSpuSaleAttr.code === 200) {
    allSpuSaleAttrArr.value = allSpuSaleAttr.data
  } */
  // 存储返回的数据
  /* if (
    spuTrademark.code === 200 &&
    spuImage.code === 200 &&
    spuSaleAttr.code === 200 &&
    allSpuSaleAttr.code === 200
  ) {
    spuTrademarkArr.value = spuTrademark.data
    spuImageArr.value = spuImage.data
    spuSaleAttrArr.value = spuSaleAttr.data
    allSpuSaleAttrArr.value = allSpuSaleAttr.data
  } */
}
async function reqHasSpu2(row: spuDataType) {
  // 获取spu照片墙
  const spuImage: resSpuImageData = await reqSpuImage(row.id as number)
  if (spuImage.code === 200) {
    spuImageArr.value = spuImage.data.map((spuImage) => {
      return {
        name: spuImage.imgName,
        url: spuImage.imgUrl,
      }
    })
  }
}
async function reqHasSpu3(row: spuDataType) {
  // 获取某个spu销售属性
  const spuSaleAttr: reqSpuSaleAttrData = await reqSpuSaleAttr(row.id as number)
  if (spuSaleAttr.code === 200) {
    spuSaleAttrArr.value = spuSaleAttr.data
  }
}
async function reqHasSpu4(row: recordsData) {
  // 获取整个项目所有spu属性
  const allSpuSaleAttr: reqAllSpuSaleAttrData = await reqAllSpuSaleAttr()
  if (allSpuSaleAttr.code === 200) {
    allSpuSaleAttrArr.value = allSpuSaleAttr.data
  }
}
// 添加新的spu时获取所有spu品牌和销售属性
async function addSpuReq(C3ID: number | string) {
  // 第三级分类的ID
  spuParams.value.category3Id = C3ID
  // 获取所有的spu品牌
  const spuTrademark: spuTrademarkData = await reqAllTrademark()
  if (spuTrademark.code === 200) {
    spuTrademarkArr.value = spuTrademark.data
  }
  // 获取所有的spu销售属性
  const allSpuSaleAttr: reqAllSpuSaleAttrData = await reqAllSpuSaleAttr()
  if (allSpuSaleAttr.code === 200) {
    allSpuSaleAttrArr.value = allSpuSaleAttr.data
  }
}
// 此方法需要向外导出，以便父组件可通过子组件组件实例拿到该方法
defineExpose({ reqHasSpu1, reqHasSpu2, reqHasSpu3, reqHasSpu4, addSpuReq })

// 点击已经上传的文件时的钩子
function handlePictureCardPreview(uploadFile: any) {
  // 弹出对话框
  dialogVisible.value = true
  // 显示对话框图片
  dialogImageUrl.value = uploadFile.url
}

// 移除已上传的文件时的钩子
function handleRemove() {}

// 添加销售属性按钮的回调函数
function addSaleAttr() {
  // 数组的解构赋值
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndName.value.split(':')
  // 定义新的销售书信
  const newSaleAttr: spuSaleAttrList = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  // 将新的销售属性追加到数组
  spuSaleAttrArr.value.push(newSaleAttr)
}

// 添加属性值按钮的回调函数
function toEdit(row: spuSaleAttrList) {
  // 弹出input输入框
  row.flag = true
  // 自动获取输入框焦点
  nextTick(() => {
    attrValueFocus.value.focus()
  })

  // 收集新添加的属性值
  row.newAttrValue = ''
}

// 输入框失去焦点变为查看模式的回调函数
function toWatch(row: spuSaleAttrList) {
  // 将新的属性值进行解构赋值
  const { baseSaleAttrId, newAttrValue } = row
  // 创建新的属性值对象
  const attrValueObj: spuSaleAttrValueList = {
    baseSaleAttrId,
    saleAttrValueName: newAttrValue as string,
  }

  // 如果输入值为空,则不追加到数组
  if (!newAttrValue?.trim()) {
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    // 由输入框切换为添加属性值按钮
    row.flag = false
    return
  }

  // 判断输入的属性值是否和已有的属性值重复
  let repeatValue = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName === row.newAttrValue
  })
  if (repeatValue) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    // 由输入框切换为添加属性值按钮
    row.flag = false
    return
  }

  // 追加到spuSaleAttrValueList数组
  row.spuSaleAttrValueList.push(attrValueObj)
  // 由输入框切换为添加属性值按钮
  row.flag = false
}

// 保存按钮的回调函数
async function save() {
  // 整理参数spuParams
  // 整理spu图片
  spuParams.value.spuImageList = spuImageArr.value.map((spuImage) => {
    return {
      imgName: spuImage.name,
      imgUrl: spuImage.url,
    }
  })
  // 整理spu销售属性
  spuParams.value.spuSaleAttrList = spuSaleAttrArr.value
  // 发送请求,添加数据
  const result = await reqAddOrUpdateSpu(spuParams.value)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '修改成功' : '添加成功',
    })
    // 发送请求重新获取全部的spu数据
    // 切换场景
    $emit('changeScene', 1)
  } else {
    ElMessage({
      type: 'error',
      message: spuParams.value.id ? '修改失败' : '添加失败',
    })
  }
}
</script>

<style scoped lang="scss">
.el-select {
  --el-select-width: 220px;
}
</style>
