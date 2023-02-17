<script setup lang="ts">
import { useRequest } from "vue-request";
import { FormInstance } from "element-plus";
import { merge } from "@wsvaio/utils";
const {
  action,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  form: formProps = {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  dialog: dialogProps = {},
} = defineProps<{
  action: (ctx: vdialogCtx) => Promise<any>;
  dialog?: vdialogCtx["dialog"];
  form?: vdialogCtx["form"];
}>();

const elFormRef = $ref<FormInstance>();
const form = reactive<vdialogCtx["form"]>({});
const dialog = reactive<vdialogCtx["dialog"]>({});
const payload = reactive<vdialogCtx["payload"]>({
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
    async (options?: string | vdialogCtx["payload"]) => {
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
  merge(dialog, {}, { del: true });
  merge(payload, { $show: false, $name: "", $slot: "" }, { del: true });
  elFormRef?.clearValidate();
};

const ctx = reactive({ dialog, form, act: runAsync, payload, close, loading });
onMounted(() => elFormRef && (ctx.elFormRef = elFormRef));
watchEffect(() => (ctx.loading = loading));
defineExpose(ctx);
</script>

<template>
  <el-form ref="elFormRef" label-position="top" :model="payload" :="{ ...formProps, ...form }">
    <el-dialog
      v-model="payload.$show"
      :="{ ...dialogProps, ...dialog }"
      :before-close="(done) => loading || done()"
      @closed="close"
    >
      <template #header>
        <slot :name="`${payload.$slot}-header`" :="ctx">
          <span class="el-dialog__title">{{
            payload.$name || dialog.title || dialogProps.title
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
    </el-dialog>

    <slot :="ctx"></slot>
  </el-form>
</template>
