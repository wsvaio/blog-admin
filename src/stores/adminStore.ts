import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";

export default defineStore("admin", {
  state() {
    return {};
  },
  actions: {
    isRouteShow(route: RouteRecordRaw) {
      return (
        (this.include.length == 0 || this.include.includes(String(route.name))) &&
        !this.exclude.includes(String(route.name)) &&
        route.meta?.icon &&
        (!route.children || route.children.length > 0)
      );
    },
  },
  getters: {
    // 管理员不能查看的页面
    exclude(): string[] {
      return [];
    },
    // 管理员能查看的页面
    include(): string[] {
      return [];
    },
  },
});
