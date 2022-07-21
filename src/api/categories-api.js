import {httpGet} from "../api";


export const getUsersCategoriesList = ({parent, params}) => httpGet({
    url: `/cats/ucats/get_subs/${parent}/`, params
});

export const getOrgCategoriesList = ({parent, params}) => httpGet({
    url: `/cats/ocats/get_subs/${parent}/`, params
});

export const getOfferCategoriesList = ({parent, params}) => httpGet({
    url: `/cats/offers_cats/get_subs/${parent}/`, params
});

export const getOffersCategoriesCharacs = ({cat_id, params}) => httpGet({
    url: `/cats/offers_cats/${cat_id}/characs/`, params
})

export const getOfferCatPreps = ({cat_id, charac_id, params}) => httpGet({
    url: `/cats/offers_cats/${cat_id}/characs/${charac_id}/preps/`, params
})
