<template>
  <div class="playerPage">
    <div class="divLeft">
      <img :src="currentSong.picUrl" style="width: 100%" />
      <div class="introductionTitle">歌曲简介</div>
      <div class="description">测试测试</div>
      <n-button
        color="#ffe12c"
        text-color="black"
        round
        strong
        size="large"
        class="downloadSong"
      >
        <n-icon size="25"> <DownloadOutline /> </n-icon>&nbsp;下载这首歌
      </n-button>
    </div>
    <div class="divRight">
      <div class="musicName">
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
        <n-button color="#ffe12c" text-color="black" size="large" round strong>
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

      <div class="lyric">
        <p v-if="loading">歌词加载中</p>
        <p v-if="uncollectedLyric || (lyricList.length === 0 && !loading)">
          暂无歌词
        </p>
        <ul
          v-if="!loading && lyricList.length > 0"
          style="list-style-type: none; margin-left: -35px"
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
      <div class="comment">
        <span
          >最新评论 <a>{{ commentNumber }}条</a></span
        >
        <n-list>
          <n-list-item v-for="item in userComments" :key="item.commentId">
            <template #prefix>
              <img
                :src="item.user.avatarUrl"
                height="42"
                style="border-radius: 50%"
              />
            </template>
            <b style="font-size: 14px; height: 22px; line-height: 22px">{{
              item.user.nickname
            }}</b>
            <p>{{ item.content }}</p>
            <p style="color: gray">{{ item.timeStr }}</p>
          </n-list-item>
        </n-list>
        <n-pagination
          v-if="commentNumber > 0"
          v-model:page="paginationInfo.currentPage"
          :page-count="paginationInfo.totalPage"
          :on-update:page="changePage"
        />
      </div>
    </div>

    <div style="height: 100px"></div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { NButton, NIcon, NList, NListItem, NPagination } from "naive-ui";
import {
  CaretForwardCircleOutline,
  AddSharp,
  HeartOutline,
  ShareOutline,
  LogoTwitch,
  DownloadOutline,
} from "@vicons/ionicons5";
import { SongInfo } from "../../type/currency";
import { getLyric } from "../../api/playListDetail";
import { getComment } from "../../api/playerPage";
import { Comment } from "../../type/playerPage";

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

const userComments = ref<Array<Comment>>([]);
const commentNumber = ref<number>();
if (currentRoute.value.query.songInfo !== null) {
  currentSong.value = JSON.parse(currentRoute.value.query.songInfo as string);
}
const uncollectedLyric = ref<boolean>(false);
const lyricList = ref<Array<{ time: string; lyric: string }>>([]);
const lineNo = ref<number>(-1);
const loading = ref<boolean>(false);
const paginationInfo = ref({
  currentPage: 1,
  totalPage: 0,
});

const getLyrucInfo = () => {
  loading.value = true;
  getLyric(currentSong.value.id)
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

const getMusicComment = (offset: number) => {
  getComment(currentSong.value.id, offset as number).then((res) => {
    userComments.value = res.data.comments;
    commentNumber.value = res.data.total;
    paginationInfo.value.totalPage = Math.ceil(res.data.total / 5);
  });
};

const changePage = (page: number) => {
  paginationInfo.value.currentPage = page;
  getMusicComment((page - 1) * 5);
};

getLyrucInfo();
getMusicComment(0);
</script>

<style lang="less" scoped>
.playerPage {
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

  .musicName {
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

  .downloadSong {
    margin-top: 20px;
    margin-bottom: 20px;
    min-width: 150px;
    min-height: 50px;
  }
  .lyric {
    max-height: 600px;
    font-size: 14px;
    color: #858585;
    margin-top: 30px;
    text-align: left;
    overflow: auto;
  }

  /*滚动条高宽度*/
  .lyric::-webkit-scrollbar {
    width: 5px;
  }
  /*滚动条滑块*/
  .lyric::-webkit-scrollbar-thumb {
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgba(162, 81, 225, 0.2);
    background: #dfdfdf;
  }
  /*滚动条里面轨道*/
  .lyric ::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px rgba(162, 81, 225, 0.2) inset;
  }
  /*滚动条的小边角*/
  .lyric::-webkit-scrollbar-corner {
    background: transparent;
  }

  .comment {
    margin-top: 48px;
    text-align: left;
    span {
      font-size: 22px;
      font-weight: 600;
      line-height: 30px;
      margin-bottom: 22px;
    }
    span > a {
      color: gray;
      font-size: 14px;
      font-weight: 300;
      margin-left: 8px;
    }
  }
}
</style>
