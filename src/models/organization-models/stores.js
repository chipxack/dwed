import {combine, createStore} from 'effector'
import {
    createOrgCouponReceiverEffect,
    fetchAllOrganization,
    fetchSpecialist,
    fetchSpecialistCategory,
    fetchSpecialistCategoryInfo,
    fetchSpecialistInfo,
    fetchSpecialistPerms,
    getOrgCouponEffect,
    getOrgCouponListEffect,
    getOrgCouponReceiversListEffect,
    getOrgEffect,
    getOrgPaymentMethodListEffect,
    getOrgSpecsListEffect,
    getSpecCatListEffect,
    removeOrgCouponEffect,
    removeOrgCouponReceiverEffect,
    updateOrgCouponEffect, updateOrgPaymentMethodEffect,
} from './effects'
import {
    allOrganizationMount,
    getOrgCouponListEvent,
    getOrgCouponReceiversListEvent,
    getOrgEvent,
    getOrgFromIDBEvent,
    getOrgSpecCatListEvent,
    getOrgSpecCatListFromIDBEvent,
    getOrgSpecListEvent,
    getOrgSpecListFromIDBEvent,
    resetOrg, resetOrgSpecPerms
} from './events'
import {makeCommonStore, makeCommonStoreList, makeStoreListStatus} from '../../utils/store-utils'
import {defaultStoreState} from '../../data/store'
import {idbSet} from '../../config/db'
import {IDB_OBJ_STORE} from '../../constants/idb'
import {storeNames} from '../../utils/app-utils'

const $allOrgList = createStore({
    loading: false,
    data: [],
    result: {},
    skeleton: undefined,
    status: undefined,
    error: false,
})
    .on(allOrganizationMount, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed,
        }
    })
    .on(fetchAllOrganization.pending, (state, loading) => ({...state, loading}))
    .on(fetchAllOrganization.fail, (state, {error}) => ({
        ...state, error,
    }))
    .on(fetchAllOrganization.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)
        return {
            ...processed,
        }
    })

const $orgDetailStore = createStore({
    loading: false,
    data: {},
    error: false,
    status: undefined,
    skeleton: undefined,
})
    .on(getOrgEvent, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)

        return {
            ...state,
            ...processed,
        }
    })
    .on(getOrgFromIDBEvent, (state, payload) => ({...payload}))
    .on(getOrgEffect.fail, (state, {error}) => ({
        ...state, error,
    }))
    .on(getOrgEffect.pending, (state, loading) => ({...state, loading}))
    .on(getOrgEffect.done, (state, res) => {
        const processed = makeCommonStore(state, res)
        const storeForIDB = {
            ...processed,
            loading: false,
            error: false,
        }

        if (storeNames && storeNames.indexOf(IDB_OBJ_STORE.ORG_INFO) !== -1) {
            idbSet(IDB_OBJ_STORE.ORG_INFO, res.params.organization, {store: storeForIDB, date: new Date()})
        }

        return {
            ...processed,
        }
    })
    .reset(resetOrg)

const $specialistCategoryList = createStore({loading: true, data: [], result: {}, error: false})
    .on(fetchSpecialistCategory.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchSpecialistCategory.fail, (state, error) => ({
        ...state, error: error.response, data: [], result: {},
    }))
    .on(fetchSpecialistCategory.done, (state, res) => {
        const nextOffset = res.params.params.offset + 10
        const clear = res.params.clear
        const newResult = {...res.result.data, nextOffset}
        const newData = clear ? res.result.data.results : [...state.data, ...res.result.data.results]
        return {
            ...state, data: newData, result: newResult, error: false,
        }
    })

