import {useEffect, useState} from "react";
import {getGroupListEvent} from "../../models/chat";
import {getGroupChatListEvent} from "../../models/chat/events";


export const GroupsHooks = () => {
    const [offset, setOffset] = useState(0)


    useEffect(() => {
        const params = {
            offset,
            limit: 20,
            rtype: 'group',
        }
        getGroupListEvent(params)
    }, [offset])

    return {
        setOffset
    }

}

export const GroupListHook = (groupId, chatList) => {
    // const scrollbarsRef = useRef()
    // const isDataPending = useStore($isDataPending)
    // const offset = isDataPending.$chatList.data.length
    // const loading = isDataPending.$chatList.loading
    const [visible, setVisible] = useState(false)


    const [replyMessage, setReplyMessage] = useState(null)

// console.log(scrollbarsRef.current && scrollbarsRef.current.getScrollTop(), scrollbarsRef.current && scrollbarsRef.current.getScrollTopForOffset(), isDataPending)
    useEffect(() => {
        if (groupId) {
            const params = {
                group_id: groupId,
                limit: 50
            }
            getGroupChatListEvent(params)
        }
    }, [groupId])
    useEffect(() => {
        if (chatList && chatList.length > 0 && chatList.length < 50) {
            scrollToBottom()
        }
    }, [chatList]);


    const getChatList = (scroll) => {
        // const top = scroll.top
        // console.log('top', scroll)
        // if (username && top === 0.3 && !loading) {
        //     // console.log('top', top)
        //     // scrollbarsRef.current.scrollTop(0.1)
        //     const params = {
        //         username,
        //         offset,
        //         limit: 50
        //     }
        //     getRestChatListEvent(params)
        // }
    }

    const scrollToBottom = () => {
        document.getElementById('scroll-block-group').scrollTop = document.getElementById('scroll-chat-group').offsetHeight
        return true
    };

    const loadMoreMessage = () => {

    }

    return {
        getChatList,
        // scrollbarsRef,
        replyMessage,
        setReplyMessage,
        scrollToBottom,
        loadMoreMessage,
        visible,
        setVisible
    }

}