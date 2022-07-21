import {httpDelete, httpGet, httpPatch, httpPost} from "../api";

export default {
    getAllOfferings: ({params}) => httpGet({url: '/offerings/', params}),
    getOffering: (offering_id) => httpGet({url: `/offerings/${offering_id}/`}),
    getOfferInfo: ({id}) => httpGet({url: `/offerings/${id}/`}),
    getOfferGallery: ({id}) => httpGet({url: `/offerings/${id}/gallery/`}),
    getOfferParams: ({id}) => httpGet({url: `/offerings/${id}/characs/`}),
    getOfferingGallery: (offering_id) => httpGet({url: `/offerings/${offering_id}/gallery/`}),
    getOfferingParams: (offering_id) => httpGet({url: `/offerings/${offering_id}/characs/`}),
    createOfferingGallery: ({offering_id, data}) => httpPost({
        url: `/offerings/${offering_id}/gallery/`, data,
        headers: {"Content-Type": "multipart/form-data"}
    }),
    removeOfferingGallery: ({id, offering_id}) => httpDelete({url: `/offerings/${offering_id}/gallery/${id}/`}),
    updateOfferingGallery: ({id, offering_id, data}) => httpPatch({
        url: `/offerings/${offering_id}/gallery/${id}/`,
        data,
    }),
    updateOffering: ({offering_id, data}) => httpPatch({url: `/offerings/${offering_id}/`, data}),
    createOfferingCharacters: ({offering_id, data}) => httpPost({url: `/offerings/${offering_id}/characs/`, data}),
    updateOfferingCharacters: ({offering_id, data, id}) => httpPatch({
        url: `/offerings/${offering_id}/characs/${id}/`,
        data
    }),
    removeOfferingCharacters: ({offering_id, id}) => httpDelete({url: `/offerings/${offering_id}/characs/${id}/`}),
    removeOffering: ({id,action}) => httpDelete({url: `/offerings/${id}/`}),
    createOfferingTranslate: ({offering_id, data}) => httpPost({url: `/offerings/${offering_id}/translate/`, data}),
    updateOfferingTranslate: ({offering_id, id, data}) => httpPatch({
        url: `/offerings/${offering_id}/translate/${id}/`,
        data
    }),
    getOfferingTranslate: (offering_id) => httpGet({url: `/offerings/${offering_id}/translate/`})
}