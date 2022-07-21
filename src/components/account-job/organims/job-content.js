import {useStore} from 'effector-react'
import React, {useEffect} from 'react'
import {$jobModel} from '../../../models/job-model'
import {SpecWrapper} from '../atoms'
import {weekdays} from '../../../helper/data/weekdays'
import {addWeekday} from '../../../models/widgets'
import {SpecialistRequests} from './requests'
import {SpecialistScheduleSettings} from './schedule-settings'
import {useUrlParams} from '../../../hooks/common'
import {URL_KEYS} from '../../../constants'

export const JobContent = () => {
    const {$specSettings: {showSchedule}, $accountSpec: {data}} = useStore($jobModel)
    const {urlData} = useUrlParams()
    const jobId = urlData[URL_KEYS.JOB_ID]

    useEffect(() => {
        if (data && data.operating_mode) {
            const days = Object.keys(data.operating_mode)
            const tmp = []
            for (let i = 0; i < days.length; i++) {
                const newData = weekdays.find(item => item.id === days[i])
                tmp.push(newData)
            }
            addWeekday(tmp)
        }
    }, [data])

    return (
        <>
            {
                jobId
                && (
                    <SpecWrapper>
                        {
                            showSchedule
                                ? <SpecialistScheduleSettings/>
                                : <SpecialistRequests/>
                        }
                    </SpecWrapper>
                )
            }
        </>
    )
}