<template>
  <div
    class="audioDiv"
    id="father"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <n-layout has-sider style="height: 110px">
      <n-layout-sider style="width: 200px">
        <n-image
          v-if="currentSong.picUrl"
          :src="currentSong.picUrl"
          width="90"
          height="90"
          style="margin: 10px 0px 0px 60px"
        />
      </n-layout-sider>
      <n-layout>
        <n-layout-content style="height: 50px; overflow: hidden">
          <div class="audioDiv-text">
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
              @click="preMusic"
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
              @click="nextMusic"
            >
              <n-icon size="22"> <PlaySkipForward /></n-icon
            ></n-button>

            <audio
              ref="audioRef"
              controls
              autoplay
              :src="currentSong.songUrl"
              @ended="nextMusic"
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
} from "@vicons/ionicons5";
import $ from "jquery";

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
}>({
  index: 0,
  name: "",
  nickname: "",
  songUrl: "",
  picUrl: "",
  alName: "",
});
const isPlay = ref<boolean>(false);
const audioRef = ref();
const preMusic = () => {
  switch (playType.value) {
    case "radom":
      currentSong.value.index = Math.floor(
        Math.random() * props.musicList.length
      );
      getSongUrl(props.musicList[currentSong.value.index].id).then((res) => {
        currentSong.value.songUrl = res.data.data[0].url;
      });
      break;
    case "list":
      currentSong.value.index =
        currentSong.value.songUrl !== ""
          ? currentSong.value.index - 1
          : currentSong.value.index;
      getSongUrl(props.musicList[currentSong.value.index].id).then((res) => {
        currentSong.value.songUrl = res.data.data[0].url;
      });
      break;
    case "cycle":
      currentSong.value.index =
        currentSong.value.songUrl !== ""
          ? currentSong.value.index - 1
          : currentSong.value.index;
      getSongUrl(props.musicList[currentSong.value.index].id).then((res) => {
        currentSong.value.songUrl = res.data.data[0].url;
      });
      break;

    default:
      break;
  }
  emit("showIndex", currentSong.value.index);
  isPlay.value = true;
  currentSong.value.nickname =
    props.musicList[currentSong.value.index].ar[0].name;
  currentSong.value.picUrl = props.musicList[currentSong.value.index].al.picUrl;
  currentSong.value.alName = props.musicList[currentSong.value.index].al.name;
};

const nextMusic = () => {
  switch (playType.value) {
    case "radom":
      currentSong.value.index = Math.floor(
        Math.random() * props.musicList.length
      );
      getSongUrl(props.musicList[currentSong.value.index].id).then((res) => {
        currentSong.value.songUrl = res.data.data[0].url;
      });
      break;
    case "list":
      currentSong.value.index =
        currentSong.value.songUrl !== ""
          ? currentSong.value.index + 1
          : currentSong.value.index;
      getSongUrl(props.musicList[currentSong.value.index].id).then((res) => {
        currentSong.value.songUrl = res.data.data[0].url;
      });
      break;
    case "cycle":
      currentSong.value.index =
        currentSong.value.songUrl !== ""
          ? currentSong.value.index + 1
          : currentSong.value.index;
      getSongUrl(props.musicList[currentSong.value.index].id).then((res) => {
        currentSong.value.songUrl = res.data.data[0].url;
      });
      break;

    default:
      break;
  }
  emit("showIndex", currentSong.value.index);

  currentSong.value.name = props.musicList[currentSong.value.index].name;
  currentSong.value.nickname =
    props.musicList[currentSong.value.index].ar[0].name;
  currentSong.value.picUrl = props.musicList[currentSong.value.index].al.picUrl;
  currentSong.value.alName = props.musicList[currentSong.value.index].al.name;
  isPlay.value = true;
};

const musicPlayOrPause = () => {
  isPlay.value = !isPlay.value;
  if (isPlay.value) {
    if (currentSong.value.songUrl !== "") {
      emit("showIndex", currentSong.value.index);
      audioRef.value.play();
    } else {
      nextMusic();
    }
  } else {
    audioRef.value.pause();
  }
};

const mouseEnter = () => {
  $("#father").stop(false, true).animate({
    bottom: "70",
  });
  $("#father").on("mouseEnter", (e) => {
    if (e.target != e.currentTarget) {
      return;
    }
  });
};

const mouseLeave = () => {
  $("#father").stop(false, true).animate({
    bottom: "0",
  });
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
  z-index: 100;
  position: fixed;
  bottom: 0;
  border-radius: 5%;
  margin-bottom: -70px;
  box-shadow: 0px -2px 5px 0px rgb(201, 201, 201);

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
