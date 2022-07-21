import React from "react";
import Moment from "react-moment";
import {useStore} from "effector-react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import InfiniteScroll from "react-infinite-scroller";
import {
    ChatImageBlock,
    ChatLeftText,
    ChatListSection,
    ChatListSectionHeader, ChatListSectionHeaderLeft, ChatMenu,
    ChatMessage,
    ChatMessageBlock,
    ChatRightText,
    ChatUserMessageBlock,
    ChatUserName
} from "../atoms";
import {GroupListHook} from "../../../hooks/chat";
import {$isDataPending} from "../../../models/chat";
import {ChatSendMessageSection} from "../molecules";
import {MoreVerticalSvg, PeopleSvg} from "../../../media";
import {CreateChatGroup} from "./create-chat-group";
import {ModalCustom} from "../../modal/atoms";
import {ButtonUi} from "../../../ui/atoms";
import {Dropdown} from "antd";
import {useTranslation} from "react-i18next";


export const GroupListBlock = (props) => {
    const {
        groupId,
        groupData,
        sendMessage
    } = props
    const isDataPending = useStore($isDataPending)
    const {t} = useTranslation()
    const chatList = isDataPending.$groupChatList.data
    const chatListLoading = isDataPending.$groupChatList.loading
    const moreList = isDataPending.$groupChatList.next


    const {
        setReplyMessage,
        replyMessage,
        scrollToBottom,
        visible,
        setVisible
    } = GroupListHook(groupId, chatList)


    const menu = (
        <ChatMenu>
            <ChatMenu.Item onClick={() => setVisible(true)} key="1">
                <span><PeopleSvg />{t('add_people')}</span>
            </ChatMenu.Item>
        </ChatMenu>
    );

    return (
        <ChatListSection status={groupId}>
            <ModalCustom
                title={t('create_chat_group')}
                footer={null}
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                <CreateChatGroup
                    groupId={groupId}
                />
            </ModalCustom>
            <ChatListSectionHeader>
                <ChatListSectionHeaderLeft>
                    {
                        groupData && groupData.receiver && !groupData.receiver.avatar ?
                            <div
                                style={{backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`}}
                            >
                                {groupData.receiver.name[0]}
                            </div> :
                            <img
                                src={groupData && groupData.receiver.avatar}
                                alt={groupData && groupData.receiver.name}
                            />
                    }

                    <span>{groupData && groupData.receiver.name}</span>
                </ChatListSectionHeaderLeft>
                <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                    <ButtonUi><MoreVerticalSvg/></ButtonUi>
                </Dropdown>
            </ChatListSectionHeader>
            <ChatMessageBlock
                id='scroll-block-group'
                // onScroll={handleScroll}
                // ref={scrollbarsRef}
                // onScroll={(e) => console.log('scroll', e)}
            >
                <InfiniteScroll
                    // getScrollParent={scrollbarsRef}
                    id='scroll-chat-group'
                    hasMore={
                        !chatListLoading && moreList
                    }
                    className='scroll-chat'
                    isReverse={true}
                    useWindow={false}
                    initialLoad={chatListLoading}
                    pageStart={0}
                    loadMore={() => console.log('wfmelkmveklvmlekvml')}
                >
                    {
                        chatList && chatList.length > 0 &&
                        chatList.map((item, key) =>
                            item.sender && jwtDecode(Cookies.get('token')).username === item.sender.username ?
                                <ChatRightText
                                    key={item.id}>
                                    {
                                        chatList[key + 1] &&
                                        chatList[key + 1].sender.username === item.sender.username ?
                                            null :
                                            <ChatUserName>{item.sender.full_name}</ChatUserName>
                                    }
                                    <ChatUserMessageBlock>
                                        {
                                            chatList[key - 1] &&
                                            chatList[key - 1].sender.username === item.sender.username ?
                                                null :
                                                <ChatImageBlock>
                                                    <img src={item.sender.avatar} alt={item.sender.username}/>
                                                </ChatImageBlock>
                                        }
                                        <span>
                                                <Moment format="hh:mm">
                                                    {item.date}
                                                </Moment>
                                            </span>
                                        <ChatMessage>
                                            {
                                                item.reply_to &&
                                                <div>
                                                    <span>{item.reply_to.sender.full_name}</span>
                                                    <span>{item.reply_to.text}</span>
                                                </div>
                                            }
                                            <span>
                                                    {item.text}
                                                </span>
                                        </ChatMessage>
                                    </ChatUserMessageBlock>
                                </ChatRightText> :
                                <ChatLeftText
                                    key={item.id}
                                >
                                    {
                                        chatList[key + 1] && chatList[key + 1].sender &&
                                        chatList[key + 1].sender.username === item.sender.username ?
                                            null :
                                            <ChatUserName>{item.sender && item.sender.full_name}</ChatUserName>
                                    }
                                    <ChatUserMessageBlock>
                                        {
                                            chatList[key - 1] && chatList[key - 1].sender &&
                                            chatList[key - 1].sender.username === item.sender.username ?
                                                null :
                                                <ChatImageBlock>
                                                    {
                                                        item.sender &&
                                                        <img src={item.sender.avatar} alt={item.sender.username}/>
                                                    }
                                                </ChatImageBlock>
                                        }
                                        <ChatMessage>
                                            {
                                                item.reply_to &&
                                                <div>
                                                    <span>{item.reply_to.sender && item.reply_to.sender.full_name}</span>
                                                    <span>{item.reply_to.text}</span>
                                                </div>
                                            }
                                            <span>
                                                    {item.text}
                                                </span>
                                        </ChatMessage>

                                        <span>
                                                <Moment format="hh:mm">
                                                    {item.date}
                                                </Moment>
                                            {/*<Reply onClick={() => setReplyMessage(item)}>*/}
                                            {/*    <UndoSvg/>*/}
                                            {/*</Reply>*/}
                                            </span>
                                    </ChatUserMessageBlock>
                                </ChatLeftText>
                        )
                    }

                </InfiniteScroll>
            </ChatMessageBlock>
            <ChatSendMessageSection
                scrollToBottom={scrollToBottom}
                setReplyMessage={setReplyMessage}
                replyMessage={replyMessage}
                sendMessage={sendMessage}
                groupId={groupId}
            />
        </ChatListSection>
    )
}