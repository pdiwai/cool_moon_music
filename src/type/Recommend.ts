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

export interface Playlist {
  cat: string;
  code: number;
  more: boolean;
  playlists: Array<Playlists>;
  total: number;
}

export interface Playlists {
  adType: number;
  alg: string;
  anonimous: boolean;
  cloudTrackCount: number;
  commentCount: number;
  commentThreadId: string;
  coverImgId: number;
  coverImgId_str: string;
  coverImgUrl: string;
  coverStatus: number;
  coverText: Array<string>;
  createTime: number;
  creator: Creator;
  description: string;
  highQuality: boolean;
  iconImgUrl: string;
  id: number;
  name: string;
  newImported: boolean;
  ordered: boolean;
  playCount: number;
  privacy: number;
  recommendInfo: string;
  recommendText: string;
  relateResId: string;
  relateResType: string;
  shareCount: number;
  socialPlaylistCover: string;
  specialType: number;
  status: number;
  subscribed: boolean;
  subscribedCount: number;
  subscribers: Array<Subscribers>;
  tags: Array<string>;
  totalDuration: number;
  trackCount: number;
  trackNumberUpdateTime: number;
  trackUpdateTime: number;
  tracks: Array<Tracks>;
  updateTime: number;
  userId: number;
}

export interface Creator {
  accountStatus: number;
  anchor: boolean;
  authStatus: number;
  authenticationTypes: number;
  authority: number;
  avatarDetail: AvatarDetail;
  avatarImgId: number;
  avatarImgIdStr: string;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundImgIdStr: string;
  backgroundUrl: string;
  birthday: number;
  city: number;
  defaultAvatar: boolean;
  description: string;
  detailDescription: string;
  djStatus: number;
  expertTags: string;
  experts: string;
  followed: boolean;
  gender: number;
  mutual: boolean;
  nickname: string;
  province: number;
  remarkName: string;
  signature: string;
  userId: number;
  userType: number;
  vipType: number;
}
export interface Subscribers {
  accountStatus: number;
  anchor: boolean;
  authStatus: number;
  authenticationTypes: number;
  authority: number;
  avatarDetail: string;
  avatarImgId: number;
  avatarImgIdStr: string;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundImgIdStr: string;
  backgroundUrl: string;
  birthday: number;
  city: number;
  defaultAvatar: boolean;
  description: string;
  detailDescription: string;
  djStatus: number;
  expertTags: string;
  experts: string;
  followed: boolean;
  gender: number;
  mutual: boolean;
  nickname: string;
  province: number;
  remarkName: string;
  signature: string;
  userId: number;
  userType: number;
  vipType: number;
}
export interface AvatarDetail {
  identityIconUrl: string;
  identityLevel: number;
  userType: number;
}

export interface Tracks {
  a: string;
  al: Al;
  alia: Array<string>;
  ar: Array<AR>;
  awardTags: any;
  cd: string;
  cf: string;
  copyright: number;
  cp: number;
  crbt: any;
  djId: number;
  dt: number;
  entertainmentTags: any;
  fee: number;
  ftype: number;
  h: BrFidSizeVdSr;
  hr: any;
  id: number;
  l: BrFidSizeVdSr;
  m: BrFidSizeVdSr;
  mark: number;
  mst: number;
  mv: number;
  name: string;
  no: number;
  noCopyrightRcmd: string;
  originCoverType: number;
  originSongSimpleData: string;
  pop: number;
  pst: number;
  publishTime: number;
  resourceState: boolean;
  rt: string;
  rtUrl: string;
  rtUrls: Array<string>;
  rtype: number;
  rurl: string;
  s_id: number;
  single: number;
  songJumpInfo: any;
  sq: BrFidSizeVdSr;
  st: number;
  t: number;
  tagPicList: any;
  v: number;
  version: number;
  videoInfo: VideoInfo;
}

export interface BrFidSizeVdSr {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}
export interface Al {
  id: number;
  name: string;
  pic: number;
  picUrl: string;
}
export interface AR {
  alias: Array<string>;
  id: number;
  name: string;
  tns: Array<string>;
}
export interface VideoInfo {
  moreThanOne: boolean;
  video: string;
}
