import React from "react";
import {useStore} from "effector-react";
import {BGChat, ChatBlock} from "./atoms";
import {ChatHook} from "../../hooks/chat";
import {ChatTemplate} from "./templates";
import {
    // ChatBoxSvg,
    PaperPlaneSvg
} from "../../media";
import {ChatButton} from "./atoms/button";
import {$isDataPending, chatModalStatusEvent} from "../../models/chat";
import { Badge } from 'antd';


export const Chat = () => {
    const visible = useStore($isDataPending).$chatModalStatus.status


    const {
        count,
        setCount
    } = ChatHook()


    return(
        <ChatBlock>
            <BGChat
                status={visible}
                onClick={() => chatModalStatusEvent(false)}
            />
            <ChatTemplate
                setCount={setCount}
                chatVisible={visible}
                setVisible={chatModalStatusEvent}
            />
            <Badge
                count={count}
                offset={[-6, 6]}
            >
                <ChatButton onClick={() => chatModalStatusEvent(true)}><PaperPlaneSvg/></ChatButton>
            </Badge>

        </ChatBlock>
    )
}