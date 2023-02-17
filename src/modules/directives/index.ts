import { App } from "vue";
const modules = import.meta.glob("./*.ts", { eager: true });
export default (app: App) =>
  Object.values<any>(modules).forEach((item) => item?.default && item?.default(app));
