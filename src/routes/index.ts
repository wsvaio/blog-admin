import { RouteRecordRaw } from "vue-router";
import Menu from "~icons/ep/menu";

export const administratorChildren = [
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
  {
    path: "comment",
    name: "comment",
    meta: { title: "评论", icon: Menu },
    component: () => import("@/views/comment/index.vue"),
  },
  {
    path: "user",
    name: "user",
    meta: { title: "用户", icon: Menu },
    component: () => import("@/views/user/index.vue"),
  },
] as RouteRecordRaw[];

export default [
  {
    path: "/",
    name: "administrator",
    redirect: { name: "varticle" },
    component: () => import("@/layouts/administrator/index.vue"),
    children: administratorChildren,
  },

  {
    path: "/:pathMatch(.*)",
    name: "notfound",
    component: () => import("@/views/notfound/index.vue"),
  },
] as RouteRecordRaw[];
