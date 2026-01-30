// 定义仓库当中state的数据类型
// 引入路由的ts类型
import type { RouteRecordRaw } from 'vue-router'
export interface userState {
  token: string | null
  menuRoute: RouteRecordRaw[]
  username: string
  avator: string
}
