import {createEvent} from "effector";
import {
    fetchColors,
    fetchFilterParams,
    fetchUCategoriesList,
    fetchOrgCategoriesList,
    fetchOfferCatCharacters,
    fetchMediaCategoriesList,
    fetchOfferCategoriesList,
    fetchOfferCatCustomValues,
    fetchOfferCatPreparedValues, fetchOfferingCategory,
} from './effects'

export const colorsMount = createEvent()
export const resetCharacter = createEvent()
export const getOrgCatsEvent = createEvent();
export const getUserCatsEvent = createEvent();
export const getOfferCatsEvent = createEvent();
export const getMediaCatsEvent = createEvent();
export const filterParamsMount = createEvent()
export const offerCatPrepsMount = createEvent()
export const categoryForceLoading = createEvent()
export const characterForceLoading = createEvent()
export const offerCatCharactersMount = createEvent()
export const resetCategoryModelEvent = createEvent()
export const offerCatCustomPrepsMount = createEvent()
export const offeringCategoryMount = createEvent()

colorsMount.watch(fetchColors)
filterParamsMount.watch(fetchFilterParams)
getUserCatsEvent.watch(fetchUCategoriesList);
getOrgCatsEvent.watch(fetchOrgCategoriesList);
getOfferCatsEvent.watch(fetchOfferCategoriesList);
getMediaCatsEvent.watch(fetchMediaCategoriesList);
offerCatPrepsMount.watch(fetchOfferCatPreparedValues)
offerCatCharactersMount.watch(fetchOfferCatCharacters)
offerCatCustomPrepsMount.watch(fetchOfferCatCustomValues)
offeringCategoryMount.watch(fetchOfferingCategory)
