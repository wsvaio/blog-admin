import App from "@/routes/App.vue";

const app = createApp(App);

const module = import.meta.glob("@/modules/*/index.ts", { eager: true });

Object.values<any>(module).forEach(item => item?.default && item?.default(app));

app.mount("#app");
