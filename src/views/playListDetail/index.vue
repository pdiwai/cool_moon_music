<template>
  <div style="width: 90vw; padding: 5vh 5% 0 5%">
    <n-grid x-gap="80" :cols="4">
      <n-gi>
        <img
          :src="neededInfo.coverImgUrl"
          style="height: 350px; width: 350px"
        />
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
          >
            <n-icon size="30">
              <CaretForwardCircleOutline /> </n-icon
            >&nbsp;&nbsp;播放全部
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
              <td>{{ item.name + "-" + item.al.name }}</td>
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
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { getPlayListDetail } from "../../api/playListDetail";
import { ref } from "vue";
import { Tracks } from "../../type/Recommend";
import { PlayListDetail } from "../../type/playListDetail";
import { NTable, NGrid, NGi, NAvatar, NButton,NIcon } from "naive-ui";
import { CaretForwardCircleOutline } from "@vicons/ionicons5";

const { currentRoute } = useRouter();
const musicList = ref<Array<Tracks>>([]);
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
    const listVo = res.data as unknown as PlayListDetail;
    musicList.value = listVo.playlist.tracks;
    neededInfo.value.coverImgUrl = listVo.playlist.coverImgUrl;
    neededInfo.value.name = listVo.playlist.name;
    neededInfo.value.description = listVo.playlist.description;
    neededInfo.value.identityIconUrl = listVo.playlist.creator.avatarUrl;
    neededInfo.value.nickname = listVo.playlist.creator.nickname;
  });
};

getPlayDetail();
</script>