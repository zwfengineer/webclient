import { host,protol } from "./util"; 
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
                console.log(error)
                //匿名函数才能访问上级的对象
            })
            this.wsc.addEventListener('open',()=>{
            })
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