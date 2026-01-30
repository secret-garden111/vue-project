<template>
  <!-- 对话框组件，用于添加品牌和修改品牌 -->
  <div>
    <el-dialog
      class="dialog_container"
      :title="productStore.id ? '修改品牌' : '添加品牌'"
      v-model="productStore.dialogTableVisible"
    >
      <el-form
        class="dialog_form"
        :model="ruleForm"
        :rules="rules"
        ref="ruleRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="productStore.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 
          action属性：上传文件的管理接口，路径需加/api，不然代理服务器不会发送请求  
          -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload   "
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="productStore.logoUrl"
              :src="productStore.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog_button">
          <el-button type="primary" @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
// 引入添加品牌和编辑品牌的接口
import { reqAddOrEditTrademark } from '@/api/product/trademark/index'
// 引入product仓库
import useProductStore from '@/store/modules/product'
// 创建仓库实例
const productStore = useProductStore()
// 表单验证数据
const ruleForm = reactive({
  tmName: '',
  logoUrl: '',
})
watch(productStore, (newValue, oldValue) => {
  ruleForm.tmName = newValue.tmName
  ruleForm.logoUrl = newValue.logoUrl
})
// 获取el-form表单实例
const ruleRef = ref()
// 表单校验的规则
const rules = {
  tmName: [{ required: true, trigger: 'change', validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}
// 声明trademark当中绑定的自定义事件
const emit = defineEmits(['send-ruleRef'])
emit('send-ruleRef', ruleRef)
// tmName校验规则的回调函数
function validatorTmName(rule: any, value: any, callback: any) {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称需要2个字符及以上'))
  }
}
// logoUrl校验规则的回调函数
function validatorLogoUrl(rule: any, value: any, callback: any) {
  if (value) {
    callback()
  } else {
    callback(new Error('品牌logo必须上传'))
  }
}

// 接收trademark组件传递的函数
defineProps(['getHasTrademark'])

// 文件上传前的钩子,可在其中限制上传文件的类型和文件大小等
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // rawFile是所上传的文件的基本信息，包括名称、字节数、类型等
  if (
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 > 4) {
      ElMessage({
        type: 'error',
        message: '图片不能大于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '图片格式必须为jpeg或png或gif',
    })
    return false
  }
  return true
}

// 文件上传成功时的钩子
// response是文件上传成功后，服务器返回的数据，其中data为上传的文件在服务器内的地址
// uploadFile是上传文件的基本信息
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  // 获取上传文件在服务器的地址，在添加新品牌时带给服务器
  productStore.logoUrl = response.data
  // logo上传成功后清除对应的表单校验提示信息
  ruleRef.value.clearValidate('logoUrl')
}

// 点击按钮新增或修改品牌的回调函数
async function confirm() {
  // 在发送请求前对所有表单项进项校验，校验通过，方可发送请求
  // 使用element-plus提供的validate()方法，返回值是一个promise
  await ruleRef.value.validate()
  let result: any
  if (productStore.id) {
    result = await reqAddOrEditTrademark({
      id: productStore.id,
      tmName: productStore.tmName,
      logoUrl: productStore.logoUrl,
    })
  } else {
    result = await reqAddOrEditTrademark({
      tmName: productStore.tmName,
      logoUrl: productStore.logoUrl,
    })
  }
  console.log(result)

  // 添加成功后弹出对应的提示信息
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: productStore.id ? '修改品牌成功！' : '添加品牌成功！',
    })
    // 关闭对话框
    productStore.dialogTableVisible = false
    // 重新加载所有文件
    // 清空对话框的数据
    productStore.id = 0
    productStore.tmName = ''
    productStore.logoUrl = ''
  } else {
    // 添加失败弹出对应的提示信息
    ElMessage({
      type: 'error',
      message: productStore.id ? '修改品牌失败！' : '添加品牌失败 ！',
    })
    // 关闭对话框
    productStore.dialogTableVisible = false
  }
}
// 对话框取消按钮回调函数
function cancel() {
  // 关闭对话框
  productStore.dialogTableVisible = false
  // 清空对话框的数据
  productStore.tmName = ''
  productStore.logoUrl = ''
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.dialog_form {
  width: 80%;
  margin: 0 auto;
}
.dialog_button {
  width: 80%;
  margin: 0 auto;
}
.dialog_container {
  background-image: linear-gradient(
    45deg,
    rgb(137, 178, 213),
    rgb(238, 211, 161),
    rgb(230, 176, 185)
  );
}
</style>
