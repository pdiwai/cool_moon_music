<template>
  <div
    class="audioDiv"
    id="father"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <n-button
      style="margin: 10px 0px 0px 10px"
      size="large"
      circle
      strong
      quaternary
      @click="closeLyric"
      ><n-icon size="30"> <ChevronDownSharp /></n-icon>
    </n-button>
    <n-layout
      has-sider
      style="height: 110px; width: 90vw; position: fixed"
      :style="{ marginTop: bottom === '870' ? '800px' : '' }"
    >
      <n-layout-sider style="width: 200px">
        <n-image
          v-if="currentSong.picUrl && bottom !== '870'"
          :src="currentSong.picUrl"
          :preview-disabled="true"
          width="90"
          height="90"
          style="margin: 10px 0px 0px 60px"
          @click="showLyric"
        />
      </n-layout-sider>
      <n-layout>
        <n-layout-content style="height: 50px; overflow: hidden">
          <div v-if="bottom !== '870'" class="audioDiv-text">
            {{
              currentSong.name
                ? currentSong.name +
                  "-" +
                  currentSong.alName +
                  "-" +
                  currentSong.nickname
                : "暂无播放"
            }}
          </div>
        </n-layout-content>
        <n-layout-content style="height: 50px; overflow: hidden">
          <div class="audioDiv-audio">
            <n-button
              size="large"
              circle
              strong
              quaternary
              style="margin-left: 20px; width: 36px; height: 36px"
              @click="preOrNextMusic('pre')"
            >
              <n-icon size="22"> <PlaySkipBack /></n-icon
            ></n-button>
            <n-button
              size="large"
              circle
              strong
              quaternary
              style="
                margin-left: 20px;
                border: 1.5px solid black;
                width: 36px;
                height: 36px;
              "
              @click="musicPlayOrPause"
            >
              <n-icon size="22">
                <Pause v-if="isPlay" />
                <Play v-else /> </n-icon
            ></n-button>
            <n-button
              size="large"
              circle
              strong
              quaternary
              style="margin-left: 20px; width: 36px; height: 36px"
              @click="preOrNextMusic('next')"
            >
              <n-icon size="22"> <PlaySkipForward /></n-icon
            ></n-button>

            <audio
              ref="audioRef"
              controls
              autoplay
              :src="currentSong.songUrl"
              @timeupdate="updateTime"
              @ended="preOrNextMusic('next')"
            ></audio>
            <n-button
              size="large"
              circle
              strong
              quaternary
              style="
                margin-left: 20px;
                border: 1px dashed black;
                width: 28px;
                height: 28px;
              "
              @click="
                playType =
                  playType === 'radom'
                    ? 'list'
                    : playType === 'list'
                    ? 'cycle'
                    : playType === 'cycle'
                    ? 'radom'
                    : 'cycle'
              "
            >
              <n-icon size="15">
                <ShuffleOutline v-if="playType === 'radom'" />
                <List v-if="playType === 'list'" />
                <Repeat v-if="playType === 'cycle'" />
              </n-icon>
            </n-button>
          </div>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <lyric
      style="margin-top: 50px"
      :current-song="currentSong"
      :current-time="currentTime"
    />
  </div>
</template>
<script lang="ts" setup>
import { getSongUrl } from "../api/playListDetail";
import { ref, watch } from "vue";
import { Tracks } from "../type/Recommend";
import {
  NButton,
  NIcon,
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NImage,
} from "naive-ui";
import {
  ShuffleOutline,
  List,
  Repeat,
  Play,
  Pause,
  PlaySkipForward,
  PlaySkipBack,
  ChevronDownSharp,
} from "@vicons/ionicons5";
import $ from "jquery";
import lyric from "./Lyric.vue";

const props = defineProps({
  musicList: {
    default: [],
    type: Array<Tracks>,
  },
  currentSong: {
    default: {},
    type: Object,
  },
});
const emit = defineEmits(["showIndex"]);
// 播放方式
const playType = ref<string>("list");
const currentSong = ref<{
  index: number;
  name: string;
  nickname: string;
  songUrl: string;
  picUrl: string;
  alName: string;
  id: number;
}>({
  index: 0,
  name: "",
  nickname: "",
  songUrl: "",
  picUrl: "",
  alName: "",
  id: 0,
});
const isPlay = ref<boolean>(false);
const audioRef = ref();
const currentTime = ref<string>("");
const bottom = ref<string>("0");

