<script lang="ts">
export default {
  setup(props, ctx) {
    console.log("setup", arguments);
    const attrs = useAttrs();

    onBeforeMount(() => console.log("beforeMount"));
    onMounted(() => console.log("mounted"));

    onBeforeUpdate(() => console.log("beforeUpdate"));
    onUpdated(() => console.log("updated"));

    onBeforeUnmount(() => console.log("beforeUnmount"));
    onUnmounted(() => console.log("unmounted"));

    onActivated(() => console.log("activated"));
    onDeactivated(() => console.log("deactivated"));

    onRenderTracked(() => console.log("renderTracked"));
    onRenderTriggered(() => console.log("renderTriggered", attrs));

    onErrorCaptured(() => console.log("errorCaptured"));

    return { attrs };
  },
  created() {
    console.log("craeted", this);
  },
};
</script>

<template>
  <button @click="$emit('update:modelValue', Number($attrs.modelValue) + 1)">
    {{ $attrs.modelValue }}
    {{ attrs }}
  </button>
</template>

<!-- <style lang="less" scoped></style> -->
