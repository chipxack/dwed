import React from 'react'
import {Col, Row} from 'antd'
import {OrgStatisticNav, StatisticTable} from '../maleculas'
import {useHistory, useParams} from 'react-router-dom'
import {useRequestList} from '../../../hooks/statistics'
import {useStore} from 'effector-react'
import {$statisticModel} from '../../../models/statistic-model'
import {TableLink} from '../../../ui/atoms'
import moment from 'moment'
import {useTranslation} from 'react-i18next'
import {ShortAccountCard} from '../../../components/card'
import {truncateString} from '../../../utils/stringUtils'
import {Text} from '../../../UIComponents/typography'
import {getLocalCost, langFormat} from '../../../utils/app-utils'
import {$accountModel} from '../../../models/accountModel'
import {StatusBadge} from '../../../UIComponents/global-styles'
import {getRequestStatus} from '../../../utils/accountUtils'

export const OrgRequestStatistic = () => {
    const {organization} = useParams()
    const {limit, page, onFilterChange} = useRequestList()
    const {$requestList: {data, result, loading}} = useStore($statisticModel)
    const {t} = useTranslation()
    const {location: {pathname}} = useHistory()
    const {$profiles: {currentProfile}} = useStore($accountModel)

    const columns = [
        {
            title: t('created_date'),
            key: 'finish_date',
            dataIndex: 'finish_date',
            render: (finish_date) => (
                <TableLink color={'var(--dark-basic)'} to={`${pathname}`}>
                    {moment(finish_date).format('YYYY.MM.DD HH:mm:ss')}
                </TableLink>
            ),
            width: 160
        },
        {
            title: t('client'),
            key: 'user',
            dataIndex: 'user',
            render: (user) => (
                <TableLink color={'var(--dark-basic)'} to={`${pathname}`}>
                    <ShortAccountCard
                        imgSize={32}
                        imgUrl={user.avatar}
                        name={user.full_name.trim().length > 0 ? user.full_name : user.username}
                        truncateLength={16}
                    />
                </TableLink>
            ),
            width: 200
        },
        {
            title: t('offerings'),
            key: 'offerings',
            dataIndex: 'offerings',
            render: (offerings) => (
                <TableLink color={'var(--dark-basic)'} to={`${pathname}`}>
                    {truncateString(offerings[0].name, 25)}
                    {
                        offerings.length > 1 && (
                            <Text>
                                {t('more_offerings', {n: offerings.slice(1).length})}
                            </Text>
                        )
                    }
                </TableLink>
            ),
        },
        {
            title: t('status'),
            key: 'status',
            dataIndex: 'status',
            render: (status) => (
                <TableLink color={'var(--dark-basic)'} to={`${pathname}`}>
                    <StatusBadge
                        style={{
                            color: getRequestStatus(status).color,
                            backgroundColor: getRequestStatus(status).bgColor
                        }}
                    >
                        {getRequestStatus(status).title}
                    </StatusBadge>
                </TableLink>
            ),
            width: 140
        },
        {
            title: t('amount'),
            key: 'total_cost',
            dataIndex: 'total_cost',
            render: (total_cost) => (
                <TableLink color={'var(--dark-basic)'} to={`${pathname}`}>
                    {
                        total_cost
                            ? getLocalCost(total_cost, currentProfile.currency.code, langFormat(currentProfile.lang))
                            : `0 ${currentProfile.currency.code.toUpperCase()}`
                    }
                </TableLink>
            ),
            width: 200
        },
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