import { Playlists } from "./Recommend";

export interface PlayListDetail {
  code: number;
  fromUserCount: number;
  fromUsers: string;
  playlist: Playlists;
  privileges: any;
  relatedVideos: Array<string>;
  resEntrance: string;
  sharedPrivilege: string;
  songFromUsers: string;
  urls: string;
}

export interface LyricVo {
  code: number;
  klyric: VersionAndLyric;
  lrc: VersionAndLyric;
  qfy: boolean;
  romalrc: VersionAndLyric;
  sfy: boolean;
  sgc: boolean;
  tlyric: VersionAndLyric;
  transUser: transUser;
  uncollected: boolean;
}

export interface VersionAndLyric {
  version: number;
  lyric: string;
}

export interface transUser {
  demand: number;
  id: number;
  nickname: string;
  status: number;
  uptime: number;
  userid: number;
}
