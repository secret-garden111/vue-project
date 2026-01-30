<template>
  <div class="container">
    <div class="title-box">
      <p class="text">年龄比例</p>
      <p class="picture"></p>
    </div>
    <div class="echarts" ref="echartsContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入echarts
import * as echarts from 'echarts'

let num = ref(10)

// 获取显示echarts图表的元素
let echartsContainer = ref()
onMounted(() => {
  // 在组件挂载时，初始化echarts图表
  let pieEcharts = echarts.init(echartsContainer.value)
  // 配置图表
  pieEcharts.setOption({
    title: {},
    legend: {
      type: 'plain',
      orient: 'vertical',
      top: 40,
      right: 70,
      itemGap: 13,
      textStyle: {
        color: '#fff',
        fontSize: 10,
      },
      formatter: function (name: string) {
        return name
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '80%'],
        right: '30%',
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}%',
          color: '#fff',
        },
        labelLine: {
          show: false,
        },
        itemStyle: {
          borderRadius: 10,
          shadowColor: 'lightblue',
          shadowBlur: 10,
        },
        blur: {},
        data: [
          { value: 16, name: '10岁以下' },
          { value: 8, name: '10-18岁' },
          { value: 12, name: '18-30岁' },
          { value: 24, name: '30-40岁' },
          { value: 20, name: '40-60岁' },
          { value: 20, name: '60岁以上' },
        ],
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 300px;
  background: url('../../../assets/screen/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  // border: 1px solid pink;
  .title-box {
    width: 100%;
    height: 20%;
    // border: 1px solid orange;
    .text {
      width: 20%;
      font-size: 20px;
      color: #fff;
    }
    .picture {
      width: 20%;
      height: 10%;
      margin: 10px 0;
      background: url('../../../assets/screen/dataScreen-title.png') no-repeat;
    }
  }
  .echarts {
    width: 100%;
    height: 80%;
  }
}
</style>
