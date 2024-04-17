export interface PlayListDetail {
  loginType: number;
  code: number;
  account: AccountType;
  token: string;
  profile: ProfileType;
  bindings: Array<BindingsType>;
  cookie: string;
}

export interface AccountType {
  id: number;
  userName: string;
  type: number;
  status: number;
  whitelistAuthority: number;
  createTime: number;
  salt: string;
  tokenVersion: number;
  ban: number;
  baoyueVersion: number;
  donateVersion: number;
  vipType: number;
  viptypeVersion: number;
  anonimousUser: boolean;
  uninitialized: boolean;
}

export interface ProfileType {
  backgroundImgIdStr: string;
  avatarImgIdStr: string;
  vipType: number;
  authStatus: number;
  djStatus: number;
  detailDescription: string;
  experts: object;
  expertTags: string;
  accountStatus: number;
  nickname: string;
  birthday: number;
  gender: number;
  province: number;
  city: number;
  avatarImgId: number;
  backgroundImgId: number;
  avatarUrl: string;
  followed: boolean;
  backgroundUrl: string;
  userType: number;
  defaultAvatar: boolean;
  mutual: boolean;
  remarkName: string;
  description: string;
  userId: number;
  signature: string;
  authority: number;
  followeds: number;
  follows: number;
  eventCount: number;
  avatarDetail: object;
  playlistCount: number;
  playlistBeSubscribedCount: number;
}

export interface BindingsType {
  bindingTime: number;
  refreshTime: number;
  tokenJsonStr: string;
  expiresIn: number;
  url: string;
  expired: number;
  userId: number;
  id: number;
  type: number;
}
