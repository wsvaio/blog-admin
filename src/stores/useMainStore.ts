import { defineStore } from "pinia";
import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";
const storageName = `${import.meta.env.VITE_PROJECT_NAME}_main`;
type Layout = "left" | "top" | "full" | "mobile" | "left-mix" | "top-mix";
type Size = "xxl" | "xl" | "lg" | "md" | "sm" | "xs" | "xxs";
export default defineStore("main", {
  state: () => ({
    theme: null as "light" | "dark" | null,
    size: "xxl" as Size,
    layout: "left" as Layout,
    layoutCache: {
      mobile: "left" as Layout,
      full: "left" as Layout,
    },
    excluse: new Set<string>(),
    collapse: false,
    showAside: false,
    leftMixActiveRoute: null as RouteRecordRaw | null,
    showLeftMix: false,
    fixedLeftMix: false,
    cssVars: {
      "--primary-color": "",
    },
    isRouteActive: true,
    // 要缓存的路由 因为要支持tab拖动 所以是个一列表
    keepAlive: [] as RouteLocationNormalized[],
  }),
  actions: {
    addKeepAlive(route: RouteLocationNormalized) {
      const children = route.matched.find((item) => item?.name == route?.name)?.children || [];
      if (
        this.keepAlive?.find((item) => item?.name == route?.name) || // 已存在
        route.matched[0].name != "administrator" || // 不是admin子路由
        children.length > 0
      )
        return;
      this.keepAlive.push(route);
    },
    toggleLayout(name: "full" | "mobile") {
      if (this.layout == name) {
        this.layout = this.layoutCache[name];
      } else {
        this.layoutCache[name] = this.layout;
        this.layout = name;
      }
    },

    layoutHas(...names: Layout[]) {
      return names.some((item) => item == this.layout);
    },

    refresh(name: string) {
      this.excluse.add(name);

      this.isRouteActive = false;
      nextTick(() => {
        this.isRouteActive = true;
        this.excluse.delete(name);
      });
    },
  },
  getters: {
    // 要缓存的路由名
    nameList(): string[] {
      return [...this.keepAlive.map((item) => String(item.name))];
    },
  },

  persist: {
    paths: [
      "theme",
      "layout",
      "layoutCache",
      "collapse",
      "showAside",
      "showLeftMix",
      "fixedLeftMix",
      "cssVars",
      "leftMixActiveRoute",
    ],
    key: storageName,
  },
});
