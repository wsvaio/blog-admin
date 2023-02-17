<script setup lang="ts">
const state = shallowReactive({
  x: 0,
  y: 0,
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
  draging: false,
});

provide("map-container-state", state);

const windowEvent = useEvent(window);
let mouseEventCache: MouseEvent | null = null;
windowEvent.on(["mousemove", "mouseup"], (event) => {
  const ev = event as MouseEvent;
  if (ev.type == "mousemove" && mouseEventCache && state.draging) {
    state.x += (ev.clientX - mouseEventCache.clientX) / state.zoom;
    state.y += (ev.clientY - mouseEventCache.clientY) / state.zoom;
  } else if (ev.type == "mouseup") {
    state.draging = false;
  }

  mouseEventCache = ev;
});
windowEvent.on("mouseup", () => (state.draging = false));

const handleMouseWheel = (ev: WheelEvent) => {
  if (ev.deltaY < 0) {
    state.zoom *= 1.1;
  } else {
    state.zoom *= 0.9;
  }
};
</script>

<template>
  <div class="map-container" @mousedown="state.draging = true" @mousewheel="handleMouseWheel">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.map-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  background: linear-gradient(var(--bg-color) 1px, transparent 1px) center / 100% 32px,
    linear-gradient(90deg, var(--bg-color) 1px, transparent 1px) center / 32px 100%,
    linear-gradient(var(--bg-color) 2px, transparent 2px) center / 100% 160px,
    linear-gradient(90deg, var(--bg-color) 2px, transparent 2px) center / 160px 100%;
}
</style>
