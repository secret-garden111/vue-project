<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="LoginForm"
          :rules="rules"
          ref="loginFormCom"
        >
          <div class="el-component">
            <h1>Hello</h1>
            <h2>欢迎来到硅谷甄选</h2>
            <el-form-item prop="username">
              <el-input
                class="account"
                :prefix-icon="User"
                v-model="LoginForm.username"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                class="pwd"
                :prefix-icon="Lock"
                v-model="LoginForm.password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="login_btn" type="primary" @click="login">
                登录
              </el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
// 编程式路由
import { useRouter, useRoute } from 'vue-router'
// 引入user小仓库
import useUserStore from '@/store/modules/user'
// 响应式数据
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
// 判断登录时间
import { getTime } from '@/utils/time'
// 获取路由器和路由
const $router = useRouter()
const $route = useRoute()
const userStore = useUserStore()
let LoginForm = reactive({ username: '', password: '' })
// 获取el-form组件标签
let loginFormCom = ref()
// 自定义校验表单数据的回调函数
function validatorUserName(rule: any, value: any, callback: any) {
  // rule是一系列规则，不常使用
  // value是输入的文本内容
  if (value.length >= 5 && value.length <= 8) {
    // 调用callback函数放行
    callback()
  } else {
    callback(new Error('用户名要求5-8个字符'))
  }
}
function validatorPassword(rule: any, value: any, callback: any) {
  if (value.length >= 6 && value.length <= 10) {
    callback()
  } else {
    callback(new Error('密码要求6-10个字符'))
  }
}

// 表单输入项校验规则
const rules = reactive({
  // 选项配置式的表单校验规则
  // username: [
  //   {
  //     required: true,
  //     min: 5,
  //     max: 8,
  //     message: '用户名要求5-8个字符',
  //     trigger: 'change',
  //   },
  // ],
  // password: [
  //   {
  //     required: true,
  //     min: 6,
  //     max: 10,
  //     message: '密码要求6-10个字符',
  //     trigger: 'change',
  //   },
  // ],

  // 自定义表单校验规则
  username: [{ validator: validatorUserName, trigger: 'change' }],
  password: [{ validator: validatorPassword, trigger: 'change' }],
})

// 登录功能回调函数
async function login() {
  // 等表单验证完成再发送登录请求
  await loginFormCom.value.validate()
  try {
    // 登录成功
    let result = await userStore.userLogin(LoginForm)
    console.log(result)

    // 编程式路由导航跳转到首页
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hi,${getTime()}！`,
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style scope lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('../assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    width: 80%;
    top: 30vh;
    background: url('../assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    position: relative;

    .el-component {
      padding: 0 50px;
      box-sizing: border-box;
    }

    h1 {
      font-size: 40px;
      color: #fff;
    }
    h2 {
      font-size: 20px;
      color: #fff;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
