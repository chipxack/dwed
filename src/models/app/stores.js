import {combine, createStore} from 'effector'
import {allowPermission, fastAuthVisibleStatus, toggleSearchFocus, tokenMount} from './events'
import {fetchCurrencyList, fetchRegionDetect} from './effects'
import Cookies from 'js-cookie'
import {ENVIRONMENT_MODE} from '../../constants'

const $app = createStore({
    searchFocus: undefined,
    token: Cookies.get('token') || null,
    allow: {},
    prodsMode: ENVIRONMENT_MODE.DEVELOPMENT,
    showFastAuth: false
})
    .on(toggleSearchFocus, (state, status) => ({...state, searchFocus: status}))
    .on(tokenMount, (state, token) => ({...state, token}))
    .on(allowPermission, (state, payload) => ({...state, allow: payload}))
    .on(fastAuthVisibleStatus, (state, status) => ({...state, showFastAuth: status}))

const $currencyList = createStore({loading: false, data: [], result: {}, error: false})
    .on(fetchCurrencyList.pending, (state, loading) => ({...state, loading}))
    .on(fetchCurrencyList.done, (state, error) => ({
        ...state,
        error: error.response,
        data: [],
        result: {}
    }))
    .on(fetchCurrencyList.done, (state, res) => {
        return {
            ...state,
            result: res.result.data,
            data: res.result.data.results
        }
    })

const $regionDetect = createStore(localStorage.getItem('detectionInfo') ? JSON.parse(localStorage.getItem('detectionInfo')) : {})
    .on(fetchRegionDetect.done, (state, {result}) => {
        return result.data
    })

$regionDetect.watch((state) => {
    localStorage.setItem('detectionInfo', JSON.stringify(state))
})

export const $appModel = combine({
    $currencyList,
    $app,
    $regionDetect
})
