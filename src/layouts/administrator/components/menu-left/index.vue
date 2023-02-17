<script setup lang="ts">
import NavList from "../nav-list/index.vue";
import NavPopup from "../nav-popup/index.vue";
import { administratorChildren } from "@/routes";
import { RouteRecordRaw } from "vue-router";
import { getTopLevelRoute } from "../../utils";
const main = useMainStore();
const isShowNavList = computed(() => {
  if (main.layoutHas("left", "top-mix")) return !main.collapse;
  if (main.layout == "mobile") return true;
  return true;
});

const route = useRoute();
const routes = computed((): RouteRecordRaw[] => {
  if (main.layoutHas("top-mix")) {
    const activeRoute = getTopLevelRoute(route);
    if (!activeRoute) return routes.value;
    return activeRoute?.children || [];
  }

  return administratorChildren;
});
watchEffect(() => {
  main.showAside = !!routes.value?.length;
});

const windowEvent = useEvent(window);
windowEvent.on("click", () => main.layoutHas("mobile") && (main.collapse = true));
</script>

<template>
  <div :class="['menu-left']">
    <nav-list :routes="routes" v-if="isShowNavList" />
    <nav-popup :routes="routes" v-else />
  </div>
</template>
<style lang="less">
.menu-left {
  // max-height: calc(100vh - 250px);
  overflow: auto;
  overflow-x: hidden;
}
</style>
