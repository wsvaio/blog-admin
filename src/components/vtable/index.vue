<script setup lang="ts">
import { usePagination } from "vue-request";
import { PaginationProps, TableProps } from "element-plus";
// import { debounce } from "@wsvaio/utils";
const { data: tableData } = defineProps<{
  data: (
    params: Record<any, any>,
  ) => Promise<{ count: number; items: Record<any, any>[] } & Record<any, any>>;
  pagination?: Partial<PaginationProps>;
  table?: Partial<TableProps<Record<any, any>>>;
}>();

const checkList = reactive<Record<any, any>[]>([]);
const params = reactive<Record<any, any>>({});
// watch(
//   params,
//   debounce(() => refresh(), 500),
// );
const { refresh, data, loading, pageSize, total, current } = $(
  usePagination((data) => tableData({ ...data, ...params }), {}),
);

const ctx = reactive({ checkList, params, refresh, loading });
watchEffect(() => (ctx.loading = loading));
defineExpose(ctx);
</script>

<template>
  <div class="vtable">
    <div v-if="$slots.aside" class="vtable-aside">
      <slot name="aside" :="ctx"></slot>
    </div>
    <div
      v-if="$slots.header"
      class="vtable-header"
      :style="{
        'grid-column': `span ${$slots.aside ? 1 : 2}`,
      }"
    >
      <slot name="header" :="ctx"></slot>
    </div>
    <div
      class="vtable-main"
      :style="{
        'grid-column': `span ${$slots.aside ? 1 : 2}`,
        'grid-row': `span ${$slots.header ? 1 : 2}`,
      }"
    >
      <div v-if="$slots.top" class="vtable-top">
        <slot name="top" :="ctx"></slot>
      </div>

      <el-table
        v-loading="loading"
        :data="(data && data['items']) || []"
        table-layout="auto"
        :="{ ...$attrs, ...$props.table }"
        :border="true"
        @selection-change="
          (list) => {
            checkList.length = 0;
            checkList.push(...list);
          }
        "
      >
        <slot :="ctx"></slot>
        <template #append>
          <slot name="bottom" :="ctx"></slot>
        </template>
        <template #empty>
          <slot name="empty" :="ctx"><el-empty description="暂无数据" /></slot>
        </template>
      </el-table>

      <el-pagination
        v-model:currentPage="current"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 1000]"
        layout="sizes, total, ->, prev, pager, next, jumper, slot"
        :="$props.pagination"
        background
      />
    </div>
  </div>
</template>

<style lang="less">
.vtable {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content 1fr;
  gap: 12px;
  max-height: 100%;

  .vtable-header,
  .vtable-main,
  .vtable-aside {
    @apply shadow-sm;
    background-color: var(--bg-color);
    padding: 20px;
    border-radius: 2px;
  }

  .vtable-aside {
    grid-row: span 2;
  }

  .vtable-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    // display: grid;
    // grid-template-columns: repeat(auto-fill, 200px);
    gap: 12px;
    overflow: auto;
  }

  .vtable-main {
    overflow: auto;
    display: flex;
    flex-direction: column;

    .vtable-top {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 12px;
      flex: none;
      align-items: center;
      overflow: auto;
    }

    .el-table {
      thead {
        position: sticky;
        top: 0;
        z-index: 2;
      }
    }

    .el-pagination {
      overflow: auto;
      margin-top: 12px;
      flex: none;
    }
  }
}
</style>
