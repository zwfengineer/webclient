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
const baseAxios = axios.create({baseURL:"http://"+host})
const cookie= {
    get: (name) => Cookies.get(name),
    set: (name, value, options) => Cookies.set(name, value, options),
    remove: (name, options) => Cookies.remove(name, options),
    getAll: () => Cookies.get()
}
baseAxios.defaults.withCredentials = true;

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
        if (response.status = 200){
            cookie.remove("Login"),
            cookie.remove('user'),
            dispatchEvent(logoutevent)
        }
    })
    .catch((err) => {
       console.log(err)
    });
}





export{
    checkUser,
    checkPhoneNumber,
    getavatarsrc,
    baseAxios,
    host,
    protol,
    logout,
    cookie
}