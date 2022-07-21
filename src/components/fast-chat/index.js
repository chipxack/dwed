import React from "react";
import {FastChatBody, FastChatForm, FastChatHeader} from "./template";
import {FastChatSection} from "./atoms";


export const FastChat = ({data}) => {

    return (
        <FastChatSection>
            <FastChatHeader data={data}/>
            <FastChatBody data={data}/>
            <FastChatForm id={data.id} username={data.sender.username}/>
        </FastChatSection>
    )
}