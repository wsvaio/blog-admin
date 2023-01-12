<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { zhCN as NZhCn, dateZhCN, darkTheme, lightTheme } from "naive-ui";
</script>

<template>
  <el-config-provider :locale="zhCn">
    <n-config-provider
      :locale="NZhCn"
      :date-locale="dateZhCN"
      :theme="lightTheme"
      :theme-overrides="{
        common: {
          primaryColor: '#0960bd',
          primaryColorHover: '#0960bd',
        },
      }"
      abstract
    >
      <router-view></router-view>
    </n-config-provider>
  </el-config-provider>
</template>
