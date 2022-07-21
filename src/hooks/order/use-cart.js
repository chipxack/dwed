import {useCallback, useEffect, useState} from 'react'
import {
    $orderModel,
    cartMount,
    cartSpecialistsMount,
    cartTotalCostMount,
    orgCartMount,
    updateCartMount,
} from '../../models/order-models'
import order from '../../service/order'
import {useStore} from 'effector-react'
import {URL_KEYS} from '../../constants'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router-dom'
import {getMeasurement} from '../../utils/measuremenUtils'
import {showMessage} from '../../UIComponents/message-notification'
import {useUrlParams} from '../common'

const initialParams = {
    limit: 10,
    offset: 0
}

export function useCart() {
    const {t} = useTranslation()
    const {push, location: {pathname}} = useHistory()
    const {$allCart, $cart} = useStore($orderModel)
    const [values, setValues] = useState({})
    const {urlData} = useUrlParams()
    const seller = urlData[URL_KEYS.SELLER]
    const spec_id = urlData[URL_KEYS.SPECIALIST_ID]

    const getOrgCart = useCallback((params) => {
        orgCartMount(params)
    }, [])

    const handleClick = useCallback((offering, value, type) => {
        let ocart_total_cost = $cart.result.total_cost || 0
        let cart_total_cost = $allCart.data.find(item => item.id === seller)?.total?.cost || 0

        if (type === 'increment') {
            if (offering.max_qty === value) {
                showMessage(
                    t('max_count_purchases_var', {q: value, m: t(getMeasurement(offering.measurement, 'label'))}),
                    'danger',
                    false
                )
            } else if (offering.qty === value) {
                showMessage(
                    t('in_stock_var', {q: offering.qty, m: t(getMeasurement(offering.measurement, 'label'))}),
                    'danger',
                    false
                )
            } else {
                const result = value + 1
                ocart_total_cost = ocart_total_cost + offering.cost
                cart_total_cost = cart_total_cost + offering.cost

                const params = {
                    id: offering.id,
                    total_cost: ocart_total_cost,
                    action: () => cartTotalCostMount({seller: seller, total_cost: cart_total_cost}),
                    data: {
                        qty: result
                    }
                }
                updateCartMount(params)
            }
        }

        if (type === 'decrement') {
            if (offering.min_qty === value) {
                showMessage(
                    t('min_count_purchases_var', {q: value, m: t(getMeasurement(offering.measurement, 'label'))}),
                    'danger',
                    false
                )
            } else {
                const result = value - 1
                ocart_total_cost = ocart_total_cost - offering.cost
                cart_total_cost = cart_total_cost - offering.cost
                const params = {
                    id: offering.id,
                    total_cost: ocart_total_cost,
                    action: () => cartTotalCostMount({seller: seller, total_cost: cart_total_cost}),
                    data: {
                        qty: result
                    }
                }
                updateCartMount(params)
            }
        }
    }, [t, $cart.result, $allCart, seller])

    const handleRemove = useCallback((id) => {
        order.removeFromCart(id)
            .then(() => {
                if ($cart.result.count === 1) {
                    if ($allCart.specialists.length > 1) {
                        const newSpecs = $allCart.specialists.filter(item => item.id !== Number(spec_id))
                        push({
                            pathname,
                            search: `${URL_KEYS.SELLER}=${seller}&${URL_KEYS.SPECIALIST_ID}=${newSpecs[0].id}`
                        })
                        cartSpecialistsMount(newSpecs)
                        cartMount()
                    } else {
                        const newSellers = $allCart.data.filter(item => item.id !== seller)
                        if (newSellers.length > 0) {
                            push({
                                pathname,
                                search: `${URL_KEYS.SELLER}=${newSellers[0].id}&${URL_KEYS.SPECIALIST_ID}=${newSellers[0].specialists[0].id}`
                            })
                        } else {
                            // push(pathname)
                        }
                        cartMount()
                    }
                } else {
                    const data = {
                        clear: true,
                        organization: seller,
                        params: {
                            ...initialParams,
                            responsible: spec_id,
                        }
                    }
                    getOrgCart(data)
                    cartMount()
                }
            })
    }, [pathname, push, $allCart.data, $allCart.specialists, $cart.result, spec_id, seller, getOrgCart])

    const handleChange = useCallback((value, {offering}) => {
        setValues({...values, [offering.id]: value.replace(/\D/g, '')})
    }, [values])

    const handleBlur = useCallback(({offering, ...item}, qty) => {
        let ocart_total_cost = $cart.result.total_cost || 0
        let cart_total_cost = $allCart.data.find(item => item.id === seller)?.total?.cost || 0
        const value = values[offering.id] !== undefined && values[offering.id] !== '' && Number(values[offering.id])
        if (value) {
            if (offering.qty && value > offering.qty) {
                showMessage(
                    t('in_stock_var', {q: offering.qty, m: t(getMeasurement(offering.measurement, 'label'))}),
                    'danger',
                    false
                )
                setValues({...values, [offering.id]: qty})
                return false
            } else if (offering.max_qty && value > offering.max_qty) {
                showMessage(
                    t('max_count_purchases_var', {
                        q: offering.max_qty,
                        m: t(getMeasurement(offering.measurement, 'label'))
                    }),
                    'danger',
                    false
                )
                setValues({...values, [offering.id]: item.qty})
                return false
            } else if (offering.min_qty > value && offering.min_qty) {
                showMessage(
                    t('min_count_purchases_var', {
                        q: offering.min_qty,
                        m: t(getMeasurement(offering.measurement, 'label'))
                    }),
                    'danger',
                    false
                )
                setValues({...values, [offering.id]: item.qty})

                return false
            }
        } else {
            return false
        }

        const diff = Number(values[offering.id]) - item.qty
        ocart_total_cost = ocart_total_cost + (offering.cost * diff)
        cart_total_cost = cart_total_cost + (offering.cost * diff)

        const params = {
            id: offering.id,
            total_cost: ocart_total_cost,
            data: {
                qty: values[offering.id]
            },
            action: () => cartTotalCostMount({seller: seller, total_cost: cart_total_cost}),
        }
        updateCartMount(params)

    }, [values, t, $cart.result, $allCart.data, seller])


    useEffect(() => {
        let timeout = null
        timeout = setTimeout(() => {
            if (!!spec_id && !!seller) {
                const data = {
                    clear: true,
                    organization: seller,
                    params: {
                        ...initialParams,
                        responsible: spec_id,
                    }
                }
                getOrgCart(data)
            }
        }, 200)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [spec_id, getOrgCart, seller])

    useEffect(() => {
        if (seller) {
            const specialists = $allCart.data.find(item => item.id === seller)?.specialists || []
            cartSpecialistsMount(specialists)
        }
    }, [seller, $allCart.data])

    useEffect(() => {
        cartMount()
    }, [])


    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            if (!seller && $allCart.data.length > 0) {
                const [allCartItem] = $allCart.data
                const [specItem] = allCartItem?.specialists

                push({
                    pathname: '/records/unregistered',
                    search: `${URL_KEYS.SELLER}=${allCartItem.id}&${URL_KEYS.SPECIALIST_ID}=${specItem.id}`
                })
            }
        }, 100)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [$allCart.data, seller, push])

    return {
        handleClick,
        handleChange,
        handleRemove,
        values,
        handleBlur
    }
}