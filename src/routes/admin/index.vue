<script setup lang="ts">
import Logo from "./commponents/logo/index.vue";
import BreadCrumb from "./commponents/bread-crumb/index.vue";
import Setting from "./commponents/setting/index.vue";
import Menu from "./commponents/menu/index.vue";
import Tab from "./commponents/tab/index.vue";
import Main from "./commponents/main/index.vue";
import Fold from "./commponents/fold/index.vue";
import useStore from "./store";
const { layout, collapse } = $(useStore());
</script>

<template
  tag="div"
  :class="['admin-layout', layout, collapse && 'collapse']"
  :style="{
    '--aside-width': !collapse ? '200px' : layout == 'left' ? '64px' : '0px',
  }"
>
  <Logo></Logo>
  <Fold></Fold>
  <BreadCrumb></BreadCrumb>
  <Setting></Setting>
  <Menu></Menu>
  <Tab></Tab>
  <Main></Main>
</template>

<style lang="less">
.admin-layout {
  display: grid;
  overflow: auto;
  width: 100%;
  height: 100vh;
  grid-template-columns: auto auto 1fr auto max-content;
  grid-template-rows: 48px auto 1fr;
}
</style>

<style lang="less">
.admin-layout.left,
.admin-layout.mobile {
  .menu,
  .logo {
    width: var(--aside-width);
    transition: width 0.2s;
  }
}

.admin-layout.left {
  .bread-crumb {
    grid-column: span 2;
  }

  .menu {
    grid-row: span 2;
  }

  .tab,
  .main {
    grid-column: span 4;
  }
}

.admin-layout.top {
  .fold {
    display: none;
  }

  .logo,
  .menu {
    border-bottom: 1px solid var(--el-border-color);
  }

  .menu {
    grid-column: span 2;
    order: 3;
  }

  .tab,
  .main {
    grid-column: span 5;
  }
}

.admin-layout.mobile {
  .bread-crumb {
    grid-column: span 2;
  }

  .menu {
    grid-row: span 4;
  }

  .tab,
  .main {
    grid-column: span 4;
  }
}
</style>

<style lang="less">
.admin-layout {
  .logo {
    order: 1;
  }

  .fold {
    order: 2;
  }

  .bread-crumb {
    order: 3;
  }

  .setting {
    order: 4;
  }

  .menu {
    order: 5;
  }

  .tab {
    order: 6;
  }

  .main {
    order: 7;
  }
}
</style>

<style lang="less">
html:not(.dark) .admin-layout:not(.top) {
  .logo,
  .menu {
    color: var(--menu-text-active-color);
    background: var(--menu-bg-color);
  }
}
</style>
