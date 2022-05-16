import { baseAxios,flushfriendlist,friendlistevent} from "./util";
function getfriendlist(callback) {
    baseAxios.post('/getfriendlist').then((response) => {
        if(response.status == 200){
            callback(response.data)
            dispatchEvent(friendlistevent(response.data))
        }
    })
}
function searchFriends(data,callback){
    baseAxios.post("/searchuser",data).then((response)=>{
        console.log(response) 
        callback(response.data)
    })
}

function getAddFriendList(callback){
    baseAxios.post("/getAddFriendRequest").then((response)=>{
        callback(response.data);
    })
}

function agreeAddFriendRequest(data,callback){
    baseAxios.post("/addFriend",data)
    .then((response)=>{
        console.log(response)
        if(response.status=200){
            callback()
            dispatchEvent(flushfriendlist())
        }
    })
}
function getHistoryMessages(callback) {
    baseAxios.post("/pullHistoryMessage")
    .then((response)=>{
        let data = new Map();
        for(let key of Object.keys(response.data)){
            data.set(key,response.data[key])
        }
        callback(data)
    })
}

export{
    getfriendlist,
    searchFriends,
    getAddFriendList,
    agreeAddFriendRequest,
    getHistoryMessages
}