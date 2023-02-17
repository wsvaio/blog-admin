<script lang="ts" setup>
import { RouteRecordRaw } from "vue-router";
import ArrowDown from "~icons/ep/arrow-down";
import self from "./index.vue";
import { isMenuItem, isRouteActive } from "@/layouts/administrator/utils";
const { routes = [], level = 1 } = defineProps<{
  routes?: RouteRecordRaw[];
  level?: number;
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
  <slot :exposed="exposed"></slot>
  <template v-for="item in routes">
    <div
      v-if="isMenuItem(item)"
      :style="{ '--level': level }"
      :key="item.name"
      :title="item.meta?.title"
      :class="[
        'menu-nav-item',
        isRouteActive(item) && 'active',
        exposed.close && level != 1 && 'close',
        level != 1 && 'sub',
      ]"
      @click="$router.push({ name: item.name, params: $route.params })"
      ><component :is="item?.meta?.icon" class="icon" />
      <div class="text">{{ item?.meta?.title }}</div></div
    >
    <self
      :level="level + 1"
      v-else
      :key="item.path"
      :routes="item.children!"
      #="{ exposed: innerExposed }"
    >
      <div
        :style="{ '--level': level }"
        :class="[
          'menu-nav-item',
          'title',
          isRouteActive(item) && 'active',
          exposed.close && level != 1 && 'close',
          level != 1 && 'sub',
        ]"
        :title="item.meta?.title"
        @click="innerExposed.close = !innerExposed.close"
      >
        <component :is="item?.meta?.icon" class="icon" />
        <div class="text">{{ item?.meta?.title }}</div>
        <arrow-down :class="['arrow', innerExposed.close && 'close']" />
      </div>
    </self>
  </template>
</template>

<style lang="less" scoped>
.menu-nav-item {
  transition: 0.2s;
  transition-property: height opacity;
  padding-right: 12px;
  padding-left: calc(var(--level) * 12px);

  &.close {
    height: 0;
    opacity: 0;
  }

  .arrow {
    transition: transform 0.2s;

    &.close {
      transform: rotate(180deg);
    }

    &.right {
      transform: rotate(-90deg);
    }
  }
}
</style>
