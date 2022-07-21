import React, {useState} from 'react'
import {useStore} from 'effector-react'
import InfiniteScroll from 'react-infinite-scroller'
import {
    ChatImageBlock,
    ChatListSection,
    ChatListSectionHeader,
    ChatListSectionHeaderLeft,
    ChatMessageBlock,
    ChatUserName,
    NotificationDeleteBlock,
} from '../atoms'
import {ChatListHook} from '../../../hooks/chat'
import {$isDataPending} from '../../../models/chat'
import {ChatNotification, ChatSendMessageSection, LeftChat, RightChat} from '../molecules'
import {useUserOnline} from '../../../hooks/user/check-user-status'
import {useTranslation} from 'react-i18next'
import {ButtonUi} from '../../../ui/atoms'


export const ChatListBlock = (props) => {
    const {
        userData,
        sendMessage
    } = props
    const {t} = useTranslation()
    const isDataPending = useStore($isDataPending)
    const chatList = isDataPending.$chatList.data
    const chatListLoading = isDataPending.$chatList.loading
    const moreList = isDataPending.$chatList.next
    const username = isDataPending.$checkedUser.username
    const action = isDataPending.$checkedUser.userData && isDataPending.$checkedUser.userData.action
    const {isOnline} = useUserOnline(username)

    const {
        scrollbarsRef,
        replyMessage,
        setReplyMessage,
        loadMoreMessage,
        scrollToBottom,
        setVisible,
        visible
    } = ChatListHook(chatList)


    const [notificationData, setNotificationData] = useState(undefined)

    // console.log('chatList_chatList', chatList)

    const openNotification = (type, data, action, closeDropdown) => {
        closeDropdown(false)
        setVisible(true)
        const params = {
            irrevocably: 1
        }

        const deleteMessage = (params) => {
            setVisible(false)
            action(params)
        }

        const block =
            type === 'delete' &&
            <NotificationDeleteBlock>
                <span>{data.text}</span>
                <div>
                    <ButtonUi onClick={() => deleteMessage()}>{t('delete-from-me')}</ButtonUi>
                    <ButtonUi onClick={() => deleteMessage(params)}>{t('delete-from-everyone')}</ButtonUi>
                </div>

            </NotificationDeleteBlock>
        setNotificationData(block)

    }

    return (
        <ChatListSection status={username}>
            <ChatListSectionHeader>
                <ChatNotification closeNotification={() => setVisible(false)} visible={visible}>
                    {
                        notificationData
                    }
                </ChatNotification>
                <ChatListSectionHeaderLeft>
                    <img
                        onClick={() => setVisible(!visible)}
                        src={userData && userData.avatar}
                        alt={userData && userData.full_name}
                    />
                    <div>
                        <span>{userData && userData.full_name}</span>
                        <span>{action && action === 'typing' ? (t('typing') + '...') : isOnline ? t('online') : t('offline')}</span>
                    </div>
                </ChatListSectionHeaderLeft>
            </ChatListSectionHeader>
            <ChatMessageBlock
                id='scroll-block'
                // onScroll={handleScroll}
                ref={scrollbarsRef}
                // onScroll={(e) => console.log('scroll', e)}
            >
                <InfiniteScroll
                    // getScrollParent={scrollbarsRef}
                    id='scroll-chat'
                    hasMore={
                        !chatListLoading && Boolean(moreList)
                    }
                    className='scroll-chat'
                    isReverse={true}
                    useWindow={false}
                    initialLoad={chatListLoading}
                    pageStart={0}
                    loadMore={loadMoreMessage}
                >
                    {
                        chatList && chatList.length > 0 &&
                        chatList.map((item, key) =>
                            item.sender && username !== item.sender.username ?
                                <RightChat
                                    className={'chat-item'}
                                    openNotification={openNotification}
                                    checkedUser={username}
                                    sendMessage={sendMessage}
                                    data={item}
                                    key={key}
                                    setReplyMessage={setReplyMessage}
                                    chatList={chatList}
                                    name={
                                        chatList[key + 1] &&
                                        chatList[key + 1].sender.username === item.sender.username ?
                                            null :
                                            <ChatUserName>{item.sender.full_name}</ChatUserName>
                                    }
                                    image={
                                        chatList[key - 1] &&
                                        chatList[key - 1].sender.username === item.sender.username ?
                                            null :
                                            <ChatImageBlock>
                                                <img src={item.sender.avatar} alt={item.sender.username}/>
                                            </ChatImageBlock>
                                    }
                                /> :
                                <LeftChat
                                    openNotification={openNotification}
                                    chackedUser={username}
                                    sendMessage={sendMessage}
                                    data={item}
                                    key={key}
                                    setReplyMessage={setReplyMessage}
                                    chatList={chatList}
                                    name={
                                        chatList[key + 1] &&
                                        chatList[key + 1].sender.username === item.sender.username ?
                                            null :
                                            <ChatUserName>{item.sender.full_name}</ChatUserName>
                                    }
                                    image={
                                        chatList[key - 1] &&
                                        chatList[key - 1].sender.username === item.sender.username ?
                                            null :
                                            <ChatImageBlock>
                                                <img src={item.sender.avatar} alt={item.sender.username}/>
                                            </ChatImageBlock>
                                    }
                                />
                        )
                    }

                </InfiniteScroll>
            </ChatMessageBlock>
            {
                username &&
                <ChatSendMessageSection
                    scrollToBottom={scrollToBottom}
                    setReplyMessage={setReplyMessage}
                    replyMessage={replyMessage}
                    sendMessage={sendMessage}
                    username={username}
                />
            }

        </ChatListSection>
    )
}