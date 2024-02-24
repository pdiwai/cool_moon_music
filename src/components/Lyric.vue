<template>
  <div
    style="
      background-color: rgb(255, 255, 255);
      color: #000;
      width: 90vw;
      height: 90vh;
      border-radius: 1%;
    "
  >
    <n-grid :cols="3" style="align-items: center">
      <n-gi
        ><img
          :src="props.currentSong.picUrl"
          width="90%"
          style="border-radius: 50%"
      /></n-gi>
      <n-gi span="2">
        <div style="font-size: 35px; color: #2f2f2f">
          {{ currentSong.name }}
        </div>
        <div style="font-size: 20px; color: #737373">
          {{ currentSong.nickname }}
        </div>
        <div
          style="
            height: 65vh;
            overflow: auto;
            font-size: large;
            color: #858585;
            margin-top: 30px;
          "
        >
          <p v-if="loading">歌词加载中</p>
          <p v-if="uncollectedLyric || (loading && lyricList.length === 0)">
            暂无歌词
          </p>
          <ul
            v-if="!loading && lyricList.length > 0"
            style="list-style-type: none"
          >
            <li
              v-for="(item, index) in lyricList"
              :key="index"
              :style="{ color: lineNo === index ? 'red' : '' }"
              style="margin-bottom: 10px"
            >
              {{ item.lyric }}
            </li>
          </ul>
        </div>
      </n-gi>
    </n-grid>
  </div>
</template>
<script lang="ts" setup>
import { NGrid, NGi } from "naive-ui";
import { getLyric } from "../api/playListDetail";
import { ref, watch } from "vue";

const props = defineProps({
  currentSong: {
    default: {},
    type: Object,
  },
  currentTime: {
    default: "",
    type: String,
  },
});

const uncollectedLyric = ref<boolean>(false);
const lyricList = ref<Array<{ time: string; lyric: string }>>([]);
const lineNo = ref<number>(-1);
const loading = ref<boolean>(false);

const getLyrucInfo = () => {
  loading.value = true;
  getLyric(props.currentSong.id)
    .then((res) => {
      uncollectedLyric.value = res.data.uncollected;
      if (res.data.tlyric) {
        const tempLyticList = res.data.tlyric.lyric.split("\n");
        tempLyticList.slice(1).forEach((item) => {
          const tempVo = item.split("]");
          if (tempVo.length > 0) {
            const lyticItem = {
              time: tempVo[0].slice(1),
              lyric: tempVo[1],
            };
            lyricList.value.push(lyticItem);
          }
        });
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
getLyrucInfo();

watch(
  () => props.currentSong.songUrl,
  async () => {
    if (props.currentSong.songUrl !== "") {
      lyricList.value = [];
      lineNo.value = -1;
      await getLyrucInfo();
    }
  }
);

watch(
  () => props.currentTime,
  () => {
    if (props.currentTime !== "") {
      if (
        lyricList.value[lineNo.value + 1] &&
        lyricList.value[lineNo.value + 2] &&
        lyricList.value[lineNo.value + 1].time <= props.currentTime &&
        lyricList.value[lineNo.value + 2].time > props.currentTime
      ) {
        console.log(
          lyricList.value[lineNo.value + 1].time,
          props.currentTime,
          lyricList.value[lineNo.value + 2].time
        );
        lineNo.value += 1;
      }
    }
  }
);
</script>
