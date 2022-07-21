import React, {useCallback} from 'react'
import {MeetTimeItem, MeetTimeUIBox} from '../atoms'
import {Tooltip} from 'antd'
import {Title} from '../../../UIComponents/typography'
import {useLocation} from 'react-router-dom'
import {URL_KEYS} from '../../../constants'
import moment from 'moment'
import {useUrlParams} from '../../../hooks/common'

export const MeetTimeInfo = ({requestData, dateItem, meetDate, activeDay}) => {
    const {pathname} = useLocation()
    const time = moment(dateItem.dateTime).format('HH:mm')
    const {urlData} = useUrlParams()
    const seller = urlData[URL_KEYS.SELLER]
    const specId = urlData[URL_KEYS.SPECIALIST_ID]

    const generateMeetTimeLink = useCallback((time) => {
        const url = []
        if(seller) {
            url.push(`${URL_KEYS.SELLER}=${seller}`)
        }
        if(specId) {
            url.push(`${URL_KEYS.SPECIALIST_ID}=${specId}`)
        }
        url.push(`${URL_KEYS.DATE}=${activeDay}`)
        url.push(`${URL_KEYS.TIME}=${time}`)
        return {
            pathname,
            search: url.join('&'),
        }
    }, [activeDay, pathname, seller, specId])

    const currentTime = new Date().getTime()
    return (
        <>
            {
                requestData[dateItem.dateTime]
                    ? (
                        <>
                            {
                                dateItem.dateTime > currentTime
                                    ? (
                                        <Tooltip
                                            title={`${requestData[dateItem.dateTime]?.user?.full_name} ${dateItem.strDate}`}>
                                            <MeetTimeUIBox imgUrl={requestData[dateItem.dateTime]?.user?.avatar}/>
                                        </Tooltip>
                                    )
                                    : (
                                        <MeetTimeUIBox style={{opacity: .5}}>
                                            <Title weight={500}>
                                                {time}
                                            </Title>
                                        </MeetTimeUIBox>
                                    )
                            }
                        </>
                    )
                    : (
                        <>
                            {
                                dateItem.dateTime > currentTime
                                    ? (
                                        <MeetTimeItem
                                            to={generateMeetTimeLink(time)}
                                            isActive={() => meetDate && meetDate === dateItem.dateTime}
                                        >
                                            <Title weight={500}>
                                                {time}
                                            </Title>
                                        </MeetTimeItem>
                                    )
                                    : (
                                        <MeetTimeUIBox style={{opacity: .5}}>
                                            <Title weight={500}>
                                                {time}
                                            </Title>
                                        </MeetTimeUIBox>
                                    )
                            }
                        </>
                    )
            }
        </>
    )
}