import { RouteLocationNormalizedLoaded, RouteRecordRaw } from "vue-router";
import * as api from "@/apis";
import { administratorChildren } from "@/routes";
export { api };

export const isMenuItem = (route: RouteRecordRaw) =>
  !route.children || route.children.filter((item) => item.meta?.icon).length == 0;
export const isRouteActive = (
  routeItem: RouteRecordRaw,
  route?: RouteRecordRaw | RouteLocationNormalizedLoaded,
) => {
  route ||= useRoute();

  if ("children_backup" in routeItem) {
    routeItem = { ...routeItem, children: routeItem["children_backup"] as RouteRecordRaw[] };
  }
  if (routeItem.name == route.name) return true;
  else if (Array.isArray(routeItem.children)) {
    return routeItem.children.some((item) => isRouteActive(item, route));
  } else return false;
};

export const getTopLevelRoute = (route: RouteRecordRaw | RouteLocationNormalizedLoaded) => {
  for (const item of administratorChildren) {
    if (isRouteActive(item, route)) return item;
  }
};

export const hex2rgb = (hex) => {
  if (typeof hex !== "string") return;
  hex = hex.toLowerCase();
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (hex && reg.test(hex)) {
    if (hex.length === 4) {
      let hexNew = "#";
      for (let i = 1; i < 4; i += 1) {
        hexNew += hex.slice(i, i + 1).concat(hex.slice(i, i + 1));
      }
      hex = hexNew;
    }
    const hexChange: number[] = [];
    for (let i = 1; i < 7; i += 2) {
      hexChange.push(parseInt("0x" + hex.slice(i, i + 2)));
    }
    return "RGB(" + hexChange.join(",") + ")";
  }
  return hex;
};
