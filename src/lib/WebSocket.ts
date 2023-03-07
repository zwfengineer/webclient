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
  port as defaultport,
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
    port: string = defaultport,
    host: string = defaulthost
  ) {
    this.protocol = protocol;
    this.host = host;
    this.path = path;
    this.port = port;
    console.log(port, host, path);
  }
  get() {
    return [this.protocol, "://", this.host, ":", this.port, this.path].join(
      ""
    );
  }
}

export class WebSocketLink {
  wsc: WebSocket;
  path: wsLink | undefined;
  constructor(path: wsLink) {
    this.wsc = new WebSocket(path.get());
    this.path = path;
    this.wsc.addEventListener("close", (error) => {
      WSClient.closelink(this.path!);
      dispatchEvent(wsoffline(error.code));
      //匿名函数才能访问上级的对象
    });

    this.wsc.addEventListener("open", () => {
      WSClient.openlink(this.path!, this);
    });

    this.wsc.addEventListener("error", (error) => {
      console.log(error);
      WSClient.errorlink(this.path!);
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
  }
  send(data: any) {
    this.wsc.send(data);
  }
}

export type WebSocketLinks = Map<wsLink, WebSocketLink>;

export class WebSocketClient {
  Links: WebSocketLinks;
  constructor() {
    this.Links = new Map<wsLink, WebSocketLink>();
    this.Links.has = (data: wsLink): boolean => {
      let next = this.Links.keys().next();
      while (!next.done) {
        if (next.value.get() == data.get()) return true;
        next = this.Links.keys().next();
      }
      return false;
    };
    this.Links.get = (data: wsLink): WebSocketLink => {
      let next = this.Links.entries().next();
      while (!next.done) {
        if (next.value[0].get() == data.get()) {
          return next.value[1];
        }
      }
      return new WebSocketLink(new wsLink("/wsapi"));
    };
  }
  closelink(path: wsLink) {
    // this.Links.delete(path);
  }
  errorlink(path: wsLink) {
    this.closelink(path);
  }
  openlink(path: wsLink, wslink: WebSocketLink) {
    console.log(this);
    this.Links.set(path, wslink);
  }
  createLink(path: wsLink): WebSocketLink {
    if (this.Links.has(path)) {
      return this.Links.get(path) as WebSocketLink;
    } else {
      return new WebSocketLink(path);
    }
  }
}

const WSClient: WebSocketClient = new WebSocketClient();

export { WSClient };
