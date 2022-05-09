import axios from "axios"
import Cookies from "js-cookie"
import parsePhoneNumber from "libphonenumber-js/max"
const host = "192.168.10.1:1258"
const protol ={
    ws:"ws://",
    http:"http://",
    wss:"wss://",
    https:"https://",
}
const logoutevent = new Event('logout')
const baseAxios = axios.create({
    baseURL:"https://"+host,
    withCredentials:true,
 })
const cookie= {
    get: (name) => Cookies.get(name),
    set: (name, value, options) => Cookies.set(name, value, options),
    remove: (name, options) => Cookies.remove(name, options),
    getAll: () => Cookies.get()
}

const messageType={
    Heart:"Heart",
    UserMessage:"UserMessage",
    SystemMessage:"SystemMessage",
    AddFriendRequest:"AddFriendRequest",
    DeliverFeedback:"DeliverFeedback"
}
const dataType={
    Text:"Text",
    FullText:"FullText",
    Video:"Video",
    OnlineVideo:"OnlineVideo",
    Voice:"Voice",
    OnlineVioce:"OnlineVoice"
}


function friendlistevent(data) {
    return new CustomEvent("friendlistevent",{
        detail:data
    })
}
function wsoffline(data){
    return new CustomEvent('wsoffline',{
        detail:data
    })
}

function wslinkerror(data){
    return new CustomEvent("wslinkerror",{
        detail:data
    })
}

function wsmessage(data){
    return new CustomEvent('wsmessage',{
        detail:data
    })
}

function checkPhoneNumber(Number,country) {
    let errorlist = new Array()
    let phonenumber = parsePhoneNumber(Number,country)
    if (phonenumber){
        if (! phonenumber.isValid()){
            errorlist.push("请使用手机号码！！！")
        }
        if(! phonenumber.getType()){
            errorlist.push("请使用Mobel PhoneNumber")
        }
    }else{
        alert("unknow error")
        return false
    }
    if (errorlist.length>0){
        alert("发现下列错误：" +errorlist.toString())
        return false
    }
    return true
}
function checkUser(data){
    console.log(data)
    var alertlist = new Array()
    for(var k in data){
        if (data[k].length == 0){
            alertlist.push(k)
        }
    }
    if (alertlist.length>0){
        alert(alertlist.toString()+"不能为空")
        return false
    }
    return true
}

function getavatarsrc(avatar) {
    if(avatar!=undefined){
        return require('../assets/defaultuser/'+avatar+".jpg")
    }else{
        return require('../assets/defaultuser/'+2+".jpg");
    }
}
function logout() {
    baseAxios.post("/logout")
    .then((response)=>{
        cookie.remove("Logined")
        cookie.remove('user')
        console.log(response)
        dispatchEvent(logoutevent)
    }).catch((ERR)=>{
        cookie.remove("Logined")
        cookie.remove('user')
        console.log(ERR)
        dispatchEvent(logoutevent)
    })
}


function getuser(){
    return  JSON.parse(cookie.get("User"))
}


export{
    checkUser,
    checkPhoneNumber,
    getavatarsrc,
    baseAxios,
    host,
    protol,
    logout,
    cookie,
    friendlistevent,
    wsoffline,
    wslinkerror,
    wsmessage,
    getuser,
    messageType,
    dataType
}