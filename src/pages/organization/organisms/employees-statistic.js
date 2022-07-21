import React from 'react'
import {Col, Row} from 'antd'
import {useParams} from 'react-router-dom'
import {OrgStatisticNav, StatisticTable} from '../maleculas'
import {useEmployeeList} from '../../../hooks/statistics'
import {useStore} from 'effector-react'
import {$statisticModel} from '../../../models/statistic-model'
import {useTranslation} from 'react-i18next'
import {TableTitle} from '../../../ui/atoms'
import {ShortAccountCard} from '../../../components/card'
import {getLocalCost, langFormat} from '../../../utils/app-utils'
import {$accountModel} from '../../../models/accountModel'

export const OrgEmployeeStatistic = () => {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {organization} = useParams()
    const {limit, page, onFilterChange} = useEmployeeList()
    const {$employeeList: {data, loading, result}} = useStore($statisticModel)
    const {t} = useTranslation()

    const columns = [
        {
            title: t('employee'),
            dataIndex: 'responsible',
            key: 'responsible',
            render: (responsible) => (
                <TableTitle>
                    <ShortAccountCard
                        imgSize={32}
                        imgUrl={responsible.user.avatar}
                        name={responsible.user.full_name}
                        truncateLength={30}
                    />
                </TableTitle>
            ),
        },
        {
            title: t('speciality'),
            dataIndex: 'responsible',
            key: 'responsible',
            render: (responsible) => (
                <TableTitle>
                    {responsible.job.name}
                </TableTitle>
            ),
        },
        {
            title: t('clients'),
            dataIndex: 'total_orders_clients_count',
            key: 'total_orders_clients_count',
            render: (total_orders_clients_count) => (
                <TableTitle>
                    {total_orders_clients_count}
                </TableTitle>
            ),
        },
        {
            title: t('amount'),
            dataIndex: 'total_orders_cost',
            key: 'total_orders_cost',
            render: (total_orders_cost) => (
                <TableTitle>
                    {
                        total_orders_cost
                            ? getLocalCost(total_orders_cost, currentProfile.currency.code, langFormat(currentProfile.lang))
                            : `0 ${currentProfile.currency.code.toUpperCase()}`
                    }
                </TableTitle>
            ),
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