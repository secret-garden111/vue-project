<!-- logo组件 -->
<template>
  <div class="logo" v-if="logo.logoHidden">
    <img :src="logo.logoUrl" alt="logo" />
    <p>{{ logo.title }}</p>
  </div>
</template>

<script setup lang="ts">
// 引入设置logo和文本的配置文件
import logo from '@/logo'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  background-color: steelblue;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-menu-text-fontSize;
    margin-left: 15px;
  }
}
</style>
