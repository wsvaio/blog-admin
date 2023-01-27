import { RouteRecordRaw } from "vue-router";

import Menu from "~icons/ep/menu";

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "article",
    name: "varticle",
    meta: { title: "文章", icon: Menu },
    component: () => import("@/views/article/index.vue"),
  },
  {
    path: "tag",
    name: "tag",
    meta: { title: "标签", icon: Menu },
    component: () => import("@/views/tag/index.vue"),
  },
  {
    path: "type",
    name: "type",
    meta: { title: "分类", icon: Menu },
    component: () => import("@/views/type/index.vue"),
  },
  // {
  //   path: "comment",
  //   name: "comment",
  //   meta: { title: "comment", icon: Menu },
  //   component: () => import("@/views/comment/index.vue"),
  // },
];

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "adminLayout",
    redirect: { name: "varticle" },
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
