<script setup name="varticle" lang="ts">
import { Delete, DocumentAdd, Search, Refresh } from "@element-plus/icons-vue";
import { merge, filePicker } from "@wsvaio/utils";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IDomEditor, IEditorConfig } from "@wangeditor/editor";
const list = listStore();
const action = async ({ checkList, drawer, payload, refresh, close }: vtableCtx) => {
  const name = payload.$name;
  if (name == "删除") {
    if (checkList.length == 0) return ElNotification.warning("请选择删除项");
    await Promise.all(checkList.map(({ id }) => delArticle({ p: { id } })));
    ElNotification.success("删除成功");
  } else if (name == "添加") {
    await postArticle({ body: payload, success: "添加成功" });
  } else if (name == "详情") {
    await putArticle({ body: payload, success: "修改成功" });
  } else if (name == "打开详情") {
    drawer.title = payload.$name = "详情";
    payload.typeName = payload.type.name;
    payload.tagNames = payload?.tags?.map(item => item.name) || [];
    payload.$slot = "add";
    return;
  }

  refresh();
  close();
};

let editorRef = $shallowRef<IDomEditor>();

const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {
    uploadImage: {
      // 自定义上传
      async customUpload(file: File, insertFn) {
        const formData = new FormData();
        formData.append("file", file);
        const result = await upload({ body: formData });
        insertFn(`${result[file.name]}`);
      },
    },
    uploadVideo: {
      // 自定义上传
      async customUpload(file: File, insertFn) {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        const result = await upload({ body: formData });
        insertFn(result[file.name]);
      },
    },
  },
};
const handleEditorCreated = editor => {
  editorRef = editor;
};
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => editorRef && editorRef.destroy());
const vtableRef = $ref<vtableCtx>();
const uploadArticleImage = async ev => {
  const target = ev.target as HTMLInputElement;
  const file = target.files![0];
  if (!file) return;
  const formData = new FormData();
  formData.append("file", file);
  const result = await upload({ body: formData });
  vtableRef!.payload.image = result[file.name];
};
</script>

<template>
  <vtable ref="vtableRef" :data="query => $apis.getArticle({ query })" :action="action">
    <template #top="{ params, act, drawer, payload }: vtableCtx">
      <el-form :disabled="false">
        <el-input v-model="params.key" :prefix-icon="Search" placeholder="搜索"></el-input>
      </el-form>
      <el-select
        v-model="params.typeId"
        filterable
        clearable
        placeholder="分类"
        @focus="list.syncTypes()"
      >
        <el-option v-for="item in list.types" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select
        v-model="params.tagIds"
        filterable
        clearable
        multiple
        placeholder="标签"
        @focus="list.syncTags()"
      >
        <el-option v-for="item in list.tags" :label="item.name" :value="item.id"></el-option>
      </el-select>

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
      <el-table-column label="封面" prop="image" sortable #="{ row }">
        <el-image
          :src="row.image"
          w="!100px"
          h="!50px"
          fit="contain"
          :preview-src-list="[row.image]"
          preview-teleported
        ></el-image>
      </el-table-column>
      <el-table-column label="标题" prop="title" sortable></el-table-column>
      <el-table-column label="描述" prop="description" sortable></el-table-column>
      <el-table-column label="类型" prop="type.name" sortable></el-table-column>
      <el-table-column label="标签" prop="tags" sortable #="{ row: { tags } }">
        <el-tag v-for="item in tags" m="4px">{{ item.name }}</el-tag>
      </el-table-column>
      <el-table-column label="点赞数" prop="good" sortable></el-table-column>
      <el-table-column label="观看数" prop="view" sortable></el-table-column>
      <el-table-column label="修改日期" prop="updated_at" sortable></el-table-column>
      <el-table-column label="创建日期" prop="created_at" sortable></el-table-column>
      <el-table-column label="操作" #="{ row }">
        <el-link type="primary" @click="merge(payload, row), act('打开详情')">详情</el-link>
      </el-table-column>
    </template>

    <template #add="{ payload, drawer }: vtableCtx">
      {{
        merge(drawer, {
          size: "50%",
        }) && ""
      }}
      <el-form-item label="封面" prop="image">
        <div
          w="full"
          @click="
            filePicker({
              accept: 'image/*',
              onchange: uploadArticleImage,
            })
          "
        >
          <img
            v-if="payload.image"
            :src="payload.image"
            w="full"
            h="200px"
            object="contain"
            un:align="middle"
            @error="payload.image = ''"
          />
          <el-button v-else w="full" h="!200px">+</el-button>
        </div>
      </el-form-item>
      <el-form-item label="标题" prop="content">
        <el-input v-model="payload.title"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="content">
        <el-input v-model="payload.description" type="textarea" :rows="5"></el-input>
      </el-form-item>

      <el-form-item label="类型" prop="typeName">
        <el-select
          v-model="payload.typeName"
          w="full"
          clearable
          filterable
          allow-create
          @focus="list.syncTypes()"
        >
          <el-option v-for="item in list.types" :value="item.name" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="tagNames">
        <el-select
          v-model="payload.tagNames"
          multiple
          filterable
          allow-create
          w="full"
          @focus="list.syncTags()"
        >
          <el-option v-for="item in list.tags" :value="item.name" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <div bg="[var(--el-bg-color)]" z="100">
          <Toolbar w="full" :editor="editorRef" un:border="1px #ccc" />
          <Editor
            v-model="payload.content"
            h="!50vh"
            w="full"
            :default-config="editorConfig"
            un:border="1px t-0 #ccc"
            @on-created="handleEditorCreated"
          />
        </div>
      </el-form-item>
    </template>
  </vtable>
</template>

<!-- <style lang="less" scoped></style> -->
