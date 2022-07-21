import React from 'react'
import {AccountJobList, JobContent, JobSuggestion} from '../organims'
import {useUrlParams} from '../../../hooks/common'
import {URL_KEYS} from '../../../constants'

export const AccountJobPanel = () => {
    const {urlData} = useUrlParams()
    const jobId = urlData[URL_KEYS.JOB_ID]
    return (
        <>
            <AccountJobList/>
            {
                jobId ? <JobContent/> : <JobSuggestion/>
            }
        </>
    )
}