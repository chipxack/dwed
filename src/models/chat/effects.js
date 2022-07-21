import {createEffect} from "effector";
import chat from '../../service/chat'
import user from "../../service/user";


export const fetchChatUserList = createEffect({
    handler: chat.getChatUsersList
})

export const fetchNewUserList = createEffect({
    handler: user.getAllUser
})

export const fetchGetChatList = createEffect({
    handler: chat.getChatList
})

export const fetchGetGroupChatList = createEffect({
    handler: chat.getGroupChatList
})

export const fetchGetRestChatList = createEffect({
    handler: chat.getChatList
})

export const fetchGetGroupList = createEffect({
    handler: chat.getChatUsersList
})