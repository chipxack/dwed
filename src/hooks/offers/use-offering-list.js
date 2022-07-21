import {useCallback, useEffect, useState} from 'react'
import {useStore} from 'effector-react'
import {$offeringModel, removeOfferingEvent} from '../../models/offering-model'
import {FETCHING_STATUS, PARAM_KEYS, PROFILE_TYPE, URL_KEYS} from '../../constants'
import {useUrlParams} from '../common'
import {useHistory} from 'react-router-dom'
import {showMessage} from '../../UIComponents/message-notification'
import {useOfferingBasic} from './use-offering-basic'

const initialParams = {
    offset: 0,
    limit: 20
}

export const useOfferingList = ({id, limit}) => {
    const {$offerListStore: {result, status}} = useStore($offeringModel)
    const {
        getOfferingList,
        getOfferingListSideEffect
    } = useOfferingBasic({type: PROFILE_TYPE.ORGANIZATION, slug: id})
    const [search, setSearch] = useState(undefined)
    const {urlData} = useUrlParams()
    const {push, location: {pathname}} = useHistory()
    const specialistId = urlData[URL_KEYS.SPECIALIST_ID]
    const specCatId = urlData[URL_KEYS.SPECIALIST_CATEGORY_ID]
    const groupId = urlData[URL_KEYS.OFFERING_GROUP_ID]
    const searchValue = urlData[URL_KEYS.SEARCH]
    const page = urlData[URL_KEYS.PAGE]

    const getFilterParams = useCallback(() => {
        const params = {}

        if (groupId) {
            params[PARAM_KEYS.GROUP] = groupId
        } else {
            delete params[PARAM_KEYS.GROUP]
        }

        if (specialistId) {
            params[PARAM_KEYS.RESPONSIBLE] = specialistId
        } else {
            delete params[PARAM_KEYS.RESPONSIBLE]
        }

        if (searchValue && searchValue.trim().length > 2) {
            params[PARAM_KEYS.SEARCH] = searchValue
        } else {
            delete params[PARAM_KEYS.SEARCH]
        }

        if (page && limit) {
            const p = Number(page)
            params['offset'] = p === 1 ? 0 : (p - 1) * limit
        }

        return params
    }, [groupId, searchValue, specialistId, limit, page])

    const loadMore = useCallback(() => {
        if (result.nextOffset) {
            const filter = getFilterParams()
            const data = {
                status: FETCHING_STATUS.NEXT,
                params: {
                    ...initialParams,
                    ...filter,
                    offset: result.nextOffset,
                }
            }

            if (status && (status === FETCHING_STATUS.FILTER || status === FETCHING_STATUS.NEXT_FILTER)) {
                data['status'] = FETCHING_STATUS.NEXT_FILTER
            }

            getOfferingList(data)
        }
    }, [result, getFilterParams, getOfferingList, status])

    const removeOffering = useCallback((offering_id) => {
        removeOfferingEvent({
            id: offering_id,
            action: () => {
                showMessage('information_successfully_removed', 'success')
            }
        })
    }, [])

    const onSearch = useCallback((value) => {
        const url = []
        if (specCatId) {
            url.push(`${URL_KEYS.SPECIALIST_CATEGORY_ID}=${specCatId}`)
        }

        if (specialistId) {
            url.push(`${URL_KEYS.SPECIALIST_ID}=${specialistId}`)
        }

        if (groupId) {
            url.push(`${URL_KEYS.OFFERING_GROUP_ID}=${groupId}`)
        }
        if (value.length > 0) {
            url.push(`${URL_KEYS.SEARCH}=${value}`)
        }

        setSearch(value)

        push({
            pathname,
            search: url.join('&')
        })

    }, [specCatId, specialistId, pathname, groupId, push])

    useEffect(() => {
        let timout = null
        timout = setTimeout(() => {
            if (!search && searchValue) {
                setSearch(searchValue)
            }
        }, 300)

        return () => {
            clearTimeout(timout)
        }
    }, [searchValue, search])


    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            const filter = getFilterParams()
            const data = {
                params: {
                    ...initialParams,
                    ...filter
                }
            }
            if (limit) {
                data['params'] = {
                    ...data.params,
                    limit
                }
            }
            getOfferingListSideEffect(data)
        }, 100)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [getOfferingListSideEffect, getFilterParams, limit])

    return {loadMore, onSearch, search, removeOffering}
}