// import ECharts from "vue-echarts";
// import { use, ComposeOption } from "echarts/core";

import { App } from "vue";

// // 手动引入 ECharts 各模块来减小打包体积
// import {
//   CanvasRenderer,
// } from "echarts/renderers";
// import {
//   BarChart,
//   BarSeriesOption,

//   LineChart,
//   LineSeriesOption,
// } from "echarts/charts";
// import {
//   DatasetComponent,
//   DatasetComponentOption,

//   TooltipComponent,
//   TooltipComponentOption,

//   GridComponent,
//   GridComponentOption,

//   LegendComponent,
//   LegendComponentOption,

// } from "echarts/components";

// import { PieChart } from "echarts/charts";
// import { LabelLayout } from "echarts/features";

// use([
//   DatasetComponent,
//   TooltipComponent,
//   GridComponent,
//   LegendComponent,
//   BarChart,
//   CanvasRenderer,
//   LineChart,
//   PieChart,
//   LabelLayout
// ]);

// declare module "vue" {
//   export interface GlobalComponents {
//     VChart: typeof ECharts
//   }
// }

// declare global {
//   type ECOption = ComposeOption<
//     | BarSeriesOption
//     | LineSeriesOption
//     | DatasetComponentOption
//     | TooltipComponentOption
//     | GridComponentOption
//     | LegendComponentOption
//   >;
// }

export default (app: App) => {
  // 全局注册组件（也可以使用局部注册）
  // app.component("VChart", ECharts);
};
