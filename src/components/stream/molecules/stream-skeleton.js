import React from 'react'
import {StreamBg, StreamBody, StreamTitle} from '../atoms'
import {StreamSectionDiv} from '../atoms/block'
import {SkeletonUI} from '../../../UIComponents/global-styles'

export const StreamSkeleton = () => {
    return (
        <StreamSectionDiv>
            <StreamBg>
                <SkeletonUI variant='rect' height={176} width='100%'/>
            </StreamBg>
            <StreamBody>
                <SkeletonUI variant='circle' height={56} width={56}/>
                <StreamTitle style={{marginLeft: 16}}>
                    <SkeletonUI variant='text' height={20} width='80%'/>
                    <SkeletonUI variant='text' height={20} width='60%'/>
                </StreamTitle>
            </StreamBody>
        </StreamSectionDiv>
    )
}