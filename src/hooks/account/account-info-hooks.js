import {chatModalStatusEvent, checkUserChatEvent} from "../../models/chat";

export const LeftInfoBlockHook = () => {

    const chatOpen = (e) => {
        const data = {
            avatar: e.image,
            full_name: e.name,
            is_official: e.is_official,
            username: e.username,
            action: e.action
        }
        chatModalStatusEvent(true)
        checkUserChatEvent(data)
    }

    return {
        chatOpen
    }
}