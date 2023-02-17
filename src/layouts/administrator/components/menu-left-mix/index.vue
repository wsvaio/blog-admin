<script setup lang="ts">
import { administratorChildren } from "@/routes";
import { getTopLevelRoute } from "../../utils";
import NavList from "../nav-list/index.vue";

const main = useMainStore();
const routes = computed(() => {
  if (!main.leftMixActiveRoute) return [];
  return (
    administratorChildren.find((item) => item.name == main.leftMixActiveRoute?.name)?.children || []
  );
});
const route = useRoute();

const windowEvent = useEvent(window);
windowEvent.on("mousemove", () => {
  if (main.layout != "left-mix" || main.fixedLeftMix) return;
  main.showLeftMix = false;
  main.leftMixActiveRoute = getTopLevelRoute(route)!;
});

windowEvent.on("click", () => {
  if (main.layout != "left-mix") return;

  main.leftMixActiveRoute = getTopLevelRoute(route)!;
  if (main.showLeftMix) main.showLeftMix = !!main.leftMixActiveRoute.children?.length;
});

const title = import.meta.env.VITE_DOCUMENT_TITLE;
</script>

<template>
  <div :class="['menu-left-mix', !main.showLeftMix && 'hide', main.fixedLeftMix && 'beFixed']">
    <div
      class="logo-mix"
      h="48px"
      text="white"
      flex="~ none"
      items="center"
      p="r-12px"
      pos="sticky top-0"
    >
      <span text="18px" m="r-auto" class="whitespace-nowrap">{{ title }}</span>
      <i-material-symbols:push-pin
        v-if="main.fixedLeftMix"
        @click="main.fixedLeftMix = !main.fixedLeftMix"
      />
      <i-material-symbols:push-pin-outline v-else @click="main.fixedLeftMix = !main.fixedLeftMix" />
    </div>
    <div class="nav-container"><nav-list :routes="routes" /></div>
  </div>
</template>
<style lang="less">
html:not(.dark) .menu-left-mix {
  --border-color: rgb(var(--theme-color) / 10%);
}

.menu-left-mix {
  // max-height: calc(100vh - 250px);
  overflow: auto;
  overflow-x: hidden;
  width: 200px;
  transition: width 0.3s, margin-right 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: -200px;
  z-index: 10;

  &.hide {
    width: 0;
    margin-right: 0px;
  }

  &.beFixed {
    margin-right: 0px;
  }

  .logo-mix {
    border-bottom: 1px solid var(--border-color);
  }

  .nav-container {
    flex: 1;
    border-left: 1px solid var(--border-color);

    overflow: auto;
  }
}
</style>
