import {useFormik} from 'formik'
import {useCallback, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useTranslation} from 'react-i18next'
import account from '../../service/account'
import {getCurrentProfile} from '../../models/accountModel'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import {tokenMount} from '../../models/app'
import {showMessage} from '../../UIComponents/message-notification'
import {isValidPhoneNumber} from 'libphonenumber-js'

const defaultState = {
    phone: null,
    activation_code: ''
}

export function useFastAuth(onClose) {
    const {t} = useTranslation()
    const [initialValues] = useState(defaultState)
    const [nextStep, setNextStep] = useState(false)
    const [deadline, setDeadline] = useState(Date.now() + 1000 * 60)
    const [showResend, setShowResend] = useState(false)

    const validationSchema = Yup.object().shape({
        phone: Yup.mixed()
            .test('phoneValidation', t('invalid_phone_number'), (data) => {
                if (data) {
                    const {value, countryCode} = data
                    return isValidPhoneNumber(value, countryCode)
                }
                return true
            })
            .required(t('required_field')),
    })

    const fastAuth = useCallback((data, actions) => {
        const {setSubmitting} = actions

        account.fastAuth(data)
            .then((res) => {
                if (res) {
                    if (res.data.phone) {
                        setNextStep(true)
                    }

                    if (res.data.access) {
                        let users = {}
                        getCurrentProfile()
                        if (Cookies.get('users')) {
                            const oldUsers = JSON.parse(Cookies.get('users'))
                            users = {...oldUsers}
                        }
                        users[jwtDecode(res.data.access).username] = res.data
                        Cookies.set('users', JSON.stringify(users))
                        Cookies.set('token', res.data.access)
                        Cookies.set('refresh-token', res.data.refresh)
                        tokenMount(res.data.access)
                        showMessage('you_have_successfully_logged_in', 'success')
                        onClose()
                        setNextStep(false)
                    }
                }
            })
            .finally(() => setSubmitting(false))
    }, [onClose])


    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit({phone, activation_code}, actions) {
            const code = activation_code.replace(/\s/g, '')

            const data = {
                phone: phone.value
            }

            if (code.length > 0) {
                data.activation_code = code
            }

            fastAuth(data, actions)
        }
    })

    const onFinish = () => {
        setShowResend(true)
    }

    const onResend = useCallback(() => {
        if (nextStep && formik.values.phone.value > 0) {
            const data = {
                phone: formik.values.phone.value
            }
            account.fastAuth(data)
                .then((res) => {
                    if (res) {
                        setDeadline(Date.now() + 1000 * 60)
                    }
                })
        }
    }, [formik, nextStep])

    const handleRefresh = () => {
        setNextStep(false)
        formik.resetForm()
        onClose()
    }

    useEffect(() => {
        if(nextStep) {
            setDeadline(Date.now() + 1000 * 60)
        }else {
            setDeadline(0)
        }
    }, [nextStep])

    return {formik, nextStep, onFinish, onResend, deadline, showResend, handleRefresh, setNextStep}
}
