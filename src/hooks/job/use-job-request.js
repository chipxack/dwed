import {useLocation, useParams} from 'react-router-dom'
import {useCallback, useEffect, useState} from 'react'
import {
    $jobModel,
    jobRequestDetailMount,
    jobRequestOfferMount,
    orgSpecRecordsMount,
    selfJobMount,
    selfRequestDetailMount,
    selfRequestOfferMount,
    specJobMount,
    specOrderForceLoading,
    updateOrgSpecRequestDetail,
    updateSelfRequestDetail,
} from '../../models/job-model'
import moment from 'moment'
import {useTranslation} from 'react-i18next'
import {SPECIALIST_TYPE} from '../../constants'
import {useStore} from 'effector-react'

const initialParams = {
    limit: 6,
    offset: 0
}

export const useJobRequest = () => {
    const {t} = useTranslation()
    const {orderId} = useParams()
    const {state: {jobId}} = useLocation()
    const [page, setPage] = useState(1)
    const selfJob = jobId && jobId === 'self_job'
    const [specType, setSpecType] = useState(null)
    const job_id = jobId && jobId !== 'self_job' ? jobId : false
    const {$jobRequestDetail: {data}} = useStore($jobModel)
    const [mounted, setMounted] = useState(false)

    const getRequestOffer = useCallback((params) => {
        if (job_id && orderId) {
            const data = {
                specialism_id: job_id,
                order_id: orderId,
                ...params
            }
            jobRequestOfferMount(data)
        }

        if (selfJob && orderId) {
            const data = {
                order_id: orderId,
                ...params
            }
            selfRequestOfferMount(data)
        }
    }, [job_id, orderId, selfJob])

    const getRequestDetail = useCallback(() => {
        if (job_id && orderId) {
            jobRequestDetailMount({specialism_id: job_id, order_id: orderId})
        }

        if (selfJob && orderId) {
            selfRequestDetailMount(orderId)
        }
    }, [job_id, orderId, selfJob])

    const updateSelfRequest = useCallback((data) => {
        const params = {
            orderId,
            data
        }
        updateSelfRequestDetail(params)
    }, [orderId])

    const updateSpecRequest = useCallback((data, action) => {
        const params = {
            specialism_id: job_id,
            order_id: orderId,
            data,
            action
        }
        updateOrgSpecRequestDetail(params)
    }, [job_id, orderId])

    const getRecords = useCallback((params) => {
        if (job_id && orderId) {
            const data = {
                specialism_id: job_id,
                order_id: orderId,
                ...params
            }
            orgSpecRecordsMount(data)
        }
    }, [job_id, orderId])


    const specJobMountInfo = useCallback(() => {
        if (job_id) {
            specJobMount(job_id)
        }
        if (selfJob) {
            selfJobMount()
        }
    }, [job_id, selfJob])

    const updateRequestDetail = useCallback((data, action) => {
        if (job_id) {
            updateSpecRequest(data, action)
        }

        if (selfJob) {
            updateSelfRequest(data, action)
        }
    }, [updateSpecRequest, selfJob, job_id, updateSelfRequest])

    const onPageChange = useCallback((page) => {
        setPage(page)
        const params = {
            ...initialParams,
            offset: page === 1 ? 0 : (page - 1) * 6
        }
        getRequestOffer({params})
    }, [getRequestOffer])

    useEffect(() => {
        specJobMountInfo()
    }, [specJobMountInfo])

    useEffect(() => {
        getRequestDetail()
    }, [getRequestDetail])

    useEffect(() => {
        let timeout = null
        if (!mounted && data.status !== undefined) {
            if (data.status !== 5) {
                specOrderForceLoading()
            } else {
                specOrderForceLoading({isEmpty: true})
            }
            timeout = setTimeout(() => {

                if (data.status !== 5) {
                    getRequestOffer({params: initialParams})
                }
                setMounted(true)
            }, 300)
        }

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [getRequestOffer, data.status, mounted])

    const getAge = (birthday) => {
        if(birthday) {
            const birthYear = Number(moment(birthday).format('YYYY'))
            const currentYear = Number(moment(new Date()).format('YYYY'))
            return currentYear - birthYear
        }

        return t('no_data')
    }

    const getGender = (gender) => {
        return gender ? gender === 'm' ? t('male') : t('female') : t('no_data')
    }

    useEffect(() => {
        if (job_id) {
            setSpecType(SPECIALIST_TYPE.ORG_SPECIALIST)
        } else {
            setSpecType(SPECIALIST_TYPE.SELF_SPECIALIST)
        }
    }, [job_id])

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            getRecords({params: initialParams})
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [getRecords])


    return {
        page,
        getAge,
        specType,
        getGender,
        onPageChange,
        updateRequestDetail,
    }
}