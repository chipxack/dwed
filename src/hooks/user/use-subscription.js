import {useCallback, useEffect, useState} from 'react'
import {$userModel, userSubsMeMount, userSubsMyMount} from '../../models/user-models'
import {useStore} from 'effector-react'

const initialParams = {
    limit: 20,
    offset: 0
}

export function useSubscription({username, type}) {
    const {
        $userSubsMe: {forceLoading: meForceLoading, result: meResult},
        $userSubsMy: {forceLoading: myForceLoading, result: myResult}
    } = useStore($userModel)
    const [searchText, setSearchText] = useState('')

    const getList = useCallback((params) => {
        const data = {
            username,
            ...params
        }

        if (type === 'me') {
            userSubsMeMount(data)
        }

        if (type === 'my') {
            userSubsMyMount(data)
        }
    }, [username, type])

    const loadMore = useCallback(() => {
        let offset = 0
        if (type === 'me' && meResult[username]) {
            offset = meResult[username].nextOffset
        }

        if (type === 'my' && myResult[username]) {
            offset = myResult[username].nextOffset
        }

        const data = {
            params: {
                ...initialParams,
                offset
            }
        }

        getList(data)

    }, [type, meResult, myResult, username, getList])

    const onSearch = useCallback((value) => {
        const data = {
            clear: true,
            params: {
                ...initialParams,
            }
        }
        if (value.length > 2) {
            data['params']['search'] = value
            getList(data)
        }

        if (value.length === 0) {
            getList(data)
        }

        setSearchText(value)
    }, [getList])

    useEffect(() => {
        let allow = true
        let timeout = null

        const data = {
            clear: true,
            params: initialParams
        }

        if (type === 'me' && meForceLoading[username]) {
            allow = false
        }

        if (type === 'my' && myForceLoading[username]) {
            allow = false
        }

        timeout = setTimeout(() => {
            if (allow) {
                getList(data)
            }
        }, 300)

        return () => {
            clearTimeout(timeout)
            timeout = null
            allow = false
        }
    }, [username, type, getList, meForceLoading, myForceLoading])

    return {loadMore, onSearch, searchText}
}