import {combine, createStore} from 'effector'
import {
    fetchAccountSpec,
    fetchAccountSpecUpdate,
    fetchJobRequestDetail,
    fetchJobRequestOffer,
    fetchOrgSpecRecords,
    fetchOrgSpecSavedComments,
    fetchOrgSpecSavedCommentsList,
    fetchSelfJob,
    fetchSelfRequest,
    fetchSelfRequestDetail,
    fetchSelfRequestOffer,
    fetchSpecRequests,
    fetchUpdatedOrgSpecRequestDetail,
    fetchUpdatedSelfRequestDetail,
    fetchUpdateSelfempl,
} from './effects'
import {addRequestFromSocket, showSpecCalendar, showSpecSchedule, specOrderForceLoading} from './events'
import moment from 'moment'
import {commonStoreList, makeCommonStore} from '../../utils/store-utils'

const $accountSpec = createStore({loading: false, data: {}, error: false})
    .on(fetchAccountSpec.pending, (state, pending) => ({...state, loading: pending, data: pending ? {} : state.data}))
    .on(fetchAccountSpec.fail, (state, error) => ({...state, data: {}, error: error.result.data}))
    .on(fetchAccountSpec.done, (state, res) => ({
        ...state, data: res.result.data, error: false,
    }))
    .on(fetchAccountSpecUpdate.done, (state, res) => {
        if (res.params && res.params.actions) {
            res.params.actions()
        }
        return {
            ...state, data: res.result.data, error: false,
        }
    })
    .on(fetchSelfJob.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchSelfJob.fail, (state, error) => ({...state, data: [], error: error.response}))
    .on(fetchSelfJob.done, (state, res) => {
        return {...state, data: res.result.data, error: false}
    })
    .on(fetchUpdateSelfempl.done, (state, res) => {
        return {...state, data: res.result.data, error: false}
    })

const $specSettings = createStore({showCalendar: false, showSchedule: false})
    .on(showSpecCalendar, (state, status) => {
        return {
            ...state,
            showCalendar: status,
        }
    })
    .on(showSpecSchedule, (state, status) => ({...state, showSchedule: status}))

const $specRequests = createStore({loading: false, data: [], result: {}, error: false})
    .on(addRequestFromSocket, (state, data) => {
        const currentData = state.data.slice(0, (state.data.length - 1))

        const newData = {
            ...data,
            key: data.id,
            id: data.id,
            date: moment(data.meet_date).format('DD.MM.YYYY HH:ss'),
            full_name: data.user.full_name,
            offerings: {
                firstOffer: data.offerings[0].name,
                more: data.offerings.length > 1 && `еще ${data.offerings.length - 1}`,
            },
        }
        return {
            ...state,
            data: [{...newData}, ...currentData],
        }
    })
    .on(fetchSpecRequests.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchSpecRequests.fail, (state, error) => ({...state, data: [], result: {}, error: error.response}))
    .on(fetchSpecRequests.done, (state, res) => {
        return {
            ...state,
            data: res.result.data.results.map(item => ({
                ...item,
                key: item.id,
                full_name: item.user.full_name,
                offerings: {
                    firstOffer: item.offerings.length > 0 && item.offerings.find((item, idx) => idx === 0).name,
                    more: item.offerings.length > 1 && `еще ${item.offerings.length - 1}`,
                },
                date: moment(item.meet_date).format('DD.MM.YYYY HH:ss'),
            })),
            result: res.result.data,
            error: false,
        }
    })
    .on(fetchSelfRequest.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchSelfRequest.fail, (state, error) => ({...state, error: error.response, data: [], result: {}}))
    .on(fetchSelfRequest.done, (state, res) => {
        return {
            ...state,
            data: res.result.data.results.map(item => ({
                ...item,
                key: item.id,
                full_name: item.user.full_name,
                offerings: {
                    firstOffer: item.offerings.length > 0 && item.offerings.find((item, idx) => idx === 0).name,
                    more: item.offerings.length > 1 && `еще ${item.offerings.length - 1}`,
                },
                date: moment(item.meet_date).format('YYYY/MM/DD HH:ss'),
            })),
            result: res.result.data,
            error: false,
        }
    })

