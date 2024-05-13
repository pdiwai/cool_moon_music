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
      style="width: 500px; margin-right: 30px"
    >
      <template #prefix>
        <n-icon :component="Search" />
      </template>
    </n-input>

    <a v-if="!isLogin" style="width: 300px" @click="show = true">登录/注册</a>
    <NDropdown v-else trigger="click" :options="options" @select="handleSelect">
      <img :src="avatarUrl" width="40" style="border-radius: 50%"
    /></NDropdown>

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
import {
  NMenu,
  NIcon,
  NInput,
  NModal,
  NCard,
  NDropdown,
  useMessage,
} from "naive-ui";
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
const options = [{ label: "退出登录", key: "logout" }];
const message = useMessage();
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

const handleSelect = (key: string) => {
  if (key === "logout") {
    sessionStorage.clear();
    message.success("退出登录成功");
    window.location.reload();
  }
};
</script>

<style lang="less" scoped>
.firstMenu {
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 0 120px;
  border-bottom: 1px solid #ededed;
  height: 66px;
  justify-content: space-between;
}
/deep/.n-menu {
  max-width: 1640px;
  min-width: 1180px;
  font-size: 16px;
  margin-left: 8vw;
  // .n-menu-item-content {
  //   margin-left: 20%;
  // }
}

/deep/.n-menu.n-menu--horizontal
  .n-menu-item-content
  .n-menu-item-content-header {
  margin-top: -5px;
  a {
    font-weight: 600;
    font-size: 27px;
  }
}
</style>
