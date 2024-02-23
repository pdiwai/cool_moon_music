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
          <p v-if="uncollectedLyric">暂无歌词</p>
          <ul v-else style="list-style-type: none">
            <li
              v-for="(item, index) in lyricAndPersonList"
              :key="index"
              :style="{ color: lineNo === index ? 'red' : '' }"
            >
              {{ index === 0 && item.lyric === "" ? item.time : item.lyric }}
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
const lyricAndPersonList = ref<Array<{ time: string; lyric: string }>>([]);
const lyricList = ref<Array<{ time: string; lyric: string }>>([]);
const lineNo = ref<number>(0);

const getLyrucInfo = () => {
  getLyric(props.currentSong.id).then((res) => {
    uncollectedLyric.value = res.data.uncollected;
    if (res.data.tlyric) {
      const tempLyticList = res.data.tlyric.lyric.split("\n");
      tempLyticList.forEach((item) => {
        const tempVo = item.split("]");
        if (tempVo.length > 0) {
          const lyticItem = {
            time: tempVo[0].slice(1),
            lyric: tempVo[1],
          };
          lyricAndPersonList.value.push(lyticItem);
        }
      });
      lyricList.value = lyricAndPersonList.value.slice(1);
    }
  });
};
getLyrucInfo();

watch(
  () => props.currentSong.songUrl,
  () => {
    if (props.currentSong.songUrl !== "") {
      getLyrucInfo();
    }
  }
);

watch(
  () => props.currentTime,
  async () => {
    if (props.currentTime !== "") {
      if (
        lyricList.value[lineNo.value] &&
        lyricList.value[lineNo.value + 1] &&
        lyricList.value[lineNo.value].time <= props.currentTime &&
        lyricList.value[lineNo.value + 1].time > props.currentTime
      ) {
        lineNo.value += 1;
      }
    }
  }
);
</script>
