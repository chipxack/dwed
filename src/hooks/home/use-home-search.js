import {useCallback, useEffect, useState} from 'react'
import {FETCHING_STATUS, URL_KEYS, URL_VALUES} from '../../constants'
import {useUrlParams} from '../common'
import {useHistory} from 'react-router-dom'
import {allOrganizationMount} from '../../models/organization-models'
import {allStreamMount, getUserListEvent} from '../../models/user-models'
import {getCommonApiParams} from '../../utils/app-utils'

export function useHomeSearch() {
    const {urlData, urlParams} = useUrlParams()
    const {push, location: {pathname}} = useHistory()
    const searchParam = urlData[URL_KEYS.SEARCH]
    const [searchText, setSearchText] = useState(undefined)
    const search = urlData[URL_KEYS.SEARCH]
    const categoryId = urlData[URL_KEYS.CATEGORY_ID]
    const filterType = urlData[URL_KEYS.SEARCH_FILTER_TYPE]
    const params = urlData[URL_KEYS.PARAMS]
    const costMin = urlData[URL_KEYS.COST_MIN]
    const costMax = urlData[URL_KEYS.COST_MAX]

    const getFilterParams = useCallback(() => {
        const filterParam = {}
        if (search) {
            filterParam['search'] = search
        }

        if (categoryId) {
            if (filterType === URL_VALUES.PEOPLE) {
                filterParam['main_cat'] = categoryId
            } else if (filterType === URL_VALUES.ORGANIZATION) {
                filterParam['category'] = categoryId
            } else {
                filterParam['offer_cat'] = parseInt(categoryId)
                if (params) {
                    filterParam['params'] = params
                }
                if (costMin && costMax) {
                    filterParam['cost_max'] = costMax
                    filterParam['cost_min'] = costMin
                }
            }
        }

        return filterParam
    }, [filterType, categoryId, params, costMax, costMin, search])

    const getList = useCallback((params = {}, forceLoading = false) => {
        if (filterType) {
            // if (filterType === URL_VALUES.OFFERINGS) {
            //     allOfferingsMount(params)
            // }

            if (filterType === URL_VALUES.ORGANIZATION) {
                allOrganizationMount(params)
            }

            if (filterType === URL_VALUES.PEOPLE) {
                getUserListEvent(params)
            }

            if (filterType === URL_VALUES.STREAM) {
                allStreamMount(params)
            }
        }
    }, [filterType])

    const onSubmit = useCallback((e) => {
        e.preventDefault()
        const filters = getFilterParams()
        const data = {
            clear: true,
            params: {
                ...getCommonApiParams.params,
                ...filters
            }
        }
        const url = []

        if (urlParams) {
            url.push(urlParams)
        }

        if (searchText.length > 2) {
            url.push(`${URL_KEYS.SEARCH}=${searchText}`)
            data['params']['search'] = searchText
        } else {
            delete data['params']['search']
        }

        getList(data)
        push({
            pathname: '/',
            search: url.join('&')
        })
    }, [getList, getFilterParams, push, searchText, urlParams])

    const onChange = useCallback((value) => {
        setSearchText(value)
        if(value.length === 0) {
            const data = {
                status: FETCHING_STATUS.FILTER,
                params: {
                    limit: 20,
                    params: 0
                }
            }
            getList(data)

            push({
                pathname: '/',
                search: `${URL_KEYS.SEARCH_FILTER_TYPE}=${filterType}`
            })
        }
    }, [getList, push, filterType])

    useEffect(() => {
        if (searchText === undefined) {
            if (searchParam && pathname === '/') {
                setSearchText(searchParam)
            }
        }
    }, [searchParam, searchText, pathname])

    return {onSubmit, searchText, onChange}
}