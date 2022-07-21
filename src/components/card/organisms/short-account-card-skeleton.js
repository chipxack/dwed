import React from 'react'
import {ShortAccountCardContent, ShortAccountCardImg, ShortAccountCardWrapper} from "../atoms";
import {SkeletonUI} from "../../../UIComponents/global-styles";

export const ShortAccountCardSkeleton = ({animation, size, direction}) => (
    <ShortAccountCardWrapper direction={direction}>
        <ShortAccountCardImg>
            <SkeletonUI
                animation={animation || 'wave'}
                variant='circle' width={size || 40}
                height={size || 40}
            />
        </ShortAccountCardImg>
        <ShortAccountCardContent>
            <SkeletonUI
                variant='text'
                height={24}
                width='100%'
                animation={animation || 'wave'}
            />
            <SkeletonUI
                variant='text'
                height={16}
                width='100%'
                animation={animation || 'wave'}
            />
        </ShortAccountCardContent>
    </ShortAccountCardWrapper>
)