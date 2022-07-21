import {httpDelete, httpGet, httpPatch, httpPost, httpPut} from "../api";


export default {
    getAccount: () => httpGet({url: '/account/'}),
    getUserAccount: ({account}) => httpGet({url: `/users/${account}/`}),
    getToken: (data) => httpPost({url: '/account/login/', data}),
    createAccount: (data) => httpPost({url: '/account/create/', data, headers: {notAuth: true}}),
    activatePhone: (data) => httpPost({url: '/account/activate/', data}),
    validateAccount: (data) => httpPost({url: '/account/validate/', data, headers: {notAuth: true}}),
    getAccountPData: () => httpGet({url: '/account/pdata/'}),
    getAccountAvatars: (params) => httpGet({url: '/account/avatars/', params}),
    removeAccountAvatar: (id) => httpDelete({url: `/account/avatars/${id}/`}),
    updateAccountAvatar: ({id, data}) => httpPatch({
        url: `/account/avatars/${id}/`,
        data,
        headers: {"Content-Type": "multipart/form-data"}
    }),
    getAccountVideoVerify: () => httpGet({url: '/account/video_verify/'}),
    refreshToken: (data) => httpPost({
        url: '/account/token-refresh/', data, headers: {
            notAuth: true
        }
    }),
    createAccountVideoVerify: (data) => httpPost({
        data,
        url: '/account/video_verify/',
        headers: {"Content-Type": "multipart/form-data"}
    }),
    createAccountAvatar: (data) => httpPost({
        data,
        url: '/account/avatars/',
        headers: {"Content-Type": "multipart/form-data"}
    }),
    updateAccountPData: (data) => httpPut({
        data,
        url: '/account/pdata/',
        headers: {"Content-Type": "multipart/form-data"}
    }),
    updateAccount: ({data}) => httpPatch({url: '/account/', data}),
    removeLinkedUser: (data) => httpPost({url: '/account/remove_linked_user/', data}),
    fastAuth: (data) => httpPost({url: '/account/fast_auth/', data}),
    getSessions: (params) => httpGet({url: '/account/sessions/', params})
}
