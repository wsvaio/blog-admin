<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen(document.documentElement);
</script>

<template>
  <!-- <el-tooltip content="全屏"> -->
  <div class="hover" @click="toggle">
    <i-akar-icons:full-screen v-if="!isFullscreen" />
    <i-akar-icons:normal-screen v-else />
  </div>
  <!-- </el-tooltip> -->
</template>
