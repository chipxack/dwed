import {useCallback, useEffect, useState} from 'react'
import {
    $categoryModel,
    colorsMount,
    filterParamsMount,
    offerCatCharactersMount,
    offerCatCustomPrepsMount,
    offerCatPrepsMount
} from '../../models/categories-models'
import {OFFERING_CAT_CHARACTER, URL_KEYS} from '../../constants'
import {useUrlParams} from './use-url-params'
import {useHistory} from 'react-router-dom'
import {useStore} from 'effector-react'
import {allOfferingsMount} from '../../models/offering-model'

const initialParams = {
    limit: 50,
    offset: 0,
}

export function useParamFilter({onClose}) {
    const [values, setValues] = useState({})
    const [catId, setCatId] = useState(null)
    const {
        $charactersPreparedValues: {result: p_result},
        $charactersCustomValues: {result: c_result},
        $colorList: {p_result: color_result},
        $filterParams: {data: {cost}}
    } = useStore($categoryModel)
    const {urlData} = useUrlParams()
    const categoryId = urlData[URL_KEYS.CATEGORY_ID]
    const params = urlData[URL_KEYS.PARAMS]
    const costMax = urlData[URL_KEYS.COST_MAX]
    const costMin = urlData[URL_KEYS.COST_MIN]
    const filterType = urlData[URL_KEYS.SEARCH_FILTER_TYPE]
    const {push} = useHistory()
    const [showAllFilters, setShowAllFilters] = useState(false)
    const [costValue, setCostValue] = useState([0, 100])

    const getCharacters = useCallback((params) => {
        offerCatCharactersMount(params)
    }, [])

    const getCategoryId = useCallback((idx) => {
        let tmp = null

        if (idx && idx.indexOf('|') !== -1) {
            tmp = parseInt(idx)
        }
        return tmp
    }, [])

    const onChange = useCallback((p) => {
        const data = {...values}
        if (values[p.key]) {
            delete data[p.key]
        } else {
            data[p.key] = p
        }
        setValues(data)
    }, [values])

    const handleAccept = useCallback(() => {
        const data = Object.values(values)
        const tmp = []
        const query = []
        const filterParam = {}
        if (filterType) {
            query.push(`${URL_KEYS.SEARCH_FILTER_TYPE}=${filterType}`)
        }

        if (categoryId) {
            query.push(`${URL_KEYS.CATEGORY_ID}=${categoryId}`)
        }

        for (let item of data) {
            tmp.push(`${item.charac_id}:${item.value}`)

        }

        if (tmp.length > 0) {
            query.push(`${URL_KEYS.PARAMS}=${tmp.join(',')}`)
            filterParam['params'] = tmp.join(',')
        }

        query.push(`${URL_KEYS.COST_MIN}=${costValue[0]}`)
        query.push(`${URL_KEYS.COST_MAX}=${costValue[1]}`)

        push({
            pathname: '/',
            search: query.join('&')
        })

        filterParam['offer_cat'] = parseInt(categoryId)
        if (costMin && costMax) {
            filterParam['cost_max'] = costMax
            filterParam['cost_min'] = costMin
        }
        const listQuery = {
            clear: true,
            params: {
                limit: 20,
                 offset: 0,
                ...filterParam
            }
        }

        allOfferingsMount(listQuery)

        onClose()
    }, [values, categoryId, filterType, push, onClose, costValue, costMax, costMin])

    const resetFilter = useCallback(() => {
        setValues({})
        const query = []
        if (filterType) {
            query.push(`${URL_KEYS.SEARCH_FILTER_TYPE}=${filterType}`)
        }

        if (categoryId) {
            query.push(`${URL_KEYS.CATEGORY_ID}=${categoryId}`)
        }

        push({
            pathname: '/',
            search: query.join('&')
        })
    }, [categoryId, push, filterType])

    const getPreparedValues = useCallback(({cat_id, charac_id, action, search}) => {
        const result = p_result[charac_id]
        const data = {
            cat_id,
            charac_id,
            clear: true,
            params: {
                limit: 10,
                offset: 0,
                search: search || '',
                only_used: '1'
            }
        }

        if (search !== undefined) {
            if (search.length > 2) {
                data['params']['search'] = search
                offerCatPrepsMount(data)
            } else {
                offerCatPrepsMount(data)
            }
        } else {
            if (result.count > 10) {
                data['action'] = action
                offerCatPrepsMount(data)
            } else {
                action()
            }
        }
    }, [p_result])

    const getCustomValues = useCallback(({charac_id, cat_id, type, action, search}) => {
        const result = c_result[charac_id]
        const data = {
            cat_id,
            charac_id,
            type: type,
            clear: true,
            params: {
                limit: 10,
                offset: 0,
            }
        }
        if (search !== undefined) {
            if (search.length > 2) {
                data['params']['search'] = search
                offerCatCustomPrepsMount(data)
            } else {
                offerCatCustomPrepsMount(data)
            }
        } else {
            if (result.count > 10) {
                data['action'] = action
                offerCatCustomPrepsMount(data)
            } else {
                action()
            }
        }
    }, [c_result])

    const getPreparedColor = useCallback(({charac_id, action, search}) => {
        const result = color_result
        const data = {
            charac_id,
            clear: true,
            params: {
                limit: 10,
                offset: 0,
                charac_id,
                search: search || '',
            }
        }
        if (search !== undefined) {
            if (search.length > 2) {
                data['params']['search'] = search
                colorsMount(data)
            } else {
                colorsMount(data)
            }
        } else {
            if (result.count > 10) {
                data['action'] = action
                colorsMount(data)
            } else {
                action()
            }
        }

    }, [color_result])

    const getAllValues = useCallback((type, charac_id, action) => {
        const cat_id = catId
        if (type === OFFERING_CAT_CHARACTER.SELECT_FIELD) {
            getPreparedValues({charac_id, cat_id, action})
        }

        if (
            type !== OFFERING_CAT_CHARACTER.SELECT_FIELD &&
            type !== OFFERING_CAT_CHARACTER.COLOUR_FIELD &&
            type !== OFFERING_CAT_CHARACTER.BOOLEAN_FIELD &&
            type !== OFFERING_CAT_CHARACTER.DATE_FIELD
        ) {
            getCustomValues({charac_id, type, cat_id, action})
        }

        if (type === OFFERING_CAT_CHARACTER.COLOUR_FIELD) {
            getPreparedColor({charac_id, action})
        }
    }, [getPreparedValues, catId, getCustomValues, getPreparedColor])

    const onSearch = useCallback((type, charac_id, value) => {
        const cat_id = catId
        const search = value.length > 2 ? value : ''

        if (type === OFFERING_CAT_CHARACTER.SELECT_FIELD) {
            getPreparedValues({charac_id, cat_id, search})
        }

        if (
            type !== OFFERING_CAT_CHARACTER.SELECT_FIELD &&
            type !== OFFERING_CAT_CHARACTER.COLOUR_FIELD &&
            type !== OFFERING_CAT_CHARACTER.BOOLEAN_FIELD &&
            type !== OFFERING_CAT_CHARACTER.DATE_FIELD
        ) {
            getCustomValues({charac_id, type, cat_id, search})
        }

        if (type === OFFERING_CAT_CHARACTER.COLOUR_FIELD) {
            getPreparedColor({charac_id, search})
        }
    }, [getPreparedValues, getCustomValues, getPreparedColor, catId])

    const handleShowAllFilters = useCallback(() => {
        if (catId) {
            const data = {
                allowToGetCharacterValues: true,
                params: {
                    ...initialParams,
                },
                cat_id: catId
            }
            setShowAllFilters(true)
            getCharacters(data)
        }
    }, [catId, getCharacters])

    useEffect(() => {
        if (catId) {
            const data = {
                allowToGetCharacterValues: true,
                params: {
                    ...initialParams,
                    required: '1'
                },
                cat_id: catId
            }
            getCharacters(data)
        }
    }, [getCharacters, catId])

    useEffect(() => {
        const tmp = {}
        if (params) {
            const data = params.split(',')
            for (let item of data) {
                const ratioSignIdx = item.indexOf(':')
                const charac_id = item.substring(0, ratioSignIdx)
                const value = item.substring(ratioSignIdx + 1)
                tmp[value] = {charac_id, value: value, key: value}
            }
        }
        setValues(tmp)
    }, [params])

    useEffect(() => {
        if (catId) {
            if (costMax && costMin) {
                setCostValue([Number(costMin), Number(costMax)])
            } else {
                if (cost) {
                    setCostValue([cost.min, cost.max])
                }
            }
        }
    }, [costMax, costMin, cost, catId])

    useEffect(() => {
        if (catId) {
            filterParamsMount(catId)
        }
    }, [catId])

    useEffect(() => {
        if (categoryId) {
            const id = getCategoryId(categoryId)
            setCatId(id)
        } else {
            setCatId(null)
        }
    }, [categoryId, getCategoryId])

    return {
        values,
        onSearch,
        onChange,
        costValue,
        resetFilter,
        handleAccept,
        setCostValue,
        getAllValues,
        showAllFilters,
        handleShowAllFilters
    }
}