const $jobRequestOffer = createStore({
    loading: false,
    data: [],
    result: {},
    isEmpty: false,
    error: false,
    forceLoading: false,
})
    .on(fetchJobRequestOffer.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchJobRequestOffer.fail, (state, err) => ({
        ...state, data: [], result: {}, error: err.response, forceLoading: false,
    }))
    .on(fetchJobRequestOffer.done, (state, {result: {data}}) => {
        return {
            ...state,
            data: data.results,
            result: data,
            forceLoading: false,
            isEmpty: data.count === 0,
        }
    })
    .on(fetchSelfRequestOffer.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchSelfRequestOffer.fail, (state, err) => ({
        ...state, data: [], result: {}, error: err.response, forceLoading: false,
    }))
    .on(fetchSelfRequestOffer.done, (state, {result: {data}}) => {
        return {
            ...state,
            data: data.results,
            result: data,
            forceLoading: false,
            isEmpty: data.count === 0,
        }
    })
    .on(specOrderForceLoading, (state, payload) => {
        let tmp = {}
        if (payload) {
            tmp = payload
        }
        return {...state, forceLoading: !payload, ...tmp}
    })

const $jobRequestDetail = createStore({loading: false, data: {}, error: false})
    .on(fetchJobRequestDetail.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchJobRequestDetail.fail, (state, err) => ({...state, data: {}, error: err.response}))
    .on(fetchJobRequestDetail.done, (state, res) => {
        return {
            ...state,
            data: res.result.data,
        }
    })
    .on(fetchSelfRequestDetail.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchSelfRequestDetail.fail, (state, err) => ({...state, data: {}, error: err.response}))
    .on(fetchSelfRequestDetail.done, (state, res) => {
        return {
            ...state,
            data: res.result.data,
        }
    })
    .on(fetchUpdatedSelfRequestDetail.done, (state, res) => ({
        ...state, data: res.result.data,
    }))
    .on(fetchUpdatedOrgSpecRequestDetail.done, (state, res) => {
        if (res.params && res.params.action) {
            res.params.action()
        }
        return {
            ...state, data: res.result.data,
        }
    })

const $records = createStore({loading: false, data: [], result: {}, error: false})
    .on(fetchOrgSpecRecords.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrgSpecRecords.fail, (state, {error}) => ({
        ...state, data: [], result: {}, error,
    }))
    .on(fetchOrgSpecRecords.done, (state, {result: {data}}) => {
        const newData = data.results.map(item => ({
            key: item.id,
            ...item,
        }))

        return {
            ...state, result: data, data: newData,
        }
    })

const $spcSavedCommentsList = createStore({loading: false, error: false, data: [], result: {}})
    .on(fetchOrgSpecSavedCommentsList.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrgSpecSavedCommentsList.fail, (state, {error}) => ({
        ...state, error,
    }))
    .on(fetchOrgSpecSavedCommentsList.done, (state, {result, params}) => {
        const processed = commonStoreList({
            response: result.data,
            state,
            clear: params.clear,
            limit: params.params.limit,
        })
        return {
            ...state,
            ...processed,
        }
    })

const $spcSaveComments = createStore({loading: false, data: {}, error: false})
    .on(fetchOrgSpecSavedComments.done, (state, res) => {
        const processed = makeCommonStore(state, res)
        return {
            ...processed,
        }
    })


export const $jobModel = combine({
    $accountSpec,
    $specSettings,
    $specRequests,
    $jobRequestOffer,
    $jobRequestDetail,
    $records,
    $spcSavedCommentsList,
    $spcSaveComments
})

