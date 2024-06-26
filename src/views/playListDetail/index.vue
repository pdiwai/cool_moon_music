<template>
  <div class="playListDetail">
    <div class="divLeft">
      <img :src="neededInfo.coverImgUrl" style="width: 100%" />
      <div class="introductionTitle">歌单简介</div>
      <div class="description">
        {{ neededInfo.description }}
      </div>
      <n-button
        color="#ffe12c"
        text-color="black"
        round
        strong
        size="large"
        class="downloadList"
      >
        <n-icon size="25"> <DownloadOutline /> </n-icon>&nbsp;下载该歌单
      </n-button>
      <hr />
      <img src="../../assets/qrcode.jpg" style="height: 200px; width: 200px" />
      <div style="color: gray">手机扫描二维码关注公众号</div>
    </div>
    <div class="divRight">
      <div class="listName">
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
            <th>#</th>
            <th>标题</th>
            <th>专辑</th>
            <th>时长</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in musicList" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>
              <div>
                <a
                  :style="{
                    color: index === currentSong.index ? '' : 'black',
                  }"
                  href="#"
                  @click.prevent="clickMusic(item.id, index)"
                  >{{ item.name }}
                  <a
                    :style="{
                      color: index === currentSong.index ? '' : '#9c9c9c',
                    }"
                    @click.prevent="clickMusic(item.id, index)"
                  >
                    {{ item.tns ? "(" + item.tns[0] + ")" : "" }}
                  </a>
                </a>
              </div>

              <div>
                <n-space
                  size="small"
                  style="display: flex; align-items: center"
                >
                  <n-tag v-if="item.originCoverType !== 0" size="small" round>
                    VIP
                  </n-tag>
                  <n-tag v-if="item.mv !== 0" size="small" round>
                    MV
                    <n-icon size="12"><PlayCircleOutline /></n-icon>
                  </n-tag>
                  <div class="smallGrayText" v-for="(i, index) in item.ar">
                    {{ i.name + (index < item.ar.length - 1 ? "、" : "") }}
                  </div>
                </n-space>
              </div>

              <div>
                <a class="smallGrayText">{{ item.alia[0] }} </a>
              </div>
            </td>
            <td>
              <a style="color: #9c9c9c">{{ item.al.name }}</a>
            </td>
            <td>
              {{
                String((item.dt / 60000) | 0) +
                ":" +
                String((item.dt / 1000) % 60 | 0) +
                (String((item.dt / 1000) % 60 | 0).length === 1 ? "0" : "")
              }}
            </td>
          </tr>
        </tbody>
      </n-table>
    </div>
    <div style="height: 100px"></div>
  </div>

  <!-- 播放器部分 -->
  <Player
    :music-list="musicList"
    :current-song="currentSong"
    @show-index="showIndex"
  ></Player>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { getPlayListDetail, getSongUrl } from "../../api/playListDetail";
import { ref } from "vue";
import { Tracks } from "../../type/Recommend";
import { NTable, NAvatar, NButton, NIcon, NTag, NSpace } from "naive-ui";
import {
  CaretForwardCircleOutline,
  AddSharp,
  HeartOutline,
  ShareOutline,
  LogoTwitch,
  DownloadOutline,
  PlayCircleOutline,
} from "@vicons/ionicons5";
import Player from "../../components/Player.vue";
import { SongInfo } from "../../type/currency";

const { currentRoute } = useRouter();
const musicList = ref<Array<Tracks>>([]);
const currentSong = ref<SongInfo>({
  index: undefined as any,
  name: "",
  nickname: "",
  songUrl: "",
  picUrl: "",
  alName: "",
  id: 0,
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
  getPlayListDetail(Number(currentRoute.value.query.id as string)).then(
    (res) => {
      musicList.value = res.data.playlist.tracks;
      neededInfo.value.coverImgUrl = res.data.playlist.coverImgUrl;
      neededInfo.value.name = res.data.playlist.name;
      neededInfo.value.description = res.data.playlist.description;
      neededInfo.value.identityIconUrl = res.data.playlist.creator.avatarUrl;
      neededInfo.value.nickname = res.data.playlist.creator.nickname;
    }
  );
};

const clickMusic = async (id: number, index: number) => {
  currentSong.value.index = index;
  currentSong.value.name = musicList.value[currentSong.value.index].name;
  currentSong.value.nickname = "";
  musicList.value[currentSong.value.index].ar.forEach((item) => {
    currentSong.value.nickname = currentSong.value.nickname.concat(
      item.name,
      "、"
    );
  });
  currentSong.value.nickname = currentSong.value.nickname.slice(
    0,
    currentSong.value.nickname.length - 1
  );
  currentSong.value.picUrl = musicList.value[currentSong.value.index].al.picUrl;
  currentSong.value.alName = musicList.value[currentSong.value.index].al.name;
  currentSong.value.id = musicList.value[currentSong.value.index].id;
  await getSongUrl(id).then((res) => {
    currentSong.value.songUrl = res.data.data[0].url;
  });
};

// 播放全部 从第一首开始播放
const playAll = async () => {
  currentSong.value.index = 0;
  currentSong.value.name = musicList.value[currentSong.value.index].name;
  currentSong.value.nickname = "";
  musicList.value[currentSong.value.index].ar.forEach((item) => {
    currentSong.value.nickname = currentSong.value.nickname.concat(
      item.name,
      "、"
    );
  });
  currentSong.value.nickname = currentSong.value.nickname.slice(
    0,
    currentSong.value.nickname.length - 1
  );
  currentSong.value.picUrl = musicList.value[currentSong.value.index].al.picUrl;
  currentSong.value.alName = musicList.value[currentSong.value.index].al.name;
  currentSong.value.id = musicList.value[currentSong.value.index].id;
  await getSongUrl(musicList.value[0].id).then((res) => {
    currentSong.value.songUrl = res.data.data[0].url;
  });
};

// 播放器组件传递的当前歌曲index
const showIndex = (index) => {
  currentSong.value.index = index;
};

getPlayDetail();
</script>

<style lang="less" scoped>
.playListDetail {
  margin: 0 auto;
  max-width: 1640px;
  min-width: 1180px;
  padding: 0 120px;
  display: flex;
  justify-content: space-between;

  .divLeft {
    margin-top: 47px;
    width: 23%;
  }
  .divRight {
    margin-top: 63px;
    width: 70%;
  }
  .listName {
    font-size: 30px;
    font-weight: 600;
    text-align: left;
  }
  .introductionTitle {
    font-size: 25px;
    font-weight: 600;
    text-align: left;
    margin-top: 20px;
  }
  .description {
    font-size: 15px;
    text-align: left;
    width: 100%;
  }
  .n-tag {
    height: 16px;
    color: #ad0404;
    border: #ad0404 0.5px solid;
  }
  .downloadList {
    margin-top: 20px;
    margin-bottom: 20px;
    min-width: 150px;
    min-height: 50px;
  }

  hr {
    border-color: rgb(255, 255, 255);
    width: 350px;
  }
}
</style>
