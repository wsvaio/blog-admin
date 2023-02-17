<script setup lang="ts">
let activeName = $ref("tongzhi");
</script>

<template>
  <el-popover :width="200">
    <el-tabs v-model="activeName">
      <el-tab-pane label="通知" name="tongzhi"> 通知 </el-tab-pane>
      <el-tab-pane label="消息" name="xiaoxi">Config</el-tab-pane>
      <el-tab-pane label="待办" name="daiban">Role</el-tab-pane>
    </el-tabs>

    <template #reference>
      <div class="hover">
        <i-ph:bell-simple-light />
      </div>
    </template>
  </el-popover>
</template>

<style lang="less" scoped></style>
