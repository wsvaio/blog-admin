<script setup name="vmenu" lang="ts">
import { adminRoutes } from "@/routes";
import vnav from "../vnav/index.vue";
import useStore from "@/routes/admin/store";
import IEllipsis from "~icons/uit/ellipsis-h";
let { layout } = $(useStore());
const menuRef = $ref<HTMLDivElement>();
let count = $ref(0);
const list = computed(() => {
  if (layout != "top") return adminRoutes;
  const l = [...adminRoutes];
  if (l.length > count) {
    l.length = count;
    l.push({
      path: "",
      name: "",
      meta: { title: "", icon: IEllipsis },
      children: adminRoutes.slice(count),
    });
  }
  return l;
});

const handleResize = () => {
  if (window.innerWidth < 768) layout = "mobile";
  else layout == "mobile" && (layout = "left");

  if (!menuRef || layout != "top") return;
  count = Math.floor((menuRef.clientWidth - 100) / 100);
};
watchEffect(() => {
  if (layout == "top") handleResize();
});
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template ref="menuRef" tag="div" class="menu">
  <vnav :routes="list"> </vnav>
</template>

<style lang="less">
.menu {
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 25vh;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

<style lang="less">
.admin-layout.top .menu {
  display: flex;
  justify-content: flex-end;
  overflow-x: auto;
  padding-bottom: 0;
}
</style>
