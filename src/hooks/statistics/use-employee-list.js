import {useListQuery, useTable} from '../common'
import {useParams} from 'react-router-dom'
import {useStatisticsBasic} from './use-statistics-basic'
import {useEffect} from 'react'
import {FETCHING_STATUS} from '../../constants'

export function useEmployeeList() {
    const {limit, page, onFilterChange} = useTable({_limit: 10})
    const {getQueryParams} = useListQuery({limit, page})
    const {organization} = useParams()
    const {getEmployeeList} = useStatisticsBasic({slug_name: organization})

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            const queryParams = getQueryParams(FETCHING_STATUS.INIT)
            getEmployeeList(queryParams)
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [getQueryParams, getEmployeeList])

    return {limit, page, onFilterChange}
}