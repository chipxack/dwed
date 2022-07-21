import React from 'react'
import {Col, Row} from 'antd'
import {MerchandiseMenuLink} from '../atoms'
import {useLocation} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {ArrowLeftSvg} from '../../../media'
import {Title} from '../../../UIComponents/typography'

const data = [
    {
        title: 'unregistered',
        id: 'unregistered'
    },
    {
        title: 'registered',
        id: 'registered'
    },
]

export const MerchandiseMenu = () => {
    const {t} = useTranslation()
    const {pathname} = useLocation()
    return (
        <>
            {
                pathname.indexOf('unregistered') !== -1 || pathname.indexOf('registered') !== -1
                    ? (
                        <Row gutter={24}>
                            {
                                data.map((item) => (
                                    <Col span='auto' key={item.id}>
                                        <MerchandiseMenuLink
                                            to={`/records/${item.id}`}
                                        >
                                            <Title level={5}>
                                                {t(item.title)}
                                            </Title>
                                        </MerchandiseMenuLink>
                                    </Col>
                                ))
                            }
                        </Row>
                    ) : (
                        <MerchandiseMenuLink
                            to={`/records/unregistered`}
                        >
                            <ArrowLeftSvg/>
                            <Title level={5}>
                                {t('back')}
                            </Title>
                        </MerchandiseMenuLink>
                    )
            }
        </>
    )
}