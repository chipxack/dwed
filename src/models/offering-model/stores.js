import {combine, createStore} from 'effector'
import {
    fetchAllOfferings,
    fetchOfferingDetail,
    fetchOfferingGallery,
    fetchOfferingParams,
    fetchOfferingTranslate,
    fetchOrgOfferingInfo,
    fetchOrgOfferings,
    fetchUserOfferingGroup,
    fetchUserOfferingInfo,
    getOfferEffect,
    getOfferGalleryEffect,
    getOfferParamsEffect,
    getOrgOfferGroupListEffect,
    getOrgOfferGroupListEffectInfo,
    getOrgOfferListEffect, removeOfferingEffect, removeOrgOfferingGroupEffect
} from './effects'
import {
    allOfferingsMount,
    changeOfferingCartPosition,
    getOfferEvent,
    getOfferFromIDBEvent,
    getOfferGalleryEvent,
    getOfferGalleryFromIDBEvent,
    getOfferParamsEvent,
    getOfferParamsFromIDBEvent,
    getOrgOfferGroupListEvent,
    getOrgOfferGroupListFromIDBEvent,
    getOrgOfferListEvent,
    getOrgOfferListFromIDBEvent,
    orgOfferingsListMount,
    removeOfferingEvent,
    resetOffering,
    resetOfferingInfoStore,
    resetOfferingListStore
} from './events'
import {
    makeCommonStore,
    makeCommonStoreList,
    makeStoreListStatus,
    makeStoreListStatusWithKey,
    makeStoreListWithKey
} from '../../utils/store-utils'
import {idbSet} from '../../config/db'
import {IDB_OBJ_STORE} from '../../constants/idb'
import {defaultStoreState} from '../../data/store'
import {storeNames} from '../../utils/app-utils'

const $allOfferingList = createStore({
    loading: false,
    data: [],
    result: {},
    error: false,
    skeleton: undefined,
    status: undefined
})
    .on(allOfferingsMount, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed
        }
    })
    .on(fetchAllOfferings.pending, (state, loading) => ({...state, loading}))
    .on(fetchAllOfferings.fail, (state, error) => ({
        ...state, result: {}, data: {}, error: error.response
    }))
    .on(fetchAllOfferings.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)

        return {
            ...processed
        }
    })


const $offeringList = createStore({loading: false, data: {}, result: {}, error: false, status: {}, skeleton: {}})
    .on(orgOfferingsListMount, (state, payload) => {
        const processed = makeStoreListStatusWithKey(state, payload.status, payload.organization)
        return {
            ...processed
        }
    })
    .on(fetchOrgOfferings.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrgOfferings.fail, (state, error) => ({
        ...state, result: {}, data: {}, error: error.response
    }))
    .on(fetchOrgOfferings.done, (state, res) => {
        const processed = makeStoreListWithKey(state, res, res.params.organization)

        return {
            ...processed
        }
    })
    .on(removeOfferingEvent, (state, {slug, id}) => {
        const data = {...state.data}

        if (data[slug]) {
            data[slug] = data[slug].filter(item => item.id === id)
        }

        return {
            ...state,
            data
        }
    })
    .on(changeOfferingCartPosition, (state, {id, type, organization}) => {
        const data = {...state.data}

        if (data[organization]) {
            const idx = data[organization].findIndex(item => item.id === id)
            if (idx !== -1) {
                const newItem = {...data[organization][idx], is_in_cart: type === 'add'}
                data[organization] = [...data[organization].slice(0, idx), newItem, ...data[organization].slice(idx + 1)]
            }
        }

        return {
            ...state,
            data,
            forceLoading: false
        }
    })


const $offeringInfo = createStore({loading: false, data: null, error: false})
    .on(fetchOfferingDetail.pending, (state, loading) => ({...state, loading}))
    .on(fetchOfferingDetail.fail, (state, error) => ({
        ...state, error: error.response, data: null
    }))
    .on(fetchOfferingDetail.done, (state, res) => ({
        ...state, data: res.result.data, error: false
    }))
    .on(fetchUserOfferingInfo.pending, (state, loading) => ({...state, loading}))
    .on(fetchUserOfferingInfo.fail, (state, error) => ({
        ...state, data: null, error: error.response
    }))
    .on(fetchUserOfferingInfo.done, (state, res) => ({
        ...state, data: res.result.data, error: false
    }))
    .on(fetchOrgOfferingInfo.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrgOfferingInfo.fail, (state, error) => ({
        ...state, data: null, error: error.response
    }))
    .on(fetchOrgOfferingInfo.done, (state, res) => ({
        ...state, data: res.result.data, error: false
    }))
    .reset(resetOfferingInfoStore)

