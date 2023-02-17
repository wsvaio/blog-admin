<script setup lang="ts">
const main = useMainStore();
</script>

<template>
  <div class="theme-switch" @click="main.theme = main.theme == 'dark' ? 'light' : 'dark'">
    <div class="sun">
      <i-fxemoji:sunrays class="align-middle" />
    </div>
    <div class="moon">
      <i-fxemoji:crescentmoon class="align-middle" />
    </div>
    <div :class="['mask', main.theme]"></div>
  </div>
</template>

<style lang="less" scoped>
.theme-switch {
  width: 52px;
  height: 28px;
  background-color: #151515;
  border-radius: 9999px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  line-height: 1;
  position: relative;
  border: 1px solid var(--border-color);

  .mask {
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 9999px;
    left: 25%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: left 0.3s;

    &.light {
      left: 25%;
    }

    &.dark {
      left: 75%;
    }
  }
}
</style>
