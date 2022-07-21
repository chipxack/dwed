import React from 'react'
import {SkeletonUI, SkeletonWrapper} from "../../../UIComponents/global-styles";

export const ProductCardSkeleton = ({height, animation}) => {
    return (
        <SkeletonWrapper>
            <SkeletonUI
                variant='rect'
                animation={animation || 'wave'}
                height={height}
            />
            <SkeletonUI
                variant='text'
                offset={8}
                height={40}
                width='90%'
                animation={animation || 'wave'}
            />
            <SkeletonUI
                variant='text'
                animation={animation || 'wave'}
                height={24}
                width='90%'
            />
        </SkeletonWrapper>
    )
}