const $offeringGallery = createStore(({loading: false, data: [], result: null, error: false}))
    .on(fetchOfferingGallery.pending, (state, loading) => ({...state, loading}))
    .on(fetchOfferingGallery.fail, (state, error) => ({
        ...state, data: [], error: error.response, result: null
    }))
    .on(fetchOfferingGallery.done, (state, res) => {
        const data = res.result.data
        const notMainMedia = []
        let main = {}

        for (let i = 0; i < data.length; i++) {
            const tmp = {original: data[i].thumbnail, thumbnail: data[i].thumbnail}
            if (data[i].main) {
                main = tmp
            } else {
                notMainMedia.push(tmp)
            }
        }

        return {
            ...state, error: false, data: [main, ...notMainMedia], result: res.result.data
        }
    })

const $offeringParams = createStore({loading: false, data: [], result: null, error: false})
    .on(fetchOfferingParams.pending, (state, loading) => ({...state, loading}))
    .on(fetchOfferingParams.fail, (state, error) => ({
        ...state, data: [], error: error.response, result: null
    }))
    .on(fetchOfferingParams.done, (state, res) => {
        const tmp = {}
        let data = res.result.data

        for (let i = 0; i < data.length; i++) {
            if (data[i].character.character_type === 1) {
                if (data[i].character.multi_values) {
                    tmp[data[i].character.id] = tmp[data[i].character.id] ? {...tmp[data[i].character.id]} : {}
                    if (tmp[data[i].character.id].custom_value) {
                        tmp[data[i].character.id] = {
                            ...data[i],
                            custom_value: [
                                ...tmp[data[i].character.id].custom_value,
                                {
                                    label: data[i].value,
                                    value: data[i].value_prepared,
                                    id: data[i].id
                                }
                            ]
                        }
                    } else {
                        tmp[data[i].character.id] = {
                            ...data[i],
                            custom_value: [{
                                label: data[i].value,
                                value: data[i].value_prepared,
                                id: data[i].id
                            }]
                        }
                    }
                } else {
                    tmp[data[i].character.id] = {
                        ...data[i],
                        custom_value: data[i].value
                            ? {label: data[i].value, value: data[i].value_prepared, id: data[i].id}
                            : null
                    }
                }
            } else {
                tmp[data[i].character.id] = data[i]
            }
        }

        data = data.filter(item => item.value)
        const tmp1 = {}
        for (let i = 0; i < data.length; i++) {
            if (tmp1[data[i].character.id]) {
                tmp1[data[i].character.id] = {
                    ...data[i],
                    value: `${tmp1[data[i].character.id].value}${data[i].value ? `, ${data[i].value}` : ''}`
                }
            } else {
                tmp1[data[i].character.id] = data[i]
            }
        }

        return {
            ...state, data: Object.values(tmp1), result: tmp, error: false
        }
    })
    .reset(resetOfferingListStore)

const $offeringGroupList = createStore({loading: true, data: [], result: {}, error: false})
    .on(getOrgOfferGroupListEffect.pending, (state, loading) => ({...state, loading}))
    .on(getOrgOfferGroupListEffect.fail, (state, error) => ({
        ...state, error: error.response, data: [], result: {}
    }))
    .on(getOrgOfferGroupListEffect.done, (state, res) => {
        const nextOffset = res.params.params.offset + 10
        const clear = res.params.clear
        const newResult = {...res.result.data, nextOffset}
        const newData = clear ? res.result.data.results : [...state.data, ...res.result.data.results]
        return {
            ...state, error: false, result: newResult, data: newData
        }
    })
    .on(fetchUserOfferingGroup.pending, (state, loading) => ({...state, loading}))
    .on(fetchUserOfferingGroup.fail, (state, error) => ({
        ...state, error: error.response, data: [], result: {}
    }))
    .on(fetchUserOfferingGroup.done, (state, res) => ({
        ...state, error: false, result: res.result.data, data: res.result.data.results
    }))
    .reset(resetOfferingListStore)

