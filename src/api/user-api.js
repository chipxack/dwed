import {httpGet, httpPost} from "../api";

export const getUserList = ({params}) => httpGet({
    url: '/users/', params
});

export const uploadAvatarUser = (data) => httpPost({
    headers: { "Content-Type": "multipart/form-data" }, url: '/account/avatars/', data
})

export const searchUsers = (params) => httpGet({
    url: '/users/', params
})

export const getUserOfferings = ({username, params}) => httpGet({
    url: `/users/${username}/offerings/`, params
})

export const getUserOfferingsGroup = ({username, params}) => httpGet({
    url: `/users/${username}/offerings_groups/`, params
})

export const createUserOffers = ({username, data}) => httpPost({
    url: `/users/${username}/offerings/`, data
})