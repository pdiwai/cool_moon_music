<template>
  <div class="firstMenu">
    <n-menu
      mode="horizontal"
      :options="menuOptions"
      responsive
      dropdown-placement="top"
    />

    <n-input
      v-model:value="value"
      type="text"
      placeholder="搜索音乐/MV/歌单/歌手"
      style="width: 450px; margin-right: 20px"
    >
      <template #prefix>
        <n-icon :component="Search" />
      </template>
    </n-input>

    <a
      v-if="!isLogin"
      style="width: 200px; margin-right: 5%"
      @click="show = true"
      >登录/注册</a
    >
    <img
      v-else
      :src="avatarUrl"
      width="40"
      style="border-radius: 50%; margin-right: 5%"
    />

    <n-modal
      v-model:show="show"
      :mask-closable="false"
      preset="card"
      title="快捷登录"
      style="width: 550px"
    >
      <n-card
        style="width: 500px"
        size="huge"
        :bordered="false"
        role="dialog"
        aria-modal="true"
      >
        <n-message-provider>
          <loginModal @show-modal="closeModal"></loginModal>
        </n-message-provider>
      </n-card>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import type { MenuOption } from "naive-ui";
import { NMenu, NIcon, NInput, NModal, NCard } from "naive-ui";
import { Component, h, ref } from "vue";
import { MusicalNotes, Search } from "@vicons/ionicons5";
import { RouterLink } from "vue-router";
import loginModal from "./loginModal.vue";
import { NMessageProvider } from "naive-ui";
import { PlayListDetail } from "../type/login";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/recommend",
          },
        },
        { default: () => "酷悦音乐" }
      ),
    key: "index",
    icon: renderIcon(MusicalNotes),
  },
  {
    label: "发现音乐",
    key: "findMusic",
  },
  {
    label: "音乐现场",
    key: "musicLive",
  },
  {
    label: "更多",
    key: "more",
    children: [
      {
        label: "酷悦音乐人",
        key: "musicMan",
      },
      {
        label: "酷悦畅听",
        key: "freeListen",
      },
    ],
  },
];
const value = ref<string>("");
const show = ref<boolean>(false);
const isLogin = ref<boolean>(false);
const avatarUrl = ref<string>("");
if (sessionStorage.getItem("userInfo")) {
  isLogin.value = true;
  const tempUserInfo = JSON.parse(
    sessionStorage.getItem("userInfo") as string
  ) as unknown as PlayListDetail;
  avatarUrl.value = tempUserInfo.profile.avatarUrl;
}
const closeModal = () => {
  show.value = false;
};
</script>

<style lang="less" scoped>
.firstMenu {
  display: flex;
  align-items: center;
  max-width: 100vw;
  border-bottom: 1px solid #ededed;
  height: 66px;
}
/deep/.n-menu {
  font-size: 19px !important;
  .n-menu-item-content {
    margin-left: 20%;
  }
}

/deep/.n-menu.n-menu--horizontal
  .n-menu-item-content
  .n-menu-item-content-header {
  margin-top: -5px;
  a {
    font-weight: 600;
    font-size: 28px;
  }
}
</style>
