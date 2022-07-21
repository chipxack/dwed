import {useCallback, useEffect} from 'react'
import {FETCHING_STATUS} from '../../constants'
import {getCommonApiParams} from '../../utils/app-utils'
import {getCreditCardsListEvent} from '../../models/payment-model/events'

export function useUserCreditCardList() {
    const getList = useCallback((params) => {
        getCreditCardsListEvent(params)
    }, [])

    useEffect(() => {
        const data = {
            status: FETCHING_STATUS.INIT,
            params: getCommonApiParams().params
        }

        getList(data)
    }, [getList])
}
