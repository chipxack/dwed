import {useFormik} from 'formik'
import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {activatePhone, resendCode} from '../../api/account-api'
import * as Yup from 'yup'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import {useTranslation} from 'react-i18next'
import {showMessage} from '../../UIComponents/message-notification'
import {getCurrentProfile} from '../../models/accountModel'
import {tokenMount} from '../../models/app'

export const usePhoneVerify = () => {
    const [deadline, setDeadline] = useState(Date.now() + 1000 * 60)
    const [showResend, setShowResend] = useState(false)
    const {location, push} = useHistory()
    const [phone, setPhone] = useState(null)
    const {t} = useTranslation()

    const validationSchema = Yup.object().shape({
        activation_code: Yup.string()
            .required(t('required_field'))
            .test('regexTest', t('required_field'), (value) => {
                return value && value.match(/^(\d\s*){6}$/)
            }),
    })

    const formik = useFormik({
        initialValues: {
            activation_code: '',
        },
        validationSchema,
        onSubmit: ({activation_code}) => {
            activatePhone({activation_code: activation_code.replace(/\s/g, '')})
                .then((res) => {
                    let timeout = null
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
                    timeout = setTimeout(() => {
                        push('/')
                        showMessage('you_have_successfully_registered', 'success')
                    }, 100)

                    return () => {
                        clearTimeout(timeout)
                        timeout = null
                    }
                })
        },
    })

    useEffect(() => {
        if (location?.state?.phone) {
            setPhone(location.state.phone)
        }
    }, [location?.state?.phone])

    const onFinish = () => {
        setShowResend(true)
    }

    const resend = () => {
        if (location.state.phone) {
            resendCode({phone: `+${location.state.phone}`})
                .then((res) => {
                    if (res) {
                        setDeadline(Date.now() + 1000 * 60)
                        setShowResend(false)
                    }
                })
        }
    }

    return {
        formik,
        deadline,
        phone,
        showResend,
        onFinish,
        resend,
    }
}
