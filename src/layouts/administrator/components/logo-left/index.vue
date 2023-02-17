<script setup lang="ts">
import logo from "../logo/index.vue";
const main = useMainStore();
</script>

<template>
  <logo :class="['logo-left', main.collapse && 'collapse']" />
</template>

<style lang="less">
.logo-left {
  color: white;
}
</style>
