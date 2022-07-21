import {useEffect, useState} from "react";
import {getUserListEvent} from "../../models/user-models";
import {chatModalStatusEvent, checkUserChatEvent} from "../../models/chat";


export const NewChatHooks = (closeModal) => {
    const [offset, setOffset] = useState(0)


    useEffect(() => {
        const params = {
            offset,
            limit: 30
        }
        getUserListEvent(params)
    }, [offset])

    const checkNewChat = (e) => {
        const data = {
            avatar: e.avatar,
            full_name: e.name,
            is_official: e.is_official,
            username: e.username,
            action: e.action
        }
        closeModal()
        chatModalStatusEvent(true)
        checkUserChatEvent(data)
    }

    return{
        setOffset,
        checkNewChat
    }
}