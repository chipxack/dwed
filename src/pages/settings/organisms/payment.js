import React, {useMemo} from 'react'
import {CreditCardList} from '../../../components/credit-card'
import {useStore} from 'effector-react'
import {$accountModel} from '../../../models/accountModel'
import {PROFILE_TYPE} from '../../../constants'
import {OrgPaymentList} from '../maleculas'

export const PaymentSettings = () => {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const isUser = useMemo(() => {
        return currentProfile?.type === PROFILE_TYPE.USER
    }, [currentProfile?.type])

    const isOrg = useMemo(() => {
        return currentProfile?.type === PROFILE_TYPE.ORGANIZATION
    }, [currentProfile?.type])

    return (
        <>
            {
                isUser && <CreditCardList />
            }
            {
                isOrg && <OrgPaymentList />
            }

        </>
    )
}
