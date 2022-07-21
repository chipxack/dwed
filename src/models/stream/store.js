import {combine, createStore} from 'effector'
import {
    fetchAnnouncementList,
    fetchMoreStreamChatList,
    fetchMyStreamInfo,
    fetchStreamChatList,
    fetchStreamInfo,
    fetchStreamList
} from './effects'
import {fetchAllStreams} from '../user-models/effects'
import {removeSchedule, streamChatMessageEvent} from './events'
import {allStreamMount} from '../user-models'
import {makeCommonStoreList, makeStoreListStatus} from '../../utils/store-utils'
// import {removeMyPost} from "../tape/events";


const $streamList = createStore({loading: false, data: [], result: {}, error: false, forceLoading: 0})
    .on(fetchStreamList.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchStreamList.fail, (state, error) => (
        {...state, error: error.response, data: [], result: {}, forceLoading: false})
    )
    .on(fetchStreamList.finally, (state, res) => {
        return {
            ...state,
            error: false,
            result: res.result.data,
            forceLoading: false
        }
    })

const $streamChatList = createStore({
    loading: false,
    data: [],
    result: {results: []},
    error: false,
    forceLoading: false
})
    .on(fetchStreamChatList.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchStreamChatList.fail, (state, error) => (
        {...state, error: error.response, data: [], result: {}, forceLoading: false})
    )
    .on(fetchStreamChatList.finally, (state, res) => {
        return {
            ...state,
            error: false,
            result: res.result.data,
            forceLoading: false
        }
    })
    .on(streamChatMessageEvent, (state, res) => {
        const data = []
        if (res && res.action && res.action === 'add') {
            data.push(res.object)
        }
        if (state.result && state.result.results && state.result.results.length > 0) {
            state.result.results.map(item => data.push(item))
        }
        return {
            ...state,
            error: false,
            result: {
                ...state.result,
                results: data
            },
            forceLoading: false
        }
    })
    .on(fetchMoreStreamChatList.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchMoreStreamChatList.fail, (state, error) => (
        {...state, error: error.response, data: [], result: {}, forceLoading: false})
    )
    .on(fetchMoreStreamChatList.finally, (state, res) => {
        const data = [...state.result.results]
        res.result.data.results.map(item => data.push(item))
        return {
            ...state,
            error: false,
            result: {
                ...res.result.data,
                results: data
            },
            forceLoading: false
        }
    })

const $myStreamInfo = createStore({loading: false, data: [], result: {}, error: false, forceLoading: false})
    .on(fetchMyStreamInfo.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchMyStreamInfo.fail, (state, error) => (
        {...state, error: error.response, data: [], result: {}, forceLoading: false})
    )
    .on(fetchMyStreamInfo.finally, (state, res) => {
        return {
            ...state,
            error: false,
            result: res.result.data,
            forceLoading: false
        }
    })


const $allStreamsList = createStore({
    loading: false,
    data: [],
    result: {},
    error: false,
    skeleton: undefined,
    status: undefined
})
    .on(allStreamMount, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed
        }
    })
    .on(fetchAllStreams.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchAllStreams.fail, (state, {error}) => ({...state, error}))
    .on(fetchAllStreams.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)

        return {
            ...processed
        }
    })

const $streamInfo = createStore({loading: false, data: [], result: {}, error: false, forceLoading: false})
    .on(fetchStreamInfo.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchStreamInfo.fail, (state, error) => (
        {...state, error: error.response, data: [], result: {}, forceLoading: false})
    )
    .on(fetchStreamInfo.finally, (state, res) => {
        return {
            ...state,
            error: false,
            result: res.result.data,
            forceLoading: false
        }
    })

const $announcementList = createStore({loading: false, data: [], result: {}, error: false, forceLoading: false})
    .on(fetchAnnouncementList.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchAnnouncementList.fail, (state, error) => (
        {...state, error: error.response, data: [], result: {}, forceLoading: false})
    )
    .on(fetchAnnouncementList.finally, (state, res) => {
        return {
            ...state,
            error: false,
            data: res.result.data,
            forceLoading: false
        }
    })
    .on(removeSchedule, (state, pending) => {
        console.log(state, pending)

        return {
            ...state,
            data: {
                ...state.data,
                results: [...state.data.results.filter(value => value.id !== pending)]
            }
        }
    })


export const $isDataPending = combine({
    $streamList,
    $myStreamInfo,
    $allStreamsList,
    $streamInfo,
    $streamChatList,
    $announcementList
})