import {createEffect} from "effector";
import category from "../../service/category";

export const fetchUCategoriesList = createEffect({
    handler: category.getUserCategory
});

export const fetchOrgCategoriesList = createEffect({
    handler: category.getOrgCategory
});

export const fetchOfferCategoriesList = createEffect({
    handler: category.getOfferingCategory
});

export const fetchMediaCategoriesList = createEffect({
    handler: category.getMediaCategory
});

export const fetchOfferCatCharacters = createEffect({
    handler: category.getOfferCatCharacters
})

export const fetchOfferCatPreparedValues = createEffect({
    handler: category.getOfferCatPreparedValues
})

export const fetchOfferCatCustomValues = createEffect({
    handler: category.getOfferCatCustomValues
})

export const fetchColors = createEffect({
    handler: category.getColors
})

export const fetchFilterParams = createEffect({
    handler: category.getFilterParams
})

export const fetchOfferingCategory = createEffect({
    handler: category.getOfferingCategory
})

