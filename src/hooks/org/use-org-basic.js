import {useCallback} from 'react'
import {
    getOrgEvent,
    getOrgFromIDBEvent,
    getOrgSpecCatListEvent,
    getOrgSpecCatListFromIDBEvent,
    getOrgSpecListEvent,
    getOrgSpecListFromIDBEvent,
    removeOrgSpecCatEvent,
    removeOrgSpecEvent
} from '../../models/organization-models'
import {FETCHING_STATUS, PARAM_KEYS} from '../../constants'
import {idbGet} from '../../config/db'
import {IDB_OBJ_STORE} from '../../constants/idb'
import {getDiffDate} from '../../utils/dateUtils'
import {storeNames} from '../../utils/app-utils'

export function useOrgBasic(slug) {

    const getOrgInfo = useCallback((params) => {
        if (slug) {
            getOrgEvent({organization: slug, ...params})
        }
    }, [slug])

    const getOrgSpecCatList = useCallback((params) => {
        if (slug) {
            const data = {
                organization: slug,
                ...params
            }
            getOrgSpecCatListEvent(data)
        }
    }, [slug])

    const getOrgSpecList = useCallback((params) => {
        if (slug) {
            const data = {
                organization: slug,
                ...params
            }
            getOrgSpecListEvent(data)
        }
    }, [slug])

    const getOrgSpecListSideEffect = useCallback(async (params) => {
        const queryParams = params.params

        if (queryParams[PARAM_KEYS.SPEC_CAT]) {
            getOrgSpecList({status: FETCHING_STATUS.FILTER, ...params})
        } else {
            if (storeNames && storeNames.indexOf(IDB_OBJ_STORE.ORG_SPEC_LIST) !== -1) {
                try {
                    const dataFromIdb = await idbGet(IDB_OBJ_STORE.ORG_SPEC_LIST, slug)
                    if (dataFromIdb) {
                        const diff = getDiffDate(dataFromIdb.date)
                        if (diff > 20) {
                            getOrgSpecList({status: FETCHING_STATUS.INIT, ...params})
                        } else {
                            if (dataFromIdb.store.status === FETCHING_STATUS.FILTER || dataFromIdb.store.status === FETCHING_STATUS.NEXT_FILTER) {
                                getOrgSpecList({status: FETCHING_STATUS.INIT, ...params})
                            } else {
                                getOrgSpecListFromIDBEvent(dataFromIdb.store)
                            }
                        }
                    } else {
                        getOrgSpecList({status: FETCHING_STATUS.INIT, ...params})
                    }
                } catch (e) {

                }
            } else {
                getOrgSpecList({status: FETCHING_STATUS.INIT, ...params})
            }
        }
    }, [slug, getOrgSpecList])

    const getOrgSpecCatListSideEffect = useCallback(async (params) => {
        if (storeNames && storeNames.indexOf(IDB_OBJ_STORE.ORG_SPEC_CAT_LIST) !== -1) {
            try {
                const dataFromIdb = await idbGet(IDB_OBJ_STORE.ORG_SPEC_CAT_LIST, slug)
                if (dataFromIdb) {
                    const diff = getDiffDate(dataFromIdb.date)
                    if (diff > 20) {
                        getOrgSpecCatList({status: FETCHING_STATUS.INIT, ...params})
                    } else {
                        if (dataFromIdb.store.status === FETCHING_STATUS.FILTER || dataFromIdb.store.status === FETCHING_STATUS.NEXT_FILTER) {
                            getOrgSpecCatList({status: FETCHING_STATUS.INIT, ...params})
                        } else {
                            getOrgSpecCatListFromIDBEvent(dataFromIdb.store)
                        }
                    }
                } else {
                    getOrgSpecCatList({status: FETCHING_STATUS.INIT, ...params})
                }
            } catch (e) {

            }
        } else {
            getOrgSpecCatList({status: FETCHING_STATUS.INIT, ...params})
        }
    }, [slug, getOrgSpecCatList])

    const getOrgSideEffect = useCallback(async () => {

        if (storeNames && storeNames.indexOf(IDB_OBJ_STORE.ORG_INFO) !== -1) {
            try {
                const dataFromIdb = await idbGet(IDB_OBJ_STORE.ORG_INFO, slug)
                if (dataFromIdb) {
                    const diff = getDiffDate(dataFromIdb.date)
                    if (diff > 20) {
                        getOrgInfo({status: FETCHING_STATUS.INIT})
                    } else {
                        if (dataFromIdb.store.status === FETCHING_STATUS.FILTER || dataFromIdb.store.status === FETCHING_STATUS.NEXT_FILTER) {
                            getOrgInfo({status: FETCHING_STATUS.INIT})
                        } else {
                            getOrgFromIDBEvent(dataFromIdb.store)
                        }
                    }
                } else {
                    getOrgInfo({status: FETCHING_STATUS.INIT})
                }
            } catch (e) {

            }
        } else {
            getOrgInfo({status: FETCHING_STATUS.INIT})
        }
    }, [getOrgInfo, slug])

    const removeSpecCat = useCallback((id) => {
        if (slug) {
            const params = {
                id,
                organization: slug
            }
            removeOrgSpecCatEvent(params)
        }
    }, [slug])

    const removeSpec = useCallback((id) => {
        if (slug) {
            const params = {
                id,
                organization: slug
            }
            removeOrgSpecEvent(params)
        }

    }, [slug])

    return {
        getOrgSpecList,
        getOrgSpecCatList,
        removeSpecCat,
        removeSpec,
        getOrgSpecListSideEffect,
        getOrgSpecCatListSideEffect,
        getOrgSideEffect
    }
}