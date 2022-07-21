import React from 'react'
import {statisticsNav} from '../../../data/statistics'
import {Col, Row} from 'antd'
import {StatisticNav, StatisticNavLink} from '../atoms'
import {Text, Title} from '../../../UIComponents/typography'

export const OrgStatisticNav = ({organization}) => {
    return (
        <StatisticNav>
            <Row gutter={16} wrap={false}>
                {
                    statisticsNav.map((item, idx) => (
                        <Col key={`${idx + 1}`}>
                            <StatisticNavLink
                                to={`/${organization}/statistics/${item.id}`}
                            >
                                <Title level={5}>
                                    {item.value}
                                </Title>
                                <Text size={10}>
                                    {item.short}
                                </Text>
                            </StatisticNavLink>
                        </Col>
                    ))
                }
            </Row>
        </StatisticNav>
    )
}