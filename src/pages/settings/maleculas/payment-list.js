import React, {useCallback} from 'react'
import {Col, Row} from 'antd'
import {orgPaymentMethods} from '../../../data/org'
import {ShadowBox} from '../../../UIComponents/global-styles'
import {Text, Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'
import {ReactComponent as PayMeLogo} from '../../../assets/images/payme-logo.svg'
import {Switch} from '@material-ui/core'
import {useOrgPaymentMethod} from '../../../hooks/org'
import {useStore} from 'effector-react'
import {$organizationModel} from '../../../models/organization-models'

export const OrgPaymentList = () => {
    const {t} = useTranslation()
    const {$orgPaymentMethodListStore: {data}} = useStore($organizationModel)
    const {handleActivate} = useOrgPaymentMethod()

    const getStatus = useCallback((payment_type) => {
        const item = data.find(item => item.method === payment_type)
        return !!(item && item.status);
    }, [data])

    return (
        <Row gutter={[24, 24]}>
            {
                orgPaymentMethods.map((item) => (
                    <Col span={8} key={item.id}>
                        <ShadowBox style={{backgroundColor: item.id === 3 && 'var(--input-bg)'}}>
                            <Row style={{marginBottom: 12}} align="middle" justify="space-between">
                                <Col>
                                    <Title level={5}>
                                        {t(item.title)}
                                    </Title>
                                </Col>
                                <Col>
                                    <Switch
                                        checked={getStatus(item.id)}
                                        onChange={() => item.id !== 3 && handleActivate(item.id)}
                                        size="small"
                                        color="primary"
                                    />
                                </Col>
                            </Row>
                            {
                                item.id === 3
                                    ? (
                                        <PayMeLogo />
                                    )
                                    : (
                                        <Text>
                                            {item.desc}
                                        </Text>
                                    )
                            }
                        </ShadowBox>
                    </Col>
                ))
            }
        </Row>
    )
}
