import React from "react";
import {FastChatBodySection} from "../atoms";


export const FastChatBody = ({data}) => {


    return (
        <FastChatBodySection>
            <div>
                {data?.text}
            </div>
        </FastChatBodySection>
    )
}