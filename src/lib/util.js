import parsePhoneNumber from "libphonenumber-js/max"

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



export{
    checkUser,
    checkPhoneNumber
}