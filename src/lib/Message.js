export class Message {
    constructor() {
        this.from = null;
        this.to = null;
        this.data = null;
        this.unixTime = null;
        this.dataType = null;
        this.messageType = null;
    }
    tojson() {
        return JSON.stringify(this);
    }
}
