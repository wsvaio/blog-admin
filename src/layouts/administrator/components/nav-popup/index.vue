<script lang="ts" setup>
import { RouteRecordRaw } from "vue-router";
import ArrowDown from "~icons/ep/arrow-down";
import self from "./index.vue";
import { isMenuItem, isRouteActive } from "@/layouts/administrator/utils";
const {
  routes = [],
  level = 1,
  layout = "vertical",
} = defineProps<{
  routes?: RouteRecordRaw[];
  level?: number;
  layout?: "horizontal" | "vertical";
}>();
const currentInstance = getCurrentInstance();
const parentExposed = $computed<{ close?: boolean }>(() => currentInstance?.parent?.exposed || {});
onMounted(() => {});
const exposed = reactive({
  close: true,
});
watchEffect(() => {
  if (!parentExposed || !parentExposed.close) return;
  exposed.close = parentExposed.close;
});

defineExpose(exposed);
</script>

<template>
  <template v-for="item in routes">
    <div
      v-if="isMenuItem(item)"
      :style="{ '--level': level }"
      :key="item.name"
      :class="[
        'menu-nav-item',
        'nav-popup',
        layout,
        isRouteActive(item) && 'active',
        level == 1 && 'top-level',
      ]"
      :title="item.meta?.title"
      @click="$router.push({ name: item.name, params: $route.params })"
      ><component :is="item?.meta?.icon" class="icon" />
      <div class="text">{{ item?.meta?.title }}</div></div
    >
    <vpopup
      v-else
      :key="item.path"
      popuper-class="nav-popup"
      transition-name="fade"
      :direction="layout == 'horizontal' && level == 1 ? 'bottom' : 'right'"
      :style="{ '--level': level }"
      :class="[
        'menu-nav-item',
        'title',
        'nav-popup',
        layout,
        isRouteActive(item) && 'active',
        level == 1 && 'top-level',
      ]"
      :title="item.meta?.title"
    >
      <template #popup>
        <self :level="level + 1" :routes="item.children!" :layout="layout" />
      </template>

      <component :is="item?.meta?.icon" class="icon" />
      <div class="text" v-if="item?.meta?.title">{{ item?.meta?.title }}</div>
      <arrow-down class="arrow" />
    </vpopup>
  </template>
</template>

<style lang="less">
.menu-nav-item.nav-popup {
  padding: 12px;

  .arrow {
    transform: rotate(-90deg);
  }
}
</style>
<style lang="less">
.menu-nav-item.nav-popup.vertical {
  &.top-level {
    .text,
    .arrow {
      display: none;
    }
  }
}
</style>
<style lang="less">
.menu-nav-item.horizontal {
  --menu-bg-color: var(--el-bg-color);
  --menu-text-color: var(--el-text-color-primary);
  --menu-text-active-color: var(--el-color-primary);
  --menu-bg-sub-color: var(--el-bg-color);
  --menu-bg-active-color: var(--el-bg-color);
  transition: border-color 0.2s;
  border-bottom: 3px solid transparent;
  border-top: 3px solid transparent;
  height: 100%;

  &.top-level {
    margin: 0 16px;
    padding: 4px;
    background-color: transparent !important;

    .arrow {
      display: none;
    }

    &.active,
    &:hover {
      background-color: transparent;
      border-bottom: 3px solid var(--primary-color);
    }
  }
}
</style>
