import React, {useState} from 'react'
import {AccountHeaderGrid, AccountHeaderSlideDown} from '../atoms'
import {AccountHeaderContacts, AccountHeaderProgress, AccountHeaderSubscribes, AccountMainInfo} from '../maleculas'
import {Col, Row} from 'antd'

export const AccountHeader = ({data, showDetail, showSubscriptions, skeleton}) => {
    const [showInfo, setShowInfo] = useState(false)

    return (
        <Row gutter={[0, 16]}>
            <Col span={24}>
                <Row gutter={24} justify='space-between' align='middle'>
                    <Col>
                        <AccountMainInfo
                            showInfo={showInfo}
                            setShowInfo={setShowInfo}
                            data={data}
                            showDetail={showDetail}
                            skeleton={skeleton}
                        />
                    </Col>
                    <Col>
                        {
                            Object.values(data).length > 0 && skeleton === false && (
                                <>
                                    <AccountHeaderProgress rating={data.rating}/>
                                    <AccountHeaderSubscribes showSubscriptions={showSubscriptions} data={data.subs}/>
                                </>
                            )
                        }
                    </Col>
                </Row>
            </Col>

            {
                showDetail
                && (
                    <Col span={24}>
                        <AccountHeaderSlideDown closed={!showInfo}>
                            <AccountHeaderGrid>
                                <AccountHeaderContacts data={data}/>
                                {/*<AccountHeaderSubscribes data={data.subs}/>*/}
                            </AccountHeaderGrid>
                        </AccountHeaderSlideDown>
                    </Col>
                )
            }
        </Row>
    )
}