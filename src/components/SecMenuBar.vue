<template>
  <div class="recommendDiv">
    <n-menu
      mode="horizontal"
      :options="menuOptions"
      responsive
      dropdown-placement="top"
      default-value="recommend"
    />
  </div>
</template>

<script lang="ts" setup>
import { MenuOption, NMenu } from "naive-ui";

const menuOptions: MenuOption[] = [
  {
    label: "推荐",
    key: "recommend",
  },
  {
    label: "排行榜",
    key: "list",
  },
  {
    label: "歌手",
    key: "singer",
  },
  {
    label: "歌单",
    key: "songList",
  },
  {
    label: "MV",
    key: "MV",
  },
];
</script>

<style lang="less" scoped>
.recommendDiv {
  /deep/.n-menu {
    font-size: 16px !important;
    padding: 10px 206px;
  }
}
</style>
