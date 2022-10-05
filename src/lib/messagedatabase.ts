import Dexie,{Table} from "dexie";

export class Message {
    constructor(obj:any){
        this.from=obj.from;
        this.to=obj.to;
        this.data=obj.data;
        this.unixTime=obj.unixTime;
        this.messageType=obj.messageType;
        this.dataType=obj.dataType;
    }
    tojson(){
        return JSON.stringify(this)
    }
    from!: string;
    to!: string;
    data?: Object | undefined;
    unixTime!: Date;
    messageType!: string;
    dataType!: string;
}
export class Messages{
    constructor(id:string,messagelist?:Message[]){
        this.id=id;
        this.Messagelist=messagelist;
    }

    id?: string;
    Messagelist?: Array<Message>;
    
}

export class database extends Dexie{
    messages!:Dexie.Table<Messages>;
    constructor(id:string){
        super(id);
        this.version(1).stores({
            messages:"id"
        })
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