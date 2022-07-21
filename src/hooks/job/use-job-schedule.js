import {useStore} from "effector-react";
import {$jobModel, updateSpec} from "../../models/job-model";
import {useUrlParams} from "../common";
import {URL_KEYS} from "../../constants";
import {useCallback, useEffect, useState} from "react";
import {updateSelfJob} from "../../api/account-api";
import moment from "moment";

const getTime = (timeStr) => {
    return new Date(`${new Date().toDateString()} ${timeStr}`)
}

export function useJobSchedule({scheduleId}) {
    const {$accountSpec: {data}} = useStore($jobModel)
    const {urlData} = useUrlParams()
    const jobId = urlData[URL_KEYS.JOB_ID]
    const [start, setStart] = useState(getTime('09:00'))
    const [end, setEnd] = useState(getTime('18:00'))
    const [hour_24, setHour_24] = useState(false)
    const [procInterval, setProsInterval] = useState(10)
    const [toggleBreak, setToggleBreak] = useState(false)
    const [breaks, setBreaks] = useState([{
        to: getTime('14:00'),
        from: getTime('13:00')
    }])

    const getDateTime = (number) => {
        const now = new Date().toDateString()
        const time = String(number.toFixed(2)).split('.').join(':')
        return new Date(`${now} ${time}`)
    }

    const currentSchedule = data && data.operating_mode && data.operating_mode[scheduleId]

    const updateSchedule = useCallback((newData) => {
        if (currentSchedule) {
            const params = {
                data: {
                    operating_mode: {
                        ...data.operating_mode,
                        [scheduleId]: {
                            ...currentSchedule,
                            ...newData
                        }
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
    }, [data, scheduleId, currentSchedule, jobId])

    const is24Hour = (_from, _to) => {
        const from = String(_from.toFixed(2)).split('.')[0]
        const to = String(_to.toFixed(2)).split('.')[1]
        return Number(from) === 0 && Number(to) === 59
    }

    useEffect(() => {
        if (currentSchedule) {
            setProsInterval(currentSchedule.proc_interval)
            setStart(getDateTime(currentSchedule.from))
            setEnd(getDateTime(currentSchedule.to))
            setToggleBreak(!currentSchedule.no_break)
            is24Hour(currentSchedule.from, currentSchedule.to)
            setHour_24(is24Hour(currentSchedule.from, currentSchedule.to))
            const scheduleBreaks = currentSchedule.breaks
            const tmp = []
            for (let i = 0; i < scheduleBreaks.length; i++) {
                tmp.push({
                    from: getDateTime(scheduleBreaks[i].from),
                    to: getDateTime(scheduleBreaks[i].to)
                })
            }
            setBreaks(tmp)
        }
    }, [data, currentSchedule])

    const handleChange = useCallback((e, type) => {
        let newData = {}
        if (type === 'start') {
            setStart(e)
            newData = {
                from: parseFloat(moment(e).format("HH.mm"))
            }
            setHour_24(is24Hour(newData.from, currentSchedule.to))
        }

        if (type === 'end') {
            setEnd(e)
            newData = {
                to: parseFloat(moment(e).format("HH.mm"))
            }
            setHour_24(is24Hour(currentSchedule.from, newData.to))
        }
        updateSchedule(newData)
    }, [updateSchedule, currentSchedule])

    const handleProcInterval = useCallback((value) => {
        updateSchedule({proc_interval: value})
    }, [updateSchedule])

    const changeBreaks = useCallback((e, idx, type) => {
        const tmp = []

        for (let i = 0; i < breaks.length; i++) {
            if (i === idx) {
                if (type === 'start') {
                    tmp.push({
                        ...breaks[i],
                        from: parseFloat(moment(e).format("HH.mm")),
                        to: parseFloat(moment(breaks[i].to).format("HH.mm"))
                    })
                }
                if (type === 'end') {
                    tmp.push({
                        ...breaks[i],
                        to: parseFloat(moment(e).format("HH.mm")),
                        from: parseFloat(moment(breaks[i].from).format("HH.mm"))
                    })
                }
            } else {
                tmp.push({
                    to: parseFloat(moment(breaks[i].to).format("HH.mm")),
                    from: parseFloat(moment(breaks[i].from).format("HH.mm")),
                })
            }
        }

        updateSchedule({breaks: tmp})

    }, [breaks, updateSchedule])

    const deleteBreak = useCallback((idx) => {
        const newBreaks = breaks.filter((item, index) => idx !== index)
        const tmp = []
        setBreaks(newBreaks)
        for (let i = 0; i < newBreaks.length; i++) {
            tmp.push({
                to: parseFloat(moment(newBreaks[i].to).format("HH.mm")),
                from: parseFloat(moment(newBreaks[i].from).format("HH.mm"))
            })
        }
        updateSchedule({breaks: tmp})

    }, [breaks, updateSchedule])

    const addBreak = useCallback(() => {
        const newBreaks = [...breaks, {from: getTime('13:00'), to: getTime('14:00')}]
        const tmp = []
        setBreaks(newBreaks)

        for (let i = 0; i < newBreaks.length; i++) {
            tmp.push({
                to: parseFloat(moment(newBreaks[i].to).format("HH.mm")),
                from: parseFloat(moment(newBreaks[i].from).format("HH.mm"))
            })
        }

        updateSchedule({breaks: tmp})
    }, [breaks, updateSchedule])

    const handleToggleBreak = useCallback((status) => {
        setToggleBreak(status)
        updateSchedule({no_break: status})
    }, [updateSchedule])

    const active24Hour = useCallback((status) => {
        setHour_24(status)
        let data = {
            from: 0,
            to: 23.59
        }

        if (!status) {
            data = {
                from: 9,
                to: 18
            }
        }

        updateSchedule(data)
    }, [updateSchedule])

    return {
        start,
        end,
        hour_24,
        toggleBreak,
        active24Hour,
        changeBreaks,
        procInterval,
        handleChange,
        handleToggleBreak,
        handleProcInterval,
        addBreak,
        deleteBreak,
        setProsInterval,
        breaks
    }
}