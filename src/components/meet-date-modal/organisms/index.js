import React from 'react'
import {CommonCalendar} from '../../calendar'
import {Spin} from 'antd'
import {
    MeetDate,
    MeetDateContent,
    MeetDateContentInner,
    MeetDateGridItem,
    MeetDateHour,
    MeetDatePeople,
    MeetDateSetting
} from '../../account-job/atoms'
import moment from 'moment'
import {useMeetDate} from '../../../hooks/order'
import {MeetTimeList} from '../maleculas'

export const MeetDateModal = ({job, type, handleChange, active, dateData}) => {
    const {
        date,
        selectDate,
        requestLoading,
        requestData,
        renderMeetRow,
        onChange,
        hours,
        error
    } = useMeetDate({job, type, handleChange, active, dateData})

    return (
        <MeetDateSetting>
            <CommonCalendar
                minDate={new Date()}
                date={date}
                handleSelect={selectDate}
            />
            <Spin tip='Loading...' spinning={requestLoading}>
                {
                    !!error
                        ? error
                        : (
                            <MeetDateContent>
                                <MeetDate>
                                    {moment(date).format('YYYY.MM.DD')}
                                </MeetDate>
                                <MeetDateContentInner>
                                    {
                                        hours.map((item, idx) => {
                                            const meetRow = renderMeetRow(item.id)
                                            return (
                                                <MeetDateGridItem key={`${idx + 1}`}>
                                                    <MeetDateHour>
                                                        {item.hour}
                                                    </MeetDateHour>
                                                    <MeetDatePeople>
                                                        {
                                                            meetRow && meetRow.length > 0
                                                            && meetRow.map((time, idx) => {
                                                                const data = requestData[time.dateString] || false
                                                                return (
                                                                    <MeetTimeList
                                                                        key={`${idx + 1}`}
                                                                        data={data}
                                                                        time={time}
                                                                        onChange={onChange}
                                                                        active={active}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </MeetDatePeople>
                                                </MeetDateGridItem>
                                            )
                                        })
                                    }
                                </MeetDateContentInner>
                            </MeetDateContent>
                        )
                }
            </Spin>
        </MeetDateSetting>
    )
}