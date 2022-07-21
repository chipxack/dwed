import React from 'react'
import {ShortAccountCard} from '../../card'

export const SubsItem = ({item}) => {
    return (
        <ShortAccountCard
            {...item}
            truncateLength={16}
            direction='vertical'
        />
    )
}