import {httpGet} from "../api";

export default {
    getUserCategory: ({parent, params}) => httpGet({url: `/cats/ucats/get_subs/${parent}/`, params}),
    getOrgCategory: ({parent, params}) => httpGet({url: `/cats/ocats/get_subs/${parent}/`, params}),
    getOfferingCategory: ({parent, params}) => httpGet({url: `/cats/offers_cats/get_subs/${parent}/`, params}),
    getMediaCategory: ({parent, params}) => httpGet({url: `/cats/media_cats/get_subs/${parent}/`, params}),
    getOfferCatCharacters: ({cat_id, params}) => httpGet({url: `/cats/offers_cats/${cat_id}/characs/`, params}),
    getOfferCatPreparedValues: (
        {
            cat_id,
            charac_id,
            params
        }
    ) => httpGet({url: `/cats/offers_cats/${cat_id}/characs/${charac_id}/preps/`, params}),
    getOfferCatCustomValues: (
        {
            cat_id,
            charac_id,
            params
        }
    ) => httpGet({url: `/cats/offers_cats/${cat_id}/characs/${charac_id}/customs/`, params}),
    getColors: ({params}) => httpGet({url: '/cats/colours/', params}),
    getFilterParams: (cat_id) => httpGet({url: `/cats/offers_cats/${cat_id}/filter_params/`})
}