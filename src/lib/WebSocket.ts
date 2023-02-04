import { repeat } from "./sessionmanager";
import {
  wsoffline,
  wslinkerror,
  wsmessage,
  messageType,
  dataType,
  addfriendevent,
  repeataddfriendrequestevent,
  wsonline,
  host as defaulthost,
  protol as protocols,
} from "./util";

// WebSocket 管理模块
// 功能跟介绍， wsLink, 对WebSocket使用的URL参数的简单包装
//             WebSocketLink，对WebSocket类的简单包装,以及添加WebSocket事件监听回调
//             WebSocketLinks，WebSocket 的Key-Value 键值对
//             WebSocketClient，WebSocketLink 管理类，统一处理WebSocket相关类

export class wsLink {
  protocol: string | undefined;
  path: string;
  host: string | undefined;
  port: string | undefined;
  constructor(
    path: string,
    protocol: string = protocols.wss,
    port: string = "1258",
    host: string = defaulthost
  ) {
    this.protocol = protocol;
    this.host = host;
    this.path = path;
    this.port = port;
  }
  get() {
    return [this.protocol, this.host, this.port, this.path].join("");
  }
}

export class WebSocketLink {
  wsc: WebSocket;
  path: wsLink | undefined;
  constructor(
    path: wsLink,
    closecb: Function,
    opencb: Function,
    errorcb: Function
  ) {
    this.wsc = new WebSocket(path.get());
    this.path = path;
    this.wsc.addEventListener("close", (error) => {
      closecb(this.path);
      dispatchEvent(wsoffline(error.code));
      //匿名函数才能访问上级的对象
    });

    this.wsc.addEventListener("open", () => {
      opencb(this.path, this);
    });

    this.wsc.addEventListener("error", (error) => {
      console.log(error);
      errorcb(this.path);
      dispatchEvent(wslinkerror(error));
    });
    this.wsc.onmessage = (msg) => {
      dispatchEvent(wsmessage(JSON.parse(msg.data)));
      let data = JSON.parse(msg.data);
      if (data.messageType != messageType.Heart) {
        console.log(data);
      }
      if (
        data.messageType == messageType.ServerPush &&
        data.dataType == dataType.Directive
      ) {
        switch (data.data) {
          case "addfriendevent":
            dispatchEvent(addfriendevent());
            break;
          case "addfriendrequestevent":
            dispatchEvent(repeataddfriendrequestevent());
            break;
          case "useronline":
            dispatchEvent(wsonline());
            break;
          default:
            break;
        }
      }
      if (data.messageType == messageType.UserMessage) {
        repeat(data);
      }
    };
  };
  send(data:any){
    this.wsc.send(data)
  }
}

export type WebSocketLinks = Map<wsLink, WebSocketLink>;

export class WebSocketClient {
  Links: WebSocketLinks;
  constructor() {
    this.Links = new Map<wsLink, WebSocketLink>();
  }
  closelink(path: wsLink) {
    this.Links.delete(path);
  }
  errorlink(path: wsLink) {
    this.closelink(path);
  }
  openlink(path: wsLink, wslink: WebSocketLink) {
    this.Links.set(path, wslink);
  }
  createLink(path: wsLink): WebSocketLink {
    if (this.Links.has(path)) {
      return this.Links.get(path) as WebSocketLink;
    } else {
      return new WebSocketLink(
        path,
        this.closelink,
        this.openlink,
        this.errorlink
      );
    }
  }
}

export const WSClient: WebSocketClient = new WebSocketClient();
