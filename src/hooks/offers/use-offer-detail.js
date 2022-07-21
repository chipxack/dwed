import {useCallback, useEffect} from 'react'
import {
    getOfferEvent,
    getOfferFromIDBEvent,
    getOfferGalleryEvent,
    getOfferGalleryFromIDBEvent,
    getOfferParamsEvent,
    getOfferParamsFromIDBEvent
} from '../../models/offering-model'
import {idbGet} from '../../config/db'
import {IDB_OBJ_STORE} from '../../constants/idb'
import {getDiffDate} from '../../utils/dateUtils'
import {FETCHING_STATUS} from '../../constants'
import {storeNames} from '../../utils/app-utils'

export function useOfferDetail(id) {

    const getOfferingSideEffect = useCallback(async (offer_id) => {
        const data = {
            id: offer_id,
            status: FETCHING_STATUS.INIT
        }
        if(storeNames && storeNames.indexOf(IDB_OBJ_STORE.OFFERING_INFO) !== -1) {
            try {
                const dataFromIdb = await idbGet(IDB_OBJ_STORE.OFFERING_INFO, offer_id)
                if (dataFromIdb) {
                    const diff = getDiffDate(dataFromIdb.date)
                    if (diff > 10) {
                        getOfferEvent(data)
                    } else {
                        getOfferFromIDBEvent(dataFromIdb.store)
                    }
                } else {
                    getOfferEvent(data)
                }
            } catch (e) {

            }
        }else {
            getOfferEvent(data)
        }
    }, [])

    const getOfferingGallerySideEffect = useCallback(async (offer_id) => {
        const data = {
            id: offer_id,
            status: FETCHING_STATUS.INIT
        }
        if(storeNames && storeNames.indexOf(IDB_OBJ_STORE.OFFERING_GALLERY) !== -1) {
            try {
                const dataFromIdb = await idbGet(IDB_OBJ_STORE.OFFERING_GALLERY, offer_id)
                if (dataFromIdb) {
                    const diff = getDiffDate(dataFromIdb.date)
                    if (diff > 10) {
                        getOfferGalleryEvent(data)
                    } else {
                        getOfferGalleryFromIDBEvent(dataFromIdb.store)
                    }
                } else {
                    getOfferGalleryEvent(data)
                }
            } catch (e) {

            }
        }else {
            getOfferGalleryEvent(data)
        }
    }, [])

    const getOfferingParamSideEffect = useCallback(async (offer_id) => {
        const data = {
            id: offer_id,
            status: FETCHING_STATUS.INIT
        }
        if(storeNames && storeNames.indexOf(IDB_OBJ_STORE.OFFERING_PARAMS) !== -1) {
            try {
                const dataFromIdb = await idbGet(IDB_OBJ_STORE.OFFERING_PARAMS, offer_id)
                if (dataFromIdb) {
                    const diff = getDiffDate(dataFromIdb.date)
                    if (diff > 10) {
                        getOfferParamsEvent(data)
                    } else {
                        getOfferParamsFromIDBEvent(dataFromIdb.store)
                    }
                } else {
                    getOfferParamsEvent(data)
                }
            } catch (e) {

            }
        }else {
            getOfferParamsEvent(data)
        }
    }, [])

    useEffect(() => {
        if (id) {
            getOfferingSideEffect(id)
            getOfferingGallerySideEffect(id)
            getOfferingParamSideEffect(id)
        }
    }, [id, getOfferingSideEffect, getOfferingGallerySideEffect, getOfferingParamSideEffect])
}