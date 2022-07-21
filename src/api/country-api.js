import {httpGet} from "../api";


export const getRegionList = ({parent, params}) => httpGet({
    url: `/regions/get_subs/${parent}/`, params
});
