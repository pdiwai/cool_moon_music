import axios from "axios";
import { PlayListDetail } from "../type/playListDetail";

export function getPlayListDetail(id: string) {
  return axios.get<PlayListDetail>(`/api/playlist/detail?id=${id}`);
}
