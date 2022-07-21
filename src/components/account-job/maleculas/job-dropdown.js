import React from 'react'
import {AnimateOnChange} from 'react-animation'
import {DropdownActionMenu, IconBox} from '../../../UIComponents/global-styles'
import {ChevronDownSvg} from '../../../media'
import {JobDropdownWrapper} from '../atoms'
import {useStore} from 'effector-react'
import {$jobModel} from '../../../models/job-model'
import {CalendarSvg} from '../../../media/calendar'

export const JobDropdown = ({showMore, data, setShowMore, value}) => {
    const {$specSettings: {showSchedule}} = useStore($jobModel)
    return (
        <>
            <JobDropdownWrapper>
                <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={setShowMore}>
                    {
                        showSchedule ? <CalendarSvg /> : value
                    }
                    <ChevronDownSvg style={{color: 'var(--primary-dwed)'}}/>
                </div>
                {
                    showMore
                    && (
                        <AnimateOnChange>
                            <DropdownActionMenu>
                                {
                                    data.map((item, idx) => (
                                        <IconBox key={`${idx + 1}`} onClick={() => item.onClick()}>
                                            {item.icon}
                                            {item.id}
                                        </IconBox>
                                    ))
                                }
                            </DropdownActionMenu>
                        </AnimateOnChange>
                    )
                }
            </JobDropdownWrapper>
        </>
    )
}