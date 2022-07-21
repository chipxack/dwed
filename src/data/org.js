import i18n from '../config/i18n'
import {PAYMENT_METHODS} from '../constants'

export const orgPaymentMethods = [
    {
        id: PAYMENT_METHODS.CASH,
        title: i18n.t('cash'),
        desc: i18n.t('customers_can_pay_in_cash'),
    },
    {
        id: PAYMENT_METHODS.TERMINAL,
        title: i18n.t('terminal'),
        desc: i18n.t('customers_can_pay_through_the_terminal'),
    },
    {
        id: PAYMENT_METHODS.ONLINE,
        title: i18n.t('online_payment'),
        desc: 'Payme'

    },
]
