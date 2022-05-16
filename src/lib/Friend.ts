export class Friend{
    constructor(object:any){
        this.id=object.id;
        this.username=object.username;
        this.avatar=object.avatar;
        this.gender=object.gender;
        this.phonenum = object.phonenum;
    };
    id!:String;
    username!:String;
    phonenum!:String;
    gender!:string;
    avatar!:string;
}