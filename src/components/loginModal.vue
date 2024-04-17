<template>
  <div>
    <n-form :model="form" ref="formRef" :rules="rules">
      <n-form-item path="phone">
        <n-input
          placeholder="请输入手机号码"
          size="large"
          v-model:value="form.phone"
        >
          <template #prefix
            ><n-icon size="20"><PhonePortraitOutline /></n-icon
          ></template>
        </n-input>
      </n-form-item>
      <n-form-item path="password">
        <n-input
          v-model:value="form.password"
          type="password"
          size="large"
          autocomplete="off"
          show-password-on="mousedown"
          placeholder="请输入密码"
        >
          <template #prefix
            ><n-icon size="20"><KeyOutline /></n-icon
          ></template>
        </n-input>
      </n-form-item>

      <n-button
        color="#ffe200"
        text-color="#272727"
        :block="true"
        @click="submit"
      >
        登录
      </n-button>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import {
  NInput,
  NIcon,
  NButton,
  NForm,
  NFormItem,
  FormInst,
  FormRules,
} from "naive-ui";
import { PhonePortraitOutline, KeyOutline } from "@vicons/ionicons5";
import { ref } from "vue";
import { login } from "../api/login";
import { useMessage } from "naive-ui";

const message = useMessage();
const formRef = ref<FormInst | null>(null);
const emit = defineEmits(["showModal"]);
const form = ref<{ phone: string; password: string }>({
  phone: "",
  password: "",
});

const rules: FormRules = {
  phone: [
    {
      required: true,
      message: "请输入手机号",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
};

const submit = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      login(form.value.phone, form.value.password).then((res) => {
        if (res.data.code !== 200) {
          message.error(res.data.msg);
        } else {
          sessionStorage.setItem("userInfo", JSON.stringify(res.data));
          message.success("登录成功");
          emit("showModal", false);
        }
      });
    }
  });
};
</script>

<style lang="less"></style>
