import {combine, createStore} from 'effector'
import {
    fetchColors,
    fetchFilterParams,
    fetchMediaCategoriesList,
    fetchOfferCatCharacters,
    fetchOfferCatCustomValues,
    fetchOfferCategoriesList,
    fetchOfferCatPreparedValues,
    fetchOfferingCategory,
    fetchOrgCategoriesList,
    fetchUCategoriesList,
} from './effects'
import {categoryForceLoading, characterForceLoading, resetCategoryModelEvent, resetCharacter} from './events'
import {OFFERING_CAT_CHARACTER} from '../../constants'
import {getParamsCustomValues, getParamsPreparedColors, getParamsPreparedValues} from './helper'
import moment from 'moment'
import {storeListWithKey} from '../../utils/store-utils'

const $categoryList = createStore({loading: false, data: [], result: {}, error: false, forceLoading: false})
    .on(fetchUCategoriesList.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchUCategoriesList.fail, (state, error) => (
        {...state, error: error.response, data: [], result: {}, forceLoading: false})
    )
    .on(fetchUCategoriesList.done, (state, res) => {
        const newData = res.params.clear ? res.result.data.results : [...state.data, ...res.result.data.results]
        return {
            ...state,
            error: false,
            result: res.result.data,
            data: newData,
            forceLoading: false
        }
    })
    .on(fetchOfferCategoriesList.pending, (state, pending) => {
        return {
            ...state,
            loading: pending
        }
    })
    .on(fetchOfferCategoriesList.fail, (state, error) => (
        {...state, error: error.response, data: [], result: {}, forceLoading: false})
    )
    .on(fetchOfferCategoriesList.finally, (state, res) => {
        const newData = res.params.clear ? res.result.data.results : [...state.data, ...res.result.data.results]
        return {
            ...state,
            error: false,
            result: res.result.data,
            data: newData,
            forceLoading: false
        }
    })
    .on(fetchOrgCategoriesList.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchOrgCategoriesList.fail, (state, error) => (
        {...state, error: error.response, data: [], result: {}, forceLoading: false})
    )
    .on(fetchOrgCategoriesList.finally, (state, res) => {
        const newData = res.params.clear ? res.result.data.results : [...state.data, ...res.result.data.results]
        return {
            ...state,
            error: false,
            result: res.result.data,
            data: newData,
            forceLoading: false
        }
    })
    .on(fetchMediaCategoriesList.pending, (state, pending) => ({...state, loading: pending}))
    .on(fetchMediaCategoriesList.fail, (state, error) => (
        {...state, error: error.response, data: [], result: {}, forceLoading: false})
    )
    .on(fetchMediaCategoriesList.finally, (state, res) => {
        const newData = res.params.clear ? res.result.data.results : [...state.data, ...res.result.data.results]
        return {
            ...state,
            error: false,
            result: res.result.data,
            data: newData,
            forceLoading: false
        }
    })
    .on(categoryForceLoading, (state) => ({...state, forceLoading: true}))
    .reset(resetCategoryModelEvent)

const $categoryCharacters = createStore({loading: false, result: {}, data: [], error: false})
    .on(fetchOfferCatCharacters.pending, (state, loading) => ({...state, loading}))
    .on(fetchOfferCatCharacters.fail, (state, {error}) => (
        {...state, error: error, result: {}, data: {}})
    )
    .on(fetchOfferCatCharacters.finally, (state, res) => {
        const list = res.result.data.results
        const offerCatId = res.params.cat_id
        let loading = state.loading
        if (res.params.allowToGetCharacterValues) {
            const preparedValues = list.filter(item => (
                item.character_type === OFFERING_CAT_CHARACTER.SELECT_FIELD
            ))
            const preparedColors = list.filter(item => (
                item.character_type === OFFERING_CAT_CHARACTER.COLOUR_FIELD
            ))
            const customValues = list.filter(item => (
                item.character_type !== OFFERING_CAT_CHARACTER.SELECT_FIELD &&
                item.character_type !== OFFERING_CAT_CHARACTER.COLOUR_FIELD &&
                item.character_type !== OFFERING_CAT_CHARACTER.BOOLEAN_FIELD &&
                item.character_type !== OFFERING_CAT_CHARACTER.DATE_FIELD
            ))

            if (preparedValues.length > 0) getParamsPreparedValues(preparedValues, offerCatId)
            if (preparedColors.length > 0) getParamsPreparedColors(preparedColors)
            if (customValues.length > 0) getParamsCustomValues(customValues, offerCatId)
            loading = false
        }

        return {
            ...state,
            result: res.result.data,
            data: list,
            loading
        }
    })
    .reset(resetCharacter)

