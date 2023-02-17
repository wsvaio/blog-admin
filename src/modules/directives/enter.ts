import { App } from "vue";
import "./enter.less";
export default (app: App) => {
  app.directive("enter", {
    beforeMount(el: HTMLElement, binding) {
      if (typeof binding.value != "object") return;
      const { delay = "0s", translate = "0, 48px", duration = "0.4s" } = binding.value;
      el.classList.add("v-enter");
      el.style.setProperty("--v-enter-delay", delay);
      el.style.setProperty("--v-enter-translate", translate);
      el.style.setProperty("--v-enter-duration", duration);
    },
  });
};
