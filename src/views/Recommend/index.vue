<template>
  <div style="width: 90vw; padding: 0 5vw 0 5vw">
    <SecMenuBar></SecMenuBar>
    <n-carousel trigger="hover" style="width: 100%">
      <img class="carousel-img" src="../../assets/background.png" />
      <img class="carousel-img" src="../../assets/background.png" />
    </n-carousel>

    <h2 style="float: left">推荐歌单</h2>
    <n-tabs
      type="line"
      animated
      v-model:value="currentTab"
      @update:value="changeTab"
    >
      <n-tab-pane
        v-for="item in hotTypeList"
        :key="item.id"
        :name="item.name"
        :tab="item.name"
      >
        <div style="width: 90vw; overflow-x: auto; display: -webkit-box">
          <n-card
            v-for="item in playList"
            :key="item.id"
            :title="item.name"
            :hoverable="true"
            :bordered="false"
            style="height: 380px; width: 280px; margin: 0px 10px 0px 10px"
            @click="
              () => {
                $router.push({
                  path: '/playListDetail',
                  query: { id: item.id },
                });
              }
            "
          >
            <template #cover>
              <img
                :src="item.coverImgUrl"
                style="
                  height: 250px;
                  width: 250px;
                  margin-left: 5%;
                  margin-top: 5%;
                "
              />
            </template>
          </n-card>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script lang="ts" setup>
import { NCarousel, NTabs, NTabPane, NCard } from "naive-ui";
import { getHotList, getPlayList } from "../../api/Recommend";
import { Hotlist, Playlists } from "../../type/Recommend";
import { ref } from "vue";
import SecMenuBar from "../../components/SecMenuBar.vue";

const hotTypeList = ref<Array<Hotlist>>([]);
const playList = ref<Array<Playlists>>([]);
const currentTab = ref<string>("华语");
const getHotTypeList = () => {
  getHotList().then((res) => {
    hotTypeList.value = res.data.tags;
    currentTab.value = hotTypeList.value[0].name;
  });
};

const getPlay = () => {
  getPlayList(currentTab.value).then((res) => {
    playList.value = res.data.playlists;
  });
};

const changeTab = () => {
  getPlay();
};

const init = async () => {
  await getHotTypeList();
  await getPlay();
};
init();
</script>
<style lang="less" scoped>
.carousel-img {
  width: 100%;
  height: 350px;
  object-fit: cover;
}
</style>
