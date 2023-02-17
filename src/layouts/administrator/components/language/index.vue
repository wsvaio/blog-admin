<script setup lang="ts">
let { locale, availableLocales } = $(useI18n());
const handleCommand = (item) => {
  locale = item;
};
</script>

<template>
  <el-dropdown class="hover" @command="handleCommand">
    <div><i-heroicons:language-20-solid /></div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in availableLocales" :command="item">
          <span
            :style="{
              color: item === locale ? 'var(--primary-color)' : 'inherit',
            }"
            >{{ item }}</span
          >
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
