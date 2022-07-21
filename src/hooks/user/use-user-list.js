import {useCallback, useEffect, useState} from 'react'
import {FETCHING_STATUS} from '../../constants'
import {getUserListEvent, resetUser} from '../../models/user-models'

export function useUserList({check_coupon}) {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const getList = useCallback((params) => {
        getUserListEvent(params)
    }, [])

    useEffect(() => {
        const data = {
            status: FETCHING_STATUS.INIT,
            params: {
                limit: 10,
                offset: page === 1 ? 0 : (page - 1) * 20,
                check_coupon
            }
        }

        if (search.length > 2) {
            data.params.search = search
        } else {
            delete data.params.search
        }
        getList(data)

        return () => {
            resetUser()
        }
    }, [page, getList, search, check_coupon])

    return {
        page,
        setPage,
        search,
        setSearch
    }
}