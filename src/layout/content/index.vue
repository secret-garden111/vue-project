<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts" name="Content">
import { ref, watch, nextTick } from 'vue'
import useLayoutStore from '@/store/modules/layout'
const layoutStore = useLayoutStore()

// 此变量用于控制当前组件是否销毁后重建
let flag = ref(true)

// 监视仓库中refresh值的变化，以此确定是否进行刷新业务
watch(
  () => layoutStore.refresh,
  (newValue, oldValue) => {
    flag.value = false
    // nextTick()函数：等DOM更新完毕后，再执行其函数体
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: 0.3s all;
}
.fade-enter-to {
  opacity: 0;
  transform: scale(1);
}
</style>
