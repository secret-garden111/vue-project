<template>
  <div>
    <el-card class="search-card">
      <div class="search-container">
        <div class="search-input">
          <el-form style="width: 300px; height: 32px">
            <el-form-item label="用户名">
              <el-input placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="search-btn">
          <el-button type="primary">搜索</el-button>
          <el-button type="default">重置</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="detail-card">
      <div class="detail-container">
        <div class="detail-btn">
          <el-button type="primary" @click="addUser">添加</el-button>
          <el-button type="danger">批量删除</el-button>
        </div>
        <div class="detail-table">
          <el-table
            class="table"
            :border="true"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            :data="recordsArr"
          >
            <el-table-column type="selection" width="80"></el-table-column>
            <el-table-column
              label="序号"
              type="index"
              width="80"
            ></el-table-column>
            <el-table-column label="ID" prop="id" width="130"></el-table-column>
            <el-table-column
              label="用户姓名"
              prop="name"
              width="130"
            ></el-table-column>
            <el-table-column
              label="用户昵称"
              prop="username"
              width="130"
            ></el-table-column>
            <el-table-column
              label="用户角色"
              prop="roleName"
              width="130"
            ></el-table-column>
            <el-table-column
              label="创建时间"
              prop="createTime"
            ></el-table-column>
            <el-table-column
              label="更新时间"
              prop="updateTime"
            ></el-table-column>
            <el-table-column label="操作" width="300">
              <template #="{ row, $index }">
                <el-button type="primary" icon="User" size="small">
                  分配角色
                </el-button>
                <el-button type="success" icon="Edit" size="small">
                  编辑
                </el-button>
                <el-button type="warning" icon="Delete" size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[3, 5, 7, 9]"
            :background="true"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="totalPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>
    <!-- 添加或修改用户信息：抽屉效果 -->
    <Drawer></Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { resultDataType, records } from '@/api/acl/user/type'
import Drawer from '@/pages/acl/user/drawer.vue'
// 引入用户仓库
import useAclStore from '@/store/modules/acl'
const aclStore = useAclStore()
// 当前页
let currentPage = ref<number>(1)
// 每页显示的条目
let pageSize = ref<number>(1)
// 总条数
let totalPage = ref<number>(0)
// 存储服务器返回的数据，用于展示到表格
const recordsArr = ref<records[]>([])
// 控制抽屉的显示与隐藏
let drawer = ref<boolean>()

// 调用仓库函数，发送请求，获取已有用户数据
async function hasUser() {
  let result: resultDataType = await aclStore.getHasUser({
    page: currentPage.value,
    limit: pageSize.value,
  })
  // console.log(result)
  if (result.code === 200) {
    totalPage.value = result.data.total
    recordsArr.value = result.data.records
  }
}

// pageSize变化是触发该事件
function handleSizeChange() {
  hasUser()
}

// currentPage变化是触发的事件
async function handleCurrentChange() {
  hasUser()
}

// 当组件挂载时，发送请求获取已有用户的数据
onMounted(() => {
  hasUser()
})

// 添加用户按钮的回调函数
function addUser() {
  aclStore.drawerControler = !aclStore.drawerControler
}
</script>

<style scoped lang="scss">
.search-card {
  margin: 10px 0;
  .search-container {
    height: 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
}
.detail-card {
  .detail-container {
    .detail-table {
      margin: 10px 0;
      .table {
        // --el-table-border-color: #409eff;
        text-align: center;
      }
    }
  }
}
</style>
