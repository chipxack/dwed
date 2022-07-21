import {DateRangeCalendar} from '../../calendar'
import React from 'react'
import {RequestFilterItem} from '../atoms'
import {useStore} from 'effector-react'
import {$jobModel} from '../../../models/job-model'
import {requestFilter} from '../../../pages/user/helper'
import {usePathGeneration} from '../../../hooks/common'
import {URL_KEYS} from '../../../constants'
import {Text, Title} from '../../../UIComponents/typography'
import {useTranslation} from 'react-i18next'
import {Col, Row} from 'antd'

export const RequestFilter = (
    {
        socketData,
        activeFilter,
        otherDate,
        selectedDateData,
        handleDateRangeFilter
    }
) => {
    const {$specSettings} = useStore($jobModel)
    const {generatePath} = usePathGeneration()
    const {t} = useTranslation()

    const queryData = [
        URL_KEYS.JOB_ID,
    ]

    return (
        <>

            {
                $specSettings.showCalendar
                && (
                    <DateRangeCalendar
                        handleSelect={handleDateRangeFilter}
                    />
                )
            }
            <Row gutter={16} style={{marginBottom: 24}}>
                {
                    requestFilter.map((item) => (
                        <Col span={4} key={item.id}>
                            <RequestFilterItem
                                to={generatePath(queryData, {id: item.value, param: URL_KEYS.FILTER_TYPE})}
                                isActive={() => activeFilter && activeFilter === item.value}
                            >
                                <Text style={{textTransform: 'uppercase', marginBottom: 10}} weight={500}>
                                    {
                                        otherDate && item.value === 'today'
                                        && `${otherDate.endDate ? `${otherDate.endDate}` : ''}`
                                    }
                                    {!otherDate && item.value === 'today' && t(item.title)}
                                    {item.value !== 'today' && t(item.title)}
                                </Text>
                                <Title level={2}>
                                    {item.value !== 'today' && socketData && socketData.counters && socketData.counters[item.value]}

                                    {
                                        item.value === 'today' && selectedDateData
                                            ? selectedDateData
                                            : item.value === 'today' && socketData && socketData.counters && socketData.counters[item.value]
                                    }
                                </Title>
                            </RequestFilterItem>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}