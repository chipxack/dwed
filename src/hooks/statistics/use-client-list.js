import {useListQuery, useTable} from '../common'
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {useStatisticsBasic} from './use-statistics-basic'
import {FETCHING_STATUS} from '../../constants'

export function useClientList() {
    const {limit, page, onFilterChange} = useTable({_limit: 10})
    const {getQueryParams} = useListQuery({limit, page})
    const {organization} = useParams()
    const {getClientList} = useStatisticsBasic({slug_name: organization})

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            const queryParams = getQueryParams(FETCHING_STATUS.INIT)
            getClientList(queryParams)
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [getQueryParams, getClientList])

    return {limit, page, onFilterChange}
}