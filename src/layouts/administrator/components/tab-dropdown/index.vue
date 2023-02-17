<script setup lang="ts">
import irefresh from "~icons/prime/refresh";
const { keepAlive } = $(useMainStore());
const route = useRoute();
const router = useRouter();
const handleCommand = (command: string) => {
  const index = keepAlive.findIndex((item) => route.name == item.name);
  if (command == "reload") {
    router.go(0);
  } else if (command == "close") {
    keepAlive.splice(index, 1);
    router.push([...keepAlive].reverse()[0]);
  } else if (command == "close-left") {
    for (let i = 0; i < index; i++) keepAlive.shift();
  } else if (command == "close-right") {
    const length = keepAlive.length;
    for (let i = 0; i < length - index - 1; i++) keepAlive.pop();
  } else if (command == "close-other") {
    handleCommand("close-left");
    handleCommand("close-right");
  }
};
</script>

<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <div class="setting">
      <i-ic:outline-keyboard-arrow-down />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="irefresh" command="reload">重新加载</el-dropdown-item>
        <el-dropdown-item :icon="irefresh" :disabled="keepAlive.length == 1" command="close"
          >关闭标签页</el-dropdown-item
        >
        <el-dropdown-item
          :icon="irefresh"
          :disabled="keepAlive.findIndex((item) => item.name == route.name) == 0"
          command="close-left"
          divided
          >关闭左侧标签页</el-dropdown-item
        >
        <el-dropdown-item
          :icon="irefresh"
          :disabled="keepAlive.findIndex((item) => item.name == route.name) == keepAlive.length - 1"
          command="close-right"
          >关闭右侧标签页</el-dropdown-item
        >
        <el-dropdown-item
          :icon="irefresh"
          divided
          command="close-other"
          :disabled="keepAlive.length == 1"
          >关闭其它标签页</el-dropdown-item
        >
        <!-- <el-dropdown-item :icon="irefresh" command="close-all">关闭全部标签页</el-dropdown-item> -->
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="less" scoped></style>
