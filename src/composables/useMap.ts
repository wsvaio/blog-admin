import { compose, Middleware } from "@wsvaio/utils";
import { Ref } from "vue";
export default (
  el: string | HTMLDivElement | Ref<HTMLDivElement | undefined>,
  opts?: Partial<AMap.MapOptions> | undefined,
) => {
  let map = $shallowRef<AMap.Map>();
  const middlewares = [
    async (map) => {
      AMap.plugin(
        [
          "AMap.ToolBar",
          "AMap.Scale",
          "AMap.HawkEye",
          "AMap.ControlBar",
          "AMap.MapType",
          "AMap.AdvancedInfoWindow",
        ],
        () => {
          const AMapPlugin = AMap as any;
          map.addControl(new AMapPlugin.ToolBar());
          map.addControl(new AMapPlugin.Scale());
          map.addControl(new AMapPlugin.ControlBar());
          map.addControl(new AMapPlugin.HawkEye());
          map.addControl(new AMapPlugin.MapType());
        },
      );
    },
  ] as Middleware<AMap.Map>[];
  onMounted(() => {
    let div: string | HTMLDivElement | undefined;
    if (typeof el == "string") div = el;
    else if (isRef(el) && el.value) div = el.value;
    else if (!isRef(el)) div = el;
    if (!div) return;
    map = new AMap.Map(div, opts);
    compose(...middlewares)(map);
  });
  return {
    map: $$(map),
    use: async (...fns: Middleware<AMap.Map>[]) => {
      if (map) return await compose(...fns)(map);
      else middlewares.push(...fns);
    },
  };
};
