<template>
  <div>
    <n-card
      :title="props.type.name"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      卡片内容
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { NCard } from "naive-ui";

const props = defineProps({
  type: {
    default: { id: 0, name: "" },
    type: Object,
  },
});
</script>

<style lang="less" scoped>
.n-card {
  /deep/.n-card-header {
    background-color: #282828;
    height: 118px;
    .n-card-header__main {
      color: rgb(255 255 255);
    }
  }
}
</style>
