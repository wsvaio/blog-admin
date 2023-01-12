<script lang="ts" setup>
import { useRequest } from "vue-request";
import { Key, User } from "@element-plus/icons-vue";
import { FormInstance } from "element-plus";
const router = useRouter();

const loginFormRef = $ref<FormInstance>();
const form = reactive<Record<string, any>>({});

const rules = {
  username: [{ required: true, message: "账号不能为空", trigger: "blur" }],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 1, max: 16, message: "密码长度为1-16位", trigger: "blur" },
  ],
};

const { runAsync, loading } = $(
  useRequest(
    async () => {
      await loginFormRef?.validate();

      // login
      // router.push({ name: "home" });
    },
    {
      manual: true,
    }
  )
);

const toggle = () => {
  const elForm = document.querySelector(".el-form");
  elForm?.scrollTo({
    behavior: "smooth",
    left: elForm?.scrollLeft ? 0 : elForm.scrollWidth,
  });
};
onMounted(() => {
  const elForm = document.querySelector(".el-form");
  elForm?.scrollTo({
    left: elForm.scrollWidth,
  });
});
</script>

<template>
  <el-form
    ref="loginFormRef"
    v-loading="loading"
    size="large"
    :model="form"
    :rules="rules"
    label-position="top"
    :disabled="loading"
  >
    <div class="register">
      <el-link @click="toggle">登录</el-link>
    </div>
    <div class="mask">
      <div>logo</div>
      <div>后台管理系统</div>
    </div>
    <div class="sign">
      <div text="[#337ecc] 24px" font="bold">欢迎登录</div>
      <el-form-item class="mt-25px" label="账号" prop="username">
        <el-input
          v-model.trim="form.username"
          :prefix-icon="User"
          maxlength="32"
          placeholder="请输入账号"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item prop="password" label="密码">
        <el-input
          v-model.trim="form.password"
          :prefix-icon="Key"
          maxlength="16"
          show-password
          placeholder="请输入密码"
          clearable
          @keyup.enter.exact="runAsync"
        ></el-input>
      </el-form-item>
      <el-form-item size="default">
        <div flex="~" justify="between" w="full">
          <el-checkbox v-model="form.persist"> 记住我 </el-checkbox>
          <el-link type="primary" @click="toggle">注册</el-link>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" w="full" :loading="form.loading" @click="runAsync">
          登 录
        </el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<style lang="less" scoped>
.el-form {
  @apply flex;

  scroll-snap-type: x mandatory;
  overflow: auto;
  width: 100vw;
  height: 100vh;

  // @media (max-width: 576PX) {
  //   width: 80%;
  // }

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  & > * {
    @apply flex-none w-[50%] p-75px;

    display: flex;
    overflow: auto;
    background: rgb(255 255 255 / 80%);
    scroll-snap-align: start;
    backdrop-filter: blur(6px);
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 576px) {
      padding: 50px;
      width: 100%;
    }
  }

  // .register {
  // }

  .mask {
    padding: 24px;
    font-size: 24px;
    line-height: 1;
    color: white;
    background: url("@/assets/notFound/12.svg") center / cover no-repeat;
    background-color: #353e54;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;

    @media (max-width: 576px) {
      // display: none;
    }
  }

  .sign {
    // align-items: stretch;
    & > * {
      width: 100%;
      max-width: 450px;
    }
  }
}
</style>
