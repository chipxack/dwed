import {useCallback, useEffect, useState} from 'react'
import {$categoryModel, offeringCategoryMount} from '../../models/categories-models'
import {useListQuery, useUrlParams} from '../common'
import {FETCHING_STATUS, PROFILE_TYPE, URL_KEYS, URL_VALUES} from '../../constants'
import {useHistory} from 'react-router-dom'
import {useOfferingCategoryId} from '../category'
import {useStore} from 'effector-react'
import {useOfferingBasic} from '../offers'

const initialParams = {
    limit: 20,
    offset: 0
}

export function useOfferingCategoryList({init, routing, onClose}) {
    const {urlData} = useUrlParams()
    const [parentId, setParentId] = useState(0)
    const [mounted, setMounted] = useState(false)
    const {offeringCatId} = useOfferingCategoryId()
    const {$offeringCategory: {data, result, loading}} = useStore($categoryModel)
    const categoryId = offeringCatId || 0
    const filterType = urlData[URL_KEYS.SEARCH_FILTER_TYPE]
    const {push} = useHistory()
    const [selectedCat, setSelectedCat] = useState(null)
    const {getQueryParams} = useListQuery({limit: 20, page: 1})
    const {getAllOfferList} = useOfferingBasic({type: PROFILE_TYPE.USER})

    const getOfferingList = useCallback((categoryId) => {
        const queryParams = getQueryParams(FETCHING_STATUS.FILTER)
        const data = {
            ...queryParams,
        }
        if (!!categoryId) {
            if (typeof categoryId === 'string' && categoryId.indexOf('|') !== -1) {
                data['params']['offer_cat'] = categoryId.split('|')[1]
            } else {
                data['params']['offer_cat'] = categoryId
            }
        } else {
            delete data['params']['offer_cat']
        }
        getAllOfferList(data)
    }, [getQueryParams, getAllOfferList])

    const getList = useCallback((params) => {
        offeringCategoryMount(params)
    }, [])

    const getPath = useCallback((id) => {
        const query = []
        query.push(`${URL_KEYS.SEARCH_FILTER_TYPE}=${URL_VALUES.OFFERINGS}`)

        if (id) {
            query.push(`${URL_KEYS.CATEGORY_ID}=${id}`)
        }

        return {
            pathname: '/',
            search: query.join('&')
        }
    }, [])


    const getChildren = useCallback((id, allowToGet) => {
        const data = {
            clear: true,
            params: initialParams,
            parent: id,
        }

        if (!allowToGet && !routing) {
            setSelectedCat(id)
        } else {
            setParentId(id)
        }

        if (routing) {
            push(getPath(id))
            getOfferingList(id)
        }

        if (allowToGet) {
            getList(data)
        }
    }, [getList, getPath, push, routing, getOfferingList])

    const drawPath = (item) => {
        let id = item.id
        if (!item.has_subs) {
            id = `${item.id}|${item.parent.id}`
        }
        return `/?${URL_KEYS.SEARCH_FILTER_TYPE}=${filterType}&${URL_KEYS.CATEGORY_ID}=${id}`
    }

    const getPrevParentId = useCallback(() => {
        if (categoryId && data[categoryId]) {
            const item = data[categoryId].find(item => item.parent)
            if (item.parent && item.parent.parent_id) {
                return item.parent.parent_id
            }
        }
        return 0
    }, [data, categoryId])

    const loadMore = useCallback((e) => {
        const {target} = e
        const resultByCat = result[parentId]
        if (resultByCat) {
            const data = {
                parent: parentId,
                params: {
                    ...initialParams,
                    offset: resultByCat.nextOffset
                }
            }

            if (target.scrollTop + target.offsetHeight === target.scrollHeight && !loading && !!resultByCat.next) {
                getList(data)
            }
        }


    }, [parentId, result, getList, loading])

    const handleAccept = useCallback(() => {
        if (selectedCat && onClose) {
            push(getPath(`${parentId}|${selectedCat}`))
        }
    }, [selectedCat, onClose, getPath, push, parentId])

    const itemClick = useCallback((e, item) => {
        e.preventDefault()
        let id = item.id
        if (!item.has_subs && routing) {
            id = `${item.id}|${item.parent.id}`
        }
        getChildren(id, item.has_subs)
    }, [routing, getChildren])

    const itemBack = (e) => {
        e.preventDefault()
        getChildren(getPrevParentId(), true)
    }

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            if (!mounted && init) {
                const data = {
                    clear: true,
                    parent: 0,
                    params: initialParams
                }

                if (categoryId) {
                    data['parent'] = categoryId
                    setParentId(Number(categoryId))
                }

                getList(data)
                setMounted(true)
            }
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [categoryId, getList, mounted, init])

    return {parentId, getChildren, getPrevParentId, itemBack, itemClick, drawPath, loadMore, selectedCat, handleAccept}
}