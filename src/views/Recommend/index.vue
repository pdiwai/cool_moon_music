<template>
  <div style="width: 100vw; padding: 0 5% 0 5%">
    <n-carousel trigger="hover" style="width: 90%">
      <img class="carousel-img" src="../../assets/11.png" />
      <img class="carousel-img" src="../../assets/11.png" />
    </n-carousel>

    <h2 style="float: left">推荐歌单</h2>
    <n-tabs type="line" animated default-value="华语">
      <n-tab-pane
        v-for="item in hotTypeList"
        :key="item.id"
        :name="item.name"
        :tab="item.name"
      >
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script lang="ts" setup>
import { NCarousel, NTabs, NTabPane } from "naive-ui";
import { getHotlist } from "../../api/Recommend";
import { Hotlist } from "../../type/Recommend";
import { ref } from "vue";
import { ListVo } from "../../type/currency";

const hotTypeList = ref<Array<Hotlist>>([]);
const getHotTypeList = () => {
  getHotlist().then((res) => {
    const listVo = res.data as unknown as ListVo<Hotlist>;
    hotTypeList.value = listVo.tags;
  });
};

getHotTypeList();
</script>
<style lang="less" scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
