import {FETCHING_STATUS, STORE_STATUS} from '../constants'

export function makeStoreListWithKey(state, {result: response, params}, key) {
    const {results: list, ...configs} = response.data
    const {status, params: {limit}} = params
    const data = {...state.data}
    const result = {...state.result}
    const skeleton = {...state.skeleton}
    const stateStatus = {...state.status}

    const nextStatus = status === FETCHING_STATUS.NEXT || status === FETCHING_STATUS.NEXT_FILTER
    const initStatus = status === FETCHING_STATUS.INIT || status === FETCHING_STATUS.FILTER

    result[key] = result[key]
        ? {...result[key], ...configs, nextOffset: nextStatus ? result[key].nextOffset + limit : limit}
        : {...configs, nextOffset: limit}
    skeleton[key] = false

    data[key] = initStatus ? list : data[key] ? [...data[key], ...list] : list
    stateStatus[key] = status

    return {
        ...state,
        data,
        skeleton,
        result,
        status: stateStatus
    }
}

export const makeCommonStoreList = (state, {result: response, params}) => {
    const {results: list, ...configs} = response.data
    const {status, params: {limit}} = params
    const nextStatus = status === FETCHING_STATUS.NEXT || status === FETCHING_STATUS.NEXT_FILTER
    const initStatus = status === FETCHING_STATUS.INIT || status === FETCHING_STATUS.FILTER

    const result = {...configs, nextOffset: nextStatus ? state.result.nextOffset + limit : limit}
    const data = initStatus ? list : [...state.data, ...list]

    return {
        ...state,
        result,
        data,
        status,
        skeleton: false
    }
}

export const makeCommonStore = (state, {result: response, params}) => {
    const {status} = params

    return {
        ...state,
        data: response.data,
        status,
        skeleton: false
    }
}

export function makeStoreListStatusWithKey(state, status, key) {
    const stateStatus = {...state.status}
    const skeleton = {...state.skeleton}
    skeleton[key] = status === FETCHING_STATUS.INIT || status === FETCHING_STATUS.FILTER
    stateStatus[key] = status

    return {
        ...state,
        status: stateStatus,
        skeleton
    }
}

export const makeStoreListStatus = (state, status) => {
    const skeleton = status === FETCHING_STATUS.INIT || status === FETCHING_STATUS.FILTER
    return {
        ...state,
        skeleton,
        status
    }
}

export const checkStatus = (status) => !status || (status && status !== FETCHING_STATUS.INIT && status !== FETCHING_STATUS.NEXT)


/*--------------------------------------------------------------------------------------------*/

export function storeListWithKey({response, state, key, clear, limit, search}) {
    const {results: list, ...configs} = response
    const data = {...state.data}
    const result = {...state.result}
    const forceLoading = {...state.forceLoading}
    const status = {...state.status}
    result[key] = result[key]
        ? {...result[key], ...configs, nextOffset: result[key].nextOffset + limit, search}
        : {...configs, nextOffset: limit, search}
    data[key] = clear
        ? list
        : data[key]
            ? [...data[key], ...list]
            : list
    forceLoading[key] = 2

    if (search) {
        status[key] = STORE_STATUS.SEARCHED
    } else {
        status[key] = STORE_STATUS.LOADED
    }

    return {
        result,
        data,
        forceLoading,
        status
    }
}

export function storeListWithKey2({response, state, key, statusType, limit, offset}) {
    const {results: list, ...configs} = response
    const data = {...state.data}
    const result = {...state.result}
    const status = {...state.status}
    const isInit = statusType && (statusType === STORE_STATUS.INIT || statusType === STORE_STATUS.RE_INIT)
    result[key] = result[key]
        ? {...result[key], ...configs, nextOffset: isInit ? limit : result[key].nextOffset + limit}
        : {...configs, nextOffset: limit}

    data[key] = statusType && (statusType === STORE_STATUS.INIT || statusType === STORE_STATUS.RE_INIT)
        ? list
        : data[key]
            ? [...data[key], ...list]
            : list
    if (statusType) {
        if (statusType === STORE_STATUS.INIT) {
            status[key] = STORE_STATUS.LOADED
        } else if (statusType === STORE_STATUS.RE_INIT) {
            status[key] = STORE_STATUS.SEARCHED
        } else {
            status[key] = statusType
        }
    }

    return {
        result,
        data,
        status
    }
}

export function storeListForceLoadingWithKey(state, key, value) {
    const forceLoading = {...state.forceLoading}

    if (forceLoading[key] === undefined) {
        forceLoading[key] = value
    }

    return {
        forceLoading
    }
}


export function commonStoreList({response, state, clear, limit}) {
    const {results: list, ...configs} = response
    const result = {...configs, nextOffset: state.result.nextOffset ? state.result.nextOffset + limit : limit}
    const data = clear ? list : [...state.data, ...list]

    return {
        result,
        data
    }
}

export function storeWithKey({response, state, key}) {
    const data = {...state.data}
    data[key] = response
    return {
        data
    }
}

export const forceLoadingRejection = (status) => status === 0 || status === -1

export const statusRejection = (status) => status === undefined