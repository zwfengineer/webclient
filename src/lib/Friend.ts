import { getFriendAvatr } from "./axiosutil";
export interface FriendBase {
  id: string;
  username: string;
  phonenum: string;
  gender: string;
  avatar: string;
}

export class Friend implements FriendBase {
  constructor(object: any) {
    this.id = object.fid;
    this.username = object.username;
    this.avatar = object.avatar;
    this.gender = object.gender;
    this.phonenum = object.phonenum;
    if (object.avatar == undefined) {
      getFriendAvatr(this.id, (data: any) => {
        this.avatar = data;
      });
    }
  }
  id: string;
  username: string;
  phonenum: string;
  gender: string;
  avatar: string;
}
