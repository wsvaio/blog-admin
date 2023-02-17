<script setup name="user" lang="ts">
import { merge } from "@wsvaio/utils";
const vtableRef = $ref<vtableCtx>();
const vdialogRef = $ref<vdialogCtx>();
const action = async ({ payload }: vdialogCtx) => {
  const { checkList, refresh } = $(vtableRef);
  const name = payload.$name;
  if (name == "批量删除") {
    if (checkList.length == 0) return ElNotification.warning("请选择删除项");
    await Promise.all(checkList.map(({ id }) => delUser({ p: { id } })));
    ElNotification.success("删除成功");
  }

  refresh();
  close();
};
</script>

<template>
  <vdialog
    :action="action"
    ref="vdialogRef"
    :form="{ disabled: vtableRef?.loading || vdialogRef?.loading }"
    h="full"
    min="h-404px"
  >
    <template #default="{ act }">
      <vtable :data="(query) => getUser({ query })" :action="action" ref="vtableRef">
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
          <h3 m="0">用户列表</h3>
          <el-popconfirm #reference title="确定删除？" @confirm="act('批量删除')">
            <el-button type="danger" m="l-auto" plain :disabled="!vtableRef?.checkList.length"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
        <el-table-column type="selection" :align="'center'" />
        <el-table-column label="头像" prop="image" sortable #="{ row }">
          <el-image
            :src="row.image"
            class="w-50px h-50px"
            fit="contain"
            :preview-src-list="[row.image]"
            preview-teleported
          />
        </el-table-column>
        <el-table-column label="名称" prop="username" sortable />
        <el-table-column label="邮箱" prop="email" sortable />
        <el-table-column label="修改日期" prop="updated_at" sortable />
        <el-table-column label="创建日期" prop="created_at" sortable />
      </vtable>
    </template>
  </vdialog>
</template>

<!-- <style lang="less" scoped></style> -->
