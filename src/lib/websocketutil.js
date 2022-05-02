import { host,protol,wsoffline,wsmessage} from "./util"; 
const wsclients = {
    wsc:WebSocket,
    path:String,
    openlink:new Map(),
    create: function(path) {
        console.log("open:",this.openlink,this.checkrepat(path))
        if (this.checkrepat(path)){
            console.log(protol.ws+host+path)
            this.path = path
            this.wsc =new WebSocket(protol.ws + host + path)
            this.wsc.addEventListener('close',(error)=>{
                this.openlink.delete(this.path)
                dispatchEvent(wsoffline(error.code))
                //匿名函数才能访问上级的对象
            })
            this.wsc.addEventListener('open',()=>{
            })
            this.wsc.onmessage=(msg)=>{
                dispatchEvent(wsmessage(JSON.parse(msg.data)))
                let data = JSON.parse(msg.data)
                if (data.messageType != 'Heart'){
                    console.log(data)
                }
            } 
            this.openlink.set(path,this)
            return this.wsc
        }else{
            return this.openlink.get(path).wsc
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

export{
    wsclients
}