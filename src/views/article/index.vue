<script setup name="varticle" lang="ts">
import { merge, filePicker } from "@wsvaio/utils";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IDomEditor, IEditorConfig } from "@wangeditor/editor";
const list = useListStore();
const vtableRef = $ref<vtableCtx>();
const vdrawerRef = $ref<vdialogCtx>();
const action = async ({ drawer, payload, close, elFormRef }: vdrawerCtx) => {
  await elFormRef?.validate();
  const { checkList, refresh } = $(vtableRef);
  const name = payload.$name;
  if (name == "批量删除") {
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
    payload.tagNames = payload?.tags?.map((item) => item.name) || [];
    payload.$slot = "add";

    const article = await getArticle({ p: { id: payload.id } });
    payload.content = article.content;
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
const handleEditorCreated = (editor) => {
  editorRef = editor;
};
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => editorRef && editorRef.destroy());

const uploadArticleImage = async (ev) => {
  const target = ev.target as HTMLInputElement;
  const file = target.files![0];
  if (!file) return;
  const formData = new FormData();
  formData.append("file", file);
  const result = await upload({ body: formData });
  vdrawerRef!.payload.image = result[file.name];
};
</script>

<template>
  <vdrawer
    :action="action"
    ref="vdrawerRef"
    h="full"
    min="h-404px"
    :form="{ disabled: vtableRef?.loading || vdrawerRef?.loading }"
  >
    <template #default="{ act, drawer, payload }: vdrawerCtx">
      <vtable ref="vtableRef" :data="(query) => getArticle({ query })" :action="action">
        <template #header="{ params, refresh }: vtableCtx">
          <el-input
            class="!w-[auto]"
            v-model="params.key"
            :prefix-icon="ISearch"
            placeholder="搜索"
          />
          <el-select
            v-model="params.typeId"
            filterable
            clearable
            placeholder="分类"
            @focus="list.syncTypes()"
          >
            <el-option v-for="item in list.types" :label="item.name" :value="item.id" />
          </el-select>
          <el-select
            v-model="params.tagIds"
            filterable
            clearable
            multiple
            placeholder="标签"
            @focus="list.syncTags()"
          >
            <el-option v-for="item in list.tags" :label="item.name" :value="item.id" />
          </el-select>

          <div m="l-auto">
            <el-button type="primary" @click="refresh">查询</el-button>
            <el-button @click="merge(params, {}, { del: true }), refresh()">重置</el-button>
          </div>
        </template>
        <template #top>
          <h3 m="0">评论列表</h3>
          <el-button
            type="primary"
            m="l-auto"
            plain
            @click="(drawer.title = payload.$name = '添加'), (payload.$slot = 'add')"
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
        <el-table-column label="封面" prop="image" sortable #="{ row }">
          <el-image
            :src="row.image"
            w="!100px"
            h="!50px"
            fit="contain"
            :preview-src-list="[row.image]"
            preview-teleported
          />
        </el-table-column>
        <el-table-column label="标题" prop="title" sortable />
        <el-table-column label="描述" prop="description" sortable />
        <el-table-column label="类型" prop="type.name" sortable />
        <el-table-column label="标签" prop="tags" sortable #="{ row: { tags } }">
          <el-tag v-for="item in tags" m="4px">{{ item.name }}</el-tag>
        </el-table-column>
        <el-table-column label="点赞数" prop="good" sortable />
        <el-table-column label="观看数" prop="view" sortable />
        <el-table-column label="修改日期" prop="updated_at" sortable />
        <el-table-column label="创建日期" prop="created_at" sortable />
        <el-table-column label="操作" #="{ row }">
          <el-link type="primary" @click="merge(payload, row), act('打开详情')">详情</el-link>
        </el-table-column>
      </vtable>
    </template>

    <template #add="{ payload, drawer }: vdrawerCtx">
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
        <el-input v-model="payload.title" />
      </el-form-item>
      <el-form-item label="描述" prop="content">
        <el-input v-model="payload.description" type="textarea" :rows="5" />
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
          <el-option v-for="item in list.types" :value="item.name" :label="item.name" />
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
          <el-option v-for="item in list.tags" :value="item.name" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <div bg="[var(--bg-color)]" z="100">
          <Toolbar w="full" :editor="editorRef" un:border="1px [var(--border-color)] solid" />
          <Editor
            v-model="payload.content"
            h="!50vh"
            w="full"
            :default-config="editorConfig"
            un:border="1px t-0 [var(--border-color)] solid"
            @on-created="handleEditorCreated"
          />
        </div>
      </el-form-item>
    </template>
  </vdrawer>
</template>
