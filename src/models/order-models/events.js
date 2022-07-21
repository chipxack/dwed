import {createEvent} from "effector";
import {
    fetchCart,
    fetchOrderInfo, fetchOrderOfferings,
    fetchOrders,
    fetchOrgCart,
    fetchRemoveFromCart,
    fetchUpdateCart,
    fetchUpdateOrder
} from './effects'

export const cartMount = createEvent()
export const orderListMount = createEvent()
export const orgCartMount = createEvent()
export const orderInfoMount = createEvent()
export const updateCartMount = createEvent()
export const updateOrderMount = createEvent()
export const removeFromCartMount = createEvent()
export const cartSpecialistsMount = createEvent()
export const resetOrderModelListStore = createEvent()
export const orderMount = createEvent()
export const orderOfferingsMount = createEvent()
export const cartTotalCostMount = createEvent()

cartMount.watch(fetchCart)
orderListMount.watch(fetchOrders)
orgCartMount.watch(fetchOrgCart)
orderInfoMount.watch(fetchOrderInfo)
updateCartMount.watch(fetchUpdateCart)
updateOrderMount.watch(fetchUpdateOrder)
removeFromCartMount.watch(fetchRemoveFromCart)
orderMount.watch(fetchOrderInfo)
orderOfferingsMount.watch(fetchOrderOfferings)
