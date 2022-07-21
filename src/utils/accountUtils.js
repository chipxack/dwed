import {accountMenuData} from "../data/account";
import {SPEC_REQUESTS_STATUS} from "../constants";
import i18n from '../config/i18n'

export const getMenuData = (menuData) => {
    const tmp = []
    for (let i = 0; i < menuData.length; i++) {
        if(accountMenuData[menuData[i]]) {
            tmp.push(accountMenuData[menuData[i]])
        }
    }

    return tmp
}

export const getStatus = (status) => {
    switch (status) {
        case  3:
            return {
                text: 'on_moderate',
                color: 'var(--warning-dwed)'
            }
        default:
            return {
                text: 'unidentified_account',
                color: 'var(--danger-dwed)'
            }
    }
}

export const getOrderStatus = (status_number) => {
    switch (status_number) {
        case 1:
            return {
                title: SPEC_REQUESTS_STATUS.ACCEPTED,
                color: '#34C759'
            }
        case -1:
            return {
                title: SPEC_REQUESTS_STATUS.CANCEL,
                color: 'var(--danger-dwed)'
            }
        case 2:
            return {
                title: SPEC_REQUESTS_STATUS.AWAITING_RECORD,
                color: '#FD9644'
            }
        case 5:
            return {
                title: SPEC_REQUESTS_STATUS.FINISHED,
                color: '#34C759'
            }
        default:
            return {
                title: SPEC_REQUESTS_STATUS.WAITING,
                color: '#FD9644'
            }
    }
}

export const getRequestStatus = (status) => {
    switch (status) {
        case 0:
            return {
                title: i18n.t(SPEC_REQUESTS_STATUS.WAITING),
                color: '#FD9644',
                bgColor: 'rgba(253, 150, 68, 0.2)'
            }
        case 1:
            return {
                title: i18n.t(SPEC_REQUESTS_STATUS.ACCEPTED),
                color: '#34C759',
                bgColor: 'rgba(43, 203, 186, 0.2)'
            }
        case 2:
            return {
                title: i18n.t(SPEC_REQUESTS_STATUS.QR_SCANNED),
                color: 'var(--grey-dwed)',
                bgColor: 'rgba(127, 146, 160, 0.25)'
            }
        case -1:
            return {
                title: i18n.t(SPEC_REQUESTS_STATUS.CANCEL),
                color: 'var(--danger-dwed)',
                bgColor: 'rgba(255, 90, 95, 0.2)'
            }
        case 5:
            return {
                title: i18n.t(SPEC_REQUESTS_STATUS.FINISHED),
                color: 'var(--primary-dwed)',
                bgColor: 'rgba(29, 161, 242, 0.2)'
            }
        default:
            return {
                title: i18n.t(SPEC_REQUESTS_STATUS.WAITING),
                color: '#FD9644',
                bgColor: 'rgba(253, 150, 68, 0.2)'
            }
    }
}