import { createRouter, createWebHistory } from "vue-router";
import routes from "@/routes";
import { merge, Progress } from "@wsvaio/utils";
import adminLayoutStore from "@/routes/admin/store";
import { App } from "vue";
// import adminLayoutStore from "@/routes/admin/stores/adminLayoutStore";

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes,
});

router.beforeEach(() => Progress.start());

router.beforeEach((to, from, next) => {
  const admin = adminStore();
  if (to.matched.find(item => admin.exclude.includes(String(item.name))))
    next({ name: "notfound" });
  else next();
});

router.beforeEach((to, from, next) => {
  const { addKeepAlive } = $(adminLayoutStore());
  addKeepAlive(to);
  next();
});

router.afterEach(() => Progress.clear());

export default (app: App) => app.use(router);
