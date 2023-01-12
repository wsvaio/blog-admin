/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";

import Components from "unplugin-vue-components/vite";
import {
  ElementPlusResolver,
  VantResolver,
  NaiveUiResolver,
} from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";

import Unocss from "unocss/vite";
import { presetUno, presetAttributify, transformerDirectives } from "unocss";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

import scriptAttrs from "vite-plugin-vue-script-attrs";
import tempalteTag from "vite-plugin-vue-template-tag";

// import pxtorem from "postcss-pxtorem";
// import postcssPresetEnv from "postcss-preset-env";

export default defineConfig(({ mode }) => {
  const { VITE_BASE_API, VITE_BASE } = loadEnv(mode, "./");

  return {
    base: VITE_BASE,

    resolve: {
      alias: {
        "@/": `${resolve(__dirname, "src")}/`,
      },
    },

    css: {
      postcss: {
        plugins: [
          // pxtorem({
          //   rootValue: 100,
          //   propList: ["*"],
          // }),
          // postcssPresetEnv(),
        ],
      },
    },

    server: {
      proxy: {
        "/api": {
          target: VITE_BASE_API,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ""),
        },
      },
    },

    test: {},

    plugins: [
      vue({
        // include: [/\.vue$/, /\.md$/],
        // 开启 vue $() 语法糖
        reactivityTransform: true,
      }),
      // 移动setup script标签上的属性到一个新的script标签内导出
      scriptAttrs(),
      // 支持.vue文件<template>根标签添加tag等属性，解析成新的子元素并包裹旧的子元素
      tempalteTag(),

      // legacy(),

      // iconify 图标
      Icons(),

      // 原子化css
      Unocss({
        presets: [
          // 基础预设
          presetUno(),
          // presetWind(),
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
            enforce: "pre",
          }),
        ],
      }),

      // api 自动引入
      AutoImport({
        dts: resolve(__dirname, "typing/auto-import.d.ts"),
        imports: ["vue", "vue-router", "pinia", "@vueuse/core", "vitest", "vue/macros"],
        resolvers: [ElementPlusResolver(), VantResolver(), NaiveUiResolver()],
        vueTemplate: true,
        defaultExportByFilename: true,
        dirs: ["src/apis", "src/utils", "src/composables", "src/stores"],
      }),

      // 组件自动引入
      Components({
        dts: resolve(__dirname, "typing/auto-components.d.ts"),
        resolvers: [ElementPlusResolver(), VantResolver(), NaiveUiResolver(), IconsResolver()],
        dirs: ["src/components"],
      }),
    ],
  };
});
