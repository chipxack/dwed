import {WEEKDAYS} from '../constants/formatter'
import moment from 'moment'

export const getWeekDay = date => WEEKDAYS[moment(date).weekday()]

export const getMeetTime = (date, operating_mode) => {
    const weekday = getWeekDay(date)
    let time = moment(date).format('HH:mm')
    if (operating_mode[weekday]) {
        const procInterval = operating_mode[weekday].proc_interval
        time = `${moment(date).format('HH:mm')} - ${moment(date).add('minutes', procInterval).format('HH:mm')}`
    }

    return time
}

export const getDiffDate = (date, type = 'minutes') => {
    const now = moment(new Date())
    const duration = moment.duration(now.diff(date))

    if (type === 'days') {
        return Math.round(duration.asDays())
    }

    return Math.round(duration.asMinutes())
}

export const strHourToInt = (strHour) => parseInt(strHour.split(':')[0])

export const getDateTime = (number) => {
    const now = new Date().toDateString()
    const time = String(number.toFixed(2)).split('.').join(':')
    return new Date(`${now} ${time}`)
}
