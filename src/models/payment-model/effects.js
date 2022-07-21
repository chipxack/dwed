import {createEffect} from 'effector'
import payment from '../../service/payment'

export const getCreditCardsListEffects = createEffect({
    handler: payment.getCreditCardsList
})

export const getCreditCardEffect = createEffect({
    handler: payment.getCreditCard
})

export const removeCreditCardEffect = createEffect({
    handler: payment.removeCreditCard
})

export const updateCreditCardEffect = createEffect({
    handler: payment.updateCreditCard
})
