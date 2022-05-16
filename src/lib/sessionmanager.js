import { dataType, getuser, messageType } from "./util"
import {sessionloadhistory,savemessage} from "./messagemanager"
import { wsclients } from "./websocketutil"
import {Base64} from 'js-base64'
import { Message } from "./messagedatabase"

const activeSessions = new Map()
const updatechat=new Event("updatechat")

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
    savemessage(message)
    for(let fid of activeSessions.keys()){
        if (fid == message.from){
            let session = activeSessions.get(fid)
            session.messages.push(message)
        }
    }
    dispatchEvent(updatechat)
}

class Session{
    constructor(name,id){
        this.name=name
        this.id=id
        this.dormancy = true
        this.messages=new Array();
        this.user = getuser()
        this.loadhistory(id)
        activeSessions.set(this.id,this)
        dispatchEvent(updatechat)
    }
    loadhistory(id){
        sessionloadhistory(id,(data)=>{
            for(let message of data){
                this.messages.push(message)
            }
            dispatchEvent(updatechat)
        })
    }
    active(){
        dispatchEvent(sessionactive(this.id))
    }
    close(){
        dispatchEvent(sessionDestory())
    }
    send(data){
        let message = new Message({
            from:this.user.uid,
            to:this.id,
            messageType:messageType.UserMessage,
            dataType:dataType.FullText,
            unixTime:new Date(),
            data:Base64.encode(data)
        })
        let connnect = wsclients.create("/wsapi")
        connnect.send(message.tojson())
        this.messages.push(message)
        savemessage(message)
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