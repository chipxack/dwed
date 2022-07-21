import {Col, Row} from 'antd'
import {useStore} from 'effector-react'
import React, {useEffect, useState} from 'react'
import {CloseCircleSvg} from '../../../media/close-circle'
import {$widgets, deleteWeekday} from '../../../models/widgets'
import {WeekdayItem, WeekDayWrapper} from '../atoms'
import {ScheduleItem} from '../maleculas'
import {$jobModel, updateSelfJob, updateSpec} from '../../../models/job-model'
import {useUrlParams} from '../../../hooks/common'
import {URL_KEYS} from '../../../constants'
import {getWeekDay} from '../../../utils/dateUtils'
import {DayWeekDropdown} from './weekday-dropdown'

export const SpecialistScheduleSettings = () => {
    const [selectedDay, setSelectedDay] = useState(null)
    const {$weekdays} = useStore($widgets)
    const {$accountSpec: {data}} = useStore($jobModel)
    const {urlData} = useUrlParams()
    const jobId = urlData[URL_KEYS.JOB_ID]
    const [mounted, setMounted] = useState(false)

    const handleClick = (id) => {
        if (selectedDay && selectedDay === id) {
            setSelectedDay(null)
        } else {
            setSelectedDay(id)
        }
    }

    const handleDelete = (id) => {
        deleteWeekday(id)
        const schedule = data.operating_mode
        delete schedule[id]
        const params = {
            data: {operating_mode: schedule}
        }

        if (jobId) {
            params.id = jobId
            updateSpec(params)
        } else {
            updateSelfJob(params)
        }
    }

    useEffect(() => {
        const day = getWeekDay(new Date())
        if (!mounted && data && data.operating_mode && data.operating_mode[day]) {
            setSelectedDay(day)
            setMounted(true)
        }
    }, [data, mounted])


    return (
        <>
            <WeekDayWrapper>
                <Row gutter={16}>
                    <Col span={22}>
                        <Row gutter={[16, 16]}>
                            {
                                $weekdays.selected.length > 0 && $weekdays.selected.map(weekDay => (
                                    <Col key={weekDay.id}>
                                        <WeekdayItem
                                            active={selectedDay && selectedDay === weekDay.id}
                                        >
                                            <WeekdayItem.Title
                                                onClick={() => handleClick(weekDay.id)}
                                            >
                                                {weekDay.titleru}
                                            </WeekdayItem.Title>
                                            <WeekdayItem.Close onClick={() => handleDelete(weekDay.id)}>
                                                <CloseCircleSvg/>
                                            </WeekdayItem.Close>
                                        </WeekdayItem>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Col>
                    {
                        $weekdays.selected.length !== 7 && (
                            <Col span={2}>
                                <DayWeekDropdown jobId={jobId}/>
                            </Col>
                        )
                    }
                </Row>
            </WeekDayWrapper>
            {
                selectedDay && <ScheduleItem scheduleId={selectedDay}/>
            }
        </>
    )
}