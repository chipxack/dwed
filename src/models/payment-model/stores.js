import {combine, createStore} from 'effector'
import {getCreditCardsListEvent, resetCard} from './events'
import {makeCommonStore, makeCommonStoreList, makeStoreListStatus} from '../../utils/store-utils'
import {getCreditCardEffect, getCreditCardsListEffects, removeCreditCardEffect, updateCreditCardEffect} from './effects'

const $creditCardList = createStore({
    skeleton: undefined,
    status: undefined,
    error: false,
    loading: false,
    data: [],
    result: {},
})
    .on(getCreditCardsListEvent, (state, {status}) => {
        const processed = makeStoreListStatus(state, status)
        return {
            ...processed,
        }
    })
    .on(getCreditCardsListEffects.pending, (state, loading) => ({...state, loading}))
    .on(getCreditCardsListEffects.finally, (state, res) => {
        if (res.result) {
            const processed = makeCommonStoreList(state, res)
            return {
                ...processed,
            }
        } else {

        }
    })
    .on(removeCreditCardEffect.finally, (state, res) => {
        if (res.result && res.params) {
            if (res.params.action) {
                res.params.action()
            }
            return {
                ...state,
                data: state.data.filter(item => item.id !== res.params.id),
            }
        } else {

        }
    })
    .on(updateCreditCardEffect.finally, (state, res) => {
        if (res.result && res.params) {
            let data = [...state.data]
            const idx = data.findIndex(item => item.id === res.params.id)
            if (idx !== -1) {
                data = [
                    ...data.slice(0, idx),
                    {...res.result.data},
                    ...data.slice(idx + 1),
                ]
            }
            if (res.params.action) {
                res.params.action()
            }
            return {
                ...state,
                data,
            }
        } else {

        }
    })

const $creditCard = createStore({
    loading: false,
    error: false,
    data: {},
    skeleton: undefined,
    status: undefined,
})
    .on(getCreditCardEffect.pending, (state, loading) => ({...state, loading}))
    .on(getCreditCardEffect.finally, (state, res) => {
        if (res.result) {
            const processed = makeCommonStore(state, res)
            return {
                ...processed,
            }
        } else {

        }
    })
    .reset(resetCard)

export const $paymentModel = combine({
    $creditCardList,
    $creditCard,
})
