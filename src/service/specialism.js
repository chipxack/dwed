import {httpDelete, httpGet, httpPatch, httpPost} from '../api'

export default {
    getOrgSpecInfo: (id) => httpGet({url: `/spec/${id}/`}),
    getSelfSpecInfo: () => httpGet({url: '/selfempl/'}),
    updateOrgSpec: ({id, data}) => httpPatch({url: `/spec/${id}/`, data}),
    updateSelfSpec: (data) => httpPatch({url: `/selfempl/`, data}),
    getOrgSpecRequests: ({specialism_id, params}) => httpGet({url: `/spec/${specialism_id}/orders/`, params}),
    getOrgSpecRequestOffer: (
        {
            specialism_id,
            order_id,
            params
        }
    ) => httpGet({url: `/spec/${specialism_id}/orders/${order_id}/offers/`, params}),
    getSelfSpecRequestOffer: ({order_id, params}) => httpGet({url: `/selfempl/orders/${order_id}/offers/`, params}),
    updateOrgSpecRequestDetail: (
        {
            order_id,
            data,
            specialism_id
        }
    ) => httpPatch(({url: `/spec/${specialism_id}/orders/${order_id}/`, data})),
    getSelfSpecRequest: ({params}) => httpGet({url: '/selfempl/orders/', params}),
    getOrgSpecRequestDetail: (
        {
            specialism_id,
            order_id
        }
    ) => httpGet({url: `/spec/${specialism_id}/orders/${order_id}/`}),
    getSelfSpecRequestDetail: (order_id) => httpGet({url: `/selfempl/orders/${order_id}/`}),
    updateSelfSpecRequestDetail: ({order_id, data}) => httpPatch({url: `/selfempl/orders/${order_id}/`, data}),
    validateOrgSpecOrder: ({specialism_id, data}) => httpPost({url: `/spec/${specialism_id}/orders/validate/`, data}),
    validateSelfSpecOrder: ({data}) => httpPost({url: `/selfempl/orders/validate/`, data}),
    updateOrgSpecOrder: (
        {
            id,
            data,
            params,
            order_id,
            specialism_id,
            onUploadProgress
        }
    ) => httpPatch({
        url: `/spec/${specialism_id}/orders/${order_id}/offers/${id}/`,
        data,
        params,
        headers: {'Content-Type': 'multipart/form-data'},
        onUploadProgress
    }),
    getOrgSpecRecords: (
        {
            specialism_id,
            order_id,
            params
        }
    ) => httpGet({url: `/spec/${specialism_id}/orders/${order_id}/records/`, params}),
    getOrgSpecSavedCommentsList: ({specialism_id, params}) => httpGet({
        url: `/spec/${specialism_id}/saved_comments/`,
        params
    }),
    createOrgSpecSavedComments: ({specialism_id, data}) => httpPost({
        url: `/spec/${specialism_id}/saved_comments/`,
        data
    }),
    removeOrgSpecSavedComments: ({specialism_id, id}) => httpDelete({
        url: `/spec/${specialism_id}/saved_comments/${id}/`,
    }),
    updateOrgSpecSavedComments: ({specialism_id, id, data}) => httpPatch({
        url: `/spec/${specialism_id}/saved_comments/${id}/`, data
    }),
    getOrgSpecSavedComments: ({specialism_id, id}) => httpGet({url: `/spec/${specialism_id}/saved_comments/${id}/`,})
}