const preOrNextMusic = (type: string) => {
  switch (playType.value) {
    case "radom":
      currentSong.value.index = Math.floor(
        Math.random() * props.musicList.length
      );
      break;
    case "list":
    case "cycle":
      if (type === "pre") {
        currentSong.value.index =
          currentSong.value.songUrl !== ""
            ? currentSong.value.index - 1
            : currentSong.value.index;
      } else {
        currentSong.value.index =
          currentSong.value.songUrl !== ""
            ? currentSong.value.index + 1
            : currentSong.value.index;
      }
      break;
    default:
      break;
  }

  getSongUrl(props.musicList[currentSong.value.index].id).then((res) => {
    currentSong.value.songUrl = res.data.data[0].url;
  });
  currentSong.value.name = props.musicList[currentSong.value.index].name;
  currentSong.value.nickname =
    props.musicList[currentSong.value.index].ar[0].name;
  currentSong.value.picUrl = props.musicList[currentSong.value.index].al.picUrl;
  currentSong.value.alName = props.musicList[currentSong.value.index].al.name;
  currentSong.value.id = props.musicList[currentSong.value.index].id;
  isPlay.value = true;
  emit("showIndex", currentSong.value.index);
};

const musicPlayOrPause = () => {
  isPlay.value = !isPlay.value;
  if (isPlay.value) {
    if (currentSong.value.songUrl !== "") {
      emit("showIndex", currentSong.value.index);
      audioRef.value.play();
    } else {
      preOrNextMusic("next");
    }
  } else {
    audioRef.value.pause();
  }
};

const mouseEnter = () => {
  if (bottom.value === "0") {
    $("#father").stop(false, true).animate({
      bottom: "70",
    });
    bottom.value = "70";
    $("#father").on("mouseEnter", (e) => {
      if (e.target != e.currentTarget) {
        return;
      }
    });
  }
};

const mouseLeave = () => {
  if (bottom.value === "70") {
    $("#father").stop(false, true).animate({
      bottom: "0",
    });
    bottom.value = "0";
  }
};

const showLyric = () => {
  $("#father").stop(false, true).animate({
    bottom: "870",
  });
  bottom.value = "870";
};

const closeLyric = () => {
  $("#father").stop(false, true).animate({
    bottom: "0",
  });
  bottom.value = "0";
};

const updateTime = () => {
  const tempTime = audioRef.value.currentTime;
  const tempSec = (tempTime % 60).toFixed(3);
  const tempMin = Math.floor(tempTime / 60);
  currentTime.value =
    (tempMin.toString().length === 1 ? "0" : "") +
    tempMin +
    ":" +
    ((Number(tempSec) | 0).toString().length === 1 ? "0" : "") +
    tempSec;
};

watch(
  () => props.currentSong.songUrl,
  () => {
    if (props.currentSong.songUrl !== "") {
      currentSong.value.songUrl = props.currentSong.songUrl;
      currentSong.value.name = props.currentSong.name;
      currentSong.value.nickname = props.currentSong.nickname;
      currentSong.value.index = props.currentSong.index;
      currentSong.value.picUrl = props.currentSong.picUrl;
      currentSong.value.id = props.currentSong.id;
      currentSong.value.alName =
        props.musicList[currentSong.value.index].al.name;
      isPlay.value = true;
    }
  }
);
</script>

<style lang="less" scoped>
&::-webkit-media-controls-enclosure {
  background-color: transparent;
}
audio::-webkit-media-controls-play-button {
  display: none;
}
audio {
  width: 40%;
  height: 45px;
}

.audioDiv {
  width: 90%;
  height: 95%;
  z-index: 100;
  position: fixed;
  bottom: 0;
  border-radius: 5%;
  margin-bottom: -870px;
  background-color: white;
  box-shadow: 0px -2px 5px 0px rgb(201, 201, 201);
  display: flex;

  &-text {
    display: flex;
    margin-left: 30px;
    font-size: large;
  }

  &-audio {
    display: flex;
    align-items: center;
  }
}
</style>
