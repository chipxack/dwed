import {combine, createStore} from 'effector'
import {clientListMount, employeeListMount, financeListMount, offerStatisticListMount, requestListMount} from './events'
import {makeCommonStoreList, makeStoreListStatus} from '../../utils/store-utils'
import {
    fetchClientList,
    fetchEmployeeList,
    fetchFinanceList,
    fetchOfferStatisticList,
    fetchRequestList
} from './effects'

const $clients = createStore({
    error: false,
    loading: false,
    data: [],
    result: {},
    status: undefined,
    skeleton: undefined
})
    .on(clientListMount, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed
        }
    })
    .on(fetchClientList.pending, (state, loading) => ({...state, loading}))
    .on(fetchClientList.fail, (state, {error}) => ({...state, error}))
    .on(fetchClientList.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)
        return {
            ...processed
        }
    })

const $offeringStatList = createStore({
    loading: false,
    error: false,
    result: {},
    data: [],
    skeleton: undefined,
    status: undefined
})
    .on(offerStatisticListMount, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed
        }
    })
    .on(fetchOfferStatisticList.pending, (state, loading) => ({...state, loading}))
    .on(fetchOfferStatisticList.fail, (state, {error}) => ({...state, error}))
    .on(fetchOfferStatisticList.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)
        return {
            ...processed
        }
    })

const $employeeList = createStore({
    loading: false,
    error: false,
    result: {},
    data: [],
    skeleton: undefined,
    status: undefined
})
    .on(employeeListMount, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed
        }
    })
    .on(fetchEmployeeList.pending, (state, loading) => ({...state, loading}))
    .on(fetchEmployeeList.fail, (state, {error}) => ({...state, error}))
    .on(fetchEmployeeList.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)
        return {
            ...processed
        }
    })

const $financeList = createStore({
    loading: false,
    error:false,
    result: {},
    data: [],
    skeleton: undefined,
    status: undefined,
})
    .on(financeListMount, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)

        return {
            ...processed
        }
    })
    .on(fetchFinanceList.pending, (state, loading) => ({...state, loading}))
    .on(fetchFinanceList.fail, (state, {error}) => ({...state, error}))
    .on(fetchFinanceList.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)
        return {
            ...processed
        }
    })

const $requestList = createStore({
    loading: false,
    error:false,
    result: {},
    data: [],
    skeleton: undefined,
    status: undefined,
})
    .on(requestListMount, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)

        return {
            ...processed
        }
    })
    .on(fetchRequestList.pending, (state, loading) => ({...state, loading}))
    .on(fetchRequestList.fail, (state, {error}) => ({...state, error}))
    .on(fetchRequestList.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)
        return {
            ...processed
        }
    })


export const $statisticModel = combine({
    $clients,
    $offeringStatList,
    $employeeList,
    $financeList,
    $requestList
})