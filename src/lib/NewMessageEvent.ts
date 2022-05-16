export function NewMessageEvent(data:any):CustomEvent{
    return new CustomEvent("newmessageevent",{
        detail:data
    })
}