import { dataType, getuser, messageType } from "./util"
import {sessionloadhistory,savemessage} from "./messagemanager"
import {NewMessageEvent} from "./CustomEvent"
import { wsclients } from "./websocketutil"
import {Base64} from 'js-base64'
import { Message, Messages } from "./messagedatabase"
import { Friend } from "./Friend"

const activeSessions = new Map()
const updatechat=new Event("updatechat")

function sessionDestory(data:any)  {
    return new CustomEvent("sessionDestory",{
        detail:data
    })
} 
function sessionactive(data:any){
    return new CustomEvent("sessionActive",{
        detail:data
    })
}
function repeat(message:Message){
    savemessage(message.from,message)
    dispatchEvent(NewMessageEvent({
        id:message.from,
        unreadnum:1,
    }))
    for(let fid of activeSessions.keys()){
        if (fid == message.from){
            let session = activeSessions.get(fid)
            session.messages.push(message)
        }
    }
    dispatchEvent(updatechat)
}

class Session{
    name:string;
    id:string;
    friend:Friend;
    dormancy:boolean;
    messages:Message[];
    user:any;

    constructor(friend:any){
        this.name=friend.username
        this.id=friend.id
        this.friend = friend
        this.dormancy = true
        this.messages=new Array();
        this.user = getuser()
        
        this.loadhistory(friend.id)
        activeSessions.set(this.id,this)
        dispatchEvent(updatechat)
    }
    loadhistory(id:any){
        sessionloadhistory(id,(data:Message[])=>{
            for(let message of data){
                this.messages.push(message)
            }
            dispatchEvent(updatechat)
        })
    }
    active(){
        dispatchEvent(sessionactive(this.id))
    }
    send(data:string){
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
        savemessage(this.id,message)
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