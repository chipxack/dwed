import {httpGet} from '../api'

export default {
    getClientList: ({params, slug_name}) => httpGet({url: `/stats/${slug_name}/clients/`, params}),
    getOfferingsList: ({params, slug_name}) => httpGet({url: `/stats/${slug_name}/offers/`, params}),
    getEmployees: ({params, slug_name}) => httpGet({url: `/stats/${slug_name}/specs/`, params}),
    getFinanceList : ({params, slug_name}) => httpGet({url: `/stats/${slug_name}/finance/`, params}),
    getRequestList : ({params, slug_name}) => httpGet({url: `/stats/${slug_name}/orders/`, params})
}