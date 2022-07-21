import {useCallback} from 'react'
import {FETCHING_STATUS, PARAM_KEYS, PROFILE_TYPE} from '../../constants'
import {
    allOfferingsMount,
    getOrgOfferGroupListEvent,
    getOrgOfferGroupListFromIDBEvent,
    getOrgOfferListEvent,
    getOrgOfferListFromIDBEvent,
    removeOrgOfferingGroupEvent
} from '../../models/offering-model'
import {idbGet} from '../../config/db'
import {IDB_OBJ_STORE} from '../../constants/idb'
import {getDiffDate} from '../../utils/dateUtils'
import {storeNames} from '../../utils/app-utils'

export function useOfferingBasic({type, slug}) {

    const getListBasic = useCallback((events, params) => {
        if (type === PROFILE_TYPE.USER) {

        }

        if (type === PROFILE_TYPE.ORGANIZATION) {
            const data = {
                organization: slug,
                ...params
            }
            events[type](data)
        }
    }, [type, slug])

    const getOfferingList = useCallback((params) => {
        const events = {
            [PROFILE_TYPE.USER]: () => false,
            [PROFILE_TYPE.ORGANIZATION]: getOrgOfferListEvent
        }
        getListBasic(events, params)
    }, [getListBasic])

    const getOfferingGroupList = useCallback((params) => {
        const events = {
            [PROFILE_TYPE.USER]: () => false,
            [PROFILE_TYPE.ORGANIZATION]: getOrgOfferGroupListEvent
        }
        getListBasic(events, params)
    }, [getListBasic])

    const getOfferingListSideEffect = useCallback(async (params) => {
        const queryParams = params.params

        if (queryParams[PARAM_KEYS.SEARCH] || queryParams[PARAM_KEYS.RESPONSIBLE] || queryParams[PARAM_KEYS.GROUP]) {
            getOfferingList({status: FETCHING_STATUS.FILTER, ...params})
        } else {
            if (storeNames && storeNames.indexOf(IDB_OBJ_STORE.ACCOUNT_OFFERINGS) !== -1) {
                try {
                    const dataFromIdb = await idbGet(IDB_OBJ_STORE.ACCOUNT_OFFERINGS, slug)
                    if (dataFromIdb) {
                        const diff = getDiffDate(dataFromIdb.date)
                        if (diff > 20) {
                            getOfferingList({status: FETCHING_STATUS.INIT, ...params})
                        } else {
                            if (dataFromIdb.store.status === FETCHING_STATUS.FILTER || dataFromIdb.store.status === FETCHING_STATUS.NEXT_FILTER) {
                                getOfferingList({status: FETCHING_STATUS.INIT, ...params})
                            } else {
                                getOrgOfferListFromIDBEvent(dataFromIdb.store)
                            }
                        }
                    } else {
                        getOfferingList({status: FETCHING_STATUS.INIT, ...params})
                    }
                } catch (e) {

                }
            } else {
                getOfferingList({status: FETCHING_STATUS.INIT, ...params})
            }
        }
    }, [getOfferingList, slug])

    const getOfferingGroupListSideEffect = useCallback(async (params) => {
        const queryParams = params.params

        if (queryParams[PARAM_KEYS.SPECIALIST]) {
            getOfferingGroupList({status: FETCHING_STATUS.FILTER, ...params})
        } else {
            if (storeNames && storeNames.indexOf(IDB_OBJ_STORE.OFFERING_GROUPS) !== -1) {
                try {
                    const dataFromIdb = await idbGet(IDB_OBJ_STORE.OFFERING_GROUPS, slug)

                    if (dataFromIdb) {
                        const diff = getDiffDate(dataFromIdb.date)
                        if (diff > 20) {
                            getOfferingGroupList({status: FETCHING_STATUS.INIT, ...params})
                        } else {
                            if (dataFromIdb.store.status === FETCHING_STATUS.FILTER || dataFromIdb.store.status === FETCHING_STATUS.NEXT_FILTER) {
                                getOfferingGroupList({status: FETCHING_STATUS.INIT, ...params})
                            } else {
                                getOrgOfferGroupListFromIDBEvent(dataFromIdb.store)
                            }
                        }
                    } else {
                        getOfferingGroupList({status: FETCHING_STATUS.INIT, ...params})
                    }
                } catch (e) {

                }
            } else {
                getOfferingGroupList({status: FETCHING_STATUS.INIT, ...params})
            }
        }
    }, [slug, getOfferingGroupList])

    const removeOrgOfferGroup = useCallback((id) => {
        if (slug) {
            const params = {
                id,
                organization: slug
            }
            removeOrgOfferingGroupEvent(params)
        }
    }, [slug])

    const getAllOfferList = useCallback((params) => {
        allOfferingsMount(params)
    }, [])

    return {
        getOfferingList,
        getOfferingGroupList,
        removeOrgOfferGroup,
        getAllOfferList,
        getOfferingListSideEffect,
        getOfferingGroupListSideEffect
    }
}