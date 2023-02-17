<script lang="ts" setup>
const { keepAlive } = $(useMainStore());

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
const tabItemRef = $ref<HTMLDivElement>();
const handleMouseWheel = (ev) => {
  if (!tabItemRef) return;
  tabItemRef.scrollTo({ left: tabItemRef.scrollLeft + ev.deltaY, behavior: "smooth" });
};
</script>

<template>
  <div class="tabs" @mousewheel.stop.prevent="handleMouseWheel" ref="tabItemRef">
    <transition-group>
      <el-tag
        v-for="(item, index) in keepAlive"
        :key="item.name || item.path"
        :data-index="index"
        draggable="true"
        cursor="pointer"
        :type="$route.matched.find((route) => route.name == item.name) ? '' : 'info'"
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
  </div>
</template>

<style lang="less" scoped>
.tabs {
  display: flex;
  flex: 1;
  padding: 0 0 0 6px;
  border-bottom: solid 1px var(--border-color);
  overflow: auto;
  width: 10vw;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-tag {
  margin-right: 6px;
  border-radius: 2px 2px 0 0;
  transition: all 0.333s ease;
  user-select: none;
  border-bottom: none;
  height: 28px;
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
