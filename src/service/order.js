import {httpDelete, httpGet, httpPatch, httpPost} from "../api";

export default {
    getCart: () => httpGet({url: '/orders/cart/'}),
    createOrgCart: ({organization, data}) => httpPost({url: `/orders/ocart/${organization}/`, data}),
    getOrgCart: ({organization, params}) => httpGet({url: `/orders/ocart/${organization}/`, params}),
    removeFromCart: (id) => httpDelete({url: `/orders/cart/${id}/`}),
    updateCart: ({data, id}) => httpPatch({url: `/orders/cart/${id}/`, data}),
    createOrder: (data) => httpPost({url: '/orders/', data}),
    getUserOrder: ({seller_username, params}) => httpGet({url: `/orders/uorders/${seller_username}/`, params}),
    getOrgOrder: ({responsible_id, params}) => httpGet({url: `/orders/oorders/${responsible_id}/`, params}),
    getOrderNotes: (params) => httpGet({url: '/orders/', params}),
    updateOrderNotes: ({id, data}) => httpPatch({url: `/orders/${id}/`, data}),
    getOrderInfo: (id) => httpGet({url: `/orders/${id}/`}),
    updateOrder: ({id, data}) => httpPatch({url: `/orders/${id}/`, data}),
    getOrderOfferings: ({order_id, params}) => httpGet({url: `/orders/${order_id}/offers/`, params})
}
