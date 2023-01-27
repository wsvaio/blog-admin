export default defineStore("list", {
  state: () => ({
    tags: [] as any[],
    types: [] as any[],
  }),
  actions: {
    async syncTags() {
      this.tags = await getTag();
    },
    async syncTypes() {
      this.types = await getType();
    },
  },
  getters: {},
});
