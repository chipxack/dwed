import {useFormik} from 'formik'
import {useCallback, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useTranslation} from 'react-i18next'
import payment from '../../service/payment'
import {
    getCreditCardEvent,
    getCreditCardsListEvent,
    removeCreditCardEvent,
    resetCard,
    updateCreditCardEvent,
} from '../../models/payment-model/events'
import {useStore} from 'effector-react'
import {$paymentModel} from '../../models/payment-model'
import {showMessage} from '../../UIComponents/message-notification'
import {FETCHING_STATUS} from '../../constants'
import {getCommonApiParams} from '../../utils/app-utils'

const defaultValues = {
    card_number: '',
    name: '',
    expire: null,
}

export function useUserCardForm({cardId, onClose, isVerifying}) {
    const {t} = useTranslation()
    const [deadline, setDeadline] = useState(0)
    const [showResend, setShowResend] = useState(false)
    const [initialValues, setInitialValues] = useState(defaultValues)
    const [mainValSchema, setMainValSchema] = useState(undefined)
    const [id, setId] = useState(null)
    const {$creditCard: {data}} = useStore($paymentModel)

    const cardFormik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: mainValSchema,
        onSubmit(values, {setSubmitting}) {
            if (cardId) {
                const action = (err = false) => {
                    if (!err) {
                        showMessage('credit_card_edited_successfully', 'success')
                        if (onClose) {
                            onClose()
                        }
                    }
                    setSubmitting(false)
                }

                updateCreditCardEvent({
                    id: cardId,
                    data: {name: values.name},
                    action,
                })
            } else {
                const data = {
                    card_number: values.card_number.replace(/\s/g, ''),
                    name: values.name,
                    expire: values.expire.format('MM/YY'),
                }
                payment.createCreditCard(data)
                    .then((res) => {
                        if (res) {
                            setId(res.data.id)
                            showMessage('credit_card_added_successfully', 'success')
                            const params = {
                                status: FETCHING_STATUS.INIT,
                                params: getCommonApiParams().params,
                            }
                            getCreditCardsListEvent(params)
                            setDeadline(Date.now() + 1000 * 60)
                        }
                    })
                    .finally(() => {
                        setSubmitting(false)
                    })
            }
        },
    })

    const cardVerifyFormik = useFormik({
        initialValues: {
            code: '',
        },
        validationSchema: Yup.object().shape({
            code: Yup.string()
                .required(t('required_field'))
                .test('regexTest', t('required_field'), (value) => {
                    return value && value.match(/^(\d\s*){6}$/)
                }),
        }),
        enableReinitialize: true,
        onSubmit(values, {setSubmitting}) {
            if (id) {
                payment.cardVerify({id, data: {code: values.code.replace(/\s/g, '')}})
                    .then((res) => {
                        if (res) {
                            setId(null)
                            cardFormik.resetForm()
                            const params = {
                                status: FETCHING_STATUS.INIT,
                                params: getCommonApiParams().params,
                            }
                            setDeadline(0)
                            onClose()
                            setShowResend(false)
                            getCreditCardsListEvent(params)
                        }
                    })
                    .finally(() => {
                        setSubmitting(false)
                    })
            }
        },
    })

    const removeCard = useCallback(() => {
        if (cardId) {
            const action = (err = false) => {
                if (err) {

                } else {
                    if (onClose) {
                        onClose()
                    }
                    showMessage('credit_card_remove_successfully', 'success')
                }
            }
            removeCreditCardEvent({id: cardId, action})
        }
    }, [cardId, onClose])

    useEffect(() => {
        if (cardId) {
            setMainValSchema(
                Yup.object().shape({
                    name: Yup.string().required(t('required_field')),
                }),
            )
        } else {
            setMainValSchema(
                Yup.object().shape({
                    card_number: Yup.string()
                        .required(t('required_field'))
                        .test('regexTest', t('required_field'), (value) => {
                            return value && value.match(/^(\d\s*){16}$/)
                        }),
                    expire: Yup.mixed()
                        .required(t('required_field'))
                        .test('regexTest', t('required_field'), (value) => {
                            return value && value._i
                                .replace(/\//g, '')
                                .match(/^(\d\s*){4}$/)
                        }),
                    name: Yup.string().required(t('required_field')),
                }),
            )
        }
    }, [cardId, t])

    const resendVerify = useCallback((id) => {
        payment.resendCardVerify(id)
            .then(res => {
                if (res) {
                    setDeadline(Date.now() + 1000 * 60)
                }
            })
    }, [])

    useEffect(() => {
        if (cardId) {
            getCreditCardEvent(cardId)
        }

        return () => {
            resetCard()
        }
    }, [cardId])

    const onFinish = useCallback(() => {
        setShowResend(true)
        setDeadline(0)
    }, [])

    useEffect(() => {
        if (cardId && Object.values(data).length > 0) {
            setInitialValues({
                name: data?.name,
                card_number: data?.card_number || '',
                expire: data?.expire || '',
            })
        }
    }, [cardId, data])

    useEffect(() => {
        if (isVerifying && cardId) {
            setId(cardId)
            resendVerify(cardId)
        }
    }, [isVerifying, cardId, resendVerify])

    useEffect(() => {
        if(!id) {
         setDeadline(0)
        }
    }, [id])

    return {cardFormik, id, cardVerifyFormik, removeCard, deadline, resendVerify, showResend, onFinish}
}
