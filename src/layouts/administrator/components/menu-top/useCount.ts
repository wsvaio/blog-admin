import { Ref } from "vue";

export default (el: Ref<HTMLElement | undefined>) => {
  let count = $ref(0);
  const handleResize = () => {
    if (!el.value) return;
    count = Math.floor(el.value.clientWidth / 150);
  };
  onMounted(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  });
  onBeforeUnmount(() => {
    window.removeEventListener("reset", handleResize);
  });

  const { layout } = $(useMainStore());
  watch($$(layout), () => nextTick(handleResize));
  return $$({ count });
};
