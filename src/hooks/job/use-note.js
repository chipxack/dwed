import {useCallback, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useTranslation} from 'react-i18next'
import {useLocation} from 'react-router-dom'
import specialism from '../../service/specialism'
import {jobRequestDetailMount, jobRequestOfferMount, orgSpecRecordsMount} from '../../models/job-model'

export function useNote({id, order_id, onClose}) {
    const [checkAll, setCheckAll] = useState(false)
    const {t} = useTranslation()
    const {state} = useLocation()
    const jobId = state && state.jobId
    const [loadingProgress, setLoadingProgress] = useState(0)

    const validationSchema = Yup.object().shape({
        value: Yup.string().required(t('required_field'))
    })

    const updateOrgSpecOrder = useCallback((data, actions) => {
        const {setSubmitting, resetForm} = actions

        specialism.updateOrgSpecOrder(data)
            .then((res) => {
                if (res) {
                    const params = {
                        order_id: data.order_id,
                        specialism_id: jobId,
                        params: {
                            limit: 6,
                            offset: 0
                        }
                    }
                    setSubmitting(false)
                    setLoadingProgress(0)
                    resetForm()
                    const offerDetailData = {
                        specialism_id: jobId,
                        order_id: data.order_id,
                    }
                    orgSpecRecordsMount(offerDetailData)
                    jobRequestOfferMount(params)
                    onClose()
                    jobRequestDetailMount(offerDetailData)
                }
            })
            .catch(() => {
                setSubmitting(false)
                setLoadingProgress(false)
            })
    }, [jobId, onClose])

    const formik = useFormik({
        initialValues: {
            value: '',
            file: null,
            isPublic: 1
        },
        validationSchema,
        onSubmit({file, value, isPublic}, actions) {
            const onUploadProgress = (evt) => {
                let percentCompleted = Math.round((evt.loaded * 100) / evt.total)
                setLoadingProgress(percentCompleted)
            }

            const params = {
                id,
                order_id: order_id,
                onUploadProgress
            }

            const data = new FormData()
            data.append('conclusion', value)
            data.append('public_conclusion', isPublic)

            if (file) {
                data.append('conclusion_file', file)
            }

            params['data'] = data
            if (checkAll) {
                params['params'] = {
                    general_conclusion: '1'
                }
            }

            if (jobId) {
                if (jobId !== 'self') {
                    params['specialism_id'] = jobId
                    updateOrgSpecOrder(params, actions)
                } else {

                }
            }
        }
    })

    // useEffect(() => {
    //     let timeout = null
    //
    //     timeout = setTimeout(() => {
    //         if(loadingProgress === 100) {
    //             setLoadingProgress(0)
    //         }
    //     }, 300)
    //
    //     return () => {
    //         clearTimeout(timeout)
    //     }
    // }, [loadingProgress])

    return {checkAll, formik, setCheckAll, loadingProgress}
}