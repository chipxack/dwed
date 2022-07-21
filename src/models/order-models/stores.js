import {combine, createStore} from 'effector'
import {
    fetchCart,
    fetchOrderInfo,
    fetchOrderOfferings,
    fetchOrders,
    fetchOrgCart,
    fetchUpdateCart,
    fetchUpdateOrder
} from './effects'
import {cartSpecialistsMount, cartTotalCostMount, orderOfferingsMount} from './events'
import {generateQrCodeBase64} from '../../utils/qrUtils'
import {makeCommonStoreList, makeStoreListStatus} from '../../utils/store-utils'
import {getMeetTime} from '../../utils/dateUtils'

const $cart = createStore({loading: false, data: [], result: {}, error: false})
    .on(fetchOrgCart.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrgCart.fail, (state, error) => ({
        ...state, error: error.response, result: {}, data: []
    }))
    .on(fetchOrgCart.done, (state, res) => {
        const data = res.result.data.results.map(item => ({...item, key: item.offering.id}))

        return {
            ...state,
            result: res.result.data,
            data
        }
    })
    .on(fetchUpdateCart.done, (state, res) => {
        const {result: {data}, params} = res
        const idx = state.data.findIndex(item => item.offering.id === data.offering.id)
        const newData = [...state.data.slice(0, idx), {...data, key: data.offering.id}, ...state.data.slice(idx + 1)]
        const result = {...state.result, total_cost: params.total_cost}

        if (params.action) {
            params.action()
        }

        return {...state, data: newData, result}
    })

const $allCart = createStore({loading: false, data: [], result: [], specialists: [], error: false})
    .on(fetchCart.pending, (state, loading) => ({...state, loading}))
    .on(fetchCart.fail, (state, error) => ({
        ...state, error: error.response, data: [], result: [], specialist: []
    }))
    .on(fetchCart.done, (state, res) => ({
        ...state,
        data: res.result.data.map(item => ({
            id: item.seller_type === 'org' ? item.seller.slug_name : item.seller.username,
            path: item.seller_type === 'org' ? `/${item.seller.slug_name}/offers` : `/@${item.seller.username}/offers`,
            image: item.seller_type === 'org' ? item.seller.logo : item.seller.avatar,
            name: item.seller_type === 'org'
                ? item.seller.name
                : item.seller.full_name && item.full_name.trim().length > 0 ? item.full_name : `@${item.username}`,
            text: item.seller_type === 'org' ? item.seller.category.name : item.seller.main_cat.name,
            isOfficial: item.seller.is_official,
            specialists: item.seller.specialists ? item.seller.specialists : null,
            total: item.total,
            seller_type: item.seller_type
        })),
        result: res.result.data,
        error: false,
    }))
    .on(cartSpecialistsMount, (state, data) => ({...state, specialists: data}))
    .on(cartTotalCostMount, (state, {seller, total_cost}) => {
        let data = state.data
        const idx = data.findIndex(item => item.id === seller)

        if (idx !== -1) {
            data = [
                ...data.slice(0, idx),
                {...data[idx], total: {count: data[idx].total.count, cost: total_cost}},
                ...data.slice(idx + 1)
            ]
        }

        return {
            ...state,
            data
        }
    })

const $ordersList = createStore({loading: false, data: [], result: {}})
    .on(fetchOrders.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrders.fail, (state, {error}) => ({
        ...state, error, data: [], result: {}
    }))
    .on(fetchOrders.done, (state, {result: {data}}) => {
        const transformData = data.results.map(item => ({
            org: item.responsible.org,
            specialist: {...item.responsible.user, spec_cat: item.responsible.spec_cat},
            date: item.meet_date,
            print_date: getMeetTime(item.meet_date, item.responsible.operating_mode),
            status: item.status,
            qrcodeBase64: item.qr_code && generateQrCodeBase64(item.qr_code),
            key: item.id,
            id: item.id,
            rates: !!item.rates,
            todays_queue: item.todays_queue
        }))

        return {
            ...state,
            result: data,
            data: transformData
        }
    })
    .on(fetchUpdateOrder.pending, (state, loading) => ({...state, loading}))
    .on(fetchUpdateOrder.done, (state, {result: {data: fetchedData}}) => {
        const {data} = state
        const idx = data.findIndex(item => item.id === fetchedData.id)
        const item = data.find(item => item.id === fetchedData.id)
        const newData = [...data.slice(0, idx), {...item, status: fetchedData.status}, ...data.slice(idx + 1)]
        return {
            ...state,
            data: newData
        }
    })

const $orderInfo = createStore({loading: false, data: {}, error: false})
    .on(fetchOrderInfo.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrderInfo.fail, (state, {error}) => ({
        ...state, data: {}, error
    }))
    .on(fetchOrderInfo.done, (state, {result: {data}}) => ({
        ...state, data
    }))

const $orderOfferings = createStore({
    data: [],
    result: {},
    skeleton: undefined,
    status: undefined,
    error: false,
    loading: false
})
    .on(orderOfferingsMount, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed
        }
    })
    .on(fetchOrderOfferings.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrderOfferings.fail, (state, {error}) => ({...state, error}))
    .on(fetchOrderOfferings.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)
        return {
            ...processed
        }
    })

export const $orderModel = combine({
    $cart,
    $allCart,
    $ordersList,
    $orderInfo,
    $orderOfferings
})