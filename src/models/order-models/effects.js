import {createEffect} from "effector";
import order from "../../service/order";

export const fetchOrgCart = createEffect({
    handler: order.getOrgCart
})

export const fetchCart = createEffect({
    handler: order.getCart
})

export const fetchUpdateCart = createEffect({
    handler: order.updateCart
})

export const fetchRemoveFromCart = createEffect({
    handler: order.removeFromCart
})

export const fetchOrders = createEffect({
    handler: order.getOrderNotes
})

export const fetchUpdateOrder = createEffect({
    handler: order.updateOrderNotes
})

export const fetchOrderInfo = createEffect({
    handler: order.getOrderInfo
})

export const fetchOrderOfferings = createEffect({
    handler: order.getOrderOfferings
})