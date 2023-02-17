// 页面第一次加载 z前缀确保该文件最后加载
export default () => {
  const url = new URL(location.href);
  const code = url.searchParams.get("code");
  const user = useUserStore();
  if (typeof code != "string" || user.token) return;
  user.login(code);
};
