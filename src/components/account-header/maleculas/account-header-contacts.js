import React from 'react'
import {AccountHeaderContactItem, AccountHeaderContactWrapper} from "../atoms";
import {InfoSvg, MessageFillSvg, PhoneSvg, PinSvg} from "../../../media";
import {Tooltip} from "antd";
import {chatModalStatusEvent, checkUserChatEvent} from "../../../models/chat";

export const AccountHeaderContacts = ({data}) => {

    const checkNewChat = (e) => {
        const params = {
            avatar: data.image,
            full_name: data.name,
            is_official: data.is_official,
            username: data.slug.indexOf('@') === -1 ? data.slug.substring(2) : data.slug.substring(1),
        }
        chatModalStatusEvent(true)
        checkUserChatEvent(params)
    }

    const contactsData = [
        {
            id: 1,
            icon: <PhoneSvg/>,
            title: "call"
        },
        {
            id: 2,
            icon: <MessageFillSvg/>,
            title: "send_message",
            click: checkNewChat
        },
        {
            id: 3,
            icon: <PinSvg/>,
            title: "show_location"
        },
        {
            id: 4,
            icon: <InfoSvg/>,
            title: "info"
        }
    ]

    return (
        <AccountHeaderContactWrapper>
            {
                contactsData.map(item => (
                    <Tooltip onClick={() => item.click &&  item.click(item)} key={item.id} title={item.title}>
                        <AccountHeaderContactItem>
                            {
                                item.icon
                            }
                        </AccountHeaderContactItem>
                    </Tooltip>
                ))
            }
        </AccountHeaderContactWrapper>
    )
}