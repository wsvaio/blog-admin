<template>
  <el-breadcrumb class="bread-crumb">
    <transition-group tag="div" mode="out-in">
      <template v-for="item in $route.matched">
        <el-breadcrumb-item
          v-if="item.meta?.title"
          :key="item.name"
          :to="{ name: item.name, params: $route.params }"
        >
          <el-icon :size="16" class="align-middle">
            <component :is="item.meta?.icon"></component>
          </el-icon>
          <span class="align-middle ml-4px">{{ item.meta?.title }}</span>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="less" scoped>
.bread-crumb {
  display: grid;
  overflow-x: hidden;
  border-bottom: 1px solid var(--el-border-color);
  padding: 0 8px;
  white-space: nowrap;
  align-items: center;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.v-enter-active {
  transition: all 0.333s ease;
}

.v-leave-active {
  display: inline-block;
  position: absolute;
  transition: all 0.333s ease;
}
</style>
