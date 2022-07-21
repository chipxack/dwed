import {httpDelete, httpGet, httpPatch, httpPost} from '../api'

export default {
    createCreditCard: (data) => httpPost({url: '/payment/payme/cards/', data}),
    getCreditCardsList: ({params}) => httpGet({url: '/payment/payme/cards/', params}),
    getCreditCard : (id) => httpGet({url: `/payment/payme/cards/${id}/`}),
    cardVerify: ({id, data}) => httpPatch({url: `/payment/payme/cards/${id}/verify/`, data}),
    removeCreditCard: ({id}) => httpDelete({url: `/payment/payme/cards/${id}/`}),
    updateCreditCard: ({id, data}) => httpPatch({url: `/payment/payme/cards/${id}/`, data}),
    resendCardVerify: (id) => httpGet({url: `/payment/payme/cards/${id}/resend_verify_code/`})
}
