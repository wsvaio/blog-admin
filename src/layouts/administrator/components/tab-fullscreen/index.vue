<script setup lang="ts">
const main = useMainStore();
</script>

<template>
  <div @click="main.toggleLayout('full')" class="setting">
    <i-octicon:screen-full v-if="main.layout != 'full'" />
    <i-octicon:screen-normal v-else />
  </div>
</template>

<style lang="less" scoped></style>
