import { App } from "vue";

// 页面第一次加载 z前缀确保该文件最后加载
export default (app: App) => {
  const auth = authStore();
  const admin = adminStore();

  if (auth.isLogin) {
    return;
  }
};
