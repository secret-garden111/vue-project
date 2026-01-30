<template>
  <div class="container">
    <p class="title">实时游客统计</p>
    <p class="title-background"></p>
    <p class="count">
      可预约总量：
      <span class="count-num">{{ count }}</span>
      人
    </p>
    <div class="screen-box">
      <div
        class="count-screen"
        v-for="(str, index) in countScreen"
        :key="index"
      >
        {{ str }}
      </div>
    </div>
    <div class="echarts" ref="echartsContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入echarts
import * as echarts from 'echarts'
// 引入水球图
import 'echarts-liquidfill'
// 获取放置echarts图表的元素实例对象
let echartsContainer = ref()
onMounted(() => {
  // 当组件挂载时，初始化echarts实例
  const liquidfill = echarts.init(echartsContainer.value)
  // 设置配置项，绘制图表
  liquidfill.setOption({
    // title: {
    //   text: '预约人数',
    //   textStyle: {
    //     color: '#29fcff',
    //   },
    //   textAlign: 'left',
    //   left: 'center',
    //   top: 0,
    // },
    series: [
      {
        type: 'liquidFill',
        data: [0.31, 0.58, 0.87],
        color: ['orange'],
        radius: '90%',
        shape: 'circle',
        outline: {
          show: true,
          borderDistance: 8,
          itemStyle: {
            color: 'none',
            borderColor: '#294D99',
            borderWidth: 3,
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
          },
        },
        itemStyle: {
          opacity: 0.3,
        },
        backgroundStyle: {
          color: '#E3F7FF',
        },
        label: {
          fontSize: 30,
          color: '#294D99',
          insideColor: '#fff',
        },
        emphasis: {
          itemStyle: {
            opacity: 0.8,
          },
        },
      },
    ],
  })
})
// 可预约人数总量
let count = ref<number>(3000)
// 当前游客的实时人数
let countScreen = ref<string>('216908人')
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 340px;
  box-sizing: border-box;
  background: url('../../../assets/screen/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
  // border: 1px solid skyblue;
  .title {
    width: 30%;
    font-size: 20px;
    color: #fff;
  }
  .title-background {
    width: 20%;
    height: 5%;
    margin: 10px 0;
    background: url('../../../assets/screen/dataScreen-title.png') no-repeat;
  }
  .count {
    position: absolute;
    font-size: 15px;
    color: #fff;
    right: 10px;
    top: 50px;
    .count-num {
      color: orange;
    }
  }
  .screen-box {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    justify-content: center;
    .count-screen {
      width: 40px;
      font-size: 30px;
      color: #29fcff;
      text-align: center;
      float: left;
      background: url('../../../assets/screen/total.png') no-repeat;
      background-size: 100% 100%;
      margin: 20px 3px 0px 3px;
    }
  }
  .echarts {
    width: 100%;
    height: 60%;
  }
}
</style>
