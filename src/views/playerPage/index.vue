<template>
  <div class="playListDetail">
    <n-grid x-gap="80" :cols="4">
      <n-gi>
        <img :src="currentSong.picUrl" style="height: 320px; width: 320px" />
        <div class="introductionTitle">歌曲简介</div>
        <div style="font-size: 15px; text-align: left; width: 320px">
          测试测试
        </div>
        <n-button
          color="#ffe12c"
          text-color="black"
          round
          strong
          size="large"
          class="downloadList"
        >
          <n-icon size="25"> <DownloadOutline /> </n-icon>&nbsp;下载这首歌
        </n-button>
      </n-gi>
      <n-gi span="3">
        <div style="font-size: 30px; font-weight: 600; text-align: left">
          {{ currentSong.name }}
        </div>
        <div
          style="
            font-size: 15px;
            text-align: left;
            display: flex;
            align-items: center;
          "
        >
          <a>{{ currentSong.nickname }}</a>
        </div>
        <div style="text-align: left; margin-top: 20px">
          <n-button
            color="#ffe12c"
            text-color="black"
            size="large"
            round
            strong
          >
            <n-icon size="25"> <CaretForwardCircleOutline /> </n-icon
            >&nbsp;立即播放
          </n-button>

          <n-button size="large" round strong style="margin-left: 20px">
            <n-icon size="25"> <AddSharp /> </n-icon>&nbsp;添加
          </n-button>
          <n-button size="large" round strong style="margin-left: 20px">
            <n-icon size="25"> <HeartOutline /> </n-icon>&nbsp;收藏
          </n-button>
          <n-button size="large" round strong style="margin-left: 20px">
            <n-icon size="25"> <ShareOutline /> </n-icon>&nbsp;分享
          </n-button>
          <n-button size="large" round strong style="margin-left: 20px">
            <n-icon size="25"> <LogoTwitch /> </n-icon>&nbsp;评论
          </n-button>
        </div>
      </n-gi>
    </n-grid>
    <div style="height: 100px"></div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { NGrid, NGi, NButton, NIcon } from "naive-ui";
import {
  CaretForwardCircleOutline,
  AddSharp,
  HeartOutline,
  ShareOutline,
  LogoTwitch,
  DownloadOutline,
} from "@vicons/ionicons5";
import { SongInfo } from "../../type/currency";

const { currentRoute } = useRouter();
const currentSong = ref<SongInfo>({
  index: undefined as any,
  name: "",
  nickname: "",
  songUrl: "",
  picUrl: "",
  alName: "",
  id: 0,
});
if (currentRoute.value.query.songInfo !== null) {
  currentSong.value = JSON.parse(currentRoute.value.query.songInfo as string);
}
</script>

<style lang="less" scoped>
.playListDetail {
  padding: 40px 10vw 0 10vw;

  .introductionTitle {
    font-size: 25px;
    font-weight: 600;
    text-align: left;
    margin-top: 20px;
  }

  .downloadList {
    margin-top: 20px;
    margin-bottom: 20px;
    min-width: 150px;
    min-height: 50px;
  }
}
</style>
