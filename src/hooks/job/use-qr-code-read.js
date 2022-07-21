import {useStore} from 'effector-react'
import {$accountModel} from '../../models/accountModel'
import {useCallback, useState} from 'react'
import specialism from '../../service/specialism'
import {useHistory, useParams} from 'react-router-dom'
import {showMessage} from '../../UIComponents/message-notification'
import {jobRequestDetailMount, jobRequestOfferMount} from '../../models/job-model'

export function useQRCodeRead({onClose, jobId}) {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {push} = useHistory()
    const [isReading, setIsReading] = useState(false)
    const {orderId} = useParams()

    const orgSpecOrderValidate = useCallback((data) => {
        if (currentProfile) {
            setIsReading(true)
            specialism.validateOrgSpecOrder({data, specialism_id: jobId})
                .then(res => {
                    if (res) {
                        if (res.data.status) {
                            push({
                                pathname: `/@${currentProfile.slug_name}/jobs/request/${res.data.order}`,
                                state: {jobId: jobId},
                            })
                            onClose()
                            if (orderId) {
                                jobRequestDetailMount({specialism_id: jobId, order_id: res.data.order})
                                const data = {
                                    specialism_id: jobId,
                                    order_id: res.data.order,
                                    params: {
                                        limit: 6,
                                        offset: 0,
                                    },
                                }
                                jobRequestOfferMount(data)
                            }
                            // setIsReading(false)
                        } else {
                            showMessage(res.data.error, 'danger', false)
                            onClose()
                            // setIsReading(false)
                        }

                    }
                })
                .catch(() => {
                    setIsReading(false)
                })
        }
    }, [currentProfile, push, jobId, onClose, orderId])

    const selfSpecOrderValidate = useCallback((data) => {
        if (currentProfile) {
            specialism.validateSelfSpecOrder({data})
                .then(res => {
                    if (res.data.status) {
                        push({
                            pathname: `/@${currentProfile.slug_name}/jobs/request/${res.data.order}`,
                            state: {jobId: 'self'},
                        })
                        onClose()
                    }
                })
        }
    }, [currentProfile, push, onClose])

    const handleValidate = useCallback((id, action) => {
        const data = {
            qr_code: id,
        }

        if (jobId) {
            orgSpecOrderValidate(data, action)
        } else {
            selfSpecOrderValidate(data)

        }
    }, [selfSpecOrderValidate, jobId, orgSpecOrderValidate])

    return {
        handleValidate,
        isReading,
    }
}
