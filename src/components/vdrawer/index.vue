<script setup lang="ts">
import { useRequest } from "vue-request";
import { FormInstance } from "element-plus";
import { merge } from "@wsvaio/utils";
const {
  action,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  form: formProps = {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  drawer: drawerProps = {},
} = defineProps<{
  action: (ctx: vdrawerCtx) => Promise<any>;
  drawer?: vdrawerCtx["drawer"];
  form?: vdrawerCtx["form"];
}>();

const elFormRef = $ref<FormInstance>();
const form = reactive<vdrawerCtx["form"]>({});
const drawer = reactive<vdrawerCtx["drawer"]>({});
const payload = reactive<vdrawerCtx["payload"]>({
  $show: false,
  $name: "",
  $slot: "",
});
Object.defineProperties(payload, {
  $show: { enumerable: false },
  $name: { enumerable: false },
  $slot: { enumerable: false },
});

const { runAsync, loading } = $(
  useRequest(
    async (options?: string | vdrawerCtx["payload"]) => {
      if (typeof options == "object") {
        merge(payload, options);
      } else if (typeof options == "string") {
        payload.$name = options;
      }
      return await action(ctx);
    },
    {
      manual: true,
    },
  ),
);
watchEffect(() => (payload.$show = !!payload.$slot));

const close = () => {
  merge(form, {}, { del: true });
  merge(drawer, {}, { del: true });
  merge(payload, { $show: false, $name: "", $slot: "" }, { del: true });
  elFormRef?.clearValidate();
};

const ctx = reactive({ drawer, form, act: runAsync, payload, loading, close });
onMounted(() => elFormRef && (ctx.elFormRef = elFormRef));
watchEffect(() => (ctx.loading = loading));
defineExpose(ctx);
</script>

<template>
  <el-form ref="elFormRef" label-position="top" :model="payload" :="{ ...formProps, ...form }">
    <el-drawer
      v-model="payload.$show"
      :="{ ...drawerProps, ...drawer }"
      :before-close="(done) => loading || done()"
      @closed="close"
    >
      <template #header>
        <slot :name="`${payload.$slot}-header`" :="ctx">
          <span class="el-drawer__title">{{
            payload.$name || drawer.title || drawerProps.title
          }}</span>
        </slot>
      </template>

      <div v-loading="loading" min="h-full">
        <slot :name="payload.$slot" :="ctx"></slot>
      </div>

      <template #footer>
        <slot :name="`${payload.$slot}-footer`" :="ctx">
          <el-button @click="payload.$show = false">取消</el-button>
          <el-button type="primary" @click="runAsync()">
            <slot :name="`${payload.$slot}-submit-text`" :="ctx">确定</slot>
          </el-button>
        </slot>
      </template>
    </el-drawer>

    <slot :="ctx"></slot>
  </el-form>
</template>

<style scoped lang="less">
:deep(.el-drawer) {
  min-width: 375px;
}
</style>
