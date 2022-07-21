import {combine, createStore} from 'effector'
import {
    fetchAccountAvatars,
    fetchAccountInfo,
    fetchAccountNewAvatar,
    fetchAccountPData,
    fetchAccountUpdate,
    fetchAccountVideoVerify,
    fetchCreateOrganization,
    fetchOrgUpdate,
    fetchRemovedLinkedUser,
} from './effects'
import {accountSpecPanelEvent, getCurrentProfile, resetCurrentProfile} from './events'
import {showMessage} from '../../UIComponents/message-notification'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import {
    getAccountInfo,
    getAccountName,
    getLinkedUsers,
    getOrganizations,
    getSpecialisms,
    getSpecOrg,
    getUpdated,
} from './helper'
import {PROFILE_TYPE} from '../../constants'

const $accountPData = createStore({loading: true, data: {}, error: false})
    .on(fetchAccountPData.pending, (state, loading) => ({...state, loading}))
    .on(fetchAccountPData.fail, (state, error) => ({
        ...state, data: {}, error: error.response,
    }))
    .on(fetchAccountPData.done, (state, res) => {
        return {
            ...state, error: false, data: res.result.data,
        }
    })

const $accountInfo = createStore({loading: true, data: null, error: false})
    .on(fetchAccountInfo.pending, (state, loading) => ({...state, loading}))
    .on(fetchAccountInfo.fail, (state, {error}) => ({
        ...state, error, data: {},
    }))
    .on(fetchAccountInfo.done, (state, res) => {
        if (res.params && res.params.message && res.params.status && res.params.status === res.result.data.status) {
            showMessage(res.params.message, 'success')
        }
        return {
            ...state, error: false, data: res.result.data,
        }
    })
    .on(fetchAccountUpdate.pending, (state, loading) => ({...state, loading}))
    .on(fetchAccountUpdate.fail, (state, {error}) => ({
        ...state, error,
    }))
    .on(fetchAccountUpdate.done, (state, res) => {
        return {
            ...state,
            error: false,
            data: res?.result?.data || state.data,
        }
    })

const $accountAvatars = createStore({loading: false, data: [], result: {}, error: false})
    .on(fetchAccountAvatars.pending, (state, loading) => ({...state, loading}))
    .on(fetchAccountAvatars.fail, (state, error) => ({
        ...state, error: error.response, data: [], result: {},
    }))
    .on(fetchAccountAvatars.done, (state, res) => ({
        ...state, error: false, data: res.result.data.results, result: res.result.data,
    }))

const $accountVideoVerify = createStore({loading: true, data: [], error: false})
    .on(fetchAccountVideoVerify.pending, (state, loading) => ({...state, loading}))
    .on(fetchAccountVideoVerify.fail, (state, {error}) => ({
        ...state, error, data: [],
    }))
    .on(fetchAccountVideoVerify.done, (state, res) => ({
        ...state, data: res.result.data, error: false,
    }))

const currentProfile = window.localStorage.getItem('currentProfile')
const linkedUsers = window.localStorage.getItem('linkedUsers')

// const $profile = createStore(currentProfile ? JSON.parse(currentProfile) : null)
//     .on(getCurrentProfile, (state, data) => (data))
//     .on(fetchAccountInfo.done, (state, {result: {data}}) => {
//         const profileInfo = {
//             avatar: data.avatar,
//             name: `${data.name} ${data.lastname || ''}`,
//             slug: `@${jwtDecode(Cookies.get('token')).username}`,
//             type: 'user'
//         }
//         return state || profileInfo
//     })
//     .reset(resetCurrentProfile)


