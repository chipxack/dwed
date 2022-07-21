import {useStore} from "effector-react";
import {$accountModel, createAccountAvatar, updateAccountInfo, updateOrgInfo} from "../../models/accountModel";
import {useCallback, useEffect, useState} from "react";
import {PROFILE_TYPE} from "../../constants";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {useTranslation} from "react-i18next";
import {currencyListMount} from '../../models/app';
import {showMessage} from "../../UIComponents/message-notification";
import {resetCharacter} from "../../models/categories-models";

export function useProfileSettings() {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const [initialValues, setInitialValues] = useState({
        category: null,
        region: null,
        lang: '',
        currency: ''
    })
    const [schema, setSchema] = useState({})
    const [mounted, setMounted] = useState(false)
    const {t} = useTranslation()

    const validationSchema = Yup.object().shape({
        ...schema
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit(values, {setSubmitting}) {
            let data = {}
            setSubmitting(true)

            const actions = (error = false) => {
                setSubmitting(false)
                if (!error) {
                    showMessage('profile_edited', 'success')
                }
            }

            if (currentProfile.type === PROFILE_TYPE.USER) {
                if(currentProfile.currency.id !== values.currency) {
                    resetCharacter()
                }
                data = {
                    main_cat_id: values.category.id,
                    region_id: values.region.id,
                    lang: values.lang,
                    currency_id: values.currency
                }
                updateAccountInfo({data, actions})
            }

            if (currentProfile.type === PROFILE_TYPE.ORGANIZATION) {
                const data = new FormData()
                data.append('category_id', values.category.id)
                data.append('region_id', values.region_id)
                updateOrgInfo({data, organization: currentProfile.slug_name, actions})
            }
        }
    })

    useEffect(() => {
        if (currentProfile && !mounted) {
            const profileValidationSchema = {
                category: Yup.mixed().required(t('required_field')),
                region: Yup.mixed().required(t('required_field')),
                lang: Yup.string().required(t('required_field')),
                currency: Yup.string().required(t('required_field'))
            }

            if (currentProfile.type === PROFILE_TYPE.USER) {
                setInitialValues({
                    category: currentProfile.category || null,
                    region: currentProfile.region || null,
                    lang: currentProfile.lang || '',
                    currency: currentProfile.currency ? currentProfile.currency.id: ''
                })
                setSchema(profileValidationSchema)
                setMounted(true)
            }

            if (currentProfile.type === PROFILE_TYPE.ORGANIZATION) {
                delete profileValidationSchema['lang']
                delete profileValidationSchema['currency']
                setInitialValues({
                    category: currentProfile.category || null,
                    region: currentProfile.region || null,
                })
                setSchema(profileValidationSchema)
                setMounted(true)
            }
        }
    }, [currentProfile, t, mounted])

    const handleChangeAvatar = useCallback((value) => {
        const formData = new FormData()
        if (currentProfile) {
            if (currentProfile.type === PROFILE_TYPE.USER) {
                formData.append('main', '1')
                formData.append('image', value.file)
                createAccountAvatar(formData)
            }

            if (currentProfile.type === PROFILE_TYPE.ORGANIZATION) {
                formData.append('logo', value.file)
                updateOrgInfo({organization: currentProfile.slug_name, data: formData})
            }
        }

    }, [currentProfile])

    const disabledButton = useCallback(() => {
        if (currentProfile) {
            if (currentProfile.type === PROFILE_TYPE.USER) {
                return formik.isSubmitting
                    || (formik.touched.category && !!formik.errors.category)
                    || (formik.touched.region && !!formik.errors.region)
                    || (formik.touched.currency && !!formik.errors.currency)
                    || (formik.touched.lang && !!formik.errors.lang)
            } else {
                return formik.isSubmitting
                    || (formik.touched.category && !!formik.errors.category)
                    || (formik.touched.region && !!formik.errors.region)
            }
        }
        return false
    }, [formik, currentProfile])

    useEffect(() => {
        currencyListMount()
    }, [])

    return {formik, disabledButton, handleChangeAvatar}
}