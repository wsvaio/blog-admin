<script setup lang="ts">
import defaultAvatar from "@/assets/github.svg";
import IShutdown from "~icons/icons8/shutdown";
const main = useMainStore();
const user = useUserStore();
const router = useRouter();
const handleCommand = (item) => {
  if (item === "logout") {
    router.push({ name: "login" });
  }
};
const handleClick = async () => {
  if (user.token || user.loading) return;
  jumpToGithubAccess(`${location.origin}${location.pathname}`);
};
</script>

<template>
  <el-dropdown size="medium" class="hover" :disabled="!user.token" @command="handleCommand">
    <div v-loading="user.loading" flex="~" items="center" @click="handleClick">
      <img w="24px" h="24px" object="cover" :src="user.image || defaultAvatar" />
      <span m="l-8px" class="whitespace-nowrap" v-if="main.layout != 'mobile'">{{
        user.username || "登录"
      }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="logout" :icon="IShutdown">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
