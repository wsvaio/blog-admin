<script setup name="comment" lang="ts">
import { merge } from "@wsvaio/utils";
const vtableRef = $ref<vtableCtx>();
const vdialogRef = $ref<vdialogCtx>();
const action = async ({ payload, close }: vdialogCtx) => {
  const { checkList, refresh } = $(vtableRef);
  const name = payload.$name;
  if (name == "批量删除") {
    if (checkList.length == 0) return ElNotification.warning("请选择删除项");
    await Promise.all(checkList.map(({ id }) => delComment({ p: { id } })));
    ElNotification.success("删除成功");
  }

  refresh();
  close();
};
const list = useListStore();
</script>

<template>
  <vdialog
    :action="action"
    ref="vdialogRef"
    h="full"
    min="h-404px"
    :form="{ disabled: vtableRef?.loading || vdialogRef?.loading }"
  >
    <template #default="{ act }">
      <vtable :data="(query) => getComment({ query })" :action="action" ref="vtableRef">
        <template #header="{ params, refresh }: vtableCtx">
          <el-input
            class="!w-[auto]"
            v-model="params.key"
            :prefix-icon="ISearch"
            placeholder="搜索"
          />
          <el-select
            v-model="params.articleId"
            filterable
            clearable
            @focus="list.syncArticles"
            placeholder="选择文章"
          >
            <el-option v-for="item in list.articles" :label="item.title" :value="item.id" />
          </el-select>
          <el-select
            v-model="params.userId"
            filterable
            clearable
            @focus="list.syncUsers"
            placeholder="选择用户"
          >
            <el-option v-for="item in list.users" :label="item.username" :value="item.id" />
          </el-select>

          <div m="l-auto">
            <el-button type="primary" @click="refresh">查询</el-button>
            <el-button @click="merge(params, {}, { del: true }), refresh()">重置</el-button>
          </div>
        </template>
        <template #top>
          <h3 m="0">评论列表</h3>
          <el-popconfirm #reference title="确定删除？" @confirm="act('批量删除')">
            <el-button type="danger" m="l-auto" plain :disabled="!vtableRef?.checkList.length"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
        <el-table-column type="selection" :align="'center'" />
        <el-table-column label="用户名称" prop="user.username" sortable />
        <el-table-column label="用户邮箱" prop="user.email" sortable />
        <el-table-column label="文章名称" prop="article.title" sortable />
        <el-table-column label="评论内容" prop="content" sortable />
        <el-table-column label="修改日期" prop="updated_at" sortable />
        <el-table-column label="创建日期" prop="created_at" sortable />
      </vtable>
    </template>
  </vdialog>
</template>

<!-- <style lang="less" scoped></style> -->
