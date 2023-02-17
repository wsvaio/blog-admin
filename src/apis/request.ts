import { Progress } from "@wsvaio/utils";
import { createAPI } from "@wsvaio/api";

const { DEV, VITE_BASE_API } = import.meta.env;
// 创建api对象 泛型添加自定义属性
export const { post, get, put, patch, del, request, use } = createAPI<{
  success?: string;
}>({
  baseURL: DEV ? "" : VITE_BASE_API,
  log: true, // 控制台是否打印日志
  timeout: 0,
  headers: {},
  cache: "no-cache",
});

// 请求发出前
use("befores")(async () => Progress.start());

use("befores")(async (ctx) => {
  const user = useUserStore();
  ctx.headers["Authorization"] = user.token;
});

// 请求发出后

use("afters")(async (ctx) => {
  if (ctx.data?.success != false) return;
  throw new Error(ctx.data.message || ctx.message);
});

// 请求发出后
use("afters")(async (ctx) => (ctx.data = ctx.data.data));

use("errors")(async (ctx) => {
  if (ctx.message != "认证失败") return;
  const user = useUserStore();
  user.logout();
});

// 结束时总会运行
// 进度条结束
use("finals")(async (ctx) => Progress.done(!ctx.error));
// notice 通知 不设置success则不会通知
use("finals")(async (ctx) =>
  ctx.error
    ? ctx.message && ElNotification.error(ctx.message)
    : ctx.success && ElNotification.success(ctx.success),
);
