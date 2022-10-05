import { Message } from "./messagedatabase";
import { repeat } from "./sessionmanager";
import {
  host,
  protol,
  wsoffline,
  wslinkerror,
  wsmessage,
  getuser,
  messageType,
  dataType,
  wsonline,
  addfriendevent,
  repeataddfriendrequestevent,
} from "./util";
const wsclients = {
  wsc: WebSocket,
  path: String,
  openlink: new Map(),
  create: function (path) {
    console.log("open:", this.openlink, this.checkrepat(path));
    if (this.checkrepat(path)) {
      return this.wsc;
    } else {
      return this.openlink.get(path).wsc;
    }
  },
  checkrepat(path) {
    for (var p of this.openlink.keys()) {
      if (p == path) {
        return false;
      }
    }
    return true;
  },
};
function post(data, fid) {
  server = wsclients.create("/wsapi");
  server.send();
}
function postaddfriendrequest(data, fid) {
  let server = wsclients.create("/wsapi");
  let message = new Message({
    from: getuser().uid,
    to: fid,
    data: data,
    messageType: messageType.AddFriendRequest,
    unixTime: new Date(),
    dataType: dataType.Text,
  });
  message.data = data;
  message.from = getuser().uid;
  message.messageType = messageType.AddFriendRequest;
  message.unixTime = new Date();
  message.to = fid;
  message.dataType = dataType.Text;
  console.log(data, fid, JSON.stringify(message));
  server.send(JSON.stringify(message));
}

export { wsclients, post, postaddfriendrequest };
