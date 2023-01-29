<script setup name="user" lang="ts">
import { Delete, Search, Refresh } from "@element-plus/icons-vue";
const action = async ({ checkList, drawer, payload, refresh, close }: vtableCtx) => {
  const name = payload.$name;
  if (name == "删除") {
    if (checkList.length == 0) return ElNotification.warning("请选择删除项");
    await Promise.all(checkList.map(({ id }) => delUser({ p: { id } })));
    ElNotification.success("删除成功");
  }
  // } else if (name == "添加") {
  //   await postTag({ body: payload, success: "添加成功" });
  // } else if (name == "详情") {
  //   await putTag({ body: payload, success: "修改成功" });
  // }

  refresh();
  close();
};
const list = listStore();
</script>

<template>
  <vtable :data="query => $apis.getUser({ query })" :action="action">
    <template #top="{ params, act, drawer, payload }: vtableCtx">
      <el-form :disabled="false">
        <el-input v-model="params.key" :prefix-icon="Search" placeholder="搜索"></el-input>
      </el-form>
      <!-- <el-select v-model="params.articleId" filterable clearable @focus="list.syncArticles">
        <el-option v-for="item in list.articles" :label="item.title" :value="item.id"></el-option>
      </el-select> -->
      <el-button type="info" :icon="Refresh" m="l-auto" @click="act()">刷新</el-button>
      <!-- <el-button
        type="primary"
        :icon="DocumentAdd"
        @click="(drawer.title = payload.$name = '添加'), (payload.$slot = 'add')"
      >
        添加
      </el-button> -->
      <el-popconfirm #reference title="您确定要删除吗？" @confirm="act('删除')">
        <el-button :icon="Delete" type="danger">删除</el-button>
      </el-popconfirm>
    </template>
    <template #="{ drawer, form, payload, act }: vtableCtx">
      <el-table-column type="selection" :align="'center'"></el-table-column>
      <el-table-column label="头像" prop="image" sortable #="{ row }">
        <el-image
          :src="row.image"
          class="w-50px h-50px"
          fit="contain"
          :preview-src-list="[row.image]"
          preview-teleported
        ></el-image>
      </el-table-column>
      <el-table-column label="名称" prop="username" sortable></el-table-column>
      <el-table-column label="邮箱" prop="email" sortable></el-table-column>
      <el-table-column label="修改日期" prop="updated_at" sortable></el-table-column>
      <el-table-column label="创建日期" prop="created_at" sortable></el-table-column>
      <!-- <el-table-column label="操作" #="{ row }">
        <el-link
          type="primary"
          @click="
            merge(payload, row), (drawer.title = payload.$name = '详情'), (payload.$slot = 'add')
          "
          >详情</el-link
        >
      </el-table-column> -->
    </template>

    <!-- <template #add="{ payload, drawer }: vtableCtx">
      <el-form-item label="名称" prop="name">
        <el-input v-model="payload.name"></el-input>
      </el-form-item>
    </template> -->
  </vtable>
</template>

<!-- <style lang="less" scoped></style> -->
