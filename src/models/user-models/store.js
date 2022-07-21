import {combine, createStore} from 'effector'
import {getUserListEffect, getUserEffect, fetchUserSubscribe, fetchUserSubsMe, fetchUserSubsMy} from './effects'
import {
    getUserListEvent,
    getUserEvent, getUserFromIDBEvent,
    onlineUserMount,
    onlineUserMountFromIDB, resetUser,
    userSubsMeMount,
    userSubsMyMount, updateCouponCheckedEvent
} from './events'
import {idbSet} from '../../config/db'
import {
    makeCommonStore,
    makeCommonStoreList,
    makeStoreListStatus,
    storeListForceLoadingWithKey,
    storeListWithKey
} from '../../utils/store-utils'
import {IDB_OBJ_STORE} from '../../constants/idb'
import {storeNames} from '../../utils/app-utils'

const $userList = createStore({
    loading: false,
    data: [],
    result: {},
    skeleton: undefined,
    status: undefined,
    error: false
})
    .on(getUserListEvent, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed
        }
    })
    .on(getUserListEffect.pending, (state, pending) => ({...state, loading: pending}))
    .on(getUserListEffect.fail, (state, {error}) => ({
        ...state, error
    }))
    .on(getUserListEffect.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)

        return {
            ...processed
        }
    })
    .on(updateCouponCheckedEvent, (state, {username, status}) => {
        let data = state.data
        const idx = data.findIndex(item => item.username === username)

        if(idx !== -1) {
            data = [
                ...data.slice(0, idx),
                {...data[idx], check_coupon: status},
                ...data.slice(idx + 1)
            ]
        }

        return {
            ...state,
            data
        }
    })
    .reset(resetUser)

const $userInfo = createStore({loading: false, data: {}, error: false, skeleton: undefined, status: undefined})
    .on(getUserEvent, (state, {status}) =>{
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed
        }
    })
    .on(getUserFromIDBEvent, (state, payload) => ({...payload}))
    .on(getUserEffect.pending, (state, loading) => ({...state, loading}))
    .on(getUserEffect.fail, (state, {error}) => ({...state, error}))
    .on(getUserEffect.done, (state, res) => {
        const processed = makeCommonStore(state, res)
        const storeForIDB = {
            ...processed,
            loading: false,
            error: false
        }

        if(storeNames && storeNames.indexOf(IDB_OBJ_STORE.USER_INFO) !== -1) {
            idbSet(IDB_OBJ_STORE.USER_INFO, res.params.account, {store: storeForIDB, date: new Date()})
        }


        return {
            ...processed
        }
    })
    .reset(resetUser)

const $userSubscribe = createStore({loading: false, data: {}, error: false})
    .on(fetchUserSubscribe.pending, (state, loading) => ({...state, loading}))
    .on(fetchUserSubscribe.fail, (state, error) => ({
        ...state, error: error.response, data: {}
    }))
    .on(fetchUserSubscribe.done, (state, response) => ({
        ...state, error: false, data: response.result.data
    }))

const $userSubsMe = createStore({loading: false, data: {}, result: {}, forceLoading: {}})
    .on(userSubsMeMount, (state, {username}) => {
        const processed = storeListForceLoadingWithKey(state, username, 1)
        return {
            ...state,
            ...processed
        }
    })
    .on(fetchUserSubsMe.pending, (state, loading) => ({...state, loading}))
    .on(fetchUserSubsMy.fail, (state, {error}) => {
        return {
            ...state
        }
    })
    .on(fetchUserSubsMe.done, (state, {result: response, params: {username, clear, params}}) => {
        const processed = storeListWithKey({
            response: response.data,
            state,
            clear,
            key: username,
            ...params
        })

        return {
            ...state,
            ...processed
        }
    })

const $userSubsMy = createStore({loading: false, data: {}, result: {}, forceLoading: {}})
    .on(userSubsMyMount, (state, {username}) => {
        const processed = storeListForceLoadingWithKey(state, username, 1)
        return {
            ...state,
            ...processed
        }
    })
    .on(fetchUserSubsMe.pending, (state, loading) => ({...state, loading}))
    .on(fetchUserSubsMy.fail, (state, {error}) => {
        return {
            ...state
        }
    })
    .on(fetchUserSubsMy.done, (state, {result: response, params: {username, clear, params}}) => {
        const processed = storeListWithKey({
            response: response.data,
            state,
            clear,
            key: username,
            ...params
        })

        return {
            ...state,
            ...processed
        }
    })


const $onlineUser = createStore({data: {}})
    .on(onlineUserMount, (state, payload) => ({...state, data: {...state.data, ...payload}}))
    .on(onlineUserMountFromIDB, (state, payload) => ({...state, data: {...state.data, ...payload}}))

$onlineUser.watch((state) => {
    if (Object.values(state.data).length > 0) {
        idbSet('online_accounts', 'online_accounts', JSON.stringify(state.data))
            .then(() => {

            })
    }
})

export const $userModel = combine({
    $userInfo,
    $userList,
    $userSubscribe,
    $onlineUser,
    $userSubsMe,
    $userSubsMy
})