const $offeringGroupInfo = createStore({loading: false, data: {}, error: false})
    .on(getOrgOfferGroupListEffectInfo.pending, (state, loading) => ({...state, loading}))
    .on(getOrgOfferGroupListEffectInfo.fail, (state, error) => ({
        ...state, error: error.response, data: {}
    }))
    .on(getOrgOfferGroupListEffectInfo.done, (state, res) => ({
        ...state, data: res.result.data, error: false
    }))
    .reset(resetOfferingInfoStore)

const $offeringTranslate = createStore({loading: false, data: null, result: [], error: false})
    .on(fetchOfferingTranslate.pending, (state, loading) => ({...state, loading}))
    .on(fetchOfferingTranslate.fail, (state, error) => ({
        ...state, error: error.response, data: null, result: []
    }))
    .on(fetchOfferingTranslate.done, (state, res) => {
        const tmp = {}
        const data = res.result.data

        for (let i = 0; i < data.length; i++) {
            tmp['name'] = tmp.name ? {...tmp.name} : {}
            tmp['description'] = tmp.description ? {...tmp.description} : {}
            tmp['name'][data[i].lang] = data[i].name
            tmp['description'][data[i].lang] = data[i].description
        }

        return {
            ...state, error: false, data: tmp, result: data
        }
    })
    .reset(resetOfferingListStore)

const $offerGroupList = createStore(defaultStoreState)
    .on(getOrgOfferGroupListEvent, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed
        }
    })
    .on(getOrgOfferGroupListFromIDBEvent, (state, payload) => ({...payload}))
    .on(getOrgOfferGroupListEffect.pending, (state, loading) => ({...state, loading}))
    .on(getOrgOfferGroupListEffect.fail, (state, {error}) => ({...state, error}))
    .on(getOrgOfferGroupListEffect.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)
        const storeForIDB = {
            ...processed,
            error: false,
            loading: false,
        }

        if (storeNames && storeNames.indexOf(IDB_OBJ_STORE.OFFERING_GROUPS) !== -1) {
            idbSet(IDB_OBJ_STORE.OFFERING_GROUPS, res.params.organization, {store: storeForIDB, date: new Date()})
        }

        return {
            ...processed,
        }
    })
    .on(removeOrgOfferingGroupEffect.done, (state, {params: {id}}) => {
        return {
            ...state,
            result: {...state.result, count: state.result.count - 1},
            data: state.data.filter(item => item.id !== id)
        }
    })
    .reset(resetOffering)

const $offerDetailStore = createStore({loading: false, data: {}, status: undefined, skeleton: undefined})
    .on(getOfferEvent, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed
        }
    })
    .on(getOfferFromIDBEvent, (state, payload) => ({...payload}))
    .on(getOfferEffect.pending, (state, loading) => ({...state, loading}))
    .on(getOfferEffect.fail, (state, {error}) => ({...state, error}))
    .on(getOfferEffect.done, (state, res) => {
        const processed = makeCommonStore(state, res)
        const storeForIDB = {
            ...processed,
            loading: false,
            error: false
        }

        if (storeNames && storeNames.indexOf(IDB_OBJ_STORE.OFFERING_INFO) !== -1) {
            idbSet(IDB_OBJ_STORE.OFFERING_INFO, res.params.id, {store: storeForIDB, date: new Date()})
        }


        return {
            ...processed
        }
    })
    .reset(resetOffering)


