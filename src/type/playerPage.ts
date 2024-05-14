export interface MusicCommentVo {
  cnum: number;
  code: number;
  commentBanner: string;
  comments: Array<Comment>;
  hotComments: Array<Comment>;
  isMusician: boolean;
  more: boolean;
  moreHot: boolean;
  topComments: Array<Comment>;
  total: number;
  userId: number;
}

export interface Comment {
  user: User;
  beReplied: Array<string>;
  pendantData: string;
  showFloorComment: string;
  status: number;
  commentId: number;
  content: string;
  richContent: string;
  contentResource: string;
  time: number;
  timeStr: string;
  needDisplayTime: boolean;
  likedCount: number;
  expressionUrl: string;
  commentLocationType: number;
  parentCommentId: number;
  decoration: string;
  repliedMark: string;
  grade: string;
  userBizLevels: string;
  ipLocation: IpLocation;
  owner: boolean;
  medal: string;
  liked: boolean;
}

export interface User {
  locationInfo: string;
  liveInfo: string;
  anonym: number;
  avatarUrl: string;
  avatarDetail: string;
  userType: number;
  followed: boolean;
  mutual: boolean;
  remarkName: string;
  socialUserId: string;
  vipRights: string;
  nickname: string;
  authStatus: number;
  expertTags: string;
  experts: string;
  vipType: number;
  commonIdentity: string;
  userId: number;
  target: string;
}
export interface IpLocation {
  ip: string;
  location: string;
  userId: string;
}
