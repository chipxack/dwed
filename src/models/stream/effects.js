import {createEffect} from "effector";
import stream from "../../service/stream";


export const fetchStreamList = createEffect({
    handler: stream.getMyStreamList
});

export const fetchMyStreamInfo = createEffect({
    handler: stream.getMyStreamInfo
})

export const fetchStreamInfo = createEffect({
    handler: stream.getStreamInfo
})

export const fetchStreamChatList = createEffect({
    handler: stream.getStreamChatList
})

export const fetchMoreStreamChatList = createEffect({
    handler: stream.getStreamChatList
})

export const fetchAnnouncementList = createEffect({
    handler: stream.getAnnouncementList
})