import React, {useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {$orderModel} from '../../../models/order-models'
import {$accountModel} from '../../../models/accountModel'
import {getMeetTime} from '../../../utils/dateUtils'
import {generateQrCodeBase64} from '../../../utils/qrUtils'
import {Modal} from '../../../components/modal'
import {OrderQrCodeModal} from './qr-code-modal'
import {Col, Image, Row} from 'antd'
import {Title} from '../../../UIComponents/typography'
import {getOrderStatus} from '../../../utils/accountUtils'
import {Link} from 'react-router-dom'
import {ShortAccountCard} from '../../../components/card'
import {MeetTimeBox} from '../../../UIComponents/global-styles'
import moment from 'moment'
import {getLocalCost} from '../../../utils/app-utils'
import fakeQr from '../../../assets/images/fake-qr.png'
import {ButtonUI} from '../../../ui/atoms'

export const OrderInfo = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {t} = useTranslation()
    const {$orderInfo: {data: order}} = useStore($orderModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)

    const getData = useCallback(() => {
        if (Object.values(order).length > 0) {
            return {
                org: order.responsible.org,
                specialist: {...order.responsible.user, spec_cat: order.responsible.spec_cat},
                date: order.meet_date,
                print_date: getMeetTime(order.meet_date, order.responsible.operating_mode),
                qrcodeBase64: order.qr_code && generateQrCodeBase64(order.qr_code),
            }
        }
    }, [order])

    return (
        <>
            <Modal
                setModalIsOpen={() => setModalIsOpen(false)}
                modalIsOpen={modalIsOpen}
                title={t('order_qr_code')}
                component={<OrderQrCodeModal data={getData()}/>}
                width={400}
            />
            <Row gutter={24} wrap={false} align='top' style={{marginBottom: 40}}>
                <Col span={16}>
                    <Row gutter={[0, 16]}>
                        <Col span={24}>
                            <Title level={4}>
                                {t('detailed_information')}
                            </Title>
                        </Col>
                        <Col span={24}>
                            <Row gutter={16} wrap={false}>
                                <Col span={6}>
                                    <Title level={5}>
                                        {t('status')}:
                                    </Title>
                                </Col>
                                <Col>
                                    <Title color={order.status && getOrderStatus(order.status).color} level={5}
                                           weight={400}>
                                        {
                                            order.status && t(getOrderStatus(order.status).title)
                                        }
                                    </Title>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row align='middle' gutter={16} wrap={false}>
                                <Col span={6}>
                                    <Title level={5}>
                                        {t('organization')}:
                                    </Title>
                                </Col>
                                <Col>
                                    {
                                        order.responsible && order.responsible.org && (
                                            <Link to={`/${order.responsible.org.slug_name}`}>
                                                <ShortAccountCard
                                                    name={order.responsible.org.name}
                                                    imgSize={40}
                                                    imgUrl={order.responsible.org.logo}
                                                />
                                            </Link>
                                        )
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row align='middle' gutter={16} wrap={false}>
                                <Col span={6}>
                                    <Title level={5}>
                                        {t('specialist')}:
                                    </Title>
                                </Col>
                                <Col>
                                    {
                                        order.responsible && order.responsible.user && (
                                            <Link to={`@/${order.responsible.user.username}`}>
                                                <ShortAccountCard
                                                    name={order.responsible.user.full_name}
                                                    imgSize={40}
                                                    imgUrl={order.responsible.user.avatar}
                                                    text={order.responsible.user.main_cat.name}
                                                />
                                            </Link>
                                        )
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row gutter={16} wrap={false} align='middle'>
                                <Col span={6}>
                                    <Title level={5}>
                                        {t('meeting_time')}:
                                    </Title>
                                </Col>
                                <Col>
                                    {
                                        order.meet_date && (
                                            <Row gutter={16}>
                                                <Col>
                                                    <MeetTimeBox>
                                                        <Title level={3}>
                                                            {moment(order.meet_date).format('HH:mm')}
                                                        </Title>
                                                    </MeetTimeBox>
                                                </Col>
                                                <Col>
                                                    <MeetTimeBox>
                                                        <Title level={5}>
                                                            {moment(order.meet_date).format('DD MMMM YYYY')}
                                                        </Title>
                                                    </MeetTimeBox>
                                                </Col>
                                            </Row>
                                        )
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row gutter={16} wrap={false}>
                                <Col span={6}>
                                    <Title level={5}>
                                        {t('meet_address')}:
                                    </Title>
                                </Col>
                                <Col>
                                    <Title level={5} weight={400}>
                                        {
                                            order.meet_address ? order.meet_address : t('no_data')
                                        }
                                    </Title>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row gutter={16} wrap={false}>
                                <Col span={6}>
                                    <Title level={5}>
                                        {t('comment')}:
                                    </Title>
                                </Col>
                                <Col>
                                    <Title level={5} weight={400}>
                                        {
                                            order.meet_address ? order.meet_address : t('no_data')
                                        }
                                    </Title>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row gutter={16} wrap={false}>
                                <Col span={6}>
                                    <Title level={5}>
                                        {t('payment_method')}:
                                    </Title>
                                </Col>
                                <Col>
                                    <Title level={5} weight={400}>
                                        {t('no_data')}
                                    </Title>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row gutter={16} wrap={false}>
                                <Col span={6}>
                                    <Title level={5}>
                                        {t('total_cost')}:
                                    </Title>
                                </Col>
                                <Col>
                                    <Title level={5} weight={400}>
                                        {
                                            order.total_cost
                                                ? `${getLocalCost(order.total_cost, currentProfile.currency.code)}`
                                                : t('no_data')
                                        }
                                    </Title>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={8} style={{display: 'flex', justifyContent: 'center'}}>
                    <MeetTimeBox
                        style={{padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}>
                        <Image
                            width={200}
                            height={200}
                            preview={order.status ? {mask: ''} : false}
                            src={order.status ? generateQrCodeBase64(order.qr_code) : fakeQr}
                        />
                        {
                            order.status && (
                                <ButtonUI
                                    onClick={() => setModalIsOpen(true)}
                                    style={{justifyContent: 'center', marginTop: 24, width: '100%'}}
                                    size='lg'
                                >
                                    {t('form_for_print')}
                                </ButtonUI>
                            )
                        }
                    </MeetTimeBox>
                </Col>
            </Row>
        </>
    )
}