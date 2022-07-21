import {useCallback, useEffect, useState} from 'react'
import {useUrlParams} from '../common'
import {FETCHING_STATUS, PARAM_KEYS, PROFILE_TYPE, URL_KEYS} from '../../constants'
import {useStore} from 'effector-react'
import {useHistory, useParams} from 'react-router-dom'
import {useOrgBasic} from './use-org-basic'
import {$organizationModel} from '../../models/organization-models'
import {useOfferingBasic} from '../offers'

export function useSpecialistModal({onClose}) {
    const {organization: slug} = useParams()
    const [activeSpecId, setActiveSpecId] = useState(undefined)
    const [activeSpecCatId, setActiveSpecCatId] = useState(undefined)
    const {urlData} = useUrlParams()
    const specId = urlData[URL_KEYS.SPECIALIST_ID]
    const specCatId = urlData[URL_KEYS.SPECIALIST_CATEGORY_ID]
    const groupId = urlData[URL_KEYS.GROUP_ID]
    const {getOrgSpecList, getOrgSpecCatList} = useOrgBasic(slug)
    const {getOfferingList} = useOfferingBasic({type: PROFILE_TYPE.ORGANIZATION, slug})

    const {
        $orgSpecsLists: {result: specResult, status: specStatus},
        $orgSpecCatList: {result: specCatResult, status: specCatStatus}
    } = useStore($organizationModel)
    const {push, location: {pathname}} = useHistory()

    const loadMoreSpecList = useCallback(() => {

        if (specResult.nextOffset && !!specResult.next) {

            const data = {
                status: FETCHING_STATUS.NEXT,
                params: {
                    limit: 20,
                    offset: specResult.nextOffset,
                }
            }

            if (activeSpecCatId) {
                data['params'][PARAM_KEYS.SPEC_CAT] = activeSpecCatId
            }

            if (specStatus && (specStatus === FETCHING_STATUS.FILTER || specStatus === FETCHING_STATUS.NEXT_FILTER)) {
                data['status'] = FETCHING_STATUS.NEXT_FILTER
            }
            getOrgSpecList(data)
        }
    }, [specStatus, specResult, activeSpecCatId, getOrgSpecList])

    const loadMoreSpecCatList = useCallback(() => {
        if (specCatResult.nextOffset && !!specCatResult.next) {
            const data = {
                status: FETCHING_STATUS.NEXT,
                params: {
                    limit: 20,
                    offset: specCatResult.nextOffset,
                }
            }

            if (specCatStatus && (specCatStatus === FETCHING_STATUS.FILTER || specCatStatus === FETCHING_STATUS.NEXT_FILTER)) {
                data['status'] = FETCHING_STATUS.NEXT_FILTER
            }
            getOrgSpecCatList(data)
        }
    }, [specCatResult, specCatStatus, getOrgSpecCatList])

    const handleSelectSpec = useCallback((id) => {
        setActiveSpecId(id)
    }, [])

    const handleSelectSpecCat = useCallback((id) => {
        const data = {
            status: FETCHING_STATUS.FILTER,
            params: {
                limit: 20,
                offset: 0,
                spec_cat: id
            }
        }

        if (!activeSpecCatId || (activeSpecCatId && activeSpecCatId !== id)) {
            setActiveSpecCatId(id)
            data['params']['spec_cat'] = id
        } else {
            setActiveSpecCatId(undefined)
            delete data['params']['spec_cat']
        }

        getOrgSpecList(data)
    }, [getOrgSpecList, activeSpecCatId])

    const handleAccept = useCallback(() => {
        if (activeSpecId) {
            const url = []
            const data = {
                status: FETCHING_STATUS.FILTER,
                params: {
                    limit: 20,
                    offset: 0,
                    responsible: activeSpecId
                }
            }

            if (activeSpecCatId) {
                url.push(`${URL_KEYS.SPECIALIST_CATEGORY_ID}=${activeSpecCatId}`)
            }

            if (groupId) {
                url.push(`${URL_KEYS.OFFERING_GROUP_ID}=${groupId}`)
            }

            url.push(`${URL_KEYS.SPECIALIST_ID}=${activeSpecId}`)

            if(activeSpecId === Number(specId)) {
                getOfferingList(data)
            }

            push({
                pathname,
                search: url.join('&')
            })
        }
        onClose()
    }, [onClose, getOfferingList, activeSpecId, push, activeSpecCatId, pathname, specId, groupId])

    useEffect(() => {
        if (!activeSpecId) {
            if (specId) {
                setActiveSpecId(Number(specId))
            }
        }
    }, [activeSpecId, specId])

    useEffect(() => {
        if (!activeSpecCatId) {
            if (specCatId) {
                setActiveSpecCatId(Number(specCatId))
            }
        }
    }, [activeSpecCatId, specCatId])

    return {
        loadMoreSpecList,
        loadMoreSpecCatList,
        handleSelectSpec,
        activeSpecId,
        handleAccept,
        handleSelectSpecCat,
        activeSpecCatId
    }
}