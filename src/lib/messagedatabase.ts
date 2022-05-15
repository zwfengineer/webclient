import Dexie,{Table} from "dexie";
export interface Message{
    from: String;
    to: String;
    data?:Object;
    unixtime:Date;
    messageType:String;
    dataType:String;
}

export class database extends Dexie{
    messages!: Table<Message>;
    constructor(id:string){
        super(id);
        this.version(1).stores({
            messages:'from,to,data,unixtime,messageType,dataType'
        });
    }
    close(){
        this.on('close',()=>{
            this.messages.clear()
        })
    }
}
export let messagedatabasemanager:database;
export const initialize:(id:string)=> void =function(id:string){
        messagedatabasemanager =  new database(id);
    }