import React from 'react'
import {Col, Row} from 'antd'
import {ratingData} from '../../../data/rating'
import {IconBox} from '../../../UIComponents/global-styles'

export const ShortCardProgress = ({rating}) => {
    return (
        <Row className='short-card-progress' gutter={16}>
            {
                ratingData.map(item => {
                    const Icon = item.icon
                    return (
                        <Col key={item.id} style={{display: 'flex', alignItems: 'center', color: item.color, fontWeight: 500}}>
                            <IconBox style={{marginRight: 4}} color={item.color}>
                                <Icon/>
                            </IconBox>
                            {rating[item.id].level}
                        </Col>
                    )
                })
            }
        </Row>
    )
}