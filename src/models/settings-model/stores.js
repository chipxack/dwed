import {combine, createStore} from "effector";
import {fetchOrgPersonalInfo, fetchUserAvatar, fetchUserPersonalInfo} from "./effects";


const $personalInfo = createStore({loading: false, data: null, error: false})
    .on(fetchUserPersonalInfo.pending, (state, loading) => ({...state, loading}))
    .on(fetchUserPersonalInfo.fail, (state, res) => ({
        ...state, error: res.error, data: null
    }))
    .on(fetchUserPersonalInfo.done, (state, res) => ({
        ...state, error: false, data: res.result.data
    }))
    .on(fetchOrgPersonalInfo.pending, (state, loading) => ({...state, loading}))
    .on(fetchOrgPersonalInfo.fail, (state, res) => ({
        ...state, error: res.error, data: null
    }))
    .on(fetchOrgPersonalInfo.done, (state, res) => {
        const data = res.result.data
        return {
            ...state,
            data: {
                ...data,
                trade_brand: data.name
            },
            error: false
        }
    })

const $businessAvatar = createStore({loading: false, data: null, error: false})
    .on(fetchUserAvatar.pending, (state, loading) => ({...state, loading}))
    .on(fetchUserAvatar.fail, (state, res) => ({
        ...state, error: res.error, data: null
    }))
    .on(fetchUserAvatar.done, (state, res) => {
        const data = res.result.data.results.filter(item => item.business_ava)
        return {
            ...state,
            data: data[0]
        }
    })

export const $settingsModel = combine({
    $personalInfo,
    $businessAvatar
})
