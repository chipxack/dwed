import React from 'react'
import {PlusSvg} from "../../../media";
import {Tooltip} from "antd";
import {MeetDateItem} from "../../account-job/atoms";

export const MeetTime = ({time, onChange, ...props}) => {
    return (
        <Tooltip
            title={`Свободно (${time.strDate})`}
        >
            <MeetDateItem
                onClick={() => onChange(time.intDate)}
                {...props}
            >
                <PlusSvg/>
            </MeetDateItem>
        </Tooltip>
    )
}