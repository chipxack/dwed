import React from 'react'
import {StyledText} from "../atoms";

export const Text = ({children, ...props}) => {
    return (
        <StyledText {...props}>{children}</StyledText>
    )
}