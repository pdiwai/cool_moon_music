export interface Hotlist {
  activity: boolean;
  category: number;
  createTime: number;
  hot: true;
  id: number;
  name: string;
  playlistTag: PlaylistTag;
  position: number;
  type: number;
  usedCount: number;
}

export interface PlaylistTag {
  category: number;
  createTime: number;
  highQuality: number;
  highQualityPos: number;
  id: number;
  name: string;
  officialPos: number;
  position: number;
  type: number;
  usedCount: number;
}
