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
        ><img class="lyricImg" :src="props.currentSong.picUrl" width="85%"
      /></n-gi>
      <n-gi span="2">
        <div style="font-size: 35px; color: #2f2f2f">
          {{ currentSong.name }}
        </div>
        <div style="font-size: 20px; color: #737373">
          {{ currentSong.nickname }}
        </div>
        <div class="container">
          <p v-if="loading">歌词加载中</p>
          <p v-if="uncollectedLyric || (lyricList.length === 0 && !loading)">
            暂无歌词
          </p>
          <ul
            v-if="!loading && lyricList.length > 0"
            style="list-style-type: none"
            class="lyricRow"
          >
            <li
              v-for="(item, index) in lyricList"
              :key="index"
              :style="{ color: lineNo === index ? '#0930cf' : '' }"
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
  isPlay: {
    default: true,
    type: Boolean,
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
      // 以下判定只适用于不操控进度条的正常播放
      if (
        lyricList.value[lineNo.value + 1] &&
        lyricList.value[lineNo.value + 2] &&
        lyricList.value[lineNo.value + 1].time <= props.currentTime &&
        lyricList.value[lineNo.value + 2].time > props.currentTime
      ) {
        lineNo.value += 1;
        (
          document.querySelector(".lyricRow") as HTMLElement
        ).style.transform = `translateY(-${lineNo.value * 30}px)`;
      }
    }
  }
);

watch(
  () => props.isPlay,
  () => {
    if (!props.isPlay) {
      (
        document.querySelector(".lyricImg") as HTMLElement
      ).style.animationPlayState = "paused";
    } else {
      (
        document.querySelector(".lyricImg") as HTMLElement
      ).style.animationPlayState = "";
    }
  }
);
</script>

<style lang="less" scoped>
.lyricImg {
  border-radius: 50%;
  animation: rotate 38s linear infinite;
  box-shadow: #181818 0 0 0 2px, #111111 0 0 0 6px, #0c0c0c 0 0 0 12px,
    #1a1a1a 0 0 0 15px, #0e0d0d 0 0 0 17px, #151515 0 0 0 19px,
    #121212 0 0 0 23px, #252525 0 0 0 26px;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(90deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.container {
  height: 65vh;
  overflow: auto;
  font-size: large;
  color: #858585;
  margin-top: 30px;
}
.container ul {
  transition: 0.2s;
}
</style>