const $specialistsOrganization = createStore({loading: true, data: [], result: {}, error: false})
    .on(fetchSpecialist.pending, (state, pending) => {
        return {
            ...state,
            loading: pending,
        }
    })
    .on(fetchSpecialist.fail, (state, error) => ({
        ...state, data: [], result: {}, error: error.response,
    }))
    .on(fetchSpecialist.done, (state, res) => {
        const filteredData = res.result.data.results.map(item => ({
            path: `/@${item.user.username}`,
            image: item.user.avatar,
            imgUrl: item.user.avatar,
            name: item.user.full_name.trim().length > 0 ? item.user.full_name.trim() : `@${item.user.username}`,
            text: item.job.name,
            isOfficial: item.user.is_official,
            id: item.id,
            spec_name: item.spec_cat.name,
        }))

        const nextOffset = res.params.params.offset + 10
        const clear = res.params.clear
        const newResult = {...res.result.data, nextOffset}
        const newData = clear ? filteredData : [...state.data, ...filteredData]

        return {
            ...state,
            data: newData,
            result: newResult,
        }
    })

const $specialistCategoryInfo = createStore({loading: false, data: {}, error: false})
    .on(fetchSpecialistCategoryInfo.pending, (state, loading) => ({...state, loading}))
    .on(fetchSpecialistCategoryInfo.fail, (state, error) => ({
        ...state, data: {}, error: error.response,
    }))
    .on(fetchSpecialistCategoryInfo.done, (state, res) => ({
        ...state, data: res.result.data, error: false,
    }))

const $specialistInfo = createStore({loading: false, data: {}, error: false})
    .on(fetchSpecialistInfo.pending, (state, loading) => ({...state, loading}))
    .on(fetchSpecialistInfo.fail, (state, error) => ({
        ...state, data: {}, error: error.response,
    }))
    .on(fetchSpecialistInfo.done, (state, res) => ({
        ...state, error: false, data: res.result.data,
    }))

const $specialistPerms = createStore({loading: false, data: undefined, error: false})
    .on(fetchSpecialistPerms.pending, (state, loading) => ({...state, loading}))
    .on(fetchSpecialistPerms.fail, (state, {error}) => ({
        ...state, error, data: undefined,
    }))
    .on(fetchSpecialistPerms.done, (state, res) => ({
        ...state, error: false, data: res.result.data,
    }))
  .reset(resetOrgSpecPerms)

const $orgSpecsLists = createStore(defaultStoreState)
    .on(getOrgSpecListEvent, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed,
        }
    })
    .on(getOrgSpecListFromIDBEvent, (state, payload) => ({...payload}))
    .on(getOrgSpecsListEffect.pending, (state, loading) => ({...state, loading}))
    .on(getOrgSpecsListEffect.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)
        const storeForIDB = {
            ...processed,
            error: false,
            loading: false,
        }

        if (storeNames && storeNames.indexOf(IDB_OBJ_STORE.ORG_SPEC_LIST) !== -1) {
            idbSet(IDB_OBJ_STORE.ORG_SPEC_LIST, res.params.organization, {store: storeForIDB, date: new Date()})
        }

        return {
            ...processed,
        }
    })
    .reset(resetOrg)

const $orgSpecCatList = createStore(defaultStoreState)
    .on(getOrgSpecCatListEvent, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed,
        }
    })
    .on(getOrgSpecCatListFromIDBEvent, (state, payload) => ({...payload}))
    .on(getSpecCatListEffect.pending, (state, loading) => ({...state, loading}))
    .on(getSpecCatListEffect.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)
        const storeForIDB = {
            ...processed,
            error: false,
            loading: false,
        }

        if (storeNames && storeNames.indexOf(IDB_OBJ_STORE.ORG_SPEC_CAT_LIST) !== -1) {
            idbSet(IDB_OBJ_STORE.ORG_SPEC_CAT_LIST, res.params.organization, {store: storeForIDB, date: new Date()})
        }

        return {
            ...processed,
        }
    })
    .reset(resetOrg)

