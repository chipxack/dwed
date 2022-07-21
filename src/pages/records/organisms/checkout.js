import React from 'react'
import {useCheckout} from '../../../hooks/order'
import {Col, Row} from 'antd'
import {CheckoutDetail, CheckoutSellerDetail, SpecMeetDate} from '../maleculas'
import {useUrlParams} from '../../../hooks/common'
import {URL_KEYS} from '../../../constants'

export const Checkout = () => {
    const {
        comment,
        createOrder,
        loading,
        meetDate,
        setComment,
        activeDay,
        extraId,
        setExtraId,
        setPaymentMethod,
        paymentMethod,
    } = useCheckout()
    const {urlData} = useUrlParams()
    const next = urlData[URL_KEYS.NEXT]

    return (
        <Row gutter={36}>
            {
                !next
                    ? (
                        <Col span={24}>
                            <SpecMeetDate
                                comment={comment}
                                setComment={setComment}
                                meetDate={meetDate}
                                activeDay={activeDay}
                            />
                        </Col>
                    )
                    : (
                        <>
                            <Col span={14}>
                                <CheckoutSellerDetail
                                    comment={comment}
                                    extraId={extraId}
                                    setExtraId={setExtraId}
                                    paymentMethod={paymentMethod}
                                    setPaymentMethod={setPaymentMethod}
                                />
                            </Col>
                            <Col span={10}>
                                <CheckoutDetail loading={loading} createOrder={createOrder} />
                            </Col>
                        </>
                    )
            }
        </Row>
    )
}
