import axios from "axios";
import { Hotlist, Playlist } from "../type/Recommend";
import { ListVo } from "../type/currency";

export function getHotList() {
  return axios.get<ListVo<Hotlist>>(`/api/playlist/hot`);
}

export function getPlayList(cat: string) {
  return axios.get<Playlist>(`/api/top/playlist?limit=10&order=hot&cat=${cat}`);
}
