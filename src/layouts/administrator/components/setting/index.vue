<script setup lang="ts">
let isShow = $ref(false);
const main = useMainStore();
const tip = {
  left: "左侧菜单模式",
  "top-mix": "顶部菜单混合模式",
  top: "顶部菜单模式",
  "left-mix": "左侧菜单混合模式",
};
</script>

<template>
  <div class="hover" @click="isShow = !isShow">
    <i-mdi-light:settings />
  </div>

  <el-drawer v-model="isShow" title="项目配置" size="333px">
    <div text="center">
      <el-divider><span text="16px">主题</span></el-divider>
      <!-- <el-switch v-model="main.theme" :active-value="'dark'" :inactive-value="'light'" /> -->
      <theme-switch m="x-auto" />
      <el-divider><span text="16px">导航栏模式</span></el-divider>
      <div class="layout">
        <el-tooltip v-for="item in ['left', 'top-mix', 'top', 'left-mix']" :content="tip[item]">
          <div
            :class="[item, main.layout == item && 'active']"
            @click="(main.layout as string) = item"
          ></div>
        </el-tooltip>
      </div>
      <!-- <el-select v-model="main.layout">
        <el-option
          v-for="item in ['left', 'left-mix', 'top', 'top-mix', 'mobile']"
          :label="item"
          :value="item"
          :key="item"
        />
      </el-select> -->
      <el-divider><span text="16px">系统主题</span></el-divider>
      <el-color-picker v-model="main.cssVars['--primary-color']" />
      <el-divider><span text="16px">顶栏主题</span></el-divider>
      <el-color-picker v-model="main.cssVars['--header-bg-color']" />
      <el-divider><span text="16px">菜单主题</span></el-divider>
      <el-color-picker v-model="main.cssVars['--aside-bg-color']" />
      <!-- <el-divider><span text="16px">背景主题</span></el-divider>
      <el-color-picker v-model="main.cssVars['--main-bg-color']" /> -->
    </div>
  </el-drawer>
</template>
<style lang="less" scoped>
.layout {
  display: flex;
  justify-content: space-between;

  & > div {
    width: 56px;
    height: 48px;
    border-radius: 5px;
    transition: border-color 0.3s;
    border-color: transparent;
    box-shadow: 1px 1px 6px rgb(var(--theme-color-invert) / 25%);

    &:hover,
    &.active {
      cursor: pointer;
      border: 2px solid var(--primary-color);
    }
  }

  .left {
    background: linear-gradient(#273352, #273352) no-repeat left center / 33% 100%,
      linear-gradient(white, white) no-repeat top center / 100% 25%, #f0f2f5;
  }

  .top-mix {
    background: linear-gradient(#273352, #273352) no-repeat top center / 100% 25%,
      linear-gradient(white, white) no-repeat left center / 25% 100%, #f0f2f5;
  }

  .top {
    background: linear-gradient(#273352, #273352) no-repeat top center / 100% 25%, #f0f2f5;
  }

  .left-mix {
    background: linear-gradient(#273352, #273352) no-repeat left center / 25% 100%,
      linear-gradient(white, white) no-repeat top center / 100% 25%,
      linear-gradient(white, white) no-repeat left center / 40% 100%, #f0f2f5;
  }
}
</style>
