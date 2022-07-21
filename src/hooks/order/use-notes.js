import {useCallback, useEffect} from 'react'
import {orderListMount, updateOrderMount} from '../../models/order-models'
import {showModal} from '../../models/widgets'
import {useHistory} from 'react-router-dom'

const initialParams = {
    limit: 20,
    offset: 0
}

export function useNotes() {
    const {push} = useHistory()

    const getOrders = useCallback((params) => {
        orderListMount(params)
    }, [])

    const updateOrder = useCallback((id) => {
        const params = {
            id,
            data: {
                status: -1
            }
        }
        updateOrderMount(params)
    }, [])

    const handleShowQrCode = useCallback((data, renderModal) => {
        if (data.qrcodeBase64) {
            showModal(renderModal(data))
        } else {
            if (data.status === 5 && !data.rates) {
                push(`/reviews/add/${data.id}`)
            }
        }
    }, [push])

    useEffect(() => {
        getOrders(initialParams)
    }, [getOrders])

    return {updateOrder, handleShowQrCode}
}