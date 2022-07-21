import {$jobModel, addRequestFromSocket, selfJobRequestMount, specRequestsMount,} from '../../models/job-model'
import {useCallback, useEffect, useState} from 'react'
import {useStore} from 'effector-react'
import Cookies from 'js-cookie'
import useWebSocket from 'react-use-websocket'
import {URL_KEYS} from '../../constants'
import moment from 'moment'
import {useUrlParams} from '../common'
import {useHistory, useParams} from 'react-router-dom'

export const useJobRequestList = () => {
    const {$specRequests: {result}} = useStore($jobModel)
    const [limit] = useState(10)
    const [page, setPage] = useState(1)
    const [socketUrl, setSocketUrl] = useState(null)
    const [otherDate, setOtherDate] = useState(null)
    const [socketData, setSocketData] = useState(null)
    const [activeFilter, setActiveFilter] = useState(null)
    const [selectedDateData, setSelectedDateData] = useState(null)
    const {account} = useParams()
    const {urlData} = useUrlParams()
    const {push} = useHistory()
    const jobId = urlData[URL_KEYS.JOB_ID]
    const filterType = urlData[URL_KEYS.FILTER_TYPE]
    const pageFromUrl = urlData[URL_KEYS.PAGE]
    const _search = urlData[URL_KEYS.SEARCH]

    useWebSocket(socketUrl, {
        onMessage: (e) => {
            const data = JSON.parse(e.data)
            setSocketData(data)
            if (data.action === 'add') {
                addRequestFromSocket(data.object)
            }

            if (data.action === 'update') {

            }
        },
        onError: (e) => {
            console.log(e)
        }
    })

    const specJobMountRequest = useCallback((params = {get_today: 1}) => {
        const data = {
            params: {
                ...params
            }
        }

        if (jobId) {
            data.specialism_id = jobId
            specRequestsMount(data)
        } else {
            selfJobRequestMount(data)
        }
    }, [jobId])

    const handleDateRangeFilter = useCallback(({start, end}) => {
        setOtherDate({
            startDate: moment(start).format('DD.MM.YYYY'),
            endDate: new Date(start).getDate() !== new Date(end).getDate()
                && moment(end).format('DD.MM.YYYY'),
        })
        specJobMountRequest({meet_date__gt: start, meet_date__lt: end})
    }, [specJobMountRequest])

    const onPageChange = useCallback((page_number) => {
        const url = []

        if (filterType) {
            url.push(`${URL_KEYS.FILTER_TYPE}=${filterType}`)
        }

        if (jobId) {
            url.push(`${URL_KEYS.JOB_ID}=${jobId}`)
        }

        url.push(`${URL_KEYS.PAGE}=${page_number}`)

        push({
            pathname: `/@${account}/jobs`,
            search: url.join('&')
        })
    }, [push, jobId, account, filterType])

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            let status = 0
            if (filterType === 'waiting') {
                status = 0
            }

            if (filterType === 'all_approved') {
                status = '1,5'
            }

            if (filterType === 'all_canceled') {
                status = -1
            }

            if(filterType === 'qrcode_scanned') {
                status = 2
            }

            if (filterType) {
                setActiveFilter(filterType)
            } else {
                setActiveFilter('today')
            }

            let params = {
                limit,
                offset: page === 1 ? 0 : (page - 1) * limit
            }

            if (!filterType || (filterType && filterType === 'today')) {
                params.get_today = 1
            } else {
                params.status = status
            }

            if(_search) {
                params.search = _search
            }

            setOtherDate(null)
            specJobMountRequest(params)
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [filterType, specJobMountRequest, limit, page, _search])

    useEffect(() => {
        let timeout = null
        timeout = setTimeout(() => {
            if (jobId) {
                const jobSocketUrl = `wss://py.dwed.biz/ws/v1.0/specialist/${jobId}/?token=${Cookies.get('token')}`
                setSocketUrl(jobSocketUrl)
            } else {
                const selfSocketUrl = `wss://py.dwed.biz/ws/v1.0/selfempl/?token=${Cookies.get('token')}`
                setSocketUrl(selfSocketUrl)
            }
        }, 200)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [jobId])

    useEffect(() => {
        if (otherDate && Object.values(result).length > 0) {
            setSelectedDateData(result.count)
        } else {
            setSelectedDateData(null)
        }
    }, [otherDate, result])

    useEffect(() => {
        if (pageFromUrl) {
            setPage(Number(pageFromUrl))
        } else {
            setPage(1)
        }
    }, [pageFromUrl])


    return {
        socketData,
        activeFilter,
        handleDateRangeFilter,
        otherDate,
        selectedDateData,
        page,
        limit,
        onPageChange
    }
}
