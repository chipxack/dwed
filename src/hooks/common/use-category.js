import {useUrlParams} from './use-url-params'
import {useCallback, useEffect, useState} from 'react'
import {URL_KEYS, URL_VALUES} from '../../constants'
import {getOfferCatsEvent, getOrgCatsEvent, getUserCatsEvent} from '../../models/categories-models'
import {useHistory} from 'react-router-dom'

const commonParams = {
    params: {
        limit: 20,
        offset: 0,
    },
    parent: 0
}

export const useCategory = () => {
    const {urlData} = useUrlParams()
    const [parent, setParent] = useState(0)
    const [selected, setSelected] = useState(null)
    const {push} = useHistory()

    const filterType = urlData[URL_KEYS.SEARCH_FILTER_TYPE]

    const getList = useCallback((params = commonParams) => {

        if (filterType === URL_VALUES.OFFERINGS) {
            getOfferCatsEvent(params)
        }

        if (filterType === URL_VALUES.PEOPLE) {
            getUserCatsEvent(params)
        }

        if (filterType === URL_VALUES.ORGANIZATION) {
            getOrgCatsEvent(params)
        }
    }, [filterType])

    const loadCategory = useCallback((data) => {
        const params = {
            ...commonParams,
            parent,
            params: {
                limit: 20,
                offset: data * 20
            }
        }
        getList(filterType, params)
    }, [getList, filterType, parent])

    const commonCatHandleClick = useCallback((data) => {
        setSelected(data.id)
        if (data.has_subs) {
            const params = {
                ...commonParams,
                parent: data.slug ? data.slug : data.id,
                clear: true
            }
            console.log(params)
            setParent(data.slug ? data.slug : data.id)
            getList(params)

        }
    }, [getList])

    const goBackCategory = useCallback(() => {
        const params = {
            ...commonParams,
            parent: 0,
            clear: true
        }
        setParent(0)
        setSelected(null)
        getList(params)
    }, [getList])

    const handleAccept = useCallback(() => {
        const url = []
        if (filterType) {
            url.push(`${URL_KEYS.SEARCH_FILTER_TYPE}=${filterType}`)
        }
        url.push(`${URL_KEYS.CATEGORY_ID}=${parent}`)
        push({
            pathname: '/',
            search: url.join('&')
        })
    }, [parent, filterType, push])

    useEffect(() => {
        let timeout = null

        setTimeout(() => {
            if (filterType) {
                const params = {
                    ...commonParams,
                    parent: 0,
                    clear: true
                }

                if (filterType === URL_VALUES.OFFERINGS) {
                    params['params'] = {
                        limit: 40,
                        offset: 0
                    }
                }

                getList(params)
            }
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [filterType, getList])


    return {loadCategory, commonCatHandleClick, parent, handleAccept, selected, goBackCategory}
}