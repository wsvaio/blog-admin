import { RouteRecordRaw } from "vue-router";

import Menu from "~icons/ep/menu";

let simpleRouteCount = 0;
const simpleRoute = (name: string) => {
  name = `${name}${++simpleRouteCount}`;
  return {
    path: name,
    name,
    meta: { title: name.toUpperCase(), icon: Menu },
    component: defineComponent({
      name,
      render: () => h("h1", [name.toUpperCase()]),
    }),
  };
};

const deepRoute = (name: string, deep: number) => {
  const result = {
    path: `${name}s${deep}`,
    name: `${name}s${deep}`,
    meta: { title: `${name}s${deep}`, icon: Menu },
    children: [simpleRoute(name), simpleRoute(name), simpleRoute(name)] as any[],
  };
  if (deep >= 1) {
    result.children.push(deepRoute(name, --deep));
  }
  return result;
};

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "home",
    name: "home",
    meta: { title: "Home", icon: Menu },
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "about",
    name: "about",
    meta: { title: "About", icon: Menu },
    component: () => import("@/views/about/index.vue"),
  },

  {
    path: "article",
    name: "varticle",
    meta: { title: "Article", icon: Menu },
    component: () => import("@/views/article/index.vue"),
  },

  deepRoute("item", 3),
  deepRoute("other", 6),
  deepRoute("list", 9),
];

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "adminLayout",
    redirect: { name: "home" },
    component: () => import("@/routes/admin/index.vue"),
    children: adminRoutes,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    name: "notfound",
    component: () => import("./notfound/index.vue"),
  },
];

export default routes;
