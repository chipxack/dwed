import {FETCHING_STATUS} from '../constants'
import i18n from '../config/i18n'

export function getCommonApiParams(limit = 20, offset = 0) {
    return {
        status: FETCHING_STATUS.INIT,
        params: {
            limit,
            offset
        }
    }
}

export const getLocalCost = (cost, currency, locale = 'ru-RU', fraction) => {
    if(cost === null) {
        return i18n.t('not_specified')
    }

    if(cost === 0) {
        return i18n.t('free')
    }

    return cost.toLocaleString(locale, {style: 'currency', currency, maximumFractionDigits: fraction || 0})
}

export const langFormat = (lang) => `${lang}-${lang.toUpperCase()}`

export const storeNames = localStorage.getItem('store_names') && JSON.parse(localStorage.getItem('store_names'))