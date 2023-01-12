import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";
const storageName = `${import.meta.env.VITE_PROJECT_NAME}_adminLayout`;

export default defineStore("adminLayout", {
  state: () => ({
    // 要缓存的路由 因为要支持tab拖动 所以是个一列表
    keepAlive: [] as RouteLocationNormalized[],
    layout: "left" as "top" | "left" | "mobile",
    collapse: false,
  }),
  actions: {
    addKeepAlive(route: RouteLocationNormalized) {
      const children = route.matched.find(item => item.name == route.name)?.children || [];
      if (
        this.keepAlive.find(item => item.name == route.name) || // 已存在
        route.matched[0].name != "adminLayout" || // 不是admin子路由
        children.length > 0
      )
        return;
      this.keepAlive.push(route);
    },
  },
  getters: {
    // 要缓存的路由名
    nameList(): string[] {
      return ["adminLayout", ...this.keepAlive.map(item => String(item.name))];
    },
  },

  persist: {
    key: storageName,
    paths: ["layout", "collapse"],
    storage: localStorage,
  },
});