const $charactersPreparedValues = createStore({
    loading: false, result: {}, data: {}, error: false, forceLoading: false,
})
    .on(characterForceLoading, (state, payload) => ({
        ...state, forceLoading: payload.type === OFFERING_CAT_CHARACTER.SELECT_FIELD
            ? payload.status
            : state.forceLoading
    }))
    .on(fetchOfferCatPreparedValues.pending, (state, loading) => ({...state, loading}))
    .on(fetchOfferCatPreparedValues.fail, (state, error) => ({
        ...state, result: {}, data: {}, error: error.response, forceLoading: false,
    }))
    .on(fetchOfferCatPreparedValues.done, (state, res) => {
        const charac_id = res.params.charac_id
        const result = {...state.result}
        const data = {...state.data}
        const nextOffset = res.params.params.offset + 10
        const clear = res.params.clear
        result[charac_id] = {...res.result.data, nextOffset}
        data[charac_id] = clear
            ? res.result.data.results.map(item => ({label: item.value, value: item.id}))
            : [...state.data[charac_id], ...res.result.data.results.map(item => ({label: item.value, value: item.id}))]

        if (res.params && res.params.action) {
            res.params.action()
        }

        return {
            ...state,
            result,
            data,
        }
    })
    .reset(resetCharacter)

const $colorList = createStore({
    loading: false, data: [], result: {}, p_result: {}, p_data: {}, error: false
})
    .on(fetchColors.pending, (state, loading) => ({...state, loading}))
    .on(characterForceLoading, (state, payload) => ({
        ...state, forceLoading: payload.type === OFFERING_CAT_CHARACTER.COLOUR_FIELD
            ? payload.status
            : state.forceLoading
    }))
    .on(fetchColors.fail, (state, error) => ({
        ...state, data: [], result: {}, prepared_result: {}, prepared_data: [],
    }))
    .on(fetchColors.done, (state, res) => {
        const nextOffset = res.params.params.offset + 10
        const clear = res.params.clear
        const newResult = {...res.result.data, nextOffset}
        const newData = clear ? res.result.data.results : [...state.data, ...res.result.data.results]

        const charac_id = res.params.charac_id
        const p_result = {...state.p_result}
        const p_data = {...state.p_data}
        const p_nextOffset = res.params.params.offset + 10
        p_result[charac_id] = {...res.result.data, p_nextOffset}
        p_data[charac_id] = clear
            ? res.result.data.results.map(item => ({
                label: item.name,
                value: item.hex,
            }))
            : [...state.p_data[charac_id], ...res.result.data.results.map(item => ({
                label: item.name,
                value: item.hex,
            }))]

        if (res.params && res.params.action) {
            res.params.action()
        }

        return {
            ...state, data: newData, result: newResult, error: false, p_data, p_result
        }
    })
    .reset(resetCharacter)

const $charactersCustomValues = createStore({
    loading: false, data: {}, result: {}, error: false, forceLoading: false
})
    .on(fetchOfferCatCustomValues.pending, (state, loading) => ({...state, loading}))
    .on(fetchOfferCatCustomValues.fail, (state, {error}) => ({
        ...state, error, result: {}, data: {}, forceLoading: false
    }))
    .on(characterForceLoading, (state, payload) => ({
        ...state, forceLoading: payload.type === 'custom'
            ? payload.status
            : state.forceLoading
    }))
    .on(fetchOfferCatCustomValues.done, (state, res) => {
        const charac_id = res.params.charac_id
        const type = res.params.type
        const result = {...state.result}
        const data = {...state.data}
        const nextOffset = res.params.params.offset + 10
        const clear = res.params.clear
        result[charac_id] = {...res.result.data, nextOffset}
        const getValue = (item) => {
            switch (type) {
                case OFFERING_CAT_CHARACTER.YEAR_FIELD:
                    return type ? moment(item.value_custom).format('YYYY') : item.value_custom
                default:
                    return item.value_custom
            }
        }
        data[charac_id] = clear
            ? res.result.data.results.map(item => ({label: getValue(item), value: item.value_custom}))
            : [...state.data[charac_id], ...res.result.data.results.map(item => ({
                label: getValue(item),
                value: item.value_custom
            }))]

        if (res.params && res.params.action) {
            res.params.action()
        }

        return {
            ...state,
            result,
            data,
        }
    })
    .reset(resetCharacter)

const $filterParams = createStore({loading: false, data: {}, error: false})
    .on(fetchFilterParams.pending, (state, loading) => ({...state, loading}))
    .on(fetchFilterParams.fail, (state, {error}) => ({
        ...state, error
    }))
    .on(fetchFilterParams.done, (state, res) => ({
        ...state, data: res.result.data
    }))
    .reset(resetCharacter)

const $offeringCategory = createStore({loading: false, error: false, data: {}, result: {}})
    .on(fetchOfferingCategory.pending, (state, loading) => ({...state, loading}))
    .on(fetchOfferingCategory.fail, (state, {error}) => ({...state, error}))
    .on(fetchOfferingCategory.done, (state, {result, params}) => {
        const processed = storeListWithKey({
            response: result.data,
            state,
            key: params.parent,
            clear: params.clear,
            limit: params.params.limit,
        })

        return {
            ...state,
            ...processed
        }
    })

export const $categoryModel = combine({
    $colorList,
    $categoryList,
    $filterParams,
    $categoryCharacters,
    $charactersCustomValues,
    $charactersPreparedValues,
    $offeringCategory
})


