<template>
  <div class="recommend">
    <SecMenuBar></SecMenuBar>
    <n-carousel trigger="hover">
      <img class="carousel-img" src="../../assets/background.png" />
      <img class="carousel-img" src="../../assets/background.png" />
    </n-carousel>

    <div class="titleDiv">推荐歌单</div>
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
        <div class="cardContainer">
          <n-card
            v-for="item in playList"
            :key="item.id"
            :title="item.name"
            :hoverable="true"
            :bordered="false"
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
              <img :src="item.coverImgUrl" />
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
.recommend {
  width: 90vw;
  padding: 0 4vw 0 4vw;
}
/deep/.n-tabs .n-tabs-tab .n-tabs-tab__label {
  font-size: 15px;
}
.cardContainer {
  width: 90vw;
  overflow-x: auto;
  display: -webkit-box;
  .n-card {
    height: 380px;
    width: 280px;
    margin: 0px 10px 0px 10px;
  }
  img {
    height: 250px;
    width: 250px;
    margin: 5% 0 0 5%;
  }
}
.titleDiv {
  font-size: 26px;
  font-weight: 600;
  float: left;
  margin-top: 50px;
}
.carousel-img {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

/*滚动条高宽度*/
.cardContainer::-webkit-scrollbar{
    height:  8px;
}
/*滚动条滑块*/
.cardContainer::-webkit-scrollbar-thumb{
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgba(162, 81, 225, 0.2);
    background: #dfdfdf;
}
/*滚动条里面轨道*/
.cardContainer ::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px rgba(162, 81, 225, 0.2) inset;
 
}
/*滚动条的小边角*/
.cardContainer::-webkit-scrollbar-corner {
    background: transparent;
}
</style>
