import {httpGet, httpPost} from "../api";

export const createOrgCart = ({organization, data}) => httpPost({
    url: `/orders/ocart/${organization}/`, data
})

export const getOrgCart = ({organization, params}) =>  httpGet({
    url: `/orders/ocart/${organization}/`, params
})