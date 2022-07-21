import React from 'react'
import {Col, Row} from 'antd'
import {OfferDetailInfo, OfferDetailParams, OfferGallery} from '../maleculas'
import {useOfferDetail} from '../../../hooks/offers'
import {OfferDescription} from '../maleculas/offer-description'

export const OfferDetail = ({id, onClose}) => {
    useOfferDetail(id)
    return (
        <>
            <Row gutter={[24, 24]}>
                <Col span={12}>
                    <OfferGallery/>
                </Col>
                <Col span={12}>
                    <OfferDetailInfo onClose={onClose}/>
                </Col>
                <Col span={24}>
                    <OfferDescription/>
                </Col>
                <Col span={24}>
                    <OfferDetailParams/>
                </Col>
            </Row>

        </>
    )
}