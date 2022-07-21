import moment from 'moment'
import order from '../../service/order'
import {formatter} from '../../constants/formatter'
import {useHistory} from 'react-router-dom'
import {useCallback, useEffect, useState} from 'react'
import {getOrgEvent, getOrgPaymentMethodListEvent} from '../../models/organization-models'
import {cartMount, orgCartMount} from '../../models/order-models'
import {showMessage} from '../../UIComponents/message-notification'
import {FETCHING_STATUS, URL_KEYS} from '../../constants'
import {useUrlParams} from '../common'

export function useCheckout() {
    const {urlData} = useUrlParams()
    const [comment, setComment] = useState('')
    const [meetDate, setMeetDate] = useState(null)
    const [activeDay, setActiveDay] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [paymentMethod, setPaymentMethod] = useState('1')
    const [extraId, setExtraId] = useState(null)
    const {push} = useHistory()
    const [loading, setLoading] = useState(false)
    const seller = urlData[URL_KEYS.SELLER]
    const spec_id = urlData[URL_KEYS.SPECIALIST_ID]
    const _activeDate = urlData[URL_KEYS.DATE]
    const time = urlData[URL_KEYS.TIME]
    const text = urlData[URL_KEYS.TEXT]

    const getCart = useCallback((params) => {
        const data = {
            organization: seller,
            ...params,
        }
        orgCartMount(data)
    }, [seller])


    const createOrder = useCallback(() => {

        const data = {
            payment: paymentMethod,
            card_id: extraId,
            meet_date: moment(meetDate).format(formatter),
            responsible_id: spec_id,
            client_comment: comment,
        }
        setLoading(true)
        order.createOrder(data)
            .then(res => {
                if (res) {
                    push(`/records/${res.data.id}`)
                    showMessage('your_app_is_accepted', 'success')
                }
            })
            .finally(() => setLoading(false))
    }, [meetDate, spec_id, comment, push, extraId, paymentMethod])

    useEffect(() => {
        if (seller) {
            getOrgEvent({organization: seller, status: FETCHING_STATUS.INIT})
        }
    }, [seller])

    useEffect(() => {
        if (seller && spec_id) {
            const data = {
                clear: true,
                params: {
                    limit: 10,
                    offset: 0,
                    responsible: spec_id,
                },
            }
            getCart(data)
        }
    }, [seller, spec_id, getCart])

    useEffect(() => {
        cartMount()
    }, [])

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            if (activeDay && time) {
                setMeetDate(new Date(`${activeDay} ${time}`).getTime())
            } else {
                setMeetDate(null)
            }
        }, 100)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [time, activeDay])

    useEffect(() => {
        let timeout = null
        timeout = setTimeout(() => {
            if (_activeDate) {

                setActiveDay(_activeDate)
            } else {
                setActiveDay(moment(new Date()).format('YYYY-MM-DD'))
            }
        }, 100)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [_activeDate])

    useEffect(() => {
        if (!text) {
            setComment(text)
        }
    }, [text])

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            if (!seller || !spec_id) {
                push('/records/unregistered')
            }
        }, 600)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [seller, spec_id, push])

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            if (seller) {
                const data = {
                    organization: seller,
                    status: FETCHING_STATUS.INIT,
                }
                getOrgPaymentMethodListEvent(data)
            }
        }, 300)

        return () => {
            clearTimeout(timeout)
        }
    }, [seller])

    return {
        meetDate,
        comment,
        setComment,
        createOrder,
        loading,
        activeDay,
        paymentMethod,
        setPaymentMethod,
        extraId,
        setExtraId,
    }
}
