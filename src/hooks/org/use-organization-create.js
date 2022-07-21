import {useFormik} from "formik";
import * as Yup from 'yup'
import {useTranslation} from "react-i18next";
import {useCallback, useState} from "react";
import org from "../../service/org";
import {slugify} from "../../utils/stringUtils";
import {debounce} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {MESSAGES, PERMISSIONS, PROFILE_TYPE} from "../../constants";
import {LEGAL_FORM} from "../../data/legal-form";
import {showMessage} from "../../UIComponents/message-notification";
import {createOrganization} from "../../models/accountModel";

export function useOrganizationCreate() {
    const {t} = useTranslation()
    const {push} = useHistory()
    const [showVideoVerify, setShowVideoVerify] = useState(false)
    const [slugNameStatus, setSlugNameStatus] = useState(-1)

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t('required_field')),
        juridic_name: Yup.string().required(t('required_field')),
        slug_name: Yup.string()
            .test('usernameValidation', t('This slug name is already used'), () => slugNameStatus !== 0)
            .required(t('required_field')),
        region_id: Yup.mixed().required(t('required_field')),
        category_id: Yup.mixed().required(t('required_field')),
        legal_form: Yup.mixed().required(t('required_field')),
        certificateFile: Yup.mixed().required(t('required_field')),
        logo: Yup.mixed().required(t('required_field')),
        video_verifying: Yup.mixed().required(t('required_field')),
        inn: Yup.string().required(t('required_field')),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            slug_name: '',
            juridic_name: '',
            region_id: undefined,
            category_id: undefined,
            legal_form: LEGAL_FORM[0].value,
            certificateFile: undefined,
            logo: null,
            video_verifying: undefined,
            inn: '',
        },
        validationSchema,
        onSubmit: (values, {setSubmitting, resetForm}) => {
            setSubmitting(true)
            const {
                video_verifying,
                certificateFile,
                logo,
                slug_name,
                name,
                legal_form,
                category_id,
                region_id,
                inn,
                juridic_name
            } = values

            let data = new FormData();
            data.append('video_verifying', video_verifying.file);
            data.append('certificate', certificateFile.file);
            data.append('logo', logo.file);
            data.append('slug_name', slug_name);
            data.append('name', name);
            data.append('legal_form', legal_form);
            data.append('category_id', category_id.id);
            data.append('region_id', region_id.id);
            data.append('juridic_name', juridic_name)
            data.append('inn', Number(inn.replace(/\s/g, '')));

            const actions = (error = false) => {
                if (!error) {
                    setShowVideoVerify(false)
                    resetForm()
                    showMessage(MESSAGES.ORGANIZATION_SENT_TO_MODERARION, 'success')
                    push(`/${values.name}`)
                }
                setSubmitting(false)
            }

            const orgInfo = {
                name: values.name,
                avatar: values.logo.stringUrl,
                status: 3,
                text: values.category_id.name,
                category: values.category_id,
                region: values.region_id,
                isOfficial: false,
                url: `/${values.slug_name}`,
                slug_name: values.slug_name,
                type: PROFILE_TYPE.ORGANIZATION,
                perms: [PERMISSIONS.GRAND],
            }
            createOrganization({data, actions, orgInfo})
        }
    })

    const validateSlugName = useCallback((value) => {
        org.validateSlugName({slug_name: value.toLowerCase()})
            .then(res => {
                const errors = formik.errors
                const touched = formik.touched
                if (res.data.status) {
                    setSlugNameStatus(1)
                    delete errors['slug_name']
                    delete touched["slug_name"]
                    formik.setTouched({...touched})
                    formik.setErrors({...errors})
                } else {
                    setSlugNameStatus(0)
                    formik.setTouched({...touched, slug_name: true})
                    formik.setFieldError('slug_name', res.data.error.message)
                }

                if (value.trim().length === 0) {
                    setSlugNameStatus(-1)
                }
            })
    }, [formik])

    const debounceFunc = debounce(validateSlugName, 400)

    const handleChange = (value, name) => {
        if (name === 'name' || name === 'slug_name') {
            formik.setFieldValue(name, value)
            formik.setFieldValue('slug_name', slugify(value))
            debounceFunc(slugify(value))
        } else {
            formik.setFieldValue(name, value)
        }
    }

    const continueDisabled = () => {
        return (
            formik.values.name.trim().length === 0
            || formik.values.inn.trim().length === 0
            || formik.values.slug_name.trim().length === 0
            || formik.values.juridic_name.trim().length === 0
            || !formik.values.legal_form
            || !formik.values.category_id
            || !formik.values.region_id
            || !formik.values.logo
            || !formik.values.certificateFile
            || (formik.touched.slug_name && !!formik.errors.slug_name)
        )
    }


    return {
        formik,
        handleChange,
        continueDisabled,
        showVideoVerify,
        setShowVideoVerify,
        slugNameStatus,
        validateSlugName
    }
}