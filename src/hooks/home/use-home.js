import {useCallback, useEffect} from 'react'
import {message} from 'antd'
import {useUrlParams} from '../common'
import {FETCHING_STATUS, URL_KEYS, URL_VALUES} from '../../constants'
import {$offeringModel, allOfferingsMount} from '../../models/offering-model'
import {$organizationModel, allOrganizationMount} from '../../models/organization-models'
import {$userModel, allStreamMount, getUserListEvent} from '../../models/user-models'
import user from '../../service/user'
import org from '../../service/org'
import {getCommonApiParams} from '../../utils/app-utils'
import {checkStatus} from '../../utils/store-utils'
import {useStore} from 'effector-react'
import {$isDataPending} from '../../models/stream'


export const useHome = () => {
    const {$userList} = useStore($userModel)
    const {$allOrgList} = useStore($organizationModel)
    const {$allOfferingList} = useStore($offeringModel)
    const {$allStreamsList} = useStore($isDataPending)
    const {urlData} = useUrlParams()
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


    const getStatus = useCallback(() => {
        let forceLoading
        if (filterType === URL_VALUES.PEOPLE) {
            forceLoading = checkStatus($userList.status)
        }

        if (filterType === URL_VALUES.ORGANIZATION) {
            forceLoading = checkStatus(($allOrgList.status))
        }

        if (filterType === URL_VALUES.OFFERINGS) {
            forceLoading = checkStatus($allOfferingList.status)
        }

        if (filterType === URL_VALUES.STREAM) {
            forceLoading = checkStatus($allStreamsList.status)
        }
        return forceLoading
    }, [filterType, $userList.status, $allOrgList.status, $allOfferingList.status, $allStreamsList.status])


    const getList = useCallback((params = {}) => {
        if (filterType) {
            if (filterType === URL_VALUES.OFFERINGS) {
                allOfferingsMount(params)
            }

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

    const subscribeUser = (name, action) => {
        user.subscribe(name)
            .then(response => {
                if (response.status === 201) {
                    message.success(`Вы подписались на @${name}`)
                    action()
                }
            })
            .catch(error => {
                console.error(error.response)
            })
    }

    const subscribeOrg = (name, action) => {
        org.subscribe(name)
            .then(response => {
                if (response.status === 201) {
                    message.success(`Вы подписались на ${name}`)
                    action()
                }
            })
            .catch(error => {
                console.error(error.response)
            })
    }

    const loadList = useCallback((page, status) => {
        const filters = getFilterParams()
        const data = {
            status: status === FETCHING_STATUS.FILTER ? FETCHING_STATUS.NEXT_FILTER : FETCHING_STATUS.NEXT,
            params: {
                ...filters,
                limit: 20,
                offset: page
            },
        }

        getList(data)
    }, [getList, getFilterParams])

    useEffect(() => {
        let timeout = null
        timeout = setTimeout(() => {
            const filters = getFilterParams()
            const status = getStatus()
            const data = {
                status: FETCHING_STATUS.INIT,
                params: {
                    ...getCommonApiParams().params,
                    ...filters
                }
            }
            if (status) {
                getList(data)
            }

        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [getFilterParams, getList, getStatus])


    return {loadList, subscribeOrg, subscribeUser}
}