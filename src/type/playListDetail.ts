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
