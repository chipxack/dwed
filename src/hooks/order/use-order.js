import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {orderMount, orderOfferingsMount} from '../../models/order-models'
import {useListQuery} from '../common'
import {FETCHING_STATUS} from '../../constants'

export function useOrder() {
    const {order_id} = useParams()
    const {getQueryParams} = useListQuery({limit: 10, page: 1})

    useEffect(() => {
        if (order_id) {
            orderMount(order_id)
        }
    }, [order_id])

    useEffect(() => {
        const queryParams = getQueryParams(FETCHING_STATUS.INIT)
        const data = {
            ...queryParams
        }
        if (order_id) {
            data['order_id'] = order_id
            orderOfferingsMount(data)
        }

    }, [getQueryParams, order_id])
}