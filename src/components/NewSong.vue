<template>
  <div>
    <n-card
      :title="props.type.name"
      :segmented="{
        content: true,
        footer: 'soft',
      }"
    >
      <n-list>
        <n-list-item
          v-for="(item, index) in songInfoList"
          :key="item.id"
          style="text-align: left"
        >
          <n-tooltip trigger="hover">
            <template #trigger>
              <a
                style="color: black"
                href="#"
                @click.prevent="
                  () => {
                    $router.push({
                      path: '/playerPage',
                      query: { songInfo: JSON.stringify(item) },
                    });
                  }
                "
              >
                <n-ellipsis style="width: 170px">
                  <b style="margin-right: 10px">{{ index + 1 }}</b
                  >{{ item.name }}</n-ellipsis
                ></a
              >
            </template>
            {{ item.name }}
          </n-tooltip>

          <div class="smallGrayText" style="margin-left: 18px">
            {{ item.nickname }}
          </div>
        </n-list-item>
      </n-list>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { NCard, NList, NListItem, NTooltip, NEllipsis } from "naive-ui";
import { getTopSongList } from "../api/Recommend";
import { ref } from "vue";
import { SongInfo } from "../type/currency";
import { TopSongVo } from "../type/Recommend";

const props = defineProps({
  type: {
    default: { id: 0, name: "" },
    type: Object,
  },
});

const songInfoList = ref<Array<SongInfo>>([]);

const getNewSongList = () => {
  getTopSongList(props.type.id).then((res) => {
    const tempValue = res.data.data.splice(0, 5) as Array<TopSongVo>;
    tempValue.forEach((item) => {
      const tempVo = {
        index: item.no,
        name: item.album.name,
        nickname: item.artists[0].name,
        songUrl: item.mp3Url,
        picUrl: item.album.picUrl,
        alName: item.alias[0],
        id: item.album.id,
      };
      songInfoList.value.push(tempVo);
    });
  });
};

getNewSongList();
</script>

<style lang="less" scoped>
.n-card {
  /deep/.n-card-header {
    height: 118px;
    background-image: linear-gradient(
        to bottom,
        rgba(46, 32, 60, 0.7),
        rgba(46, 32, 60, 0.7)
      ),
      url(../assets/background.png);
    background-position: center center;
    .n-card-header__main {
      color: rgb(255 255 255);
    }
    font-size: 30px;
    font-weight: 1000;
  }
}
</style>