const $profiles = createStore({
    currentProfile: currentProfile ? JSON.parse(currentProfile) : null,
    organizations: [],
    specialisms: [],
    accountInfo: {},
    linkedUsers: linkedUsers ? JSON.parse(linkedUsers).data : [],
})
    .on(fetchAccountInfo.done, (state, {result: {data}, params}) => {
        const {organizations: orgs, specialisms: specs, linked_users} = data
        const accountSlug = jwtDecode(Cookies.get('token')).username
        const accountInfo = getAccountInfo(data, accountSlug)
        const specialisms = getSpecialisms(specs, accountSlug)
        const organizations = [...getOrganizations(orgs, data), ...getSpecOrg(specs, data)]
        let linkedUsers = [
            {...accountInfo}, ...getLinkedUsers(linked_users),
        ]

        const info = {
            category: data.main_cat,
            lang: data.user_lang,
            region: data.region,
            status: data.status,
            avatar: data.avatar,
            currency: data.currency || null,
        }

        if (params && params.actions) {
            params.actions()
        }

        let currentAccount

        if (state.currentProfile) {
            if (state.currentProfile.type === PROFILE_TYPE.USER) {
                currentAccount = {...state.currentProfile, ...info, name: getAccountName(data)}
            } else {

                const organization = organizations.find(item => item.slug_name === state.currentProfile.slug_name)

                if (organization) {
                    currentAccount = {
                        ...state.currentProfile,
                        status: organization.status,
                        category: organization.category,
                        region: organization.region,
                    }
                } else {
                    currentAccount = state.currentProfile
                }
            }
        } else {
            currentAccount = accountInfo
        }

        return {
            ...state,
            accountInfo,
            specialisms,
            organizations,
            linkedUsers,
            currentProfile: currentAccount,
        }
    })
    .on(accountSpecPanelEvent, (state, {id, data}) => {
        const specialisms = state.specialisms
        const idx = specialisms.findIndex(item => item.id === id)
        const newItem = {...specialisms[idx], settings: {...specialisms[idx].settings, ...data}}
        const newSpecialisms = [...specialisms.slice(0, idx), newItem, ...specialisms.slice(idx + 1)]
        return {
            ...state,
            specialisms: newSpecialisms,
        }
    })
    .on(getCurrentProfile, (state, paylaod = null) => {
        let currentAccount = null
        const {organizations, linkedUsers} = state

        if (paylaod) {
            const {type, slug_name} = paylaod
            if (type === PROFILE_TYPE.ORGANIZATION) {
                currentAccount = organizations.find(item => item.slug_name === slug_name)
            }

            if (type === PROFILE_TYPE.USER) {
                currentAccount = linkedUsers.find(item => item.slug_name === slug_name)
            }
        }

        return {
            ...state,
            currentProfile: currentAccount,
        }
    })
    .on(fetchAccountUpdate.done, (state, res) => {
        const {result, params} = res
        let tmp = {}
        if(result) {
            if (params && params.actions) {
                params.actions(false, !!params?.redirect)
            }
            const {currentProfile, linkedUsers, accountInfo} = state
            const data = {
                name: getAccountName(result.data),
                category: result.data.main_cat,
                lang: result.data.user_lang,
                region: result.data.region,
                status: result.data.status,
                currency: result.data.currency || null,
            }

            tmp = {
                accountInfo: params.redirect ? {} : {...accountInfo, ...data},
                currentProfile: params.redirect ? null : {...currentProfile, ...data},
                linkedUsers: params.redirect ? [] : getUpdated(linkedUsers, currentProfile.slug_name, data),
            }
        }else {
            if (params && params.actions) {
                params.actions(true, !!params?.redirect)
            }
        }


        return {
            ...state,
            ...tmp
        }
    })
    .on(fetchAccountNewAvatar.done, (state, {result: {data}}) => {
        return {
            ...state,
            currentProfile: {...state.currentProfile, avatar: data.image},
        }
    })
    .on(fetchOrgUpdate.done, (state, {result: {data}, params: {actions, organization}}) => {
        if (actions) {
            actions()
        }
        const {organizations, currentProfile} = state

        const orgInfo = {
            category: data.category,
            region: data.region,
            status: data.status,
            avatar: data.logo,
        }

        return {
            ...state,
            currentProfile: {...currentProfile, ...orgInfo},
            organizations: getUpdated(organizations, organization, orgInfo),
        }
    })
    .on(fetchOrgUpdate.fail, (state, {params}) => {
        if (params.actions) {
            params.actions(true)
        }
        return {
            ...state,
        }
    })
    .on(fetchCreateOrganization.fail, (state, {params}) => {
        if (params && params.actions) {
            params.actions(true)
        }
        return {...state}
    })
    .on(fetchCreateOrganization.done, (state, {params: {orgInfo, actions}}) => {
        actions()
        return {
            ...state,
            organizations: [...state.organizations, {...orgInfo}],
            currentProfile: orgInfo,
        }
    })
    .on(fetchRemovedLinkedUser.done, (state, {params: {username}}) => ({
        ...state, linkedUsers: state.linkedUsers.filter(item => item.slug_name !== username),
    }))
    .reset(resetCurrentProfile)

$profiles.watch((state) => {
    if (state.currentProfile && Object.values(state.currentProfile).length > 0) {
        window.localStorage.setItem('currentProfile', JSON.stringify(state.currentProfile))
        window.localStorage.removeItem('linkedUsers')
    } else {
        window.localStorage.removeItem('currentProfile')
        if (state.linkedUsers.length > 0) {
            window.localStorage.setItem('linkedUsers', JSON.stringify({data: state.linkedUsers}))
        }
    }
})

export const $accountModel = combine({
    $profiles,
    $accountInfo,
    $accountPData,
    $accountAvatars,
    $accountVideoVerify,
})
