import { dataType, getuser, messageType } from "./util"
import { wsclients } from "./websocketutil"
import {Base64} from 'js-base64'
import { Message } from "./Message"
const activeSessions = new Map()
const updatemessages=new Event("updatemessages")

function sessionDestory(data)  {
    return new CustomEvent("sessionDestory",{
        detail:data
    })
} 
function sessionactive(data){
    return new CustomEvent("sessionActive",{
        detail:data
    })
}
function repeat(message){
    for(let fid of activeSessions.keys()){
        if (fid == message.from){
            let session = activeSessions.get(fid)
            session.messages.push(message)
            dispatchEvent(updatemessages)
        }
    }
}

class Session{
    constructor(name,id){
        this.name=name
        this.id=id
        this.dormancy = true
        this.messages = new Array()
        this.user = getuser()
        activeSessions.set(this.id,this)
    } 
    active(){
        dispatchEvent(sessionactive(this.id))
    }
    close(){
        dispatchEvent(sessionDestory)
    }
    send(data){
        let message = new Message()
        message.data = Base64.encode(data)
        message.dataType=dataType.FullText
        message.messageType = messageType.UserMessage
        message.from = this.user.uid
        message.to = this.id
        message.unixTime = new Date()
        let connnect = wsclients.create("/wsapi")
        connnect.send(message.tojson())
        this.messages.push(message)
    }
}
export {
    activeSessions,
    Session,
    Message,
    sessionactive,
    sessionDestory,
    repeat
}