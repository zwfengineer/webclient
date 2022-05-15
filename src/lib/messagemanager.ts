import { getHistoryMessages } from "./axiosutil";
import { messagedatabasemanager } from "./messagedatabase";

const loadofflinehistorymessage = ()=>{
    getHistoryMessages((data: any)=>{
        messagedatabasemanager.messages.bulkAdd(data)
    })
}
export
{
    getHistoryMessages
}
