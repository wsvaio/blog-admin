import * as $apis from "@/apis";
import * as $utils from "@/utils";
import { App } from "vue";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $apis: typeof $apis;
    $utils: typeof $utils;
    $bus: typeof $utils.bus;
  }
}

export default (app: App) =>
  Object.assign(app.config.globalProperties, {
    $apis,
    $utils,
    $bus: $utils.bus,
  });
