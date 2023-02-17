<script setup lang="ts">
const main = useMainStore();
</script>

<template>
  <div @click.stop="main.collapse = !main.collapse" class="collapse-bottom">
    <i-ic:twotone-keyboard-double-arrow-left v-if="!main.collapse" />
    <i-ic:twotone-keyboard-double-arrow-right v-else />
  </div>
</template>
<style lang="less" scoped>
.collapse-bottom {
  color: white;
  font-size: 18px;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;

  background-color: rgb(var(--theme-color) / 16%);

  margin-top: auto;

  position: sticky;
  bottom: 0;

  flex: none;
}
</style>
