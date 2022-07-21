import {useCallback, useEffect, useState} from 'react'
import org from '../../service/org'
import {useStore} from 'effector-react'
import {$accountModel} from '../../models/accountModel'
import {
    $organizationModel,
    getOrgPaymentMethodListEvent,
    updateOrgPaymentMethodEvent,
} from '../../models/organization-models'
import {showMessage} from '../../UIComponents/message-notification'

export function useOrgPaymentMethod() {
    const {$orgPaymentMethodListStore: {data}} = useStore($organizationModel)
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const getList = useCallback(() => {
        getOrgPaymentMethodListEvent({
            organization: currentProfile?.slug_name
        })
    }, [currentProfile?.slug_name])

    const createPaymentMethod = useCallback((payment_type) => {
        const params = {
            organization: currentProfile?.slug_name,
            data: {
                method: payment_type
            }
        }

        org.createOrgPaymentMethod(params)
            .then(res => {
                if(res) {
                    showMessage('payment_method_added_successfully', 'success')
                    getList()
                }
            })
    }, [getList, currentProfile?.slug_name])

    const handleActivate = useCallback((payment_type) => {
        const item = data.find(item => item.method === payment_type)
        if (item) {
            updateOrgPaymentMethodEvent({
                organization: currentProfile?.slug_name,
                id: item.id,
                data: {
                    status: !item.status
                }
            })
        } else {
            createPaymentMethod(payment_type)
        }
    }, [data, currentProfile?.slug_name, createPaymentMethod])

    useEffect(() => {
        getList()
    }, [getList])

    return {
        handleActivate,
        modalIsOpen,
        setModalIsOpen
    }
}
