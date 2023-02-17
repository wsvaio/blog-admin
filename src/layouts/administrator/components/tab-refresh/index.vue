<script lang="ts" setup>
let refresh = $ref(0);
const main = useMainStore();
</script>

<template>
  <div
    class="ml-auto setting"
    :style="{ '--rotate': `${refresh * 360}deg` }"
    @click="refresh++, main.refresh(String($route.name || ''))"
  >
    <i-prime:refresh class="icon" />
  </div>
</template>

<style lang="less" scoped>
.icon {
  transition: all 0.3s;
  transform: rotate(var(--rotate));
}
</style>
