<template>
  <div class="container">
    <div class="title-box">
      <p class="text">热门景区排行</p>
      <p class="picture"></p>
    </div>
    <div class="header">
      <p class="rank">排名</p>
      <p class="region">景区</p>
      <p class="count">预约数量</p>
    </div>
    <div class="echarts-box">
      <div class="left-rank">
        <p>NO.1</p>
        <p>NO.2</p>
        <p>NO.3</p>
        <p>NO.4</p>
        <p>NO.5</p>
      </div>
      <div class="left-spot">
        <p>峨眉山</p>
        <p>稻城亚丁</p>
        <p>九寨沟</p>
        <p>万里长城</p>
        <p>北京故宫</p>
      </div>
      <div class="right-echarts" ref="echartsContainer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入echarts
import * as echarts from 'echarts'
// 获取echarts实例
const echartsContainer = ref()
onMounted(() => {
  // 组件挂载时，初始化echarts
  const echartsBar = echarts.init(echartsContainer.value)
  // 配置echarts图表
  echartsBar.setOption({
    title: {},
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: {
      type: 'bar',
      data: [31, 49, 63, 81, 97],
    },
    grid: {
      top: 0,
      right: 60,
      bottom: 0,
      left: 30,
    },
  })
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 340px;
  background: url('../../../assets/screen/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  // border: 1px solid orange;
  .title-box {
    width: 100%;
    height: 20%;
    // border: 1px solid orange;
    .text {
      width: 30%;
      font-size: 20px;
      color: #fff;
    }
    .picture {
      width: 20%;
      height: 10px;
      margin: 10px 0;
      background: url('../../../assets/screen/dataScreen-title.png') no-repeat;
    }
  }
  .header {
    width: 430px;
    height: 36px;
    background: url('../../../assets/screen/rankingChart-bg.png') no-repeat;
    background-size: 100% 100%;
    margin: 20px auto;
    display: flex;
    p {
      height: 100%;
      text-align: center;
      line-height: 36px;
      color: orange;
    }
    .rank {
      flex: 1;
    }
    .region {
      flex: 1;
    }
    .count {
      flex: 3;
    }
  }
  .echarts-box {
    width: 430px;
    height: 57%;
    border: 1px solid skyblue;
    margin: 0 auto;
    display: flex;
    .left-rank {
      flex: 1;
      border: 1px solid orange;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      P {
        font-size: 13px;
        color: #fff;
        text-align: center;
      }
    }
    .left-spot {
      flex: 1;
      border: 1px solid orange;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      P {
        font-size: 13px;
        color: #fff;
        text-align: center;
      }
    }
    .right-echarts {
      flex: 3;
      border: 1px solid pink;
    }
  }
}
</style>
