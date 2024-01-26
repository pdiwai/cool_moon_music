<template>
    <div
      style="
        display: flex;
        justify-content: space-between;
        width: 100vw;
        align-items: center;
      "
    >
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
        style="width: 500px"
      >
        <template #prefix>
          <n-icon :component="Search" />
        </template>
      </n-input>
  
      <a style="width: 200px">登录/注册</a>
    </div>
  </template>
  
  <script lang="ts" setup>
  import type { MenuOption } from "naive-ui";
  import { NMenu, NIcon, NInput } from "naive-ui";
  import { Component, h, ref } from "vue";
  import { MusicalNotes, Search } from "@vicons/ionicons5";
  
  function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
  }
  const menuOptions: MenuOption[] = [
    {
      label: '酷悦音乐',
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
  </script>
  
  <style lang="less" scoped>
  /deep/.n-menu {
    font-size: 18px !important;
  }
  </style>
  