import React, {useCallback, useState} from 'react'
import {Col, Row} from 'antd'
import {Modal} from '../../modal'
import {useStore} from 'effector-react'
import {useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {$jobModel} from '../../../models/job-model'
import {MeetDateModal} from '../../meet-date-modal'
import {CustomDropdownAction, CustomerWrapper, RequestHeading} from '../atoms'
import {CommonAvatar} from '../../../UIComponents/avatar'
import {Text, Title} from '../../../UIComponents/typography'
import {getOrderStatus} from '../../../utils/accountUtils'
import {truncateString} from '../../../utils/stringUtils'
import {ChevronDownSvg} from '../../../media'
import SlideDown from 'react-slidedown'
import {InputUI} from '../../../UIComponents/inputs'
import {ButtonUI} from '../../../ui/atoms'
import moment from 'moment'

export const SingleRequest = ({specType, getAge, getGender, updateRequest}) => {
    const {$jobRequestDetail: {data: requestDetail}, $accountSpec: {data: specData}} = useStore($jobModel)
    const {t} = useTranslation()
    const {orderId} = useParams()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [closed, setClosed] = useState(true)
    const [text, setText] = useState('')

    const handleSubmit = useCallback(() => {
        if (text.length > 3) {
            const action = () => {
                setText('')
            }
            updateRequest({specs_comment: text}, action)
        }
    }, [text, updateRequest])

    return (
        <>
            <Modal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                title={t('change_meeting_time')}
                component={(
                    <MeetDateModal
                        type='job'
                        active={{id: orderId}}
                        job={specData && {...specData, specType}}
                        onClose={() => setModalIsOpen(false)}
                    />
                )}
                width={900}
            />
            {
                Object.values(requestDetail).length > 0
                && (
                    <Row gutter={[0, 36]}>
                        <Col span={24}>
                            <CustomerWrapper>
                                <Row gutter={16}>
                                    <Col span={10}>
                                        <Row gutter={16}>
                                            <Col>
                                                <CommonAvatar
                                                    size={80}
                                                    shape='square'
                                                    imgUrl={requestDetail.user.avatar}
                                                />
                                            </Col>
                                            <Col>
                                                <Title level={5}>
                                                    {
                                                        requestDetail.user.full_name.trim().length > 0 ? (
                                                            <>
                                                                {
                                                                    requestDetail.user.full_name.length > 20
                                                                        ? (
                                                                            <Title title={requestDetail.user.full_name}>
                                                                                <div>
                                                                                    {truncateString(requestDetail.user.full_name, 20)}
                                                                                </div>
                                                                            </Title>

                                                                        )
                                                                        : requestDetail.user.full_name
                                                                }
                                                            </>
                                                        )
                                                            : 'Client'
                                                    }
                                                </Title>
                                                <Text style={{marginBottom: 10}}>
                                                    {
                                                        requestDetail.user.main_cat && requestDetail.user.main_cat.name
                                                    }
                                                </Text>
                                                <Row gutter={8}>
                                                    <Col>
                                                        <Title style={{textTransform: 'uppercase'}}
                                                               color='var(--grey-basic)'>
                                                            {t('status')}:
                                                        </Title>
                                                    </Col>
                                                    <Col>
                                                        <Title
                                                            weight={500}
                                                            color={getOrderStatus(requestDetail.status).color}
                                                            style={{textTransform: 'lowercase'}}
                                                        >
                                                            {t(getOrderStatus(requestDetail.status).title)}
                                                        </Title>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={6}>
                                        <Row gutter={[8, 8]}>
                                            <Col span={12}>
                                                <Title style={{textTransform: 'uppercase'}} color='var(--grey-basic)'>
                                                    {t('age')}:
                                                </Title>
                                            </Col>
                                            <Col span={12}>
                                                <Title>
                                                    {getAge(requestDetail.user.birthday)}
                                                </Title>
                                            </Col>
                                            <Col span={12}>
                                                <Title style={{textTransform: 'uppercase'}} color='var(--grey-basic)'>
                                                    {t('gender')}:
                                                </Title>
                                            </Col>
                                            <Col span={12}>
                                                <Title>
                                                    {getGender(requestDetail.user.gender)}
                                                </Title>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row gutter={[8, 8]}>
                                            <Col span={11}>
                                                <Title style={{textTransform: 'uppercase'}} color='var(--grey-basic)'>
                                                    {t('number_of_visits')}:
                                                </Title>
                                            </Col>
                                            <Col span={13}>
                                                <Title>
                                                    {requestDetail.user_orders_count}
                                                </Title>
                                            </Col>
                                            <Col span={11}>
                                                <Title style={{textTransform: 'uppercase'}} color='var(--grey-basic)'>
                                                    {t('date_and_time')}:
                                                </Title>
                                            </Col>
                                            <Col span={13} style={{cursor: 'pointer'}}>
                                                <Title onClick={() => setModalIsOpen(true)}>
                                                    {moment(requestDetail.meet_date).format('YYYY-MM-DD HH:mm')}
                                                </Title>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                {
                                    requestDetail.status > 1 && requestDetail.status < 5 && !requestDetail.specs_comment && (
                                        <CustomDropdownAction>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <div className='line'/>
                                                <Title onClick={() => setClosed(!closed)}>
                                                    {t('brief_review_of_this_client')}
                                                    <ChevronDownSvg/>
                                                </Title>
                                                <div className='line'/>
                                            </div>
                                            <SlideDown closed={closed} transitionOnAppear={false}
                                                       style={{overflow: 'hidden'}}>
                                                <Row gutter={16} style={{paddingTop: 16}}>
                                                    <Col span={20}>
                                                        <InputUI
                                                            label={t('short_review')}
                                                            inputType='textarea'
                                                            rows={2}
                                                            maxLength={50}
                                                            value={text}
                                                            onChange={(e) => setText(e.target.value)}
                                                        />
                                                    </Col>
                                                    <Col span={4} style={{display: 'flex', flexDirection: 'column'}}>
                                                        <Text style={{fontSize: 14}}>
                                                            {`${text.length}/50`}
                                                        </Text>
                                                        <ButtonUI
                                                            size='lg'
                                                            onClick={handleSubmit}
                                                            disabled={text.trim().length < 4}
                                                        >
                                                            {t('save')}
                                                        </ButtonUI>
                                                    </Col>
                                                </Row>
                                            </SlideDown>
                                        </CustomDropdownAction>
                                    )
                                }
                                {
                                    requestDetail.specs_comment && requestDetail.specs_comment.length > 0 && (
                                        <Row gutter={24} style={{marginTop: 16}}>
                                            <Col span={24}>
                                                <Title style={{textTransform: 'uppercase'}} color='var(--grey-basic)'>
                                                    {t('short_review')}:
                                                </Title>
                                            </Col>
                                            <Col span={24}>
                                                <Title level={5} style={{overflowWrap: 'break-word'}}>
                                                    {requestDetail.specs_comment}
                                                </Title>
                                            </Col>
                                        </Row>
                                    )
                                }
                            </CustomerWrapper>
                        </Col>
                        {
                            requestDetail.status > 5 && requestDetail.client_comment.length > 0 && (
                                <Col span={24}>
                                    <RequestHeading>
                                        <Title>
                                            {t('customer_comment')}
                                        </Title>
                                    </RequestHeading>
                                    <Title level={5} style={{overflowWrap: 'break-word'}}>
                                        {requestDetail.client_comment}
                                    </Title>
                                </Col>
                            )
                        }
                    </Row>
                )
            }
        </>
    )
}