import axios from "axios";
import Cookies from "js-cookie";
import parsePhoneNumber from "libphonenumber-js/max";
const host = "192.168.10.1";
const protol = {
  ws: "ws",
  http: "http",
  wss: "wss",
  https: "https",
};
const port = "1258";

const logoutevent = new Event("logout");
const baseAxios = axios.create({
  baseURL: "https://" + host + ":" + port,
  withCredentials: true,
});
let cookie = getcookie();
function getcookie() {
  return {
    get: (name: string) => Cookies.get(name),
    set: (name: string, value: string, options: any) =>
      Cookies.set(name, value, options),
    remove: (name: any, options?: any) => Cookies.remove(name, options),
    getAll: () => Cookies.get(),
  };
}

const messageType = {
  Heart: "Heart",
  UserMessage: "UserMessage",
  SystemMessage: "SystemMessage",
  AddFriendRequest: "AddFriendRequest",
  DeliverFeedback: "DeliverFeedback",
  ServerPush: "ServerPush",
};
const dataType = {
  Text: "Text",
  FullText: "FullText",
  Video: "Video",
  OnlineVideo: "OnlineVideo",
  Voice: "Voice",
  OnlineVioce: "OnlineVoice",
  Directive: "Directive",
};

function friendlistevent(data: any) {
  return new CustomEvent("friendlistevent", {
    detail: data,
  });
}
function wsoffline(data: any) {
  return new CustomEvent("wsoffline", {
    detail: data,
  });
}

function wslinkerror(data: any) {
  return new CustomEvent("wslinkerror", {
    detail: data,
  });
}

function wsmessage(data: any) {
  return new CustomEvent("wsmessage", {
    detail: data,
  });
}

function wsonline() {
  return new Event("wsonline");
}

function flushfriendlist() {
  return new Event("flushfriendlist");
}

function flushnotice() {
  return new Event("flushnotice");
}

function addfriendevent() {
  return new Event("addfriendevent");
}
function repeataddfriendrequestevent() {
  return new Event("repeataddfriendrequestevent");
}

function checkPhoneNumber(Number: any, country: any) {
  let errorlist = new Array();
  let phonenumber = parsePhoneNumber(Number, country);
  if (phonenumber) {
    if (!phonenumber.isValid()) {
      errorlist.push("请使用手机号码！！！");
    }
    if (!phonenumber.getType()) {
      errorlist.push("请使用Mobel PhoneNumber");
    }
  } else {
    alert("unknow error");
    return false;
  }
  if (errorlist.length > 0) {
    alert("发现下列错误：" + errorlist.toString());
    return false;
  }
  return true;
}
function checkUser(data: any) {
  var alertlist = new Array();
  for (var k in data) {
    if (data[k].length == 0) {
      alertlist.push(k);
    }
  }
  if (alertlist.length > 0) {
    alert(alertlist.toString() + "不能为空");
    return false;
  }
  return true;
}

function getavatarsrc(avatar: any) {
  if (avatar != undefined) {
    return require("../assets/defaultuser/" + avatar + ".jpg");
  } else {
    return require("../assets/defaultuser/" + 2 + ".jpg");
  }
}
function logout() {
  dispatchEvent(logoutevent);
  baseAxios
    .post("/logout")
    .then((response) => {
      cookie.remove("Logined");
      cookie.remove("user");
      console.log(response);
    })
    .catch((ERR) => {
      cookie.remove("Logined");
      cookie.remove("user");
      console.log(ERR);
    });
}

function getuser() {
  let data = cookie.get("User");
  if (data) {
    return JSON.parse(data);
  }
  return undefined;
}

export {
  checkUser,
  checkPhoneNumber,
  getavatarsrc,
  baseAxios,
  host,
  protol,
  port,
  logout,
  cookie,
  friendlistevent,
  wsoffline,
  wsonline,
  wslinkerror,
  wsmessage,
  flushfriendlist,
  flushnotice,
  addfriendevent,
  repeataddfriendrequestevent,
  getuser,
  messageType,
  dataType,
};
