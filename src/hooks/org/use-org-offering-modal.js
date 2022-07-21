import {useCallback, useEffect, useState} from 'react'
import {useUrlParams} from '../common'
import {FETCHING_STATUS, PROFILE_TYPE, URL_KEYS} from '../../constants'
import {useStore} from 'effector-react'
import {$organizationModel} from '../../models/organization-models'
import {useOrgBasic} from './use-org-basic'
import {useHistory, useParams} from 'react-router-dom'
import {useOfferingBasic} from '../offers'
import {$offeringModel} from '../../models/offering-model'

export function useOrgOfferingModal(onClose) {
    const [activeSpecId, setActiveSpecId] = useState(undefined)
    const [activeGroupId, setActiveGroupId] = useState(undefined)
    const {$orgSpecsLists: {result: specResult, status: specStatus}} = useStore($organizationModel)
    const {$offerGroupList: {result: groupResult, status: groupStatus}} = useStore($offeringModel)
    const {urlData} = useUrlParams()
    const {organization: slug} = useParams()
    const {getOrgSpecList} = useOrgBasic(slug)
    const {getOfferingGroupList, getOfferingList} = useOfferingBasic({type: PROFILE_TYPE.ORGANIZATION, slug})
    const specId = urlData[URL_KEYS.SPECIALIST_ID]
    const specCatId = urlData[URL_KEYS.SPECIALIST_CATEGORY_ID]
    const groupId = urlData[URL_KEYS.OFFERING_GROUP_ID]
    const {push, location: {pathname}} = useHistory()

    const handleSelectSpec = useCallback((id) => {
        const data = {
            status: FETCHING_STATUS.FILTER,
            params: {
                limit: 20,
                offset: 0,
                specialist: id
            }
        }

        if (!activeSpecId || (activeSpecId && activeSpecId !== id)) {
            setActiveSpecId(id)
            data['params']['specialist'] = id
        } else {
            setActiveSpecId(undefined)
            delete data['params']['specialist']
        }

        getOfferingGroupList(data)

    }, [activeSpecId, getOfferingGroupList])

    const handleSelectGroup = useCallback((id) => {
        setActiveGroupId(id)
    }, [])

    const loadMoreGroup = useCallback(() => {

        if (groupResult.nextOffset && !!groupResult.next) {
            const data = {
                status: FETCHING_STATUS.NEXT,
                params: {
                    limit: 20,
                    offset: groupResult.nextOffset,
                }
            }

            if (activeSpecId) {
                data['params']['specialist'] = activeSpecId
            }

            if (groupStatus && (groupStatus === FETCHING_STATUS.FILTER || groupStatus === FETCHING_STATUS.NEXT_FILTER)) {
                data['status'] = FETCHING_STATUS.NEXT_FILTER
            }
            getOfferingGroupList(data)
        }
    }, [activeSpecId, getOfferingGroupList, groupResult, groupStatus])

    const loadMoreSpecList = useCallback(() => {

        if (specResult.nextOffset && !!specResult.next) {
            const data = {
                status: FETCHING_STATUS.NEXT,
                params: {
                    limit: 20,
                    offset: specResult.nextOffset,
                }
            }

            if (specCatId) {
                data['params']['spec_cat'] = specCatId
            }

            if (specStatus && (specStatus === FETCHING_STATUS.FILTER || specStatus === FETCHING_STATUS.NEXT_FILTER)) {
                data['status'] = FETCHING_STATUS.NEXT_FILTER
            }
            getOrgSpecList(data)
        }
    }, [specStatus, specResult, specCatId, getOrgSpecList])

    const handleAccept = useCallback(() => {
        if (activeGroupId) {
            const url = []

            const data = {
                status: FETCHING_STATUS.FILTER,
                params: {
                    limit: 20,
                    offset: 0,
                    group: activeGroupId
                }
            }

            if (activeSpecId) {
                url.push(`${URL_KEYS.SPECIALIST_ID}=${activeSpecId}`)
                data['params']['specialist'] = activeSpecId
            }else {
                delete data['params']['specialist']
            }

            if(specCatId) {
                url.push(`${URL_KEYS.SPECIALIST_CATEGORY_ID}=${specCatId}`)
            }

            url.push(`${URL_KEYS.OFFERING_GROUP_ID}=${activeGroupId}`)

            if(activeGroupId === Number(groupId)) {
                getOfferingList(data)
            }

            push({
                pathname,
                search: url.join('&')
            })
        }
        onClose()
    }, [getOfferingList, groupId, activeSpecId, activeGroupId, onClose, pathname, push, specCatId])

    useEffect(() => {
        if (!activeGroupId) {
            if (groupId) {
                setActiveGroupId(Number(groupId))
            }
        }
    }, [activeGroupId, groupId])

    useEffect(() => {
        if (!activeSpecId) {
            if (specId) {
                setActiveSpecId(Number(specId))
            }
        }
    }, [activeSpecId, specId])

    return {
        activeGroupId,
        activeSpecId,
        loadMoreSpecList,
        handleSelectSpec,
        handleSelectGroup,
        loadMoreGroup,
        handleAccept
    }
}