const $offerListStore = createStore(defaultStoreState)
    .on(getOrgOfferListEvent, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed
        }
    })
    .on(getOrgOfferListFromIDBEvent, (state, payload) => ({...payload}))
    .on(getOrgOfferListEffect.pending, (state, loading) => ({...state, loading}))
    .on(getOrgOfferListEffect.fail, (state, {error}) => ({...state, error}))
    .on(getOrgOfferListEffect.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)
        const storeForIDB = {
            ...processed,
            error: false,
            loading: false,
        }

        if (storeNames && storeNames.indexOf(IDB_OBJ_STORE.ACCOUNT_OFFERINGS) !== -1) {
            idbSet(IDB_OBJ_STORE.ACCOUNT_OFFERINGS, res.params.organization, {store: storeForIDB, date: new Date()})
        }

        return {
            ...processed
        }
    })
    .on(changeOfferingCartPosition, (state, {id, type}) => {
        let data = [...state.data]

        const idx = data.findIndex(item => item.id === id)
        if (idx !== -1) {
            const newItem = {...data[idx], is_in_cart: type === 'add'}
            data = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)]
        }
        return {
            ...state,
            data,
        }
    })
    .on(removeOfferingEffect.done, (state, {params: {action, id}}) => {
        const data = [...state.data]

        if(action) {
            action()
        }

        return {
            ...state,
            result: {...state.result, count: state.result.count - 1},
            data: data.filter(item => item.id !== id)
        }
    })
    .reset(resetOffering)

const $offerGalleryStore = createStore(defaultStoreState)
    .on(getOfferGalleryEvent, (state, {status}) => ({...state, status: status, skeleton: true}))
    .on(getOfferGalleryFromIDBEvent, (state, payload) => ({...payload}))
    .on(getOfferGalleryEffect.pending, (state, loading) => ({...state, loading}))
    .on(getOfferGalleryEffect.fail, (state, {error}) => ({...state, error}))
    .on(getOfferGalleryEffect.done, (state, {result, params}) => {
        const data = result.data
        const notMainMedia = []
        let main = {}

        for (let i = 0; i < data.length; i++) {
            const tmp = {original: data[i].thumbnail, thumbnail: data[i].thumbnail}
            if (data[i].main) {
                main = tmp
            } else {
                notMainMedia.push(tmp)
            }
        }

        const storeForIDB = {
            ...state,
            skeleton: false,
            data: [main, ...notMainMedia],
            loading: false,
            error: false
        }

        if (storeNames && storeNames.indexOf(IDB_OBJ_STORE.OFFERING_GALLERY) !== -1) {
            idbSet(IDB_OBJ_STORE.OFFERING_GALLERY, params.id, {store: storeForIDB, date: new Date()})
        }

        return {
            ...state,
            skeleton: false,
            data: [main, ...notMainMedia]
        }
    })
    .reset(resetOffering)

const $offerParamsStore = createStore(defaultStoreState)
    .on(getOfferParamsEvent, (state, {status}) => ({...state, status, skeleton: true}))
    .on(getOfferParamsFromIDBEvent, (state, payload) => ({...payload}))
    .on(getOfferParamsEffect.pending, (state, loading) => ({...state, loading}))
    .on(getOfferParamsEffect.fail, (state, {error}) => ({...state, error}))
    .on(getOfferParamsEffect.done, (state, {result: res, params}) => {

        const data = res.data.filter(item => item.value)
        const tmp = {}
        for (let i = 0; i < data.length; i++) {
            if (tmp[data[i].character.id]) {
                tmp[data[i].character.id] = {
                    ...data[i],
                    value: `${tmp[data[i].character.id].value}${data[i].value ? `, ${data[i].value}` : ''}`
                }
            } else {
                tmp[data[i].character.id] = data[i]
            }
        }

        const result = Object.values(tmp)

        const storeForIDB = {
            ...state,
            skeleton: false,
            data: result,
            loading: false,
            error: false
        }

        if (storeNames && storeNames.indexOf(IDB_OBJ_STORE.OFFERING_PARAMS) !== -1) {
            idbSet(IDB_OBJ_STORE.OFFERING_PARAMS, params.id, {store: storeForIDB, date: new Date()})
        }

        return {
            ...state,
            skeleton: false,
            data: result
        }
    })
    .reset(resetOffering)


export const $offeringModel = combine({
    $allOfferingList,
    $offeringList,
    $offeringInfo,
    $offeringParams,
    $offeringGallery,
    $offeringGroupList,
    $offeringGroupInfo,
    $offeringTranslate,
    $offerGroupList,
    $offerDetailStore,
    $offerListStore,
    $offerGalleryStore,
    $offerParamsStore
})