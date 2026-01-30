<template>
  <div class="screen_container">
    <div class="content" ref="content">
      <div class="content_top">
        <div class="left">
          <button class="lbtn" @click="goHome">首页</button>
        </div>
        <div class="center">
          <p class="title">智慧旅游可视化大数据展示平台</p>
        </div>
        <div class="right">
          <button class="rbtn">统计报告</button>
          <span class="current_time">当前时间：{{ dateTimeString }}</span>
        </div>
      </div>
      <div class="content_bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Gender class="gender"></Gender>
          <Age class="age"></Age>
        </div>
        <div class="center"></div>
        <div class="right">
          <ScenicSpot class="scenic-spot"></ScenicSpot>
          <TouristFlow class="tourist-flow"></TouristFlow>
          <Channel class="channel"></Channel>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// 引入相关组件
import Tourist from '@/pages/screen/tourist/index.vue'
import Gender from '@/pages/screen//gender/index.vue'
import Age from '@/pages/screen/age/index.vue'
import ScenicSpot from '@/pages/screen/scenicSpot/index.vue'
import TouristFlow from '@/pages/screen/touristFlow/index.vue'
import Channel from '@/pages/screen/channel/index.vue'
// 创建路由器实例
const $router = useRouter()
// 获取内容区域DOM元素，即实例对象
let content = ref()
// 日期和时间
let dateTime = ref(new Date())
let dateTimeString = ref<string>()
// 定义适配缩放比例
function getScale(w = 1920, h = 1080) {
  let ww = window.innerWidth / w
  let wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
// 等页面一挂载，就将内容区域拽回以设备中心点作为内容区域中心点的位置
onMounted(() => {
  content.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
// 当设备宽高变化时，内容区域也按照比例 变化
window.onresize = function () {
  content.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
// 点击按钮跳转到首页
function goHome() {
  $router.push('/home')
}
// 设置定时器
onMounted(() => {
  setInterval(() => {
    dateTime.value = new Date()
    dateTimeString.value = dateTime.value.toLocaleString('zh-CN', {
      dateStyle: 'medium',
      timeStyle: 'medium',
    })
  }, 1000)
})
</script>

<style scoped lang="scss">
.screen_container {
  width: 100vw;
  height: 100vh;
  background: url('../assets/screen/bg.png') no-repeat;
  background-size: cover;
  .content {
    width: 1920px;
    height: 1080px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .content_top {
      width: 100%;
      height: 42px;
      display: flex;
      .left {
        background: url('../assets/screen/dataScreen-header-left-bg.png')
          no-repeat;
        background-size: cover;
        flex: 1.3;
        .lbtn {
          background: url('../assets/screen//dataScreen-header-btn-bg-l.png')
            no-repeat;
          background-size: cover;
          width: 135px;
          height: 42px;
          border: none;
          font-size: 20px;
          color: #29fcff;
          float: right;
        }
        .lbtn:hover {
          box-shadow: 0 0 10px #29fcff inset;
        }
      }
      .center {
        background: url('../assets/screen/dataScreen-header-center-bg.png')
          no-repeat;
        background-size: cover;
        height: 74px;
        flex: 2;
        display: flex;
        .title {
          width: 100%;
          text-align: center;
          line-height: 74px;
          font-size: 30px;
          color: #29fcff;
        }
      }
      .right {
        background: url('../assets/screen/dataScreen-header-right-bg.png')
          no-repeat;
        background-size: cover;
        flex: 1.3;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .current_time {
          font-size: 20px;
          color: #29fcff;
          margin-right: 10px;
        }
        .rbtn {
          border: none;
          width: 135px;
          height: 42px;
          background: url('../assets/screen/dataScreen-header-btn-bg-r.png')
            no-repeat;
          background-size: cover;
          font-size: 20px;
          color: #29fcff;
        }
        .rbtn:hover {
          box-shadow: 0 0 10px #29fcff inset;
        }
      }
    }
    .content_bottom {
      width: 100%;
      height: calc(100% - 42px);
      display: flex;
      .left {
        margin: 0px 30px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      }
      .center {
        flex: 2;
      }
      .right {
        margin: 0px 30px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        // background-color: #29fcff;
      }
    }
  }
}
</style>
