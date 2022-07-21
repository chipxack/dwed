import {checkUserChatEvent} from "../../../models/chat";
import {ChatUserAvatarBlock, ChatUserBlock, ChatUserBlockDate, ChatUserBlockHeader, ChatUserTitleBlock} from "../atoms";
import {Badge} from "antd";
import Moment from "react-moment";
import React from "react";
import {useTranslation} from "react-i18next";
import {useUserOnline} from "../../../hooks/user/check-user-status";


export const ChatUserItem = ({data, userName}) => {
    const {t} = useTranslation()
    const datUserName = data?.receiver?.username
    const {isOnline} = useUserOnline(datUserName)

    return (
        <ChatUserBlock
            checked={userName === datUserName}
            onClick={() => {
                checkUserChatEvent(data?.receiver)
            }}
        >
            <ChatUserBlockHeader>
                <ChatUserAvatarBlock
                    status={isOnline}
                >
                    <img src={data?.receiver?.avatar} alt={data?.receiver?.full_name}/>
                    <span/>
                </ChatUserAvatarBlock>

                <ChatUserTitleBlock>
                    <div>
                        {data?.receiver?.full_name}
                    </div>
                    <span>{data?.action && data?.action === 'typing' ? (t('typing') + '...') : data?.last_message && data?.last_message.text}</span>
                </ChatUserTitleBlock>
            </ChatUserBlockHeader>
            <ChatUserBlockDate>
                <Badge
                    count={data?.unread_count}
                    style={{backgroundColor: '#1DA1F2'}}
                />
                <Moment format="hh:mm">
                    {data?.last_message && data?.last_message.date}
                </Moment>
            </ChatUserBlockDate>
        </ChatUserBlock>
    )
}