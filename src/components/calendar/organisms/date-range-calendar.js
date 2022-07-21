import React, {useState} from "react";
import moment from "moment";
import {DateRange} from "react-date-range";
import {CalendarWrapper} from "../atoms";
import {formatter} from "../../../constants/formatter";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'


export const DateRangeCalendar = ({handleSelect}) => {
    const [selectionRange, setSelectionRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ])
    const onChange = ({selection}) => {
        setSelectionRange([{...selection}])
        handleSelect({
            start: moment(selection.startDate).format(formatter),
            end: moment(`${new Date(selection.endDate).toDateString()} 23:59`).format(formatter)
        })


    }

    return (
        <CalendarWrapper>
            <DateRange
                ranges={selectionRange}
                onChange={onChange}
                showDateDisplay={false}
                showMonthAndYearPickers={false}
            />
        </CalendarWrapper>
    )
}