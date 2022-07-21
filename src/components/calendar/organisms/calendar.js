import React from 'react'
import {CalendarWrapper} from "../atoms";
import {Calendar} from 'react-date-range';

export const CommonCalendar = ({handleSelect, date, minDate}) => {
    const onChange = (date) => {
        handleSelect(date)
    }

    return (
        <CalendarWrapper>
            <Calendar
                date={date}
                onChange={onChange}
                showDateDisplay={false}
                showMonthAndYearPickers={false}
                minDate={minDate || false}
            />
        </CalendarWrapper>
    )
}