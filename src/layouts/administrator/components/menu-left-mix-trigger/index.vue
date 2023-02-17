<script lang="ts" setup>
import { isMenuItem } from "@/layouts/administrator/utils";
import { administratorChildren } from "@/routes";
import { RouteRecordRaw } from "vue-router";
const main = useMainStore();
const router = useRouter();
const handleMenuClick = (routeItem: RouteRecordRaw) => {
  if (isMenuItem(routeItem)) {
    router.push(routeItem);
    main.showLeftMix = false;
  } else {
    main.showLeftMix = true;
  }
  main.leftMixActiveRoute = routeItem;
};
</script>

<template>
  <div class="menu-left-mix-trigger">
    <div
      v-for="item in administratorChildren"
      :key="item.name"
      :title="item.meta?.title"
      :class="['menu-nav-item', main.leftMixActiveRoute?.name == item.name && 'active']"
      @click="handleMenuClick(item)"
      ><component :is="item?.meta?.icon" class="icon" />
      <div class="text">{{ item?.meta?.title }}</div></div
    >
  </div>
</template>

<style lang="less" scoped>
.menu-left-mix-trigger {
  .menu-nav-item {
    padding: 2px;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .text {
      margin-left: 0px;
    }
  }
}
</style>
