<script lang="ts" setup>
import useStore from "@/routes/admin/store";
const { keepAlive } = $(useStore());

function dragstart(event: DragEvent) {
  const el: any = event.target;
  event.dataTransfer?.setData("dragIndex", el?.dataset?.index);
}
function drop(event: DragEvent, dropIndex: number) {
  const dragIndex: any = event.dataTransfer?.getData("dragIndex");

  let temp = keepAlive[dragIndex];

  keepAlive.splice(dragIndex, 1);
  keepAlive.splice(dropIndex, 0, temp);
}
</script>

<template tag="div" class="tab">
  <transition-group>
    <el-tag
      v-for="(item, index) in keepAlive"
      :key="item.name || item.path"
      :data-index="index"
      draggable="true"
      cursor="pointer"
      :type="$route.matched.find(route => route.name == item.name) ? '' : 'info'"
      :closable="keepAlive.length > 1"
      :effect="item.name == $route.name ? 'dark' : 'plain'"
      @dragstart="dragstart"
      @drop="drop($event, index)"
      @dragover.prevent=""
      @click="$router.push(item)"
      @close="
        keepAlive.splice(index, 1),
          item.name == $route.name && $router.push([...keepAlive].reverse()[0])
      "
    >
      {{ item.meta?.title || item.name }}
    </el-tag>
  </transition-group>
</template>

<style lang="less" scoped>
.tab {
  overflow: auto;
  // border: 1px solid #eee;
  padding: 0 0 3px 6px;
}

:deep(.el-tag__close) {
  vertical-align: middle;
}

.el-tag {
  margin-top: 3px;
  margin-right: 6px;
  border-radius: 0;
  transition: all 0.333s ease;
  user-select: none;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.v-leave-active {
  position: absolute;
}
</style>
