import {httpGet, httpPost} from "../api";

export default {
    subscribe: (username) => httpPost({url: `/users/${username}/subs/me/`}),
    getAllUser: ({params}) => httpGet({url: '/users/', params}),
    getUserAllOfferings: ({username, params}) => httpGet({url: `/users/${username}/offerings/`, params}),
    getUserOffering:({username, id}) => httpGet({url: `/users/${username}/offerings/${id}`}),
    getUserOfferingGroup: ({username, params}) => httpGet({url: `/users/${username}/offerings_groups/`, params}),
    getUserSubscribe: ({username, params}) => httpGet({url: `/users/${username}/subs/me/`, params}),
    getUserSubscribeMy: ({username, params}) => httpGet({url: `/users/${username}/subs/my/`, params}),
    subscribeToUser: (userName) => httpPost({url: `/users/${userName}/subs/me/`})
}