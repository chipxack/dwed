import React, {useCallback, useEffect, useRef, useState} from 'react'
import {JobItem, JobItemBox} from '../atoms'
import {URL_KEYS} from '../../../constants'
import {ShortAccountCard} from '../../card'
import {JobDropdown} from './job-dropdown'
import {useOutsideClicker, usePathGeneration, useUrlParams} from '../../../hooks/common'
import {useHistory, useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {CalendarSvg} from '../../../media/calendar'
import {showSpecSchedule, updateSpec} from '../../../models/job-model'
import {accountSpecPanelEvent} from '../../../models/accountModel'

export const AccountJobItem = ({item}) => {
    const {t} = useTranslation()
    const {account} = useParams()
    const {location: {state}} = useHistory()
    const {generatePath} = usePathGeneration({custom_pathname: `/@${account}/jobs`})
    const {urlData} = useUrlParams()
    const jobId = urlData[URL_KEYS.JOB_ID] || (state && state.jobId)
    const [showMore, setShowMore] = useState(null)
    const contRef = useRef(null)
    const {clicked} = useOutsideClicker(contRef)

    useEffect(() => {
        if (clicked) {
            setShowMore(null)
        }
    }, [clicked])

    const getWorkingMode = useCallback(() => {
        let statusText = ''

        if (item.settings.auto_mode) {
            statusText = 'A'
        } else {
            if (item.settings.is_working) {
                statusText = 'On'
            } else {
                statusText = 'Off'
            }
        }

        return (
            <div className='icon-text' style={{margin: 0}}>
                {statusText}
            </div>
        )
    }, [item.settings])


    const data = [
        {
            id: t('auto'),
            icon: <div className='icon-text'>A</div>,
            onClick: () => {
                const params = {
                    id: item.id,
                    data: {
                        auto_mode: true,
                        is_working: true
                    }
                }
                setShowMore(false)
                updateSpec({...params, actions: () => accountSpecPanelEvent(params)})
                showSpecSchedule(false)
            }
        },
        {
            id: t('working'),
            icon: <div className='icon-text'>On</div>,
            onClick: () => {
                const params = {
                    id: item.id,
                    data: {is_working: true, auto_mode: false}
                }
                updateSpec({...params, actions: () => accountSpecPanelEvent(params)})
                setShowMore(false)
                showSpecSchedule(false)
            }
        },
        {
            id: t('dont_working'),
            icon: <div className='icon-text'>Off</div>,
            onClick: () => {
                const params = {
                    id: item.id,
                    data: {is_working: false, auto_mode: false}
                }
                updateSpec({...params, actions: () => accountSpecPanelEvent(params)})
                setShowMore(false)
                showSpecSchedule(false)
            }
        },
        {
            id: t('schedule'),
            icon: <CalendarSvg/>,
            onClick: () => {
                showSpecSchedule(true)
                setShowMore(false)
            }
        },
    ]

    return (
        <JobItemBox ref={contRef} className={jobId && jobId === String(item.id) && 'active'}>
            <JobItem
                to={generatePath([], {param: URL_KEYS.JOB_ID, id: String(item.id)})}
            >
                <ShortAccountCard
                    name={item.name}
                    text={item.text}
                    truncateLength={14}
                    showTooltipTitle={item.name.length > 14}
                />
            </JobItem>
            <JobDropdown
                data={data}
                showMore={showMore && showMore === item.id}
                setShowMore={() => setShowMore(item.id)}
                value={getWorkingMode()}
            />
        </JobItemBox>
    )
}