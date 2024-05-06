import axios from "axios";
import { Hotlist, Playlist } from "../type/Recommend";
import { ListVo } from "../type/currency";

export function getHotList() {
  return axios.get<ListVo<Hotlist>>(`/api/playlist/hot`);
}

export function getPlayList(cat: string) {
  return axios.get<Playlist>(`/api/top/playlist?limit=8&order=hot&cat=${cat}`);
}

export function getTopSongList(type: string) {
  return axios.get(`/api/top/song?type=${type}`);
}
