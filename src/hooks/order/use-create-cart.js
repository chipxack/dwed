import {useCallback, useEffect, useState} from "react";
import order from "../../service/order";
import {$orderModel, orgCartMount} from '../../models/order-models'
import {useParams} from "react-router-dom";
import {$offeringModel, changeOfferingCartPosition, offeringDetailMount} from "../../models/offering-model";
import {useStore} from "effector-react";
import {useUrlParams} from "../common";
import {URL_KEYS} from "../../constants";
import {showMessage} from "../../UIComponents/message-notification";

const initialParams = {
    limit: 10,
    offset: 0
}

export function useCreateCart({fromDetail}) {
    const [value, setValue] = useState('1')
    const {organization, account} = useParams()
    const {$offeringInfo} = useStore($offeringModel)
    const {urlData} = useUrlParams()
    const {$cart: {data: orgCartData}} = useStore($orderModel)

    const specialist_id = urlData[URL_KEYS.SPECIALIST_ID]

    const getSeller = useCallback((item) => {
        let seller = {}
        if (organization || account) {
            seller = {
                type: organization ? 'organization' : 'user',
                slug_name: organization ? organization : account
            }
        } else {
            if (item.org) {
                seller = {
                    type: 'organization',
                    slug_name: item.org.slug_name
                }
            }

            if (item.user) {
                seller = {
                    type: 'user',
                    slug_name: item.user.username
                }
            }
        }

        return seller
    }, [account, organization])

    const createOrgCart = useCallback((params, type) => {
        order.createOrgCart(params)
            .then((res) => {
                if (res) {
                    showMessage('Предложения добавлена в карзину', 'success', false )
                    if (type) {
                        orgCartMount({organization: params.organization, params: initialParams})
                        changeOfferingCartPosition({id: res.data.offering.id, type, organization: params.organization})
                    }else {
                        offeringDetailMount(res.data.offering.id)
                    }
                }
            })
    }, [])

    const createCart = useCallback((data, seller, type = null) => {
        if (seller.type === 'organization') {
            createOrgCart({data, organization: seller.slug_name}, type)
        }
    }, [createOrgCart])

    // const updateCart = useCallback((data, seller) => {
    //     order.updateCart(data)
    //         .then((res) => {
    //             if(res) {
    //                 offeringDetailMount(res.data.offering.id)
    //             }
    //         })
    // }, [])


    const removeFromCart = useCallback((id, seller, type = null) => {
        order.removeFromCart(id)
            .then((res) => {
                if (res) {
                    showMessage('Предложения удален из карзину', 'danger', false )
                    if (type && type === 'delete') {
                        if (seller.type === 'organization') {
                            orgCartMount({organization: seller.slug_name, params: initialParams})
                        }
                        if (type) {
                            changeOfferingCartPosition({id, type, organization: seller.slug_name})
                        }
                    }
                }
            })
    }, [])

    const getCartItem = useCallback((arr, id) => {
        return arr.find(item => item.key === id)
    }, [])


    const handleChangeCart = useCallback((item) => {
        const seller = getSeller(item)
        const isNew = !item.is_in_cart

        if (!fromDetail) {
            if (isNew) {
                const data = {
                    offering_id: item.id,
                    qty: item.min_qty,
                    responsible_id: specialist_id || item.responsible[0].id
                }
                createCart(data, seller, 'add')
            } else {
                if(orgCartData) {
                    const cartItem = getCartItem(orgCartData, item.id)
                    if(cartItem && !!specialist_id && cartItem.responsible.id !== Number(specialist_id)) {
                        const data = {
                            offering_id: item.id,
                            qty: item.min_qty,
                            responsible_id: specialist_id
                        }
                        createCart(data, seller, 'add')
                    }else {
                        removeFromCart(item.id, seller, 'delete')
                    }
                }
            }
        }else {
            if(isNew) {
                const data = {
                    offering_id: item.id,
                    qty: value,
                    responsible_id: item.responsible[0].id
                }
                createCart(data, seller)
            }else {
                // const params = {
                //     id: item.id,
                //     data: {
                //         qty: value,
                //     }
                // }
                // updateCart(params, seller)
                showMessage('Предложения давно добавлена в карзину', 'danger', false )
            }
        }
    }, [createCart, removeFromCart, specialist_id, orgCartData, fromDetail, getCartItem, getSeller, value])

    const handleChangeQty = useCallback((type) => {
        const {min_qty, max_qty, qty} = $offeringInfo.data
        let result = Number(value)
        const incrementCondition = (
            (
                (!!max_qty && (result + 1) <= max_qty)
                || (!max_qty && (result + 1) <= qty)
                || !qty
            )
        )

        if (type === 'increment' && incrementCondition) {
            result = result + 1
        }

        if (type === 'decrement' && (result - 1) >= min_qty) {
            result = result - 1
        }
        setValue(result)

    }, [value, $offeringInfo.data])

    const handleChange = useCallback((string) => {
        let str = string.replace(/\D/g, '');
        const {min_qty, max_qty, qty} = $offeringInfo.data

        if (str !== '') {
            let result = Number(str)
            if (result >= min_qty && ((max_qty && result <= max_qty) || (!max_qty && result <= qty) || !qty)) {
                setValue(result)
            } else {
                setValue(min_qty)
            }
        } else {
            setValue(str)
        }
    }, [$offeringInfo.data])

    useEffect(() => {
        if (fromDetail && $offeringInfo.data && Object.values($offeringInfo.data).length > 0) {
            setValue($offeringInfo.data.min_qty)
        }
    }, [fromDetail, $offeringInfo.data])

    return {value, setValue, handleChangeQty, handleChangeCart, handleChange}
}