import { defineStore } from "pinia";
import { merge } from "@wsvaio/utils";
const storageName = `${import.meta.env.VITE_PROJECT_NAME}_auth`;

const initState = <T extends object>(state: T) => {
  try {
    const localStorageItem = localStorage.getItem(storageName);
    localStorageItem && merge(state, JSON.parse(localStorageItem));
  } catch (error) {
    console.error(error);
  }
  return state;
};

export default defineStore("auth", {
  state: () => initState({ token: "", expire: "" }),

  actions: {
    async login(body) {
      // const data = await loginAdmin({ body, success: "登陆成功" });
      const data = {};
      merge(this.$state, data, { has: true });
      // 持久化
      body.persist && localStorage.setItem(storageName, JSON.stringify(this.$state));
    },
    logout() {
      localStorage.removeItem(storageName);
      this.$reset();
    },
  },
  getters: {
    isLogin(): boolean {
      return new Date(this.expire) > new Date();
    },
  },

  persist: {
    key: storageName,
    storage: sessionStorage,
    debug: import.meta.env.DEV,
  },
});
