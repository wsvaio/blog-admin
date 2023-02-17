import { defineStore } from "pinia";
const storageName = `${import.meta.env.VITE_PROJECT_NAME}_user`;

export default defineStore("user", {
  state: () => ({
    id: 0,
    username: "",
    email: "",
    image: "",
    token: "",
    error: "",
    loading: false,
  }),

  actions: {
    async login(code: string) {
      this.token = "";
      this.error = "";
      this.loading = true;
      const result = await authToken({ p: { code } }).catch((err) => err);
      this.loading = false;
      if (!result.token) return (this.error = result);
      this.token = result.token;
      this.syncUser();
    },
    async syncUser() {
      if (!this.token) return;
      const user = await authUser();
      this.username = user.username;
      this.email = user.email;
      this.image = user.image;
      this.id = user.id;
    },
    async logout() {
      this.$reset();
    },
  },
  getters: {},
  persist: {
    key: storageName,
  },
});
