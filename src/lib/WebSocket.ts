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
} from "./util";

export class wsLink {
  protol: string | undefined;
  path: string;
  port: string | undefined;
  constructor(path: string, port: string = "1258") {
    this.path = path;
    this.port = port;
  }
  get() {
    return this.protol + this.path + this.port;
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
        opencb(this.path)
    });

    this.wsc.addEventListener("error", (error) => {
      console.log(error);
      errorcb(this.path)
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
}

type WebSocketLinks = Map<wsLink, WebSocketLink>;

class WebSocketClient {
  Links: WebSocketLinks;
  constructor() {
    this.Links = new Map<wsLink, WebSocketLink>();
  }
  closelink(path:wsLink){
    this.Links.delete(path)
  }
  errorlink(path:wsLink){

  }
  openlink(path:wsLink){
    
  }
}

export const WSClient: WebSocketClient = new WebSocketClient();
