import {createEvent} from "effector";
import {
    fetchChatUserList,
    fetchGetChatList,
    fetchGetGroupChatList,
    fetchGetGroupList,
    fetchGetRestChatList, fetchNewUserList
} from "./effects";


export const getChatUsersListEvent = createEvent();
export const checkGroupChatEvent = createEvent();
export const checkUserChatEvent = createEvent();
export const getChatListEvent = createEvent();
export const getGroupChatListEvent = createEvent();
export const getRestChatListEvent = createEvent();
export const chatListSocketEvent = createEvent();
export const userActionSocketEvent = createEvent();
export const userChatListSocket = createEvent()
export const chatModalStatusEvent = createEvent()
export const getGroupListEvent = createEvent()
export const resetChat = createEvent()
export const userEditChatListSocket = createEvent()
export const getNewUser = createEvent()


getChatUsersListEvent.watch(fetchChatUserList)
getChatListEvent.watch(fetchGetChatList)
getRestChatListEvent.watch(fetchGetRestChatList)
getGroupListEvent.watch(fetchGetGroupList)
getGroupChatListEvent.watch(fetchGetGroupChatList)
getNewUser.watch(fetchNewUserList)