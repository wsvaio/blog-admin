import { Progress } from "@wsvaio/utils";
import { createAPI } from "@wsvaio/api";

const { DEV, VITE_BASE_API } = import.meta.env;
// 创建api对象 泛型添加自定义属性
export const { post, get, put, patch, del, request, use } = createAPI<{
  success?: string;
}>({
  baseURL: DEV ? "/api" : VITE_BASE_API,
  log: true, // 控制台是否打印日志
  timeout: 0,
  headers: {},
});

// 请求发出前
use("befores")(async ctx => Progress.start());

// 请求发出后
// 复制响应消息
use("afters")(async ctx => (ctx.message = ctx.data?.msg ?? ctx.message));
// 判断响应状态码
use("afters")(async ctx => (ctx.data?.code < 200 || ctx.data?.code > 299) && Promise.reject(ctx));
// 响应内容扁平化
use("afters")(async ctx => (ctx.data = ctx.data?.data ?? ctx.data));

// 结束时总会运行
// 进度条结束
use("finals")(async ctx => Progress.done(!ctx.error));
// notice 通知 不设置success则不会通知
use("finals")(async ctx =>
  ctx.error
    ? ctx.message && ElNotification.error(ctx.message)
    : ctx.success && ElNotification.success(ctx.success)
);
