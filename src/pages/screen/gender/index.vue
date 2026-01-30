<template>
  <div class="container">
    <div class="title">
      <span class="title-text">男女比例</span>
      <div class="title-background"></div>
    </div>
    <div class="echarts-box">
      <div class="picture">
        <div class="man">
          <img src="../../../assets/screen/man.png" alt="man" />
        </div>
        <div class="woman">
          <img src="../../../assets/screen/woman.png" alt="woman" />
        </div>
      </div>
      <div class="echarts-box">
        <div class="people-ratio">
          <span>男士{{ manRatio }}</span>
          <span>女士{{ womanRatio }}</span>
        </div>
        <div class="bar" ref="echartsContainer"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入echarts
import * as echarts from 'echarts'
// 男士比例
let manRatio = ref<string>('51%')
// 女士比例
let womanRatio = ref<string>('49%')
// 获取用于展示echarts图表的元素
const echartsContainer = ref()
onMounted(() => {
  // 组件加载时，初始化echarts图表
  const bar = echarts.init(echartsContainer.value)
  // 图标配置项
  bar.setOption({
    title: {},
    xAxis: {
      show: false,
      // data: [],
    },
    yAxis: {
      show: false,
      type: 'category',
      // data: [],
    },
    series: [
      {
        type: 'bar',
        data: [0.51],
        barWidth: '30%',
        itemStyle: {
          color: 'steelblue',
          borderRadius: 10,
        },
        barGap: '-100%',
        z: '1',
      },
      {
        type: 'bar',
        data: [1],
        barWidth: '30%',
        itemStyle: {
          color: 'pink',
          borderRadius: 10,
        },
        z: '0',
      },
    ],
    grid: {
      top: 0,
      right: '17%',
      bottom: '30%',
      left: '17%',
    },
  })
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 300px;
  background: url('../../../assets/screen/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  // border: 1px solid skyblue;
  .title {
    width: 100%;
    height: 20%;
    .title-text {
      font-size: 20px;
      color: #fff;
    }
    .title-background {
      width: 20%;
      height: 10px;
      margin: 10px 0;
      background: url('../../../assets/screen/dataScreen-title.png') no-repeat;
    }
  }
  .echarts-box {
    width: 100%;
    height: 80%;
    // background-color: skyblue;
    .picture {
      height: 70%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      // background-color: yellow;
      .man {
        width: 111px;
        height: 115px;
        text-align: center;
        background: url('../../../assets/screen/man-bg.png') no-repeat;
      }
      .woman {
        width: 111px;
        height: 115px;
        text-align: center;
        background: url('../../../assets/screen/woman-bg.png') no-repeat;
      }
      img {
        width: 80px;
        height: 80px;
        transform: translateY(30px);
      }
    }
    .echarts-box {
      height: 30%;
      .people-ratio {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: space-around;
        font-size: 10px;
        color: #fff;
      }
      .bar {
        width: 100%;
        height: 80%;
        // border: 1px solid pink;
      }
    }
  }
}
</style>
