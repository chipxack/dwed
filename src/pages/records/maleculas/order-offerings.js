import React from 'react'
import {Avatar, Col, Row} from 'antd'
import {Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'
import {AntTable, TableTitle} from '../../../ui/atoms'
import {useStore} from 'effector-react'
import {$orderModel} from '../../../models/order-models'
import {CircularProgress} from '@material-ui/core'
import {$accountModel} from '../../../models/accountModel'
import {getLocalCost} from '../../../utils/app-utils'
import {getMeasurement} from '../../../utils/measuremenUtils'

export const OrderOfferings = () => {
    const {$orderOfferings: {data, loading}} = useStore($orderModel)
    const {t} = useTranslation()
    const {$profiles: {currentProfile}} = useStore($accountModel)

    const columns = [
        {
            title: t('photo'),
            dataIndex: 'offering',
            key: 'offering',
            render: (offering) => (
                <TableTitle>
                    <Avatar style={{borderRadius: 6}} src={offering.image} size={70} shape='square'/>
                </TableTitle>
            ),
            width: 94
        },
        {
            title: t('name_of_offer'),
            dataIndex: 'offering',
            key: 'offering',
            render: (offering) => (
                <TableTitle>
                    <Title level={5} weight={400}>
                        {offering.name}
                    </Title>
                    <Title style={{fontSize: 18, marginTop: 6}} level={5}>
                        {getLocalCost(offering.cost, currentProfile.currency.code)}
                    </Title>
                </TableTitle>
            ),
        },
        {
            title: t('quantity'),
            dataIndex: 'qty',
            key: 'qty',
            render: (qty, {offering}) => (
                <TableTitle>
                    <Title level={5} weight={400}>
                        {t('qty_m', {n: qty, m: t(getMeasurement(offering.measurement, 'label'))})}
                    </Title>
                </TableTitle>
            ),
            width: 140
        },
        {
            title: t('cost'),
            dataIndex: 'cost',
            key: 'cost',
            render: (cost) => (
                <TableTitle>
                    <Title style={{fontSize: 18}}>
                        {getLocalCost(cost, currentProfile.currency.code)}
                    </Title>
                </TableTitle>
            ),
            width: 200
        },
    ]

    return (
        <Row gutter={[0, 24]}>
            <Col span={24}>
                <Title level={4}>
                    {t('offerings')}
                </Title>
            </Col>
            <Col span={24}>
                <AntTable
                    columns={columns}
                    dataSource={data.map((item, idx) => ({...item, key: idx + 1}))}
                    loading={{spinning: loading, indicator: <CircularProgress size={24}/>}}
                />
            </Col>
        </Row>
    )
}
