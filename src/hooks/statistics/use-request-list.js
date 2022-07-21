import {useListQuery, useTable} from '../common'
import {useParams} from 'react-router-dom'
import {useStatisticsBasic} from './use-statistics-basic'
import {useEffect} from 'react'
import {FETCHING_STATUS} from '../../constants'

export function useRequestList() {
    const {limit, page, onFilterChange} = useTable({_limit: 10})
    const {getQueryParams} = useListQuery({limit, page})
    const {organization} = useParams()
    const {getRequestList} = useStatisticsBasic({slug_name: organization})

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            const queryParams = getQueryParams(FETCHING_STATUS.INIT)
            getRequestList({...queryParams})
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [getQueryParams, getRequestList])

    return {limit, page, onFilterChange}
}