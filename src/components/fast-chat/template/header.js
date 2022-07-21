import {ChatUserAvatarBlock, ChatUserBlockHeader, ChatUserTitleBlock} from "../../chat/atoms";
import React from "react";


export const FastChatHeader = ({data}) => {


    return (
        <ChatUserBlockHeader>
            <ChatUserAvatarBlock
                status={false}
            >
                <img src={data?.sender?.avatar} alt={data?.sender?.full_name}/>
                <span/>
            </ChatUserAvatarBlock>

            <ChatUserTitleBlock>
                <div>
                    {data?.sender?.full_name}
                </div>
                {/*<span>{data.action && data.action === 'typing' ? (t('typing') + '...') : data.last_message && data.last_message.text}</span>*/}
            </ChatUserTitleBlock>
        </ChatUserBlockHeader>
    )
}