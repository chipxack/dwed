import React, {useEffect, useRef, useState} from "react";
import {
    $isDataPending,
    chatModalStatusEvent,
    checkUserChatEvent,
    getChatUsersListEvent,
    resetChat,
    userActionSocketEvent
} from "../../models/chat";
import {chatListSocketEvent, getChatListEvent, userChatListSocket} from "../../models/chat";
import {useWSApi} from "../common";
import {useStore} from "effector-react";
import {userEditChatListSocket} from "../../models/chat/events";
import {notification} from "antd";
import {FastChat} from "../../components/fast-chat";


export const ChatHook = () => {
    const isDataPending = useStore($isDataPending)
    const userName = isDataPending.$checkedUser.username
    const chatModalStatus = isDataPending.$chatModalStatus.status
    const [visible, setVisible] = useState(false)
    const [count, setCount] = useState(0);

    const {
        message,
        // sendMessage
    } = useWSApi(`/chats`)

    useEffect(() => {
        if (message) {
            if (message.counters && message.counters.unread_count_all) {
                setCount(message.counters.unread_count_all)
            }
            if (message.object && message.object.sender.username === userName) {
                userChatListSocket(message)
            }
            if (message.action && message.action === 'add') {
                chatListSocketEvent(message)
                openNotification(message.object)
            }
        }

    }, [message]);

    const openNotification = (data) => {

        notification.open({
            bottom: 80,
            message: false,
            description: <FastChat data={data}/>,
            className: 'chat-notification',
            placement: 'bottomLeft',
            duration: 5
        });
    };



    const closeModal = () => {
        checkUserChatEvent(undefined)
        chatModalStatusEvent(!chatModalStatus)
    }

    return {
        chatModalStatus,
        closeModal,
        visible,
        setVisible,
        count,
        setCount
    }
}

export const ChatAllUsers = (userName, usersList, setCount) => {
    const [offset, setOffset] = useState(0)
    useEffect(() => {
        const params = {
            rtype: 'user',
            limit: 20,
            offset
        }
        getChatUsersListEvent(params)
    }, [offset]);

    const {sendMessage, message} = useWSApi(`/chats/actions`)

    const handleScroll = () => {
        if (usersList && usersList.length > 0) {
            setOffset(usersList.length)
        }
    }

    useEffect(() => {
        if (message && message.action) {
            if (message.action === 'typing') {
                const data = {
                    username: message.user.username,
                    action: 'typing'
                }
                userActionSocketEvent(data)
                setTimeout(() => {
                    const data = {
                        username: message.user.username,
                        action: undefined
                    }
                    userActionSocketEvent(data)
                }, 1000)
            }
            if (message.action && message.action === 'read') {
                if (message.myself) {
                    if (message.counters) {
                        setCount(message.counters.unread_count_all)
                        const data = {
                            username: message.user.username,
                            action: undefined,
                            unread_count: message.counters.unread_count
                        }
                        userActionSocketEvent(data)
                    }
                } else {
                    const data = {
                        id: message.chat && message.chat.id,
                        is_read: true
                    }
                    // console.log('chat read', data)
                    userEditChatListSocket(data)
                }
            }
        }

    }, [message])

    return {
        handleScroll,
        sendMessage,
        setOffset
    }

}

export const ChatListHook = (chatList) => {
    const scrollbarsRef = useRef()
    const isDataPending = useStore($isDataPending)
    const username = isDataPending.$checkedUser.username

    const [replyMessage, setReplyMessage] = useState(null)
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (username) {
            const params = {
                offset: 0,
                username,
                limit: 50
            }
            resetChat()
            getChatListEvent(params)
        }
    }, [username])

    useEffect(() => {
        if (chatList && chatList.length > 0 && chatList.length < 51) {
            scrollToBottom()
        }
    }, [chatList]);


    const scrollToBottom = () => {
        document.getElementById('scroll-block').scrollTop = document.getElementById('scroll-chat').offsetHeight
    };

    const loadMoreMessage = () => {
        // console.log('scrollTop', chatList.length)
        // setOffset(chatList.length)
        const params = {
            offset: chatList.length,
            username,
            limit: 50
        }
        getChatListEvent(params)
    }

    return {
        scrollbarsRef,
        replyMessage,
        setReplyMessage,
        scrollToBottom,
        loadMoreMessage,
        visible,
        setVisible
    }

}