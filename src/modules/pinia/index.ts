import { createPersistedState } from "pinia-plugin-persistedstate";
import { App } from "vue";

const pinia = createPinia();
// pinia 持久化
pinia.use(createPersistedState());

export default (app: App) => {
  app.use(pinia);

  const html = document.documentElement;
  const main = useMainStore();
  // 设置css变量到html上
  watchEffect(() => {
    for (const [k, v] of Object.entries(main.cssVars)) {
      html.style.setProperty(k, v);
    }
  });
  // 设置主题到html上
  watchEffect(() => {
    html.classList.remove("light", "dark");
    main.theme && html.classList.add(main.theme);
  });
  // 设置布局到html上
  watchEffect(() => {
    html.classList.remove("left", "top", "full", "mobile", "left-mix", "top-mix");
    html.classList.add(main.layout);
  });
  // 设置size到html上
  watchEffect(() => {
    html.classList.remove("xxl", "xl", "lg", "md", "sm", "xs", "xxs");
    for (const item of ["xxl", "xl", "lg", "md", "sm", "xs", "xxs"]) {
      html.classList.add(item);
      if (item === main.size) break;
    }
  });
  // size 到 md 以下时 设置布局为mobile
  watch(
    () => main.size,
    () => {
      if (["xxs", "xs", "sm", "md"].includes(main.size)) {
        if (main.layoutHas("mobile")) return;
        main.layout == "full" && main.toggleLayout("full");
        main.toggleLayout("mobile");
      } else if (main.layout == "mobile") {
        main.toggleLayout("mobile");
      }
    },
  );
  // 设置size
  const handleResize = () => {
    main.size =
      html.clientWidth >= 1400
        ? "xxl"
        : html.clientWidth >= 1200
        ? "xl"
        : html.clientWidth >= 992
        ? "lg"
        : html.clientWidth >= 768
        ? "md"
        : html.clientWidth >= 576
        ? "sm"
        : html.clientWidth >= 375
        ? "xs"
        : "xxs";
  };
  handleResize();
  window.addEventListener("resize", handleResize);

  // 跟随系统主题
  const matchMediaDark = window.matchMedia("(prefers-color-scheme: dark)");
  const matchMediaLight = window.matchMedia("(prefers-color-scheme: light)");

  matchMediaDark.addEventListener("change", (ev) => {
    if (!ev.matches) return;
    main.theme = "dark";
  });

  matchMediaLight.addEventListener("change", (ev) => {
    if (!ev.matches) return;
    main.theme = "light";
  });

  if (!main.theme) {
    if (matchMediaDark.matches) {
      main.theme = "dark";
    } else if (matchMediaLight.matches) {
      main.theme = "light";
    }
  }
};
