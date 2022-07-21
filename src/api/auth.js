import {httpPost} from "../api";

export const getToken = (data) => httpPost({
    url: '/account/login/', data
});