const $orgCouponListStore = createStore({
    status: undefined,
    skeleton: undefined,
    result: {},
    data: [],
    error: false,
    loading: false,
})
    .on(getOrgCouponListEvent, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed,
        }
    })
    .on(getOrgCouponListEffect.pending, (state, loading) => ({...state, loading}))
    .on(getOrgCouponListEffect.fail, (state, {error}) => ({...state, error}))
    .on(getOrgCouponListEffect.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)

        return {
            ...processed,
        }
    })
    .on(updateOrgCouponEffect.done, (state, {result, params}) => {
        let data = [...state.data]
        const idx = data.findIndex((item => item.id === params.id))
        if (idx !== -1) {
            data = [
                ...data.slice(0, idx),
                {...result.data},
                ...data.slice(idx + 1),
            ]
        }

        return {
            ...state,
            data,
        }
    })
    .on(removeOrgCouponEffect.done, (state, {params}) => {
        return {
            ...state,
            result: {...state.result, count: state.result.count - 1},
            data: state.data.filter(item => item.id !== params.id),
        }
    })
    .reset(resetOrg)

const $orgCouponStore = createStore({
    skeleton: undefined,
    status: undefined,
    data: {},
    error: false,
    loading: false,
})
    .on(getOrgCouponEffect.pending, (state, loading) => ({...state, loading}))
    .on(getOrgCouponEffect.fail, (state, {error}) => ({...state, error}))
    .on(getOrgCouponEffect.done, (state, res) => {
        const processed = makeCommonStore(state, res)

        return {
            ...processed,
        }
    })
    .reset(resetOrg)

const $orgCouponsReceiversList = createStore({
    status: undefined,
    skeleton: undefined,
    data: [],
    result: {},
    loading: false,
    error: false,
})
    .on(getOrgCouponReceiversListEvent, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed,
        }
    })
    .on(getOrgCouponReceiversListEffect.pending, (state, loading) => ({...state, loading}))
    .on(getOrgCouponReceiversListEffect.fail, (state, {error}) => ({...state, error}))
    .on(getOrgCouponReceiversListEffect.done, (state, res) => {
        const processed = makeCommonStoreList(state, res)
        return {
            ...processed,
            data: processed.data.map(item => ({id: item.id, ...item.user})),
        }
    })
    .on(createOrgCouponReceiverEffect.done, (state, {result, params}) => {
        let data = state.data
        if (data.length > 10) {
            data = [{id: result.data.id, ...result.data.user}, ...data.slice(0, 8)]
        } else {
            data = [{id: result.data.id, ...result.data.user}, ...data]
        }

        if (params.action) {
            params.action(true)
        }

        return {
            ...state,
            result: {...state.result, count: state.result.count + 1},
            data,
        }
    })
    .on(removeOrgCouponReceiverEffect.done, (state, {params}) => {

        if (params.action) {
            params.action(false)
        }

        return {
            ...state,
            result: {...state.result, count: state.result.count - 1},
            data: state.data.filter(item => item.username !== params.receiver_id),
        }
    })
    .reset(resetOrg)

const $orgPaymentMethodListStore = createStore({
    data: [],
    loading: false,
    error: false,
})
    .on(getOrgPaymentMethodListEffect.pending, (state, loading) => ({...state, loading}))
    .on(getOrgPaymentMethodListEffect.done, (state, {result}) => {
        return {
            ...state,
            data: result.data,
        }
    })
    .on(updateOrgPaymentMethodEffect.done, (state, {result, params}) => {
        let data = state.data
        const idx = data.findIndex(item => item.id === params.id)

        if(idx !== -1) {
            data = [
                ...data.slice(0, idx),
                {...data[idx], ...result.data},
                ...data.slice(idx + 1)
            ]
        }

        return {
            ...state,
            data
        }
    })

export const $organizationModel = combine({
    $allOrgList,
    $orgDetailStore,
    $specialistCategoryList,
    $specialistCategoryInfo,
    $specialistInfo,
    $specialistPerms,
    $orgSpecsLists,
    $specialistsOrganization,
    $orgSpecCatList,
    $orgCouponListStore,
    $orgCouponStore,
    $orgCouponsReceiversList,
    $orgPaymentMethodListStore,
})

