<script setup name="type" lang="ts">
import { merge } from "@wsvaio/utils";
const vtableRef = $ref<vtableCtx>();
const vdialogRef = $ref<vdialogCtx>();
const action = async ({ payload, close }: vdialogCtx) => {
  await vdialogRef?.elFormRef?.validate();
  const { checkList, refresh } = $(vtableRef);
  const name = payload.$name;
  if (name == "批量删除") {
    if (checkList.length == 0) return ElNotification.warning("请选择删除项");
    await delType({ query: { id: checkList.map((item) => item.id) }, success: "删除成功" });
  } else if (name == "添加") {
    await postType({ body: payload, success: "添加成功" });
  } else if (name == "详情") {
    await putType({ body: payload, success: "修改成功" });
  } else {
    // return;
  }

  refresh();
  close();
};
</script>

<template>
  <vdialog
    :action="action"
    ref="vdialogRef"
    h="full"
    min="h-404px"
    :form="{ disabled: vtableRef?.loading || vdialogRef?.loading }"
  >
    <template #default="{ act, payload }">
      <vtable :data="(query) => getType({ query })" :action="action" ref="vtableRef">
        <template #header="{ params, refresh }: vtableCtx">
          <el-input
            class="!w-[auto]"
            v-model="params.key"
            :prefix-icon="ISearch"
            placeholder="搜索"
          />
          <div m="l-auto">
            <el-button type="primary" @click="refresh">查询</el-button>
            <el-button @click="merge(params, {}, { del: true }), refresh()">重置</el-button>
          </div>
        </template>
        <template #top>
          <h3 m="0">分类列表</h3>
          <el-button
            m="l-auto"
            type="primary"
            plain
            @click="merge(payload, { $name: '添加', $slot: 'add' })"
          >
            添加
          </el-button>
          <el-popconfirm #reference title="确定删除？" @confirm="act('批量删除')">
            <el-button type="danger" m="l-auto" plain :disabled="!vtableRef?.checkList.length"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
        <el-table-column type="selection" :align="'center'" />
        <el-table-column label="名称" prop="name" sortable />
        <el-table-column label="修改日期" prop="updated_at" sortable />
        <el-table-column label="创建日期" prop="created_at" sortable />
        <el-table-column label="操作" #="{ row }">
          <el-link type="primary" @click="merge(payload, { $name: '详情', $slot: 'add', ...row })"
            >详情</el-link
          >
        </el-table-column>
      </vtable>
    </template>
    <template #add="{ payload }">
      <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '名称不能为空' }]">
        <el-input v-model="payload.name" />
      </el-form-item>
    </template>
  </vdialog>
</template>

<!-- <style lang="less" scoped></style> -->
