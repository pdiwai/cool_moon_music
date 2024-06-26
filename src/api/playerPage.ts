import axios from "axios";
import { MusicCommentVo } from "../type/playerPage";

export function getComment(id: number, offset: number) {
  return axios.get<MusicCommentVo>(
    `/api/comment/music?id=${id}&limit=5&offset=${offset}`
  );
}
