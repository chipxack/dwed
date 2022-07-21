import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useCallback, useEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import account from '../../service/account'
import {useTranslation} from 'react-i18next'
import {URL_KEYS, URL_VALUES} from '../../constants'
import {isValidPhoneNumber} from 'libphonenumber-js'

const fetchedErrors = {
    username: '',
    phone: '',
    password: ''
}

export const useCreateAccount = () => {
    const [usernameStatus, setUsernameStatus] = useState(-1)
    const [error, setError] = useState(fetchedErrors)
    const {push} = useHistory()
    const {t} = useTranslation()
    const {state} = useLocation()

    const [initialValues, setInitialValues] = useState({
        username: '',
        name: '',
        lastname: '',
        phone: '',
        password: '',
        confirmPassword: '',
        accept: false,
    })

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .test('usernameValidation', t(error['username']), () => {
                return error['username'].length === 0
            })
            .required(t('required_field')),
        phone: Yup.mixed()
            .test('phoneValidation', t('invalid_phone_number'), (data) => {
                if (data) {
                    const {value, countryCode} = data
                    return isValidPhoneNumber(value, countryCode)
                }
                return true
            })
            .test('phoneError', t(error['phone']), () => error['phone'].length === 0)
            .required(t('required_field')),
        name: Yup.string().required(t('required_field')),
        lastname: Yup.string().required(t('required_field')),
        password: Yup.string()
            .min(8, t('password_must_contain_at_least_eight_characters'))
            .test('phoneError', t(error['password']), () => error['password'].length === 0)
            .required(t('required_field')),
        confirmPassword: Yup.string()
            .min(8, t('password_must_contain_at_least_eight_characters'))
            .oneOf([Yup.ref('password'), null], t('passwords_do_not_match'))
            .required(t('required_field')),
        accept: Yup.boolean().test('boolError', t('required_field'), (status) => status)
    })

    const formik = useFormik({
        validationSchema,
        initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            const data = {
                username: values.username,
                phone: values.phone.value,
                password: values.password,
                name: values.name,
                lastname: values.lastname
            }
            account.createAccount(data)
                .then((res) => {
                    if(res) {
                        push({
                            pathname: '/sign-up',
                            search: `${URL_KEYS.STEP}=${URL_VALUES.PHONE_VERIFY}`,
                            state: {
                                ...values
                            }
                        })
                    }
                })
                .catch((e) => {
                    const errData = e.response.data.errors || []
                    const data = {}
                    const touched = {}
                    const errors = {}
                    for (let i = 0; i < errData.length; i++) {
                        touched[errData[i].field] = true
                        errors[errData[i].field] = errData[i].message
                        data[errData[i].field] = errData[i].message
                    }
                    formik.setTouched({...touched})
                    formik.setErrors({...errors})
                    setError({...fetchedErrors, ...data})
                })
        }
    })

    const disabledButton = useCallback(() => {
        return formik.isSubmitting
            || (formik.touched.name && !!formik.errors.name)
            || (formik.touched.lastname && !!formik.errors.lastname)
            || (formik.touched.username && !!formik.errors.username)
            || (formik.touched.phone && !!formik.errors.phone)
            || (formik.touched.password && !!formik.errors.password)
            || (formik.touched.confirmPassword && !!formik.errors.confirmPassword)
            || (formik.touched.accept && !!formik.errors.accept)
    }, [formik])

    const validateUsername = useCallback((value) => {
        formik.setFieldValue('username', value.toLowerCase())
        setError({
            ...error,
            username: ''
        })
        if (value.length > 2) {
            account.validateAccount({username: value.toLowerCase()})
                .then(res => {
                    const errors = formik.errors
                    const touched = formik.touched
                    if (res.data.status) {
                        setUsernameStatus(1)
                        delete errors['username']
                        delete touched['username']
                        formik.setTouched({...touched})
                        formik.setErrors({...errors})
                    } else {
                        setUsernameStatus(0)
                        formik.setTouched({...touched, username: true})
                        formik.setErrors({...errors, username: res.data.error.message})
                        setError({...fetchedErrors, username: res.data.error.message})
                    }

                    if (value.trim().length === 0) {
                        setUsernameStatus(-1)
                    }
                })
        }
    }, [formik, error])

    const handleChange = (field, value) => {
        setError({
            ...error,
            [field]: ''
        })
        formik.setFieldValue(field, value)
    }

    useEffect(() => {
        if (state) {
            setInitialValues(state)
        }
    }, [state, error])

    return {
        formik,
        validateUsername,
        usernameStatus,
        disabledButton,
        handleChange
    }
}
