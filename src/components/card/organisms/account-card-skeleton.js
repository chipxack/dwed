import React from 'react'
import {CommonCardImage, CommonCardItem, CommonCardItemCaption} from '../atoms'
import {Skeleton} from '@material-ui/lab'
import {Col, Row} from 'antd'
import {CardProgress} from '../maleculas'

export const AccountCardSkeleton = ({showProgress}) => (
    <CommonCardItem>
        <Row gutter={16} align='middle'>
            <Col span='auto'>
                <CommonCardImage>
                    <Skeleton variant='circle' width={74} height={74}/>
                </CommonCardImage>
            </Col>
            <Col span='auto' flex={1}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <div>
                            <Skeleton animation='wave' height={24}/>
                        </div>
                        <CommonCardItemCaption>
                            <Skeleton animation='wave' height={18}/>
                        </CommonCardItemCaption>
                    </Col>
                    {
                        showProgress && (
                            <Col span={24}>
                                <CardProgress showSkeleton/>
                            </Col>
                        )
                    }
                </Row>
            </Col>
        </Row>
    </CommonCardItem>
)