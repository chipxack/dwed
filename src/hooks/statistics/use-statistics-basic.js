import {useCallback} from 'react'
import {
    clientListMount,
    employeeListMount,
    financeListMount,
    offerStatisticListMount, requestListMount
} from '../../models/statistic-model'

export function useStatisticsBasic({slug_name}) {
    const getClientList = useCallback((params) => {
        if (slug_name) {
            const data = {
                slug_name,
                ...params
            }
            clientListMount(data)
        }

    }, [slug_name])

    const getOfferStatList = useCallback((params) => {
        if (slug_name) {
            const data = {
                slug_name,
                ...params
            }
            offerStatisticListMount(data)
        }
    }, [slug_name])

    const getEmployeeList = useCallback((params) => {
        if (slug_name) {
            const data = {
                slug_name,
                ...params
            }
            employeeListMount(data)
        }
    }, [slug_name])

    const getFinanceList = useCallback((params) => {
        if(slug_name) {
            const data = {
                slug_name,
                ...params
            }
            financeListMount(data)
        }
    }, [slug_name])

    const getRequestList = useCallback((params) => {
        if(slug_name) {
            const data = {
                slug_name,
                ...params
            }
            requestListMount(data)
        }
    }, [slug_name])

    return {
        getClientList,
        getOfferStatList,
        getEmployeeList,
        getFinanceList,
        getRequestList
    }
}