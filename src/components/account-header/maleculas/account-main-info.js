import React from 'react'
import {AccountHeaderDown, AccountHeaderInfoContent, StyledAccountAvatar} from '../atoms'
import {ChevronDownOutlineSvg, OfficialSvg} from '../../../media'
import {Col, Image, Row} from 'antd'
import {SkeletonUI} from '../../../UIComponents/global-styles'
import {Text, Title} from '../../../UIComponents/typography'

export const AccountMainInfo = ({data, setShowInfo, showInfo, showDetail, skeleton}) => {

    const hasData = Object.values(data).length > 0 && skeleton === false
    const hasSkeleton = skeleton === undefined || !!skeleton

    return (
        <Row gutter={16} align='middle'>
            <Col>
                <StyledAccountAvatar>
                    {
                        hasSkeleton && (
                            <SkeletonUI variant='circle' width={80} height={80}/>
                        )
                    }
                    {
                        hasData && <Image src={data.image} alt={data.name}/>
                    }
                </StyledAccountAvatar>
            </Col>
            <Col>
                {
                    hasData && (
                        <AccountHeaderInfoContent to={`/${data.slug}`}>
                            <Row gutter={16} style={{flexDirection: 'column'}}>
                                <Col>
                                    <Title level={5}>
                                        {data.name}
                                        {
                                            data.is_official && <OfficialSvg/>
                                        }
                                    </Title>
                                </Col>
                                {
                                    data.category && (
                                        <Col>
                                            <Text>
                                                {data.category.name}
                                            </Text>
                                        </Col>
                                    )
                                }

                            </Row>
                        </AccountHeaderInfoContent>
                    )
                }
                {
                    hasSkeleton && (
                        <Row gutter={[24, 8]}>
                            <Col span={24}>
                                <SkeletonUI variant='rect' width={300} height={20}/>
                            </Col>
                            <Col span={24}>
                                <SkeletonUI variant='rect' width={200} height={16}/>
                            </Col>
                        </Row>
                    )
                }
            </Col>

            {
                showDetail && hasData
                && (
                    <Col>
                        <AccountHeaderDown
                            active={showInfo}
                            onClick={() => setShowInfo(!showInfo)}
                        >
                            <ChevronDownOutlineSvg/>
                        </AccountHeaderDown>
                    </Col>
                )
            }
        </Row>
    )
}