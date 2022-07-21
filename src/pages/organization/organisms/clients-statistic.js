import React from 'react'
import {Col, Row} from 'antd'
import {useHistory, useParams} from 'react-router-dom'
import {OrgStatisticNav, StatisticTable} from '../maleculas'
import {useClientList} from '../../../hooks/statistics'
import {useStore} from 'effector-react'
import {$statisticModel} from '../../../models/statistic-model'
import {TableLink} from '../../../ui/atoms'
import {useTranslation} from 'react-i18next'
import {ShortAccountCard} from '../../../components/card'
import {Text, Title} from '../../../UIComponents/typography'
import {$accountModel} from '../../../models/accountModel'
import {getLocalCost} from '../../../utils/app-utils'
import {truncateString} from '../../../utils/stringUtils'


export const OrgClientsStatistic = () => {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {$clients: {data, result, loading}} = useStore($statisticModel)
    const {organization} = useParams()
    const {limit, page, onFilterChange} = useClientList()
    const {location: {pathname}} = useHistory()
    const {t} = useTranslation()

    const columns = [
        {
            title: t('client'),
            dataIndex: 'user',
            key: 'user',
            render: (user) => (
                <TableLink to={`/${pathname}`}>
                    <ShortAccountCard
                        imgSize={32}
                        imgUrl={user.avatar}
                        name={user.full_name.trim().length > 0 ? user.full_name : user.username}
                        truncateLength={30}
                    />
                </TableLink>
            ),
        },
        {
            title: t('speciality'),
            dataIndex: 'user',
            key: 'user',
            render: (user) => (
                <TableLink to={`/${pathname}`}>
                    {
                        user.main_cat
                            ? <Title>{truncateString(user.main_cat.name, 25)}</Title>
                            : <Text size={14} weight={500}>{t('no_data')}</Text>
                    }

                </TableLink>
            ),
            width: 250
        },
        {
            title: t('visits'),
            dataIndex: 'total_orders_count',
            key: 'total_orders_count',
            render: (total_orders_count) => (
                <TableLink to={`/${pathname}`}>
                    <Title>
                        {total_orders_count}
                    </Title>
                </TableLink>
            ),
            width: 130
        },
        {
            title: t('amount'),
            dataIndex: 'total_orders_cost',
            key: 'total_orders_cost',
            render: (total_orders_cost) => (
                <TableLink to={`/${pathname}`}>
                    <Title>
                        {
                            total_orders_cost
                                ? getLocalCost(total_orders_cost, currentProfile.currency.code)
                                : `0 ${currentProfile.currency.code.toUpperCase()}`
                        }
                    </Title>
                </TableLink>
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