import axios from "axios";
import { MusicCommentVo } from "../type/playerPage";

export function getComment(id: number) {
  return axios.get<MusicCommentVo>(`/api/comment/music?id=${id}&limit=5`);
}
