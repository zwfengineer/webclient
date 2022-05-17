export function NewMessageEvent(data:any):CustomEvent{
    return new CustomEvent("newmessageevent",{
        detail:data
    })
}
export function changefriend(data:any):CustomEvent{
    return new CustomEvent("changefriend",{
        detail:data
    })
}