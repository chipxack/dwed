import React from 'react'
import {Avatar, Col, Row} from 'antd'
import {useParams} from 'react-router-dom'
import {OrgStatisticNav, StatisticTable} from '../maleculas'
import {useOfferStatList} from '../../../hooks/statistics'
import {useTranslation} from 'react-i18next'
import {useStore} from 'effector-react'
import {$statisticModel} from '../../../models/statistic-model'
import {TableTitle} from '../../../ui/atoms'
import {getLocalCost} from '../../../utils/app-utils'
import {$accountModel} from '../../../models/accountModel'
import {truncateString} from '../../../utils/stringUtils'

export const OrgOfferingStatistic = () => {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {organization} = useParams()
    const {$offeringStatList: {data, loading, result}} = useStore($statisticModel)
    const {limit, page, onFilterChange} = useOfferStatList()
    const {t} = useTranslation()

    const columns = [
        {
            title: t('offering_name'),
            dataIndex: 'offering',
            key: 'offering',
            render: (offering) => (
                <TableTitle>
                    <Row align='middle' gutter={12} wrap={false}>
                        <Col>
                            <Avatar style={{borderRadius: 6}} shape='square' size={32} src={offering.image}/>
                        </Col>
                        <Col>
                            {truncateString(offering.name, 46)}
                        </Col>
                    </Row>
                </TableTitle>
            ),
        },
        {
            title: t('demands'),
            dataIndex: 'total_orders_qty_sum',
            key: 'total_orders_qty_sum',
            render: (total_orders_qty_sum) => (
                <TableTitle>
                    {total_orders_qty_sum}
                </TableTitle>
            ),
            width: 120
        },
        {
            title: t('viewed'),
            dataIndex: 'viewed',
            key: 'viewed',
            render: () => (
                <TableTitle>
                    {t('no_data')}
                </TableTitle>
            ),
            width: 150
        },
        {
            title: t('amount'),
            dataIndex: 'total_orders_cost',
            key: 'total_orders_cost',
            render: (total_orders_cost) => (
                <TableTitle>
                    {
                        total_orders_cost
                            ? getLocalCost(total_orders_cost, currentProfile.currency.code)
                            : `0 ${currentProfile.currency.code.toUpperCase()}`
                    }
                </TableTitle>
            ),
            width: 250
        }
    ]

    return (
        <Row gutter={[0, 24]}>
            <Col span={24}>
                <OrgStatisticNav organization={organization}/>
            </Col>
            <Col span={24}>
                <StatisticTable
                    loading={loading}
                    data={data}
                    count={result.count}
                    limit={limit}
                    page={page}
                    onFilterChange={onFilterChange}
                    columns={columns}
                />
            </Col>
        </Row>
    )
}