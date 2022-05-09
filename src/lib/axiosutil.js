import { baseAxios,friendlistevent} from "./util";
function getfriendlist(callback) {
    baseAxios.post('/getfriendlist').then((response) => {
        if(response.status == 200){
            callback(response.data)
            console.log("axios util ::6",response)
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
        console.log(response);
    })
}

export{
    getfriendlist,
    searchFriends,
    getAddFriendList
}