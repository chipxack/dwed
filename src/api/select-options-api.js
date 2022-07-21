import {httpGet} from "../api";


export const getOffersCategoryCharactersOptionsList = (params) => httpGet({
    url: `/cats/offers_cats/${params.cat_id}/characs/${params.charac_id}/preps/`, params
})

export const getUCategoryList = (id) => httpGet({
    url: `/cats/ucats/get_subs/${id}/`
});

export const specJobMountCategories = (params) => httpGet({
    url: `/orgs/${params.org_slug_name}/spec_cats/`, params
})