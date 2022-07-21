import React from 'react'
import {StyledTitle} from "../atoms";

export const Title = ({children, ...props}) => {
    return (
        <StyledTitle
            {...props}
        >
            {children}
        </StyledTitle>
    )
}