<script setup lang="ts">
import useStore from "@/routes/admin/store";
const { layout, collapse } = $(useStore());
const { VITE_DOCUMENT_TITLE } = import.meta.env;
</script>

<template
  tag="div"
  class="logo"
  @click="layout = layout == 'top' ? 'left' : 'top'"
  :title="VITE_DOCUMENT_TITLE"
>
  <img src="@/assets/admin.png" width="48" height="48" />
  <div v-show="!collapse || layout == 'top'" overflow="hidden" max="h-40px" m="l-8px">
    {{ VITE_DOCUMENT_TITLE }}
  </div>
</template>

<style lang="less" scoped>
.logo {
  display: flex;
  overflow: hidden;
  padding: 0 12px;
  font: bold 16px / 20px normal;
  color: var(--el-text-color-primary);
  transition: background-color 0.2s;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    background-color: var(--el-bg-color-page);
    cursor: pointer;
  }
}

.admin-layout:not(.top).collapse .logo {
  justify-content: center;
  padding: 0;
}
</style>
