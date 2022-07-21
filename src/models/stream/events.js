import {createEvent} from "effector";
import {
    fetchAnnouncementList,
    fetchMoreStreamChatList,
    fetchMyStreamInfo,
    fetchStreamChatList,
    fetchStreamInfo,
    fetchStreamList
} from "./effects";


export const streamListEvent = createEvent()
export const myStreamInfoEvent = createEvent()
export const streamInfoEvent = createEvent()
export const streamChatListEvent = createEvent()
export const streamChatMessageEvent = createEvent()
export const moreStreamChatListEvent = createEvent()
export const announcementListEvent = createEvent()
export const removeSchedule = createEvent()



streamListEvent.watch(fetchStreamList)
myStreamInfoEvent.watch(fetchMyStreamInfo)
streamInfoEvent.watch(fetchStreamInfo)
streamChatListEvent.watch(fetchStreamChatList)
moreStreamChatListEvent.watch(fetchMoreStreamChatList)
announcementListEvent.watch(fetchAnnouncementList)