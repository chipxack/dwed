import {useCallback} from 'react'

export function useListQuery({limit, page}) {

    const getQueryParams = useCallback((status = undefined) => {
        const data = {
            params: {
                limit,
                offset: page === 1 ? 0 : (page - 1) * limit
            }
        }

        if (status) {
            data['status'] = status
        }

        return data
    }, [limit, page])

    return {getQueryParams}
}