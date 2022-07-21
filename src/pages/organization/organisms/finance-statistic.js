import React from 'react'
import {Col, Row} from 'antd'
import {useHistory, useParams} from 'react-router-dom'
import {FinanceIndicator, OrgStatisticNav, StatisticTable} from '../maleculas'
import {useFinanceList} from '../../../hooks/statistics'
import {useStore} from 'effector-react'
import {$statisticModel} from '../../../models/statistic-model'
import {useTranslation} from 'react-i18next'
import {TableLink} from '../../../ui/atoms'
import moment from 'moment'
import {$accountModel} from '../../../models/accountModel'
import {getLocalCost, langFormat} from '../../../utils/app-utils'
import {ShortAccountCard} from '../../../components/card'

export const OrgFinanceStatistic = () => {
    const {organization} = useParams()
    const {page, onFilterChange, limit} = useFinanceList()
    const {$financeList: {loading, data, result}} = useStore($statisticModel)
    const {t} = useTranslation()
    const {location: {pathname}} = useHistory()
    const {$profiles: {currentProfile}} = useStore($accountModel)

    const columns = [
        {
            title: t('date_time'),
            key: 'process_date',
            dataIndex: 'process_date',
            render: (process_date) => (
                <TableLink color={'var(--dark-basic)'} to={`${pathname}`}>
                    {moment(process_date).format('YYYY.MM.DD HH:mm:ss')}
                </TableLink>
            ),
            width: 160
        },
        {
            title: t('client'),
            key: 'data',
            dataIndex: 'data',
            render: (data) => (
                <TableLink color={'var(--dark-basic)'} to={`${pathname}`}>
                    <ShortAccountCard
                        imgSize={32}
                        imgUrl={data.user.avatar}
                        name={data.user.full_name.trim().length > 0 ? data.user.full_name : `@${data.user.username}`}
                        truncateLength={32}
                    />
                </TableLink>
            )
        },
        {
            title: t('payment_method'),
            key: 'payment_method',
            dataIndex: 'payment_method',
            render: (payment) => (
                <TableLink color={'var(--dark-basic)'} to={`${pathname}`}>
                    {payment ? payment : t('no_data')}
                </TableLink>
            ),
            width: 160
        },
        {
            title: t('amount'),
            key: 'data',
            dataIndex: 'data',
            render: (data) => (
                <TableLink color={'var(--dark-basic)'} to={`${pathname}`}>
                    {
                        data.total_cost
                            ? getLocalCost(data.total_cost, currentProfile.currency.code, langFormat(currentProfile.lang))
                            : `${data.total_cost} ${currentProfile.currency.code.toUpperCase()}`

                    }
                </TableLink>
            ),
            width: 220
        }
    ]

    return (
        <Row gutter={[0, 24]}>
            <Col span={24}>
                <OrgStatisticNav organization={organization}/>
            </Col>
            <Col span={24}>
                <FinanceIndicator/>
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