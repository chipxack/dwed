import {useFormik} from "formik";
import {useEffect, useState} from "react";
import * as Yup from 'yup'
import {useTranslation} from "react-i18next";
import {useHistory, useParams} from "react-router-dom";
import org from "../../service/org";
import {MESSAGES} from "../../constants/message";
import {showMessage} from "../../UIComponents/message-notification";
import {
    $organizationModel, resetOrganizationListStore,
    specialistCategoryInfoMount
} from "../../models/organization-models";
import {useStore} from "effector-react";

const defaultValue = {
    name: ''
}

export function useOrgSpecCatForm() {
    const {organization, spec_cat_id} = useParams()
    const {push} = useHistory()
    const {$specialistCategoryInfo: {data}} = useStore($organizationModel)
    const [initialValues, setInitialValues] = useState(defaultValue)
    const {t} = useTranslation()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t('required_field'))
    })

    const createSpecialistCategory = (formData, {setSubmitting, resetForm}) => {
        setSubmitting(true)
        org.createOrgSpecialistCategory(formData)
            .then(() => {
                resetForm()
                showMessage(MESSAGES.SPECIALIST_CATEGORY_ADDED, 'success')
            })
            .finally(() => setSubmitting(false))
            .catch(() => {
                setSubmitting(false)
            })
    }

    const updateSpecialistCategory = (formData, {setSubmitting}) => {
        setSubmitting(true)
        let timeout = null
        org.updateSpecialistCategory(formData)
            .then((res) => {
                if(res) {
                    resetOrganizationListStore()
                    setTimeout(() => {
                        showMessage(MESSAGES.SPECIALIST_CATEGORY_EDITED, 'success')
                        push(`/${organization}/offerings`)
                    }, 100)
                }
            })
            .finally(() => setSubmitting(false))
            .catch(() => {
                setSubmitting(false)
            })

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit({name}, actions) {

            if (organization) {
                const param = {
                    organization,
                    data: {
                        name
                    }
                }

                if (spec_cat_id) {
                    param['id'] = spec_cat_id
                    updateSpecialistCategory(param, actions)
                } else {
                    createSpecialistCategory(param, actions)
                }

            }
        }
    })

    useEffect(() => {
        if (spec_cat_id && organization) {
            specialistCategoryInfoMount({id: spec_cat_id, organization})
        }
    }, [spec_cat_id, organization])

    useEffect(() => {
        if(spec_cat_id) {
            if (Object.values(data).length > 0) {
                setInitialValues({
                    name: data.name
                })
            }
        }else {
            setInitialValues(defaultValue)
        }
    }, [data, spec_cat_id])

    return {formik}
}