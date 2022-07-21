import {useCallback, useEffect, useState} from 'react'
import moment from 'moment'
import {formatter} from '../../constants/formatter'
import specialism from '../../service/specialism'
import {getSelfRequest} from '../../api/account-api'
import order from '../../service/order'
import {jobRequestDetailMount} from '../../models/job-model'
import {getDateTime, getWeekDay, strHourToInt} from '../../utils/dateUtils'

export const useMeetDate = ({job, type, handleChange, active, dateData}) => {
    const [error, setError] = useState([])
    const [date, setDate] = useState(new Date())
    const [isCurrentDate, setIsCurrentDate] = useState(true)
    const [currentDay, setCurrentDay] = useState(getWeekDay(new Date()))
    const [hours, setHours] = useState([])
    const [meetTimes, setMeetTimes] = useState({})
    const [requestData, setRequestData] = useState({})
    const [requestLoading, setRequestLoading] = useState(false)
    const [mounted, setMounted] = useState(false)

    const generateData = useCallback((data) => {
        const tmp = {}
        for (let i = 0; i < data.length; i++) {
            const id = moment(data[i].meet_date).format(formatter)
            const meetTime = moment(data[i].meet_date).format('HH.mm')
            tmp[id] = {
                id: data[i].id,
                user: data[i].user,
                meetTime: parseFloat(meetTime).toFixed(1),
                meetTimeStr: moment(data[i].meet_date).format('HH:mm')
            }
        }
        return tmp
    }, [])

    const addClientData = useCallback((order) => {
        if (dateData && dateData.id) {
            const meetTime = moment(dateData.id).format('HH.mm')
            order[dateData.id] = {
                id: active.id,
                user: active.user,
                meetTime: parseFloat(meetTime).toFixed(1),
                meetTimeStr: moment(dateData.id).format('HH:mm')
            }
            return order
        }

        return false
    }, [active, dateData])

    const getOrgOrder = useCallback((params) => {
        setRequestLoading(true)
        order.getOrgOrder(params)
            .then(res => {
                const data = res.data.results
                let orders = generateData(data)
                const withClientOrder = addClientData(orders)
                if (withClientOrder) {
                    orders = withClientOrder
                }
                setRequestData(orders)
            })
            .finally(() => setRequestLoading(false))
            .catch(() => {
                setRequestLoading(false)
            })
    }, [generateData, addClientData])

    const getOrgSpecOrder = useCallback((params) => {
        setRequestLoading(true)
        specialism.getOrgSpecRequests(params)
            .then((res) => {
                const data = res.data.results
                setRequestData(generateData(data))
            })
            .finally(() => setRequestLoading(false))
            .catch(() => {
                setRequestLoading(false)
            })
    }, [generateData])

    const getSelfSpecOrder = useCallback((params) => {
        setRequestLoading(true)
        getSelfRequest(params)
            .then(res => {
                const data = res.data.results
                setRequestData(generateData(data))
            })
            .finally(() => setRequestLoading(false))
            .catch(() => {
                setRequestLoading(false)
            })
    }, [generateData])

    const getOrders = useCallback(() => {
        const data = {
            params: {
                limit: 200,
                offset: 0,
                meet_date__gt: moment(new Date(`${date.toDateString()} 00:00`)).format(formatter),
                meet_date__lt: moment(new Date(`${date.toDateString()} 23:59`)).format(formatter)
            }
        }

        if (job && job.specType) {
            if (job.specType === 'org_specialist') {
                if (type === 'checkout') {
                    data['responsible_id'] = job.id
                    getOrgOrder(data)
                }

                if (type === 'job') {
                    data['specialism_id'] = job.id
                    getOrgSpecOrder(data)
                }
            }

            if (job.specType === 'self_specialist') {
                delete data['specialism_id']
                getSelfSpecOrder(data)
            }
        }
    }, [getOrgSpecOrder, date, job, getSelfSpecOrder, getOrgOrder, type])

    const updateOrgSpecOrder = useCallback((data) => {
        specialism.updateOrgSpecRequestDetail(data)
            .then((res) => {
                if (res) {
                    getOrders()
                    jobRequestDetailMount(data)
                }
            })
    }, [getOrders])

    const updateOrder = useCallback((updatedData) => {
        const data = updatedData
        if (job && job.specType) {
            if (job.specType === 'org_specialist') {
                data['specialism_id'] = job.id
                data['order_id'] = active.id
                updateOrgSpecOrder(data)
            }

            if (job.specType === 'self_specialist') {
            }
        }

    }, [updateOrgSpecOrder, job, active])

    const selectDate = useCallback((date) => {
        setDate(date)
        setCurrentDay(getWeekDay(date))

        if (moment(date).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')) {
            setIsCurrentDate(true)
        } else {
            setIsCurrentDate(false)
        }
    }, [])

    const renderMeetRow = useCallback((id) => {
        const strHour = moment(id).format('HH:mm')
        const hourInt = strHourToInt(strHour)
        return meetTimes[hourInt]
            && Object.values(meetTimes[hourInt]).sort((a, b) => a - b)
    }, [meetTimes])


    const changeClientDate = useCallback((meet_date, meetTime) => {
        const orders = {...requestData}
        const params = {
            id: active.id,
            user: active.user,
            meetTime: parseFloat(meetTime).toFixed(1),
            meetTimeStr: moment(meet_date).format('HH:mm')
        }
        if (dateData && dateData.id && orders[dateData.id]) {
            delete orders[dateData.id]
        }

        const clientDate = {
            date: meet_date,
            id: meet_date
        }

        handleChange(clientDate)
        orders[meet_date] = params
        setRequestData(orders)
    }, [active, dateData, requestData, handleChange])

    const onChange = useCallback((meetDate) => {
        const meet_date = moment(new Date(`${date.toDateString()} ${moment(getDateTime(meetDate)).format('HH:mm')}`)).format(formatter)
        const meetTime = moment(meet_date).format('HH.mm')
        if (type === 'checkout') {
            changeClientDate(meet_date, meetTime)
        }

        if (type === 'job') {
            const params = {
                order_id: active.id,
                data: {meet_date}
            }
            updateOrder(params)
        }

    }, [type, changeClientDate, date, active.id, updateOrder])

    useEffect(() => {
        if (job && job.operating_mode && job.operating_mode[currentDay]) {
            const data = job.operating_mode[currentDay]
            const breaks = data.breaks
            const to = parseInt(data.to)
            const interval = data.proc_interval
            const tmp = []
            const possibleMeetTime = {}
            let from = parseInt(data.from)
            let a = data.from

            while (a < to) {

                for (let i = 0; i < breaks.length; i++) {
                    if(parseInt(a) === parseInt(breaks[i].from) &&  (breaks[i].from >= a || a < breaks[i].to)) {
                        a = breaks[i].to
                    }
                }

                possibleMeetTime[parseInt(a)] = possibleMeetTime[parseInt(a)]
                    ? {...possibleMeetTime[parseInt(a)]}
                    : {}

                const strHour = moment(new Date(new Date(getDateTime(a))
                    .setMinutes(new Date(getDateTime(a === from ? data.from : a)).getMinutes() + interval)))

                const id = moment(new Date(`${date.toDateString()} ${moment(getDateTime(a)).format('HH:mm')}`)).format(formatter)

                possibleMeetTime[parseInt(a)][id] = {
                    intDate: a,
                    isPossible: isCurrentDate,
                    strDate: `${moment(getDateTime(a)).format('HH:mm')} - ${strHour.format('HH:mm')}`,
                    dateString: moment(new Date(`${date.toDateString()} ${moment(getDateTime(a)).format('HH:mm')}`)).format(formatter)
                }
                a = parseFloat(strHour.format('HH.mm'))
            }

            setMeetTimes(possibleMeetTime)

            if (isCurrentDate) {
                from = moment(new Date()).format('H')
            }

            for (let i = from; i < to; i++) {
                const id = moment(new Date(`${date.toDateString()} 0${i}:00`)).format(formatter)
                if (i < 10) {
                    tmp.push({hour: `0${i}:00`, interval: data.proc_interval, id})
                } else {
                    tmp.push({hour: `${i}:00`, interval: data.proc_interval, id})
                }
            }
            setHours(tmp)
            setError(null)
        } else {
            setError('Не рабочий день')
        }
    }, [job, currentDay, date, isCurrentDate])

    useEffect(() => {
        if (!mounted) {
            getOrders()
            setMounted(true)
        }

    }, [getOrders, mounted])

    return {
        error,
        hours,
        date,
        selectDate,
        renderMeetRow,
        onChange,
        requestData,
        requestLoading
    }
}