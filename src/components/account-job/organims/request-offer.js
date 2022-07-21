import React, {useState} from 'react'
import {RequestAddNoteWrapper, RequestHeading, RequestOfferItem} from '../atoms'
import {useStore} from 'effector-react'
import {ButtonUI} from '../../../ui/atoms'
import {$jobModel} from '../../../models/job-model'
import {useTranslation} from 'react-i18next'
import {Text, Title} from '../../../UIComponents/typography'
import {truncateString} from '../../../utils/stringUtils'
import {InfinitySvg} from '../../../media/infinity'
import {AddNoteModal} from '../maleculas'
import {LazyloadImage} from '../../../UIComponents/lazyload-image'
import {Col, Pagination, Row} from 'antd'
import {generateSkeleton} from '../../../utils/skeletonUtils'
import {OrderOfferingSkeleton} from '../maleculas/order-offering-skeleton'
import {useLocation, useParams} from 'react-router-dom'
import {Modal} from '../../modal'

const skeleton = generateSkeleton(6)

export const RequestOffer = ({updateRequest, onPageChange, page}) => {
    const {
        $jobRequestOffer: {data: orderOffer, forceLoading, result},
        $jobRequestDetail: {data: requestDetail}
    } = useStore($jobModel)
    const {orderId} = useParams()
    const {t} = useTranslation()
    const [offerName, setOfferName] = useState('')
    const [offerId, setOrderId] = useState()
    const {state: {jobId}} = useLocation()
    const job_id = jobId && jobId !== 'self_job' ? jobId : false

    const handleOpen = (id, name) => {
        setOfferName(name)
        setOrderId(id)
    }

    const handleClose = () => {
        setOfferName('')
        setOrderId(null)
    }

    return (
        <>
            <Modal
                modalIsOpen={!!offerId}
                component={<AddNoteModal spec_id={job_id} title={offerName} id={offerId} order_id={orderId} onClose={handleClose}/>}
                width='100%'
                setModalIsOpen={handleClose}
                style={{top: 32}}
                bodyStyle={{
                    minHeight: 'calc(100vh - 100px)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            />
            <RequestHeading>
                <Title level={5}>
                    {t('offerings')}
                </Title>
            </RequestHeading>
            <Row gutter={[16, 16]}>
                {
                    !forceLoading && orderOffer.length > 0 && orderOffer.map(item => (
                        <Col key={item.offering.id} span={8}
                             style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <RequestOfferItem>
                                <RequestOfferItem.Content>
                                    <Title style={{lineHeight: '20px', marginBottom: 10}}>
                                        {truncateString(item.offering.name, 28)}
                                    </Title>
                                    <Text lineHeight={20} style={{display: 'flex', alignItems: 'center'}}>
                                        <div>
                                            {t('quantity')}
                                        </div>
                                        <div style={{marginLeft: 12}}>
                                            {
                                                item.qty ? item.qty : <InfinitySvg/>
                                            }
                                        </div>
                                    </Text>
                                </RequestOfferItem.Content>
                                <LazyloadImage imgUrl={item.offering.image} alt={item.offering.name}/>
                            </RequestOfferItem>
                            {
                                requestDetail.status === 2
                                && (
                                    <RequestAddNoteWrapper onClick={() => handleOpen(item.id, item.offering.name)}>
                                        {t('add_entry')}
                                    </RequestAddNoteWrapper>
                                )
                            }
                        </Col>
                    ))
                }
                {
                    forceLoading && skeleton.map((item, idx) => (
                        <Col span={8} key={`${idx + 1}`}>
                            <OrderOfferingSkeleton/>
                        </Col>
                    ))
                }
            </Row>
            {
                Object.values(result).length > 0
                && (
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 24}}>
                        <Pagination
                            total={result.count}
                            showLessItems
                            current={page || 1}
                            defaultPageSize={6}
                            hideOnSinglePage
                            onChange={onPageChange}
                        />
                    </div>
                )
            }
            {
                requestDetail.status === 0
                && (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ButtonUI size='lg' onClick={() => updateRequest({status: 1})}>
                            {t('accept')}
                        </ButtonUI>
                    </div>
                )
            }
        </>
    )
}
