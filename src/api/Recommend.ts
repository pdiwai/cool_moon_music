import axios from "axios";
import { Hotlist } from "../type/Recommend";
import { ListVo } from "../type/currency";

export function getHotlist() {
  return axios.get<ListVo<Hotlist>>(`/api/playlist/hot`);
}
