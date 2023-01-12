<script lang="ts" setup>
import { RouteRecordRaw } from "vue-router";
import ArrowDown from "~icons/ep/arrow-down";
import vnav from "./index.vue";
import useStore from "@/routes/admin/store";
const { level = 1, popup } = defineProps<{
  routes: RouteRecordRaw[];
  level?: number;
  popup?: boolean;
}>();

const { layout, collapse } = $(useStore());
const admin = adminStore();

const isMenuItem = (route: RouteRecordRaw) =>
  !route.children || route.children.filter(item => item.meta?.icon).length == 0;

const state = reactive({ close: level != 1 });
provide("state", state);
const stateInject = inject<typeof state | null>("state", null);
watchEffect(() => {
  if (!stateInject || !stateInject.close) return;
  state.close = stateInject.close;
});

const route = useRoute();
const isRouteActive = (routes: RouteRecordRaw[]) =>
  routes.some(item => item.name == route.name || isRouteActive(item.children ?? []));

// 菜单项是否关闭
const isMenuClose = computed(() => state.close || stateInject?.close || collapse);

// 是否展示三角形
const isShowArrow = computed(() => stateInject || (!collapse && layout != "top"));
// 是否激活弹窗
const isPopupActive = computed(() => collapse || layout == "top");
const isShowMenuTitle = computed(() => popup || layout == "top" || !collapse);
</script>

<template>
  <slot :state="state"></slot>
  <template v-for="item in routes.filter(item => admin.isRouteShow(item))">
    <template v-if="isMenuItem(item)">
      <div
        v-if="(popup && level == 1) || !popup"
        :style="{ '--level': level }"
        :title="item?.meta?.title"
        :class="[
          'menu-nav-item',
          $route.name == item.name && 'active',
          isMenuClose && level != 1 && 'close',
          level != 1 && 'sub',
        ]"
        @click="$router.push({ name: item.name, params: $route.params })"
      >
        <component :is="item?.meta?.icon" class="icon"></component>
        <div v-show="isShowMenuTitle" class="text">{{ item?.meta?.title }}</div>
      </div>
    </template>

    <template v-else>
      <vnav
        v-if="!popup || (popup && level == 1)"
        #="{ state: innerState }"
        :routes="item.children!"
        :level="level + 1"
        :popup="$props.popup"
      >
        <vpopup
          :active="isPopupActive"
          :style="{ '--level': level }"
          :direction="!stateInject && layout == 'top' ? 'bottom' : 'right'"
          transition-name="fade"
          :duration="200"
          :popuper-class="['menu-nav-popup', layout]"
          :title="item?.meta?.title"
          :class="[
          'menu-nav-item', 'title',
          isRouteActive(item.children!) && 'active',
          isMenuClose && level != 1 && 'close',
          level != 1 && 'sub'
        ]"
          @click="innerState.close = !innerState.close"
        >
          <template v-if="popup || level == 1" #popup>
            <vnav :routes="item.children!" popup></vnav>
          </template>

          <component :is="item?.meta?.icon" class="icon"></component>
          <div v-show="isShowMenuTitle" class="text">{{ item?.meta?.title }}</div>
          <arrow-down
            v-show="isShowArrow"
            :class="[
              'arrow',
              innerState.close && 'close',
              (collapse || layout == 'top') && 'right',
            ]"
          ></arrow-down>
        </vpopup>
      </vnav>
    </template>
  </template>
</template>
<style lang="less">
.menu-nav-item {
  display: flex;
  overflow: hidden;
  padding-right: 12px;
  padding-left: calc(var(--level) * 12px);
  height: 50px;
  transition: height 0.2s, color 0.2s, width 0.2s, background 0.2s, border 0.2s, opacity 0.2s;
  align-items: center;

  &.close {
    height: 0;
    opacity: 0;
  }

  // .icon {
  //   font-size: 32px;
  // }

  .text {
    margin-left: 6px;
  }

  .arrow {
    margin-left: auto;
    width: 14px;
    height: 14px;
    transition: transform 0.2s;

    &.close {
      transform: rotate(180deg);
    }

    &.right {
      transform: rotate(-90deg);
    }
  }
}
</style>

<style lang="less">
.admin-layout.top .menu-nav-item {
  width: auto;

  &.sub {
    display: none;
  }
}
</style>

<style lang="less">
.menu-nav-popup {
  background: var(--menu-bg-color);
  box-shadow: var(--el-box-shadow);

  .sub {
    display: none;
  }
}

.admin-layout,
.menu-nav-popup {
  --menu-bg-color: var(--el-bg-color);
  --menu-text-color: var(--el-text-color-primary);
  --menu-text-active-color: var(--el-color-primary);
  --menu-bg-sub-color: var(--el-bg-color);
  --menu-bg-active-color: var(--el-bg-color);
}

html:not(.dark) .admin-layout:not(.top),
html:not(.dark) .menu-nav-popup:not(.top) {
  --menu-bg-color: #001529;
  --menu-text-color: rgb(255 255 255 / 70%);
  --menu-text-active-color: white;
  --menu-bg-sub-color: #0c2135;
  --menu-bg-active-color: var(--el-color-primary);
}

.menu-nav-item {
  color: var(--menu-text-color, rgb(255 255 255 / 70%));
  background: var(--menu-bg-color, #001529);

  &:hover {
    color: var(--menu-text-active-color);
    cursor: pointer;
  }

  &.sub {
    background: var(--menu-bg-sub-color);
  }

  &:not(.title).active {
    color: var(--menu-text-active-color);
    background: var(--menu-bg-active-color, var(--el-color-primary));
  }

  &.title.active {
    color: var(--menu-text-active-color);
  }
}

.admin-layout.top .menu-nav-item {
  border: 2px solid transparent;
  border-right: 0;
  border-left: 0;
  height: auto;

  &.active,
  &:hover {
    border-bottom-color: var(--el-color-primary);
  }
}

.admin-layout.left.collapse .menu-nav-item {
  justify-content: center;
  border: 3px solid transparent;
  border-top: 0;
  border-bottom: 0;

  &.active {
    border-left-color: var(--el-color-primary);
    background: var(--menu-bg-collaspe-color, #00061a);
  }
}
</style>
