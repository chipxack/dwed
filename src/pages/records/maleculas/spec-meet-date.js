import React, {Fragment, useCallback} from 'react'
import {useSpecMeetDate} from '../../../hooks/order'
import {Col, Row} from 'antd'
import {useTranslation} from 'react-i18next'
import {Text, Title} from '../../../UIComponents/typography'
import {SpecDateItem} from '../atoms'
import moment from 'moment'
import {useLocation} from 'react-router-dom'
import {URL_KEYS} from '../../../constants'
import {InputSystem} from '../../../ui/molecules'
import {MeetTimeInfo} from './meet-time-info'
import {ApplyLink} from '../../../UIComponents/global-styles'
import {useUrlParams} from '../../../hooks/common'

export const SpecMeetDate = ({activeDay, meetDate, setComment, comment}) => {
    const {t} = useTranslation()
    const {dateRange, hours, renderMeetRow, requestData} = useSpecMeetDate({activeDay})
    const {pathname} = useLocation()
    const {urlData} = useUrlParams()
    const seller = urlData[URL_KEYS.SELLER]
    const specId = urlData[URL_KEYS.SPECIALIST_ID]

    const generateLink = useCallback(() => {
        const url = []

        if(seller) {
            url.push(`${URL_KEYS.SELLER}=${seller}`)
        }
        if(specId) {
            url.push(`${URL_KEYS.SPECIALIST_ID}=${specId}`)
        }

        if(activeDay) {
            url.push(`${URL_KEYS.DATE}=${activeDay}`)
        }

        if(meetDate) {
            url.push(`${URL_KEYS.TIME}=${moment(meetDate).format('HH:mm')}`)
        }

        if(comment && comment.length > 0) {
            url.push(`${URL_KEYS.TEXT}=${comment}`)
        }

        url.push(`${URL_KEYS.NEXT}=1`)
        return {
            pathname,
            search: url.join('&')
        }
    }, [pathname, comment, activeDay, meetDate, seller, specId])

    const getDayLink = useCallback((item) => {
        const url = []

        if(seller) {
            url.push(`${URL_KEYS.SELLER}=${seller}`)
        }
        if(specId) {
            url.push(`${URL_KEYS.SPECIALIST_ID}=${specId}`)
        }

        url.push(`${URL_KEYS.DATE}=${moment(item).format('YYYY-MM-DD')}`)

        return {
            pathname,
            search: url.join('&')
        }
    }, [seller, specId, pathname])

    return (
        <Row gutter={[24, 32]}>
            <Col span={24}>
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <Title level={5} weight={500}>
                            {t('select_date')}
                        </Title>
                    </Col>
                    <Col span={24}>
                        {
                            dateRange.length > 0 && (
                                <Row gutter={[12, 12]}>
                                    {
                                        dateRange.map(item => (
                                            <Col key={new Date(item).getTime()}>
                                                <SpecDateItem
                                                    to={getDayLink(item)}
                                                    isActive={() => activeDay === moment(item).format('YYYY-MM-DD')}
                                                >
                                                    <Title level={3} style={{marginBottom: 8}}>
                                                        {moment(item).format('DD')}
                                                    </Title>
                                                    <Text>
                                                        {moment(item).format('ddd').toUpperCase()}
                                                    </Text>
                                                </SpecDateItem>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            )
                        }
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <Title level={5} weight={500}>
                            {t('choose_time')}
                        </Title>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[12, 12]} wrap={false}>
                            {
                                hours.map((item, idx) => {
                                    const meetRow = renderMeetRow(item.id)
                                    return (
                                        <Fragment key={`${idx + 1}`}>
                                            {
                                                meetRow && meetRow.length > 0 && (
                                                    <Col>
                                                        {
                                                            meetRow.map((dateItem, x) => (
                                                                <MeetTimeInfo
                                                                    key={`${x + 1}`}
                                                                    dateItem={dateItem}
                                                                    meetDate={meetDate}
                                                                    requestData={requestData}
                                                                    activeDay={activeDay}
                                                                />
                                                            ))
                                                        }
                                                    </Col>
                                                )
                                            }
                                        </Fragment>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <Title level={5} weight={500}>
                            {t('comments')}
                        </Title>
                    </Col>
                    <Col span={24}>
                        <InputSystem
                            type='textarea'
                            placeholder={t('write_your_comments')}
                            value={comment}
                            change={setComment}
                        />
                    </Col>
                </Row>
            </Col>
            {
                activeDay && meetDate && (
                    <Col span={24}>
                        <ApplyLink style={{marginLeft: 'auto'}} to={generateLink()}>
                            {t('continue')}
                        </ApplyLink>
                    </Col>
                )
            }
        </Row>
    )
}