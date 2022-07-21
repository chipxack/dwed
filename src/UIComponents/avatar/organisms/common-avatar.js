import React from 'react'
import {StyledAvatar} from "../atoms";

export const CommonAvatar = ({imgUrl, size, active, shape}) => {
    return (
        <StyledAvatar
            src={imgUrl}
            active={Boolean(Number(active)) ? '1' : '0'}
            size={size ?? 64}
            shape={shape || 'circle'}
        />
    )
}