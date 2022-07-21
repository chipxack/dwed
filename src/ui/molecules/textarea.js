import React from "react";
import {TextAreaSystemBlock} from "../atoms";
import {withTheme} from "styled-components";


const TextAreaSystemView = (props) => {
    const {
        change,
        status
    } = props


    return (
        <TextAreaSystemBlock status={status ? status : 'default'} theme={props.theme.main}>
            <textarea
                {...props}
                onChange={(e) => change(e.target.value)}
            />
        </TextAreaSystemBlock>
    )
}

export const TextAreaSystem = withTheme(TextAreaSystemView);
