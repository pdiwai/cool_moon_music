export interface ListVo<T> {
  code: number;
  tags: Array<T>;
}

export interface SongInfo {
  index: number;
  name: string;
  nickname: string;
  songUrl: string;
  picUrl: string;
  alName: string;
  id: number;
}
