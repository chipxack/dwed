import React from 'react'
import {SingleRequest} from '../organims/single-request'
import {RequestOffer} from '../organims/request-offer'
import {Col, Row} from 'antd'
import {AccountJobList, RequestRecords} from '../organims'
import {useJobRequest} from '../../../hooks/job'
import {useStore} from 'effector-react'
import {$jobModel} from '../../../models/job-model'

export const AccountJobRequestDetail = () => {
    const {getGender, getAge, specType, updateRequestDetail, page, onPageChange} = useJobRequest()
    const {$jobRequestOffer: {isEmpty}} = useStore($jobModel)
    return (
        <>
            <AccountJobList/>
            <Row gutter={[0, 36]}>
                <Col span={24}>
                    <SingleRequest
                        getGender={getGender}
                        getAge={getAge}
                        specType={specType}
                        updateRequest={updateRequestDetail}
                    />
                </Col>

                {
                    !isEmpty && (
                        <Col span={24}>
                            <RequestOffer
                                page={page}
                                onPageChange={onPageChange}
                                updateRequest={updateRequestDetail}
                            />
                        </Col>
                    )
                }
                <Col span={24}>
                    <RequestRecords/>
                </Col>
            </Row>
        </>
    )
}