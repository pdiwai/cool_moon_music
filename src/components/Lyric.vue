<template>
  <div
    style="
      background-color: rgba(255, 255, 255, 0.944);
      width: 90vw;
      height: 90vh;
      border-radius: 1%;
    "
  >
    <n-grid :cols="3">
      <n-gi
        ><img
          :src="props.currentSong.picUrl"
          width="80%"
          style="border-radius: 50%"
      /></n-gi>
      <n-gi span="2">
        <div style="height: 80vh; overflow: auto">
          <p v-if="uncollectedLyric && !loading">暂无歌词</p>
          <p v-if="loading">歌词加载中</p>
          <ul v-else style="list-style-type: none">
            <li
              v-for="(item, index) in lyricList"
              :key="index"
              :style="{ color: lineNo === index ? 'red' : '' }"
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
      await getLyrucInfo();
    }
  }
);

watch(
  () => props.currentTime,
  () => {
    if (props.currentTime !== "") {
      // 这样写只能判断歌曲刚开始时，就打开歌词窗口的情况
      if (
        lyricList.value[lineNo.value + 1] &&
        lyricList.value[lineNo.value + 2] &&
        lyricList.value[lineNo.value + 1].time <= props.currentTime &&
        lyricList.value[lineNo.value + 2].time > props.currentTime
      ) {
        lineNo.value += 1;
      }
    }
  }
);
</script>
