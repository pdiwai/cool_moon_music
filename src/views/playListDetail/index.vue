<template>
  <div style="width: 90vw; padding: 5vh 5vw 0 5vw">
    <n-grid x-gap="80" :cols="4">
      <n-gi>
        <img :src="neededInfo.coverImgUrl" style="height: 40vh; width: 20vw" />
        <div
          style="
            font-size: 25px;
            font-weight: 600;
            text-align: left;
            margin-top: 20px;
          "
        >
          歌单简介
        </div>
        <div style="font-size: 15px; text-align: left">
          {{ neededInfo.description }}
        </div>
      </n-gi>
      <n-gi span="3">
        <div style="font-size: 30px; font-weight: 600; text-align: left">
          {{ neededInfo.name }}
        </div>
        <div
          style="
            font-size: 15px;
            text-align: left;
            display: flex;
            align-items: center;
          "
        >
          <n-avatar round size="small" :src="neededInfo.identityIconUrl" />
          <a>&nbsp;&nbsp;{{ neededInfo.nickname }}</a>
        </div>
        <div style="text-align: left; margin-top: 20px">
          <n-button
            color="#ffe12c"
            text-color="black"
            size="large"
            round
            strong
            @click="playAll"
          >
            <n-icon size="25"> <CaretForwardCircleOutline /> </n-icon
            >&nbsp;播放全部
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
        <n-table striped style="margin-top: 20px">
          <thead>
            <tr>
              <th>序号</th>
              <th>歌曲</th>
              <th>歌手</th>
              <th>时长</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in musicList" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>
                <a
                  :style="{
                    color: index === currentSong.index ? '' : 'black',
                  }"
                  href="#"
                  @click.prevent="clickMusic(item.id, index)"
                  >{{ item.name + "-" + item.al.name }}</a
                >
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>
                {{
                  String((item.dt / 60000) | 0) +
                  ":" +
                  String((item.dt / 1000) % 60 | 0)
                }}
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-gi>
    </n-grid>
    <!-- 播放器部分 -->
    <Player
      :music-list="musicList"
      :current-song="currentSong"
      @show-index="showIndex"
    ></Player>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { getPlayListDetail, getSongUrl } from "../../api/playListDetail";
import { ref } from "vue";
import { Tracks } from "../../type/Recommend";
import { NTable, NGrid, NGi, NAvatar, NButton, NIcon } from "naive-ui";
import {
  CaretForwardCircleOutline,
  AddSharp,
  HeartOutline,
  ShareOutline,
  LogoTwitch,
} from "@vicons/ionicons5";
import Player from "../../components/Player.vue";

const { currentRoute } = useRouter();
const musicList = ref<Array<Tracks>>([]);
const currentSong = ref<{
  index: number;
  name: string;
  nickname: string;
  songUrl: string;
  picUrl: string;
}>({
  index: 0,
  name: "",
  nickname: "",
  songUrl: "",
  picUrl: "",
});
const neededInfo = ref<{
  name: string;
  description: string;
  coverImgUrl: string;
  backgroundCoverUrl: string;
  identityIconUrl: string;
  nickname: string;
}>({
  name: "",
  description: "",
  coverImgUrl: "",
  backgroundCoverUrl: "",
  identityIconUrl: "",
  nickname: "",
});
const getPlayDetail = () => {
  getPlayListDetail(currentRoute.value.query.id as string).then((res) => {
    musicList.value = res.data.playlist.tracks;
    neededInfo.value.coverImgUrl = res.data.playlist.coverImgUrl;
    neededInfo.value.name = res.data.playlist.name;
    neededInfo.value.description = res.data.playlist.description;
    neededInfo.value.identityIconUrl = res.data.playlist.creator.avatarUrl;
    neededInfo.value.nickname = res.data.playlist.creator.nickname;
  });
};

const clickMusic = (id: number, index: number) => {
  getSongUrl(id).then((res) => {
    currentSong.value.songUrl = res.data.data[0].url;
  });
  currentSong.value.index = index;
  currentSong.value.name = musicList.value[currentSong.value.index].name;
  currentSong.value.nickname =
    musicList.value[currentSong.value.index].ar[0].name;
  currentSong.value.picUrl = musicList.value[currentSong.value.index].al.picUrl;
};

// 播放全部 从第一首开始播放
const playAll = () => {
  currentSong.value.index = 0;
  currentSong.value.name = musicList.value[currentSong.value.index].name;
  currentSong.value.nickname =
    musicList.value[currentSong.value.index].ar[0].name;
  currentSong.value.picUrl = musicList.value[currentSong.value.index].al.picUrl;
  getSongUrl(musicList.value[0].id).then((res) => {
    currentSong.value.songUrl = res.data.data[0].url;
  });
};

// 播放器组件传递的当前歌曲index
const showIndex = (index) => {
  currentSong.value.index = index;
};

getPlayDetail();
</script>

<style lang="less" scoped></style>
