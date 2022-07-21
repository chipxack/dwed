import {useFormik} from "formik";
import {useCallback, useEffect, useState} from "react";
import * as Yup from 'yup'
import {useTranslation} from "react-i18next";
import moment from "moment";
import {useStore} from "effector-react";
import {$accountModel, updateAccountInfo} from "../../models/accountModel";
import {useHistory} from "react-router-dom";
import {URL_KEYS} from "../../constants";

const defaultValues = {
    username: '',
    name: '',
    lastname: '',
    surname: '',
    birthday: moment(new Date()).format('YYYY-MM-DD'),
    gender: '',
    category: null,
    region: null,
}

export function useAccountInfoVerifying() {
    const {$accountInfo: {data: accountData}, $profiles: {currentProfile}} = useStore($accountModel)
    const [initialValues, setInitialValues] = useState(defaultValues)
    const [mounted, setMounted] = useState(false)
    const {t} = useTranslation()
    const {location: {pathname}, push} = useHistory()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t('required_field')),
        lastname: Yup.string().required(t('required_field')),
        surname: Yup.string().required(t('required_field')),
        birthday: Yup.string().required(t('required_field')),
        gender: Yup.string().required(t('required_field')),
        category: Yup.mixed().required(t('required_field')),
        region: Yup.mixed().required(t('required_field')),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit(values, {setSubmitting}) {
            setSubmitting(true)
            const actions = () => {
                push({
                    pathname,
                    search: `${URL_KEYS.VERIFICATION_STEP}=2`
                })
                setSubmitting(false)
            }
            const data = {
                name: values.name,
                lastname: values.lastname,
                surname: values.surname,
                birthday: values.birthday,
                gender: values.gender,
                main_cat_id: values.category.id,
                region_id: values.region.id
            }
            updateAccountInfo({data, actions})
        }
    })

    useEffect(() => {
        if (accountData && currentProfile && !mounted) {
            setInitialValues({
                username: `@${currentProfile.slug_name}`,
                name: accountData.name || '',
                lastname: accountData.lastname || '',
                surname: accountData.surname || '',
                birthday: accountData.birthday || moment(new Date()).format('YYYY-MM-DD'),
                gender: accountData.gender || '',
                category: accountData.main_cat,
                region: accountData.region
            })
            setMounted(true)
        }
    }, [accountData, currentProfile, mounted])

    const disabled = useCallback(() => {
        return (
            formik.isSubmitting
            || (formik.touched.name && !!formik.errors.name)
            || (formik.touched.lastname && !!formik.errors.lastname)
            || (formik.touched.surname && !!formik.errors.surname)
            || (formik.touched.gender && !!formik.errors.gender)
            || (formik.touched.birthday && !!formik.errors.birthday)
            || (formik.touched.category && !!formik.errors.category)
            || (formik.touched.region && !!formik.errors.region)
        )
    }, [formik])

    return {
        formik,
        disabled
    }
}