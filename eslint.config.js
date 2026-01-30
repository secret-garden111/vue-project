// import js from '@eslint/js' // 检验js规范（推荐）
// import globals from 'globals'
// import tseslint from 'typescript-eslint' // ts规范（推荐）
// import pluginVue from 'eslint-plugin-vue' // vue规范（推荐）
// import { defineConfig } from 'eslint/config'
// // import prettierRecommend from "eslint-plugin-prettier/recommended";

// export default defineConfig([
//   {
//     files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'], // 指定需要进行规范检查的文件
//     plugins: { js },
//     extends: ['js/recommended'],
//     languageOptions: {
//       globals: { ...globals.browser, ...globals.node },
//     },
//   },
//   tseslint.configs.recommended,
//   pluginVue.configs['flat/essential'],
//   {
//     files: ['**/*.vue'], // 检查vue文件中的ts代码
//     languageOptions: {
//       parserOptions: { parser: tseslint.parser },
//     },
//   },
//   {
//     rules: {
//       'no-console': 'error',
//       'vue/multi-word-component-names': 'off',
//       'no-unused-tags': 'off',
//     },
//   },
//   // 使prettier规范检查覆盖掉eslint规范，即使用prettier推荐的规范
//   // prettierRecommend,
// ])
