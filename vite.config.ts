import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

import scriptAttrs from "vite-plugin-vue-script-attrs";
import tempalteTag from "vite-plugin-vue-template-tag";

import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import { createHtmlPlugin } from "vite-plugin-html";

import Unocss from "unocss/vite";
import { presetUno, presetAttributify, transformerDirectives } from "unocss";

export default defineConfig(({ mode }) => {
  const { VITE_BASE_API, VITE_BASE, VITE_DOCUMENT_TITLE } = loadEnv(mode, "./");
  return {
    base: VITE_BASE,
    resolve: {
      alias: {
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
        "@/": `${resolve(__dirname, "src")}/`,
        "#/": `${resolve(__dirname, "types")}/`,
      },
    },
    server: {
      proxy: {
        "/common": {
          target: "http://124.220.194.60/api",
          changeOrigin: true,
        },
        "/blog": {
          target: VITE_BASE_API,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      vue({
        reactivityTransform: true,
      }),
      // html注入数据
      createHtmlPlugin({
        inject: {
          data: {
            title: VITE_DOCUMENT_TITLE,
          },
        },
      }),

      // 原子化css
      Unocss({
        presets: [
          // 基础预设
          presetUno(),
          // 属性化模式支持
          presetAttributify({
            // 设置前缀
            prefix: "un:",
            // 前缀不是必须的
            prefixedOnly: false,
          }),
        ],
        transformers: [
          // @apply 指令
          transformerDirectives({
            // 卡在postcss处理前
            enforce: "pre",
          }),
        ],
      }),

      // 移动setup script标签上的属性到一个新的script标签内导出
      scriptAttrs(),
      // 支持.vue文件<template>根标签添加tag等属性，解析成新的子元素并包裹旧的子元素
      tempalteTag(),

      // api 自动引入
      AutoImport({
        dts: resolve(__dirname, "types/auto-import.d.ts"),
        imports: ["vue", "vue-router", "pinia", "vue-i18n", "@vueuse/core"],
        resolvers: [ElementPlusResolver()],
        vueTemplate: true,
        defaultExportByFilename: true,
        dirs: ["src/utils", "src/composables", "src/stores", "src/apis/index*"],
      }),
      // 组件自动引入
      Components({
        dts: resolve(__dirname, "types/auto-components.d.ts"),
        resolvers: [ElementPlusResolver(), IconsResolver()],
        dirs: ["src/components"],
      }),
      // iconify 图标
      Icons(),
    ],
  };
});
