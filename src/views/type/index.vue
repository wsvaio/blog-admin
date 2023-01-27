<script setup name="varticle" lang="ts">
import { Delete, DocumentAdd, Search, Refresh } from "@element-plus/icons-vue";
import { merge, sleep, pick, filePicker } from "@wsvaio/utils";
const action = async ({ checkList, drawer, payload, refresh, close }: vtableCtx) => {
  const name = payload.$name;
  if (name == "删除") {
    if (checkList.length == 0) return ElNotification.warning("请选择删除项");
    await delType({ query: { id: checkList.map(item => item.id) }, success: "删除成功" });
  } else if (name == "添加") {
    await postType({ body: payload, success: "添加成功" });
  } else if (name == "详情") {
    await putType({ body: payload, success: "修改成功" });
  }

  refresh();
  close();
};
</script>

<template>
  <vtable :data="query => $apis.getType({ query })" :action="action">
    <template #top="{ params, act, drawer, payload }: vtableCtx">
      <el-form :disabled="false">
        <el-input v-model="params.key" :prefix-icon="Search" placeholder="搜索"></el-input>
      </el-form>

      <el-button type="info" :icon="Refresh" m="l-auto" @click="act()">刷新</el-button>
      <el-button
        type="primary"
        :icon="DocumentAdd"
        @click="(drawer.title = payload.$name = '添加'), (payload.$slot = 'add')"
      >
        添加
      </el-button>
      <el-popconfirm #reference title="您确定要删除吗？" @confirm="act('删除')">
        <el-button :icon="Delete" type="danger">删除</el-button>
      </el-popconfirm>
    </template>
    <template #="{ drawer, form, payload, act }: vtableCtx">
      <el-table-column type="selection" :align="'center'"></el-table-column>
      <el-table-column label="名称" prop="name" sortable></el-table-column>
      <el-table-column label="修改日期" prop="updated_at" sortable></el-table-column>
      <el-table-column label="创建日期" prop="created_at" sortable></el-table-column>
      <el-table-column label="操作" #="{ row }">
        <el-link
          type="primary"
          @click="
            merge(payload, row), (drawer.title = payload.$name = '详情'), (payload.$slot = 'add')
          "
          >详情</el-link
        >
      </el-table-column>
    </template>

    <template #add="{ payload, drawer }: vtableCtx">
      <el-form-item label="名称" prop="name">
        <el-input v-model="payload.name"></el-input>
      </el-form-item>
    </template>
  </vtable>
</template>

<!-- <style lang="less" scoped></style> -->
