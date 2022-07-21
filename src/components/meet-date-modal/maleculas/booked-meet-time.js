import React from 'react'
import {Tooltip} from "antd";
import {CommonAvatar} from "../../../UIComponents/avatar";
import {MeetDateItem} from "../../account-job/atoms";

export const BookedMeetTime = ({data, active}) => {
    return (
        <Tooltip title={`${data.user.full_name} (${data.meetTimeStr})`}>
            <MeetDateItem>
                <CommonAvatar
                    size={40}
                    imgUrl={data.user.avatar}
                    active={data.id && active && active.id === data.id}
                />
            </MeetDateItem>
        </Tooltip>
    )
}