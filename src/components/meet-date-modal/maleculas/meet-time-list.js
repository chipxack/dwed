import React from 'react'
import {BookedMeetTime} from "./booked-meet-time";
import moment from "moment";
import {MeetTime} from "./meet-time";
import {MeetDateItem} from "../../account-job/atoms";


export const MeetTimeList = ({data, time, onChange, active}) => {
    console.log(time)
    return (
        <>
            {
                data
                    ? (
                        <BookedMeetTime data={data} active={active}/>
                    )
                    : (
                        <>
                            {
                                time.isPossible
                                    ? parseFloat(moment(new Date()).format('HH.mm')) < time.intDate ? (
                                        <MeetTime
                                            time={time}
                                            onChange={onChange}
                                        />
                                    ) : <MeetDateItem/>
                                    : <MeetTime
                                        time={time}
                                        onChange={onChange}
                                    />
                            }

                        </>
                    )
            }
        </>
    )
}