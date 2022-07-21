import {useFormik} from "formik";
import * as Yup from 'yup'
import {useTranslation} from "react-i18next";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {createOffersGroup} from "../../api/account-api";
import {MESSAGES} from '../../constants';
import {showMessage} from "../../UIComponents/message-notification";
import {orgOfferingGroupInfoMount, resetOfferingListStore} from "../../models/offering-model";
import org from "../../service/org";
import {useStore} from "effector-react";
import {$offeringModel} from "../../models/offering-model";

export function useOffersGroupForm() {
    const {t} = useTranslation()
    const {push} = useHistory()
    const {$offeringGroupInfo} = useStore($offeringModel)
    const {organization, account, group_id} = useParams()
    const [initialValues, setInitialValues] = useState({
        name: '',
        image: undefined
    })
    const [type, setType] = useState(null)
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t('required_field')),
        image: Yup.mixed().required(t('required_field'))
    })


    const createOrgOffersGroup = useCallback((data, {setSubmitting, resetForm}) => {
        setSubmitting(true)
        org.createOrgOfferingGroup(data)
            .then(() => {
                resetForm()
                showMessage(MESSAGES.OFFERINGS_GROUP_ADDED, 'success')
            })
            .finally(() => setSubmitting(false))
            .catch(() => {
                setSubmitting(false)
            })
    }, [])

    const updateOrgOfferingGroup = useCallback((data, {setSubmitting, resetForm}) => {
        let timeout = null
        setSubmitting(true)
        org.updateOrgOfferingGroup(data)
            .then((res) => {
                if(res) {
                    resetOfferingListStore()
                    timeout = setTimeout(() => {
                        showMessage('offering_group_edited', 'success')
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
    }, [organization, push])

    const createUserOrgOffersGroup = useCallback((data, {setSubmitting, resetForm}) => {
        if (account) {
            setSubmitting(true)
            createOffersGroup(account, data)
                .then((res) => {
                    resetForm()
                    showMessage(MESSAGES.OFFERINGS_GROUP_ADDED, 'success')
                })
                .finally(() => setSubmitting(false))
                .catch(() => {
                    setSubmitting(false)
                })
        }
    }, [account])

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: ({name, image}, actions) => {
            const formData = new FormData()
            formData.append('name', name)
            if (image && image.file) {
                formData.append('image', image.file)
            }
            const params = {
                data: formData,
                organization
            }
            if (type === 'organization') {
                if (organization) {
                    if (group_id) {
                        params['id'] = group_id
                        updateOrgOfferingGroup(params, actions)
                    } else {
                        createOrgOffersGroup(params, actions)
                    }
                }
            }

            if (type === 'user') {
                createUserOrgOffersGroup(formData, actions)
            }
        }
    })

    useEffect(() => {
        if (organization && group_id) {
            orgOfferingGroupInfoMount({organization, id: group_id})
        }
    }, [organization, group_id])

    useMemo(() => {
        if (organization) {
            setType('organization')
        } else {
            setType('user')
        }
    }, [organization])

    useEffect(() => {
        let timeout = null

        timeout = setTimeout(() => {
            if (group_id) {
                if (Object.values($offeringGroupInfo.data).length > 0) {
                    setInitialValues({
                        name: $offeringGroupInfo.data.name,
                        image: {stringUrl: $offeringGroupInfo.data.image, file: null}
                    })
                }
            }
            if (!group_id) {
                setInitialValues({
                    name: '',
                    image: undefined
                })
            }
        }, 100)

        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [$offeringGroupInfo, group_id])

    return {
        formik
    }
}