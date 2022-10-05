import { baseAxios,flushfriendlist,friendlistevent} from "./util";
import {Friend} from "./Friend"
function getfriendlist(callback:Function) {
    baseAxios.post('/getfriendlist').then((response) => {
        if(response.status == 200){
            let friendlist = new Array();
            for(let item of response.data){
                friendlist.push(new Friend(item))
            }
            callback(friendlist)
            dispatchEvent(friendlistevent(response.data))
        }
    })
}
function searchFriends(data:any,callback:Function){
    baseAxios.post("/searchuser",data).then((response)=>{
        console.log(response) 
        callback(response.data)
    })
}

function getAddFriendList(callback:Function){
    baseAxios.post("/getAddFriendRequest").then((response)=>{
        callback(response.data);
    })
}

function agreeAddFriendRequest(data:any,callback:Function){
    baseAxios.post("/addFriend",data)
    .then((response)=>{
        console.log(response)
        if(response.status=200){
            callback()
            dispatchEvent(flushfriendlist())
        }
    })
}
function getHistoryMessages(callback:Function) {
    baseAxios.post("/pullHistoryMessage")
    .then((response)=>{
        let data = new Map();
        for(let key of Object.keys(response.data)){
            data.set(key,response.data[key])
        }
        callback(data)
    })
}

function getFriendAvatr(data:any,callback:Function){
    baseAxios.post("/getfriendavatar",data).then(
        (response)=>{   
            callback(response.data)
        }
    )
}

export{
    getfriendlist,
    searchFriends,
    getAddFriendList,
    agreeAddFriendRequest,
    getHistoryMessages,
    getFriendAvatr
}