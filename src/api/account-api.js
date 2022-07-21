import {httpGet, httpPatch, httpPost} from "../api";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";


export const getUserInfo = () => httpGet({
    url: '/account/'
});

export const recoveryAccount = (data) => httpPost({
    url: '/account/recovery/', data
})

export const recoveryAccountFinish = (data) => httpPatch({
    url: '/account/recovery/finish/', data
})

export const getAccountInfo = (account) => httpGet({
    url: `/users/${account}/`
});

export const getAccountSubscribers = (params) => httpGet({
    url: `/users/${params.username}/subs/me/`, params
});

export const getAccountSubscriptions = (params) => httpGet({
    url: `/users/${params.username}/subs/my/`, params
});

export const createAccount = (data) => httpPost({
    url: '/account/create/', data
});
export const activatePhone = (data) => httpPost({
    url: '/account/activate/', data, headers: {}
});
export const resendCode = (data) => httpPost({
    url: '/account/resendcode/', data, headers: {}
});

export const validateAccount = (data) => httpPost({
    url: '/account/validate/', data, headers: {}
})

export const updateAccount = (data) => httpPatch({
    url: '/account/', data
})

////////////////////////////

export const getOffersAccount = (params) => httpGet({
    url: `/users/${params.username}/offerings/`, params
});

export const getOffersGroups = (params) => httpGet({
    url: `/users/${params.username}/offerings_groups/`, params
})

export const createOffersGroup = (username, data) => httpPost({
    url: `/users/${username}/offerings_groups/`, data,
    headers: {"Content-Type": "multipart/form-data"}
})

export const createOffers = (data) => httpPost({
    url: `/users/${jwtDecode(Cookies.get('token')).username}/offerings/`, data
})

export const createGalleryToOffer = (id, data) => httpPost({
    headers: { "Content-Type": "multipart/form-data" }, url: `/offerings/${id}/gallery/`, data
})

export const createGalleryToOfferPost = (id, data) => httpPost({
    url: `/offerings/${id}/gallery/`, data
})

export const updateCharactersOffer = (offeringId, data) => httpPost({
    url: `/offerings/${offeringId}/characs/`, data
})

export const getAccountSpec = (id) => httpGet({
    url: `/spec/${id}/`
})

export const updateAccountSpec = ({id, data}) => httpPatch({
    url: `/spec/${id}/`, data
})

export const specJobMountRequests = ({specialism_id, params}) => httpGet({
    url:`/spec/${specialism_id}/orders/`, params 
})

export const getJobRequestOffer = ({specialism_id, order_id}) => httpGet({
    url: `/spec/${specialism_id}/orders/${order_id}/offers/`
})

export const getJobRequestDetail = ({specialism_id, order_id}) => httpGet({
    url: `/spec/${specialism_id}/orders/${order_id}/`
})

export const updateJobRequestDetail = ({specialism_id, order_id, data}) => httpPatch({
    url: `/spec/${specialism_id}/orders/${order_id}/`, data
})

export const jobOrderValidate = ({specialism_id, data}) => httpPost({
    url: `/spec/${specialism_id}/orders/validate/`, data
})

export const getSelfJob = () => httpGet({
    url: '/selfempl/'
})

export const updateSelfJob = ({data}) => httpPatch({
    url: `/selfempl/`, data
})

export const getSelfRequest = () => httpGet({
    url: '/selfempl/orders/'
})

export const getSelfRequestOffer = (orderId) => httpGet({
    url: `/selfempl/orders/${orderId}/offers/`
})

export const getSelfRequestDetail = (orderId) => httpGet({
    url: `/selfempl/orders/${orderId}/`
})

export const updateSelfDetail = ({orderId, data}) => httpPatch({
    url: `/selfempl/orders/${orderId}/`, data
})

export const selfOrderValidate = (data) => httpPost({
    url: `/selfempl/orders/validate/`, data
})