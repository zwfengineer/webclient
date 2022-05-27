import { ESMap } from "typescript";
import { getHistoryMessages } from "./axiosutil";
import { messagedatabasemanager, Message, Messages } from "./messagedatabase";


const loadofflinehistorymessage = ()=>{
        getHistoryMessages((data:ESMap<string,Array<object>>)=>{
            data.forEach((arrdata,key)=>{
                let messages:Array<Message>=new Array<Message>();
                arrdata.forEach((value)=>{
                    messages.push(new Message(value))
                })
                messagedatabasemanager.messages.delete(key)
                messagedatabasemanager.messages.add(new Messages(key,messages)).catch((error:Error)=>{
                    console.log(error.message)
                })
            })
    })
}

const sessionloadhistory=async (id:string,callback?:any)=>{
    let historymessages:Messages|undefined;
    historymessages = await messagedatabasemanager.messages.get(id) 
    callback(historymessages?.Messagelist)
}
const savemessage = async function(id:string,message:Message):Promise<void>{
    let messages:Messages=new Messages(id);
    messagedatabasemanager.messages.get(id).then((tablemessages:Messages|undefined)=>{
        if(tablemessages?.Messagelist == undefined){
            messages.Messagelist=[message]
        }else{
            tablemessages?.Messagelist?.shift();
            tablemessages?.Messagelist?.push(message)
            messages.Messagelist=tablemessages?.Messagelist;
        }
    }).catch((error:Error)=>{
        console.log(error.message)
        messages.Messagelist=[message]
    }).finally(()=>{
        messagedatabasemanager.messages.put(messages).catch((error:Error)=>{
            console.log(id,messages,error.message)
        });
    })

}

export{
    loadofflinehistorymessage,
    sessionloadhistory,
    savemessage,
}
