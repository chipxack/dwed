import {useFormik} from 'formik'
import {useEffect, useState} from 'react'
import {useStore} from 'effector-react'
import {$accountModel, updateOrgInfo} from '../../models/accountModel'
import {PROFILE_TYPE} from '../../constants'
import * as Yup from 'yup'
import {useTranslation} from 'react-i18next'
import {showMessage} from '../../UIComponents/message-notification'

export function useOrgProfileSettings() {
    const {$profiles: {currentProfile}} = useStore($accountModel)
    const {t} = useTranslation()
    const [initialValues, setInitialValues] = useState(
        {
            logo: null,
            category: null,
            region: null,
            slug_name: ''
        }
    )

    const validationSchema = Yup.object().shape({
        logo: Yup.mixed().required(t('required_fields')),
        category: Yup.mixed().required(t('required_fields')),
        region: Yup.mixed().required(t('required_fields')),
    })

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit(values, {setSubmitting}) {
            const formData = new FormData()

            if (values?.logo?.file) {
                formData.append('logo', values.logo.file)
            }

            formData.append('category', values?.category?.id)
            formData.append('category', values?.region?.id)

            const params = {
                organization: currentProfile?.slug_name,
                data: formData,
                actions: (err = false) => {
                    setSubmitting(false)
                    if (!err) {
                        showMessage('data_changed_successfully', 'success')
                    }
                }
            }

            updateOrgInfo(params)
        }
    })

    useEffect(() => {
        if (currentProfile?.type === PROFILE_TYPE.ORGANIZATION) {
            setInitialValues({
                logo: currentProfile.avatar ? {stringUrl: currentProfile.avatar} : null,
                category: currentProfile?.category || null,
                region: currentProfile?.region || null,
                slug_name: currentProfile?.slug_name || ''
            })
        }
    }, [currentProfile])


    return {formik}
}