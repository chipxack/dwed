import {useHistory} from 'react-router-dom'
import {useUrlParams} from './use-url-params'
import {useCallback, useEffect, useState} from 'react'
import {URL_KEYS} from '../../constants'

export function useTable({_limit}) {
    const {push, location: {pathname}} = useHistory()
    const {urlData} = useUrlParams()
    const order_by = urlData[URL_KEYS.ORDER_BY]
    const page_number = urlData[URL_KEYS.PAGE]
    const parent_id = urlData[URL_KEYS.PARENT_ID]
    const [limit] = useState(_limit)
    const [page, setPage] = useState(1)

    const tableSortOrder = useCallback((type) => {
        let tmp = null
        if (order_by) {
            let sort = order_by[0] === '-' ? order_by.slice(1) : order_by
            if (sort === type) {
                if (order_by[0] === '-') {
                    tmp = 'descend'
                } else {
                    tmp = 'ascend'
                }
            }
        }
        return tmp
    }, [order_by])

    const onFilterChange = useCallback((pagination, filters, sorter) => {
        const url = []

        if (parent_id) {
            url.push(`${URL_KEYS.PARENT_ID}=${parent_id}`)
        }

        if (sorter.order) {
            url.push(`${URL_KEYS.ORDER_BY}=${sorter.order === 'descend' ? '-' : ''}${sorter.field}`)
        }

        if (pagination.current !== 1) {
            url.push(`${URL_KEYS.PAGE}=${pagination.current}`)
        }

        push({
            pathname,
            search: url.join('&'),
        })
    }, [push, pathname, parent_id])

    useEffect(() => {
        if (page_number) {
            setPage(Number(page_number))
        } else {
            setPage(1)
        }
    }, [page_number])


    return {
        limit,
        page,
        onFilterChange,
        tableSortOrder
    }
}