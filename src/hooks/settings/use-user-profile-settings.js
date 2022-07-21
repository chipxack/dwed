import {useFormik} from 'formik'
import {useCallback, useEffect, useState} from 'react'
import {useStore} from 'effector-react'
import {$accountModel, createAccountAvatar, updateAccountInfo} from '../../models/accountModel'
import account from '../../service/account'
import * as Yup from 'yup'
import {useTranslation} from 'react-i18next'
import {showMessage} from '../../UIComponents/message-notification'
import moment from 'moment'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import {tokenMount} from '../../models/app'
import {fastAuthVisibleStatus} from '../../models/app/events'

const defaultValue = {
    avatar: '',
    name: '',
    lastname: '',
    gender: '',
    birthday: null,
    currency: '',
    lang: '',
    category: null,
    region: null,
    username: '',
}

export function useUserProfileSettings() {
    const {push} = useHistory()
    const {t} = useTranslation()
    const [error, setError] = useState({username: ''})
    const [usernameStatus, setUsernameStatus] = useState(-1)
    const [initialValues, setInitialValues] = useState(defaultValue)
    const {$profiles: {currentProfile}, $accountInfo: {data}} = useStore($accountModel)
    const [mounted, setMounted] = useState(false)
    const [loading, setLoading] = useState(false)

    const validationSchema = Yup.object().shape({
        username: Yup.string().test('usernameValidation', t(error['username']), () => {
            return error.username === '' && error.username.length === 0
        })
            .required(t('required_field')),
        currency: Yup.mixed().required(t('required_field')),
        region: Yup.mixed().required(t('required_field')),
        category: Yup.mixed().required(t('required_field')),
        lang: Yup.mixed().required(t('required_field')),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit(values, {setSubmitting}) {
            let redirect = false
            const formData = {
                name: values.name,
                lastname: values.lastname,
                currency_id: values.currency,
                gender: values.gender,
                birthday: values.birthday ? moment(values.birthday).format('YYYY-MM-DD') : null,
                lang: values.lang,
                region_id: values.region ? values.region.id : null,
                main_cat_id: values.category ? values.category.id : null,
            }

            if (values.name.length === 0) {
                delete formData['name']
            }

            if (currentProfile && currentProfile.status === 5) {
                delete formData['name']
                delete formData['lastname']
                delete formData['surname']
                delete formData['birthday']
                delete formData['gender']
            }

            if (currentProfile?.slug_name && currentProfile?.slug_name !== values.username) {
                formData.username = values.username
                redirect = true
            } else {
                redirect = false
                delete formData.username
            }

            const actions = (err = false, redirect) => {
                setSubmitting(false)
                if (!err) {
                    showMessage('data_changed_successfully', 'success')
                }
                if (redirect) {
                    Cookies.remove('token')
                    Cookies.remove('refresh-token')
                    tokenMount(null)
                    push('/')
                    fastAuthVisibleStatus(true)
                }
            }
            updateAccountInfo({data: formData, redirect, actions})
        },
    })

    useEffect(() => {
        if (!mounted && currentProfile && currentProfile.currency && data && Object.values(data).length > 0) {
            setInitialValues({
                ...defaultValue,
                username: data.username,
                avatar: data.avatar,
                name: data.name || '',
                gender: data.gender || '',
                lastname: data.lastname || '',
                birthday: data.birthday ? moment(data.birthday) : null,
                currency: data.currency.id || '',
                region: data.region,
                category: data.main_cat,
                lang: data.user_lang,
            })
            setMounted(true)
        }
    }, [currentProfile, data, mounted])

    const onAvatarChange = useCallback(({file, stringUrl}) => {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('main', '1')
        createAccountAvatar(formData)
        formik.setFieldValue('avatar', stringUrl)
    }, [formik])

    const validateUsername = useCallback((value) => {
        formik.setFieldValue('username', value)
        setUsernameStatus(-1)
        if (value.length > 2) {
            setLoading(true)
            account.validateAccount({username: value})
                .then((res) => {
                    setLoading(false)
                    const errors = formik.errors
                    const touched = formik.touched
                    if (res.data.status) {
                        setUsernameStatus(1)
                        delete errors['username']
                        delete touched['username']
                        formik.setTouched({...touched})
                        formik.setErrors({...errors})
                        setError({username: ''})
                    } else {
                        setUsernameStatus(0)
                        formik.setTouched({...touched, username: true})
                        formik.setErrors({...errors, username: res.data.error.message})
                        setError({username: res.data.error.message})
                    }
                })
        }
    }, [formik])

    return {
        formik,
        onAvatarChange,
        usernameStatus,
        validateUsername,
        loading,
    }
}
