import { Message } from "./messagedatabase";
import { repeat } from "./sessionmanager";
import { host,protol,wsoffline,wslinkerror,wsmessage, getuser,messageType, dataType, wsonline,addfriendevent,repeataddfriendrequestevent} from "./util"; 
const wsclients = {
    wsc:WebSocket,
    path:String,
    openlink:new Map(),
    create: function(path) {
        console.log("open:",this.openlink,this.checkrepat(path))
        if (this.checkrepat(path)){
            this.path = path
            this.wsc =new WebSocket(protol.wss + host + path)
            this.wsc.addEventListener('close',(error)=>{
                this.openlink.delete(this.path)
                dispatchEvent(wsoffline(error.code))
                //匿名函数才能访问上级的对象
            })
            this.wsc.addEventListener('open',()=>{
                
            })
            this.wsc.addEventListener("error",(error)=>{
                console.log(error)
                dispatchEvent(wslinkerror(error.code))
            })
            this.wsc.onmessage=(msg)=>{ 
                dispatchEvent(wsmessage(JSON.parse(msg.data)))
                let data = JSON.parse(msg.data)
                if (data.messageType != messageType.Heart){
                    console.log(data)
                }
                if(data.messageType == messageType.ServerPush && data.dataType == dataType.Directive){
                    switch (data.data) {
                        case "addfriendevent":
                            dispatchEvent(addfriendevent())
                            break;
                        case "addfriendrequestevent":
                            dispatchEvent(repeataddfriendrequestevent())
                            break;
                        case "useronline":
                            dispatchEvent(wsonline())
                            break;
                        default:
                            break;
                    }
                }
                if(data.messageType == messageType.UserMessage){
                    repeat(data)
                }
            } 
            this.openlink.set(path,this)

            return this.wsc 
        }else{
            return  this.openlink.get(path).wsc
        }
    },
    checkrepat(path){
        for(var p of this.openlink.keys()){
            if (p == path){
                return false
            }
        }
        return true
    },
}
function post(data,fid){
    server = wsclients.create("/wsapi")
    server.send()
}
function postaddfriendrequest(data,fid){
    let server = wsclients.create("/wsapi")
    let message = new Message({
        from:getuser().uid,
        to:fid,
        data:data,
        messageType:messageType.AddFriendRequest,
        unixTime: new Date(),
        dataType:dataType.Text,
    })
    message.data = data
    message.from = getuser().uid
    message.messageType = messageType.AddFriendRequest
    message.unixTime = new Date()
    message.to = fid
    message.dataType = dataType.Text
    console.log(data,fid,JSON.stringify(message))
    server.send(JSON.stringify(message))
}

export{
    wsclients,
    post,
    postaddfriendrequest,
}