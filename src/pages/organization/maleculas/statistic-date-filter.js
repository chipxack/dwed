import React from 'react'
import {Col, Row} from 'antd'
import {IconBox, StatFilterWrapper} from '../../../UIComponents/global-styles'
import {CalendarIcon} from '../../../icons/calendar'

export const StatisticDateFilter = () => {
    return (
        <StatFilterWrapper>
            <Row gutter={12}>
                <Col span={24}>

                </Col>
                <Col span={24}>
                    <IconBox>
                        <CalendarIcon />
                    </IconBox>
                </Col>
            </Row>
        </StatFilterWrapper>
    )
}