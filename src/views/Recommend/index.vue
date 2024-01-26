<template>
  <div style="width: 100vw; padding: 0 5% 0 5%">
    <n-carousel trigger="hover" style="width: 90%">
      <img class="carousel-img" src="../../assets/11.png" />
      <img class="carousel-img" src="../../assets/11.png" />
    </n-carousel>
  </div>
</template>
<script lang="ts" setup>
import { NCarousel } from "naive-ui";
</script>
<style lang="less" scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
