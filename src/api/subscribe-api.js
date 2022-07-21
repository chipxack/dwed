import {httpPost} from "../api";


export const subscribeToOrg = (orgName) => httpPost({
    url: `/orgs/${orgName}/subs/me/`
});
export const subscribeToPeople = (peopleName) => httpPost({
    url: `/users/${peopleName}/subs/me/`
});