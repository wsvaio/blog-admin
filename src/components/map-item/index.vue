<script setup lang="ts">
import { StyleValue } from "vue";
let {
  state = reactive({
    x: 0,
    y: 0,
    zoom: 1,
    draggable: false,
  }),
} = defineProps<{
  state?: { x: number; y: number; zoom: number; draggable?: boolean };
}>();
let draging = $ref(false);
const handleMouseDown = (ev: MouseEvent) => {
  if (!state.draggable) return;
  ev.stopPropagation();
  draging = true;
};
const stateInject = inject<Record<any, any>>("map-container-state");
const windowEvent = useEvent(window);
let mouseEventCache: MouseEvent | null = null;
windowEvent.on(["mousemove", "mouseup"], (event) => {
  if (!state.draggable) return;
  const ev = event as MouseEvent;
  if (ev.type == "mousemove" && mouseEventCache && draging) {
    // eslint-disable-next-line vue/no-mutating-props
    state.x += (ev.clientX - mouseEventCache.clientX) / stateInject?.zoom;
    // eslint-disable-next-line vue/no-mutating-props
    state.y += (ev.clientY - mouseEventCache.clientY) / stateInject?.zoom;
  } else if (ev.type == "mouseup") {
    draging = false;
  }

  mouseEventCache = ev;
});
const bgMapItemStyle = computed((): StyleValue => {
  return {
    "--x": state.x * stateInject?.zoom + stateInject?.x * stateInject?.zoom + "px",
    "--y": state.y * stateInject?.zoom + stateInject?.y * stateInject?.zoom + "px",
    "--zoom": state.zoom * stateInject?.zoom,
    // "--zoom": stateInject?.zoom,
  };
});
</script>

<template>
  <div class="bg-map-item" :style="bgMapItemStyle" @mousedown="handleMouseDown">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.bg-map-item {
  transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(var(--zoom));
  // transform-origin: var(--stateX) var(--stateY);
  position: absolute;
  left: 50%;
  top: 50%;

  user-select: none;
}
</style>
