import React from 'react'
import {OrderInfo, OrderOfferings} from '../maleculas'
import {useOrder} from '../../../hooks/order'

export const RecordDetail = () => {
    useOrder()
    return (
        <>
            <OrderInfo/>
            <OrderOfferings/>
        </>
    )
}