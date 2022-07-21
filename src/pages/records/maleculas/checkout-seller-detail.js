import React, {Fragment, useCallback, useState} from 'react'
import {CheckoutWrapper} from '../atoms'
import {Col, Row} from 'antd'
import {Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {$organizationModel} from '../../../models/organization-models'
import {$orderModel} from '../../../models/order-models'
import {ShortAccountCard} from '../../../components/card'
import {useUrlParams} from '../../../hooks/common'
import {URL_KEYS} from '../../../constants'
import {MeetTimeBox} from '../../../UIComponents/global-styles'
import moment from 'moment'
import {FormControlLabel, Radio, RadioGroup} from '@material-ui/core'
import {OrderSelectCreditCard} from '../../../components/credit-card'

export const CheckoutSellerDetail = ({comment, paymentMethod, setPaymentMethod, extraId, setExtraId}) => {
    const {t} = useTranslation()
    const {$orgPaymentMethodListStore: {data: paymentMethodList}} = useStore($organizationModel)
    const [showCreditCards, setShowCreditCards] = useState(false)
    const {$orgDetailStore: {data: orgData}} = useStore($organizationModel)
    const {$cart: {data: cartData}} = useStore($orderModel)
    const [cartItem] = cartData
    const {urlData} = useUrlParams()
    const _date = urlData[URL_KEYS.DATE]
    const _time = urlData[URL_KEYS.TIME]

    const onChange = useCallback((e) => {
        const value = e.target.value

        if (Number(value) === 3) {
            setShowCreditCards(true)
        } else {
            setShowCreditCards(false)
            setExtraId(null)
        }
        setPaymentMethod(value)
    }, [setPaymentMethod, setExtraId])

    const getPaymentMethod = useCallback((method) => {
        switch (method) {
            case 1:
                return t('cash')
            case 2:
                return t('terminal')
            case 3:
                return t('payment_by_credit_card')
            default:
                t('cash')
        }
    }, [t])

    return (
        <CheckoutWrapper>
            {
                cartItem && orgData && Object.values(orgData).length > 0
                && (
                    <Row gutter={[0, 24]}>
                        <Col span={24}>
                            <Row gutter={24} align="middle">
                                <Col span={7}>
                                    <Title level={5}>
                                        {t('organization')}:
                                    </Title>
                                </Col>
                                <Col>
                                    <ShortAccountCard
                                        imgUrl={orgData.logo}
                                        imgSize={40}
                                        name={orgData.name}
                                        text={orgData.category && orgData.category.name}
                                        truncateLength={32}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row gutter={24} align="middle">
                                <Col span={7}>
                                    <Title level={5}>
                                        {t('specialist')}:
                                    </Title>
                                </Col>
                                <Col>
                                    <ShortAccountCard
                                        imgSize={40}
                                        imgUrl={cartItem.responsible.user.avatar}
                                        name={cartItem.responsible.user.full_name}
                                        text={cartItem.responsible.job.name}
                                        truncateLength={30}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row gutter={24} align="middle">
                                <Col span={7}>
                                    <Title level={5}>
                                        {t('date_and_time')}:
                                    </Title>
                                </Col>
                                <Col>
                                    <Row gutter={17}>
                                        <Col>
                                            <MeetTimeBox>
                                                {
                                                    _date && _time && (
                                                        <Title level={3}>
                                                            {
                                                                moment(new Date(`${_date} ${_time}`)).format('HH:mm')
                                                            }
                                                        </Title>
                                                    )
                                                }
                                            </MeetTimeBox>
                                        </Col>
                                        <Col>
                                            <MeetTimeBox>
                                                {
                                                    _date && (
                                                        <Title level={5}>
                                                            {
                                                                moment(_date).format('DD MMMM YYYY')
                                                            }
                                                        </Title>
                                                    )
                                                }
                                            </MeetTimeBox>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row gutter={24} align="middle">
                                <Col span={7}>
                                    <Title level={5}>
                                        {t('comments')}:
                                    </Title>
                                </Col>
                                <Col>
                                    {
                                        comment && comment.trim().length > 0
                                            ? comment
                                            : '-'
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row gutter={24} align="middle">
                                <Col span={7}>
                                    <Title level={5}>
                                        {t('venue')}:
                                    </Title>
                                </Col>
                                <Col>
                                    -
                                </Col>
                            </Row>
                        </Col>
                        {
                            paymentMethodList.length > 0 && (
                                <Col span={24}>
                                    <Row gutter={[0, 16]} align="middle">
                                        <Col span={7}>
                                            <Title level={5}>
                                                {t('payment_methods')}:
                                            </Title>
                                        </Col>
                                        <Col span={24}>
                                            <RadioGroup defaultValue="1" value={paymentMethod} onChange={onChange}>
                                                <Row gutter={16}>
                                                    {
                                                        paymentMethodList.map(item => (
                                                            <Fragment key={item.id}>
                                                                {
                                                                    item.status && (
                                                                        <Col span={item.method === 3 ? 24 : undefined}>
                                                                            <FormControlLabel
                                                                                value={String(item.method)}
                                                                                control={<Radio color="primary" />}
                                                                                label={getPaymentMethod(item.method)} />
                                                                        </Col>
                                                                    )
                                                                }
                                                            </Fragment>
                                                        ))
                                                    }
                                                </Row>
                                            </RadioGroup>
                                            {
                                                paymentMethodList.findIndex(item => item.method === 3 && item.status) !== -1 &&
                                                showCreditCards && (
                                                    <Col span={16}>
                                                        <OrderSelectCreditCard
                                                            selected={extraId}
                                                            onChange={setExtraId}
                                                        />
                                                    </Col>
                                                )
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        }

                    </Row>
                )
            }
        </CheckoutWrapper>
    )
}
