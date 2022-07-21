import {Menu} from 'antd'
import {useStore} from 'effector-react'
import React, {useState} from 'react'
import {PlusSvg} from '../../../media'
import {$widgets, addWeekday} from '../../../models/widgets'
import {DropdownItem, StyledDropdown} from '../atoms'
import {$jobModel, updateSelfJob, updateSpec} from "../../../models/job-model";
import {IconBox} from "../../../UIComponents/global-styles";

export const DayWeekDropdown = ({jobId}) => {
    const [visible, setVisible] = useState(false)
    const {$weekdays} = useStore($widgets)
    const {$accountSpec: {data}} = useStore($jobModel)

    const handleClick = (item) => {
        const newSelected = $weekdays.selected
        newSelected.push(item)
        addWeekday(newSelected)
        setVisible(false)
        const newScheduleItem = {
            [item.id]: {
                from: 9,
                to: 18,
                no_break: false,
                proc_interval: 10,
                breaks: [{
                    from: 13,
                    to: 14
                }]
            }
        }

        const params = {
            data: {
                operating_mode: {
                    ...data.operating_mode,
                    ...newScheduleItem
                }
            }
        }

        if (jobId) {
            params.id = jobId
            updateSpec(params)
        } else {
            updateSelfJob(params)
        }
    }

    const menu = (
        <Menu>
            {
                $weekdays.list.map((item, idx) => (
                    <Menu.Item key={idx}>
                        <DropdownItem onClick={() => handleClick(item)}>
                            {item.titleru}
                            <PlusSvg/>
                        </DropdownItem>
                    </Menu.Item>
                ))
            }
        </Menu>
    )
    return (
        <>
            {
                $weekdays.list.length > 0
                && (
                    <StyledDropdown
                        overlay={menu}
                        trigger={['click']}
                        onVisibleChange={(v) => setVisible(v)}
                        open={visible}
                        placement="bottomRight"
                    >
                        <IconBox>
                            <PlusSvg/>
                        </IconBox>
                    </StyledDropdown>
                )
            }
        </>
    )
}