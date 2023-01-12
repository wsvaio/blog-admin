<script setup name="varticle" lang="ts">
import { Delete, DocumentAdd, Search, Refresh } from "@element-plus/icons-vue";
import { merge, sleep, pick, filePicker } from "@wsvaio/utils";
const action = async ({ checkList, drawer, payload, refresh, close }: vtableCtx) => {
  const name = payload.$name;
  if (name == "删除") {
    if (checkList.length == 0) return ElNotification.warning("请选择删除项");
    await delArticle({ query: { id: checkList.map(item => item.id) }, success: "删除成功" });
  } else if (name == "添加") {
    await postArticle({ body: payload, success: "添加成功" });
  } else if (name == "详情") {
    await putArticle({ body: payload, success: "修改成功" });
  } else if (name == "上传") {
    filePicker({
      accept: "image/*",
      multiple: false,
      onchange(ev) {
        const target = ev.target as HTMLInputElement;
        const file = target.files![0];
        if (!file) return;
        const formData = new FormData();
        formData.set("file", file);
        formData.set("jbok", "kobj");
        upload({ body: formData });
      },
    });
  }

  refresh();
  close();
};
</script>

<template>
  <vtable :data="query => $apis.getArticle({ query })" :action="action">
    <template #top="{ params, act, drawer, payload }: vtableCtx">
      <el-form :disabled="false">
        <el-input v-model="params.key" :prefix-icon="Search" placeholder="搜索"></el-input>
      </el-form>

      <el-button type="info" :icon="Refresh" m="l-auto" @click="act()">刷新</el-button>
      <el-button @click="act('上传')">上传</el-button>
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
      <el-table-column label="标题" prop="title" sortable></el-table-column>
      <el-table-column label="内容" prop="content" sortable #="{ row }">
        <pre>{{ row.content }}</pre>
      </el-table-column>
      <el-table-column label="创建日期" prop="created_at" sortable></el-table-column>
      <el-table-column label="修改日期" prop="updated_at" sortable></el-table-column>
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
      <el-form-item label="标题" prop="content">
        <el-input v-model="payload.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="payload.content" rows="10" type="textarea"></el-input>
      </el-form-item>
    </template>
  </vtable>
</template>

<!-- <style lang="less" scoped></style> -->
