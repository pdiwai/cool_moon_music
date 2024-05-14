import axios from "axios";
import { PlayListDetail } from "../type/playListDetail";

export function getPlayListDetail(id: number) {
  return axios.get<PlayListDetail>(`/api/playlist/detail?id=${id}`);
}
export function getSongUrl(id: number) {
  return axios.get(`/api/song/url?id=${id}`);
}
export function getLyric(id: number) {
  return axios.get(`/api/lyric?id=${id}`);
}
