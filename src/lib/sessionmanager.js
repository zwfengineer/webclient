import { wsclients } from "./websocketutil"
const activeSessions = new Map()
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
class Message{
    constructor(){
        this.from = null
        this.to = null
        this.data=null
        this.unixTime = null
        this.dataType = null
        this.messageType=null
    }
}
class Session{
    constructor(name,id){
        this.name=name
        this.id=id
        this.dormancy = true
        this.messages = new Array()
    } 
    active(){
        activeSessions.set(this.id,this)
        dispatchEvent(sessionactive(this.id))
    }
    close(){
        dispatchEvent(sessionDestory)
    }
    send(data){
        connnect = wsclients.create("/wsapi")
        connnect.send(data)
        this.messages.push(data)
    }
    repeat(data){
        this.messages.push(data)
    }
}
export {
    activeSessions,
    Session,
    Message,
    sessionactive,
    sessionDestory
}