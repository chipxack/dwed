import {httpGet} from '../api'

export default {
    getRegionDetect: () => httpGet({url: '/regions/detect/'}),
    getCurrencyList: (params) => httpGet({url: '/currencies/', params})
}