<template>
  <div>
    <el-drawer
      v-model="aclStore.drawerControler"
      :title="title"
      :direction="direction"
      :before-close="handleClose"
    >
      <div class="drawer-container">
        <div>
          <el-form>
            <el-form-item label="用户姓名">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="用户昵称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="用户密码">
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="drawer-btn">
          <el-button type="primary">确定</el-button>
          <el-button type="default">取消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 引入仓库
import useAclStore from '@/store/modules/acl'
const aclStore = useAclStore()
// 控制抽屉是否显示
// let drawer = ref<boolean>(aclStore.drawerControler)
// 标题
let title = ref<string>('添加用户')
// 抽屉打开的方向
let direction = ref<string>('rtl')

// 抽屉关闭前的回调函数，会暂停关闭抽屉
function handleClose() {
  aclStore.drawerControler = !aclStore.drawerControler
}
</script>

<style scoped lang="scss">
.drawer-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .drawer-btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
