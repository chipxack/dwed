import {useFormik} from 'formik'
import {useCallback, useEffect, useState} from 'react'
import {useStore} from 'effector-react'
import {$accountModel, accountInfoMount, accountPDataMount} from '../../models/accountModel'
import * as Yup from 'yup'
import {useTranslation} from 'react-i18next'
import account from '../../service/account'

const defaultValues = {
    businessAva: null,
    passport_series: '',
    passport_number: '',
    passport_scan: null
}

export function useAccountJuridicVerifying() {
    const {$accountPData: {data: pData}, $accountAvatars: {data: avatars}} = useStore($accountModel)
    const [initialValues, setInitialValues] = useState(defaultValues)
    const [mounted, setMounted] = useState(false)
    const {t} = useTranslation()

    const validationSchema = Yup.object().shape({
        businessAva: Yup.mixed().required(t('required_field')),
        passport_series: Yup.string().test('series_valid', t('required_field'), (value) => {
            const newValue = value && value.replace(/_/g, '')
            return newValue && newValue.trim().length > 0
        }),
        passport_number: Yup.string().required(t('required_field')),
        passport_scan: Yup.mixed().required(t('required_field'))
    })


    const updatePData = useCallback((data, actions) => {
        account.updateAccountPData(data)
            .then((res) => {
                if (res) {
                    accountInfoMount()
                }
            })
            .catch(() => {
                actions()
            })
    }, [])

    const createAvatar = useCallback(({avatarData, accountPData}, actions) => {
        account.createAccountAvatar(avatarData)
            .then((res) => {
                if (res) {
                    if (accountPData) {
                        updatePData(accountPData, actions)
                    } else {
                        actions()
                    }
                }
            })
            .catch(() => {
                actions()
            })
    }, [updatePData])

    const updateAvatar = useCallback((id, {accountPData, avatarData}, actions) => {
        account.updateAccountAvatar({id, avatarData})
            .then((res) => {
                if (res) {
                    if (accountPData) {
                        updatePData(accountPData, actions)
                    } else {
                        actions()
                    }
                } else {
                    actions()
                }
            })
            .catch(() => {
                actions()
            })
    }, [updatePData])

    const formik = useFormik({
        validationSchema,
        initialValues,
        enableReinitialize: true,
        onSubmit(values, {setSubmitting}) {
            setSubmitting(true)
            const actions = (id = null) => {
                setSubmitting(false)
            }
            const avatarData = new FormData()
            avatarData.append('main', '0')
            avatarData.append('business_ava', '1')
            avatarData.append('image', values.businessAva.file)

            const accountPData = new FormData()
            accountPData.append('passport_series', values.passport_series)
            accountPData.append('passport_number', values.passport_number)
            accountPData.append('passport_scan', values.passport_scan.file)

            if (values.businessAva.file && values.passport_scan.file) {
                if (values.businessAva.id) {
                    updateAvatar(values.businessAva.id, {accountPData, avatarData}, actions)
                } else {
                    createAvatar({avatarData, accountPData}, actions)
                }
            } else if (values.businessAva.file) {
                if (values.businessAva.id) {
                    updateAvatar(values.businessAva.id, {avatarData}, actions)
                } else {
                    createAvatar({avatarData}, actions)
                }
            } else if (values.passport_scan.file) {
                updatePData(accountPData, actions)
            } else {
                actions()
            }
        }
    })

    const handleChange = (field, value) => {
        if (field === 'passport_series') {
            formik.setFieldValue(field, value.toUpperCase())
        } else if (field === 'passport_number') {
            formik.setFieldValue(field, value.replace(/[^0-9\\.]+/g, ''))
        } else {
            formik.setFieldValue(field, value)
        }
    }

    const disabled = useCallback(() => {
        return (
            formik.isSubmitting
            || (formik.touched.businessAva && !!formik.errors.businessAva)
            || (formik.touched.passport_scan && !!formik.errors.passport_scan)
            || (formik.touched.passport_series && !!formik.errors.passport_series)
            || (formik.touched.passport_number && !!formik.errors.passport_number)
        )
    }, [formik])

    useEffect(() => {
        if (avatars.length > 0 && Object.values(pData).length > 0 && !mounted) {
            const businessAva = avatars.find(item => item.business_ava)
            setInitialValues({
                businessAva: businessAva ? {stringUrl: businessAva.image, file: null, id: businessAva.id} : null,
                passport_series: pData.passport_series || '',
                passport_number: pData.passport_number ? String(pData.passport_number) : '',
                passport_scan: pData.passport_scan ? {stringUrl: pData.passport_scan, file: null} : null
            })
            setMounted(true)
        }
    }, [avatars, mounted, pData])

    useEffect(() => {
        accountPDataMount()
    }, [])

    return {
        formik,
        handleChange,
        disabled
    }
}