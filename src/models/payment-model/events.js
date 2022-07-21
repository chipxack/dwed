import {createEvent} from 'effector'
import {getCreditCardEffect, getCreditCardsListEffects, removeCreditCardEffect, updateCreditCardEffect} from './effects'

export const getCreditCardsListEvent = createEvent()
export const getCreditCardEvent = createEvent()
export const removeCreditCardEvent = createEvent()
export const updateCreditCardEvent = createEvent()
export const resetCard = createEvent()

getCreditCardsListEvent.watch(getCreditCardsListEffects)
getCreditCardEvent.watch(getCreditCardEffect)
removeCreditCardEvent.watch(removeCreditCardEffect)
updateCreditCardEvent.watch(updateCreditCardEffect)

