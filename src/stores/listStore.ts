export default defineStore("list", {
  state: () => ({
    tags: [] as any[],
    types: [] as any[],
    articles: [] as any[],
    users: [] as any[],
  }),
  actions: {
    async syncTags() {
      this.tags = await getTag();
    },
    async syncTypes() {
      this.types = await getType();
    },
    async syncArticles() {
      this.articles = await getArticle();
    },
    async syncUsers() {
      this.users = await getUser();
    },
  },
  getters: {